import { apiClient } from '@/services/api'
import type { Configs } from "@/types/config";

export default {
  getConfigs() {
    return apiClient.get<{ data: Configs }>("/get-configs");
  },
}
