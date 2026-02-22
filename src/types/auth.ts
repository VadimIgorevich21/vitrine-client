export interface User {
  id: number
  name?: string
  email?: string
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
