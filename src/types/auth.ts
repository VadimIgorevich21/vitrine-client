export interface User {
  id: number
  country_id?: number
  name?: string
  email?: string
  phone?: string
  default_currency?: string
  default_currency_info?: {
    buyTotal: number
    sellTotal: number
  }
  kyc_verified?: boolean
  kyc_status?: string
  has_access?: boolean
  roles?: string[]
  permissions?: string[]
  isAdmin?: boolean
  [key: string]: unknown
}

export interface LoginPayload {
  email?: string
  password?: string
  [key: string]: unknown
}
