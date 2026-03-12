// types/config.ts

export interface ExchangeRule {
    directions: Record<string, string[]>; // Объект типа { "USD": ["BTC", "ETH"], "BTC": ["USD"] }
    all_from: string[];
}

export interface PaymentMethod {
    key: string;
    label: string;
    icon?: string;
}

export interface WalletType {
    key: string;
    label: string;
}

export interface MaintenanceNotification {
    content: string | Record<string, any>;
}

export interface Currency {
    code: string;
    title: string;
    icon: string;
    exchange_rate: string;
    exchange_rate_operation: string;
    type: string;
    sort_order: number;
}

export interface Country {
    code: string;
    phone_code: string;
    flag: string;
    name_ru: string;
    name_en: string;
    name: string;
}

export interface Configs {
    app_build?: string;
    // Данные для обмена
    exchange_rules: ExchangeRule;
    fiat_currencies: Currency[];
    crypto_currencies: Currency[];
    countries: Country[];
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