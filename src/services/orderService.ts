import { apiClient } from "@/services/api";

export const orderService = {
  async createOrder(payload: any) {
    const { data } = await apiClient.post('/orders', payload);
    return data;
  },

  async getUserOrders(page = 1) {
    const { data } = await apiClient.get(`/orders?page=${page}`);
    return data;
  }
};