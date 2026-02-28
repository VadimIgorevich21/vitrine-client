// types/config.ts

export interface ExchangeRule {
    directions: Record<string, string[]>; // Объект типа { "USD": ["BTC", "ETH"], "BTC": ["USD"] }
    all_from: string[];
}

export interface PaymentMethod {
    value: string;
    label: string;
}

export interface WalletType {
    key: string;
    label: string;
}

export interface MaintenanceNotification {
    content: string | Record<string, any>;
}

export interface Configs {
    app_build?: string;
    // Данные для обмена
    exchange_rules: ExchangeRule;
    fiat_currencies: string[];
    crypto_currencies: string[];
    payment_methods: PaymentMethod[];
    buy_payment_methods: PaymentMethod[];
    sell_payment_methods: PaymentMethod[];
    wallet_types: WalletType[];

    // Остальные конфиги
    notifications?: any[];
    unreadNotificationsCount?: number | null;
    maintenanceNotification?: MaintenanceNotification;
    contacts?: {
        types?: Record<string, string>;
    };
    users?: {
        roles?: any[];
    };
}