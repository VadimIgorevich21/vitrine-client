import { ref, reactive, onMounted, onUnmounted } from 'vue';

export function useWhiteBitRates(backendConfigs) {
  const rawMarketRates = reactive({});
  const clientRates = ref([]);

  // Карта соответствий для WhiteBIT API v4
  const exchangeMapping = {
    'btc_eur': 'BTC_EUR',
    'btc_usd': 'BTC_USD',
    'eth_eur': 'ETH_EUR',
    'eth_usd': 'ETH_USD',
    'trx_eur': 'TRX_EUR',
    'trx_usd': 'TRX_USDC',
    'usdc_eur': 'USDC_EUR',
    'usdc_usd': 'USDC_USDT'
  };

  const calculateRates = () => {
    clientRates.value = backendConfigs.map(config => {
      const { main_currency, from_currency, to_currency, rate_adjustment_percent, precision } = config;

      const isDirect = from_currency.toLowerCase() === main_currency.toLowerCase();
      const secondCur = isDirect ? to_currency : from_currency;
      const searchKey = `${main_currency}_${secondCur}`.toLowerCase();

      const tickerName = exchangeMapping[searchKey];
      const marketPrice = rawMarketRates[tickerName];

      let finalRate = 'Загрузка...';
      let displayMarketPrice = '—';
      let mainUnitRate = '—';

      if (marketPrice && marketPrice > 0) {
        // Рыночная цена (всегда с запасом точности для отладки)
        displayMarketPrice = marketPrice.toFixed(6);

        const factor = 1 + (rate_adjustment_percent / 100);

        // 1. Итоговый курс (сколько BTC за 1 EUR или сколько EUR за 1 BTC)
        const calculated = isDirect ? marketPrice * factor : (1 / marketPrice) * factor;

        // Используем точность из конфига (или 8 по умолчанию)
        const p = precision !== undefined ? precision : 8;
        finalRate = calculated.toFixed(p);

        // 2. Курс за 1 ед. крипты (для понятного сравнения с рынком)
        if (isDirect) {
          mainUnitRate = (marketPrice * factor).toFixed(p);
        } else {
          // Показываем цену, по которой клиент "покупает" 1 BTC за фиат
          mainUnitRate = (marketPrice / (1 - (rate_adjustment_percent / 100))).toFixed(p);
        }
      }

      return {
        ...config,
        rate: finalRate,
        marketRate: displayMarketPrice,
        mainUnitRate: mainUnitRate
      };
    });
  };

  const connect = () => {
    const socket = new WebSocket('wss://api.whitebit.com/ws');

    socket.onopen = () => {
      console.log('WebSocket Connected ✅');
      socket.send(JSON.stringify({
        id: 1,
        method: "market_subscribe",
        params: Object.values(exchangeMapping)
      }));
    };

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);

      // Обновления в v4 приходят через market_update
      if (data.method === 'market_update' && data.params) {
        const ticker = data.params[0];
        const details = data.params[1];
        if (details && details.last) {
          rawMarketRates[ticker] = parseFloat(details.last);
          calculateRates();
        }
      }
    };

    socket.onclose = () => {
      console.log('WebSocket Closed. Reconnecting in 3s...');
      setTimeout(connect, 3000);
    };

    return socket;
  };

  let ws = null;
  onMounted(() => {
    calculateRates();
    ws = connect();
  });

  onUnmounted(() => {
    if (ws) ws.close();
  });

  return { clientRates };
}