export interface User {
  id: number
  name?: string
  email?: string
  kyc_verified?: boolean
  kyc_status?: string
  has_access?: boolean
  roles: string[]
  permissions: string[]
  isAdmin?: boolean
  [key: string]: unknown
}

export interface LoginPayload {
  email?: string
  password?: string
  [key: string]: unknown
}
