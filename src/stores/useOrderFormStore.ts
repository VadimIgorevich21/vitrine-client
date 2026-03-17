import { defineStore } from 'pinia';
import { reactive, computed, watch, ref } from 'vue';
import { useConfigStore } from '@/stores/syncConfigs';
import { useRateStore } from './useRateStore';
import { orderService } from '@/services/orderService';

export const useOrderFormStore = defineStore('orderForm', () => {
  const configStore = useConfigStore();
  const rateStore = useRateStore();
  const step = ref(1);

  const state = reactive({
    type: 'buy' as 'buy' | 'sell',
    from_currency: '',
    to_currency: '',
    amount_from: null as number | null,
    amount_to: null as number | null,
    payment_method: '', // Ключ выбранного метода оплаты
    wallet_type: '',    // Для покупки: сеть (ERC20 и т.д.)
    wallet_address: '', // Для покупки: адрес
    user_requisites: '', // Для продажи: карта/счет
    comment: ''
  });

  // --- Getters ---
  const currentRate = computed(() =>
    rateStore.getRate(state.from_currency, state.to_currency)
  );

  // Новый геттер для получения актуального списка методов оплаты в зависимости от типа
  const currentPaymentMethods = computed(() => {
    return state.type === 'buy'
      ? configStore.buyPaymentMethods
      : configStore.sellPaymentMethods;
  });

  const amountLimitError = computed<'min' | 'max' | null>(() => {
    const rate = currentRate.value;
    const amount = state.amount_from;
    if (!rate || amount === null || amount === 0) return null;

    const min = Number(rate.min_amount ?? 0);
    const max = Number(rate.max_amount ?? 0);

    if (amount < min) return 'min';
    if (max > 0 && amount > max) return 'max';
    return null;
  });

  const isAmountValid = computed(() => amountLimitError.value === null);

  const computeCommission = (amountFrom: number | null) => {
    const rate = currentRate.value;
    if (!rate || amountFrom === null || amountFrom <= 0) {
      return { fee: 0, percentOfAmount: 0 };
    }

    const minCommission = Number(rate.min_commission ?? 0);
    const commissionPercent = Number(rate.commission_percent ?? 0);
    const commissionFromAmount = Number(rate.commission_from_amount ?? 0);

    let fee: number;

    if (commissionFromAmount > 0 && amountFrom >= commissionFromAmount && commissionPercent > 0) {
      fee = amountFrom * (commissionPercent / 100);
    } else {
      fee = minCommission;
    }

    if (!Number.isFinite(fee) || fee < 0) {
      fee = 0;
    }

    const percentOfAmount = amountFrom > 0 ? (fee / amountFrom) * 100 : 0;

    return { fee, percentOfAmount };
  };

  const feeAmount = computed(() => {
    if (state.amount_from === null || !currentRate.value) return null;
    const { fee } = computeCommission(state.amount_from);
    return fee;
  });

  const feePercent = computed(() => {
    if (state.amount_from === null || !currentRate.value) return null;
    const { percentOfAmount } = computeCommission(state.amount_from);
    return percentOfAmount;
  });

  // --- Actions ---
  const calculateTo = () => {
    const rate = currentRate.value;
    if (rate && state.amount_from !== null) {
      const { fee } = computeCommission(state.amount_from);
      const netAmount = state.amount_from - fee;
      if (netAmount <= 0) {
        state.amount_to = null;
        return;
      }
      const res = netAmount * rate.final_rate;
      state.amount_to = Number(res.toFixed(rate.precision));
    } else {
      state.amount_to = null;
    }
  };

  const calculateFrom = () => {
    const rate = currentRate.value;
    if (rate && state.amount_to !== null && rate.final_rate > 0) {
      const minCommission = Number(rate.min_commission ?? 0);
      const commissionPercent = Number(rate.commission_percent ?? 0);
      const commissionFromAmount = Number(rate.commission_from_amount ?? 0);

      const precision = state.type === 'buy' ? 2 : 8;
      const rateValue = rate.final_rate;

      let gross: number;

      if (commissionFromAmount > 0 && commissionPercent > 0) {
        const percent = commissionPercent / 100;

        const grossWithFixed = state.amount_to / rateValue + minCommission;

        if (grossWithFixed < commissionFromAmount) {
          gross = grossWithFixed;
        } else {
          const denominator = rateValue * (1 - percent);
          if (denominator <= 0) {
            gross = grossWithFixed;
          } else {
            gross = state.amount_to / denominator;
          }
        }
      } else {
        gross = state.amount_to / rateValue + minCommission;
      }

      state.amount_from = Number(gross.toFixed(precision));
    } else {
      state.amount_from = null;
    }
  };

  // const submitOrder = async () => {
  //   return await orderService.createOrder(state);
  // };

  const submitOrder = async () => {
    // Извлекаем поля, которые могут быть лишними
    const { user_requisites, wallet_type, wallet_address, ...rest } = state;

    const payload: any = { ...rest };

    if (state.type === 'buy') {
      // Для покупки добавляем только крипто-поля
      payload.wallet_type = wallet_type;
      payload.wallet_address = wallet_address;
    } else {
      // Для продажи добавляем только фиатные реквизиты
      payload.user_requisites = user_requisites;
    }

    return await orderService.createOrder(payload);
  };

  const initDefaultValues = () => {
    const saved = localStorage.getItem('order_draft');
    if (saved) {
      Object.assign(state, JSON.parse(saved));
      localStorage.removeItem('order_draft');
    } else {
      state.from_currency = state.type === 'buy'
        ? configStore.fiatCurrencies[0]?.code ?? ''
        : configStore.cryptoCurrencies[0]?.code ?? '';

      const available = configStore.directions[state.from_currency] ?? [];
      state.to_currency = available[0] ?? '';
    }

    // ВАЖНО: Сбрасываем поля оплаты при смене Buy/Sell или инициализации,
    // чтобы старые данные не улетели в новый заказ
    state.amount_from = null;
    state.amount_to = null;
    state.payment_method = state.type === 'buy' ? 'visa_mastercard' : '';
    state.wallet_type = '';
    state.wallet_address = '';
    state.user_requisites = '';
    step.value = 1;
  };

  const persist = () => localStorage.setItem('order_draft', JSON.stringify(state));

  const resetForm = () => {
    // Вызываем initDefaultValues, так как там уже прописан сброс всех полей
    initDefaultValues();
  };

  // Следим за сменой типа (Buy/Sell)
  watch(() => state.type, () => initDefaultValues());

  // Следим за сменой валюты From
  watch(() => state.from_currency, (newVal) => {
    const available = configStore.directions[newVal] ?? [];
    if (!available.includes(state.to_currency)) {
      state.to_currency = available[0] ?? '';
    }
    calculateTo();
  });

  // Следим за обновлением курсов (через Pusher или polling)
  watch(() => currentRate.value, () => {
    // При обновлении курса пересчитываем "To", если заполнено "From"
    if (state.amount_from !== null) {
      calculateTo();
    }
  });

  // Auto-select network based on crypto currency
  watch(() => state.to_currency, (newVal) => {
    if (state.type !== 'buy') return;
    
    const mapping: Record<string, string> = {
      'btc': 'btc',
      'eth': 'erc',
      'trx': 'trc',
      'usdc': 'erc'
    };

    const currencyLower = newVal.toLowerCase();
    if (mapping[currencyLower]) {
      state.wallet_type = mapping[currencyLower];
    }
  });

  return {
    state,
    currentRate,
    currentPaymentMethods, // Не забудь вернуть новый геттер
    isAmountValid,
    amountLimitError,
    feeAmount,
    feePercent,
    calculateTo,
    calculateFrom,
    initDefaultValues,
    persist,
    resetForm,
    submitOrder,
    rateStore,
    step
  };
});