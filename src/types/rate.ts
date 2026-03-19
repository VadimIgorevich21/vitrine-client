export interface CurrencyRate {
  main: string;
  from: string;
  to: string;
  market_rate: number;
  adj: number;
  unit_price: number;
  final_rate: number;
  precision: number;
  buy_precision?: number;
  min_amount: number;
  max_amount?: number; // 0/undefined = без ограничения
  min_commission: number;
  commission_percent?: number;
  commission_from_amount?: number;
  updated_at: string;
}

// Добавим интерфейс для события Pusher, чтобы всё было по фэншую
export interface RatesUpdatedPayload {
  rates: CurrencyRate[];
}