import { apiClient } from "@/services/api";

export const orderService = {
  async createOrder(payload: any) {
    const { data } = await apiClient.post('/orders', payload);
    return data;
  },

  async getUserOrders(params: { page?: number; search?: string; date_from?: string; date_to?: string } = {}) {
    const { page = 1, search, date_from, date_to } = params;
    let url = `/orders?page=${page}`;
    if (search) url += `&search=${encodeURIComponent(search)}`;
    if (date_from) url += `&date_from=${date_from}`;
    if (date_to) url += `&date_to=${date_to}`;

    const { data } = await apiClient.get(url);
    return data;
  },

  async regeneratePayment(orderId: number) {
    const { data } = await apiClient.post(`/orders/${orderId}/regenerate-payment`);
    return data;
  },

  async cancelOrder(orderId: number) {
    const { data } = await apiClient.post(`/orders/${orderId}/cancel`);
    return data;
  }
};