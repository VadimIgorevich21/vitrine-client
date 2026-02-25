import { ref, reactive, onMounted, onUnmounted } from 'vue';

export function useWhiteBitRates(backendConfigs) {
  const rawMarketRates = reactive({});
  const clientRates = ref([]);

  // Учтены ваши специфические пары:
  // TRX/USD берем из пары TRX_USDC
  // USDC/USD берем из пары USDC_USDT
  const exchangeMapping = {
    'btc_eur': 'BTC_EUR',
    'btc_usd': 'BTC_USD',
    'eth_eur': 'ETH_EUR',
    'eth_usd': 'ETH_USD',
    'trx_eur': 'TRX_EUR',
    'trx_usd': 'TRX_USDC', // Ваше условие
    'usdc_eur': 'USDC_EUR',
    'usdc_usd': 'USDC_USDT' // Ваше условие
  };

  const calculateRates = () => {
    clientRates.value = backendConfigs.map(config => {
      const { main_currency, from_currency, to_currency, rate_adjustment_percent, precision } = config;

      const isDirect = from_currency.toLowerCase() === main_currency.toLowerCase();
      const secondCur = isDirect ? to_currency : from_currency;

      // Ищем ключ в маппинге (например, 'trx_usd')
      const searchKey = `${main_currency}_${secondCur}`.toLowerCase();
      const tickerName = exchangeMapping[searchKey];
      const marketPrice = rawMarketRates[tickerName];

      let finalRate = 'Загрузка...';
      let displayMarketPrice = '—';
      let mainUnitRate = '—';

      if (marketPrice && marketPrice > 0) {
        displayMarketPrice = marketPrice.toString();
        const factor = 1 + (rate_adjustment_percent / 100);

        // 1. Итоговый курс (Количество к получению)
        // Если EUR -> BTC, считаем 1 / (Цена * Наценка)
        const calculated = isDirect ? marketPrice * factor : (1 / (marketPrice * factor));
        finalRate = calculated.toFixed(precision || 8);

        // 2. Цена за 1 ед. крипты (всегда в фиате/стейбле)
        // Для прозрачности выводим цену монеты с вашей наценкой
        const unitPriceRaw = marketPrice * factor;
        const unitPrecision = marketPrice > 10 ? 2 : 6;
        mainUnitRate = unitPriceRaw.toFixed(unitPrecision);
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
      socket.send(JSON.stringify({
        id: 1,
        method: "market_subscribe",
        params: Object.values(exchangeMapping)
      }));
    };

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.method === 'market_update' && data.params) {
        const [ticker, details] = data.params;
        if (details?.last) {
          rawMarketRates[ticker] = parseFloat(details.last);
          calculateRates();
        }
      }
    };

    socket.onclose = () => setTimeout(connect, 3000);
    return socket;
  };

  let ws = null;
  onMounted(() => { calculateRates(); ws = connect(); });
  onUnmounted(() => ws?.close());

  return { clientRates };
}