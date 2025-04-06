import { api } from './config'

interface LoginResponse {
  data: {
    user: {
      id: string
      name: string
      email: string
    }
  }
}

interface RegisterResponse {
  data: {
    user: {
      id: string
      name: string
      email: string
    }
  }
}

export const login = async (email: string, password: string): Promise<LoginResponse> => {
  return api.post('/auth/login', { email, password })
}

export const register = async (name: string, email: string, password: string): Promise<RegisterResponse> => {
  return api.post('/auth/register', { name, email, password })
} 