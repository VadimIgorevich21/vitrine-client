export interface CurrencyRate {
  main: string;
  from: string;
  to: string;
  market_rate: number;
  adj: number;
  unit_price: number;
  final_rate: number;
  precision: number;
  min_amount: number;
  min_commission: number;
  updated_at: string;
}

// Добавим интерфейс для события Pusher, чтобы всё было по фэншую
export interface RatesUpdatedPayload {
  rates: CurrencyRate[];
}