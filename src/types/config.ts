// types/config.ts

export interface ExchangeRate {
    currency: string;
    rate: number;
}

export interface MaintenanceNotification {
    content: string | Record<string, any>;
}

export interface Configs {
    exchange_rates?: ExchangeRate[];
    notifications?: any[];
    unreadNotificationsCount?: number | null;
    maintenanceNotification?: MaintenanceNotification;
    contacts?: {
        types?: any[];
    };
    users?: {
        roles?: any[];
    };
    authentication?: {
        statuses?: any[];
    };
}