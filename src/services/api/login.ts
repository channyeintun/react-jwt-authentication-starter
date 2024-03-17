import { LoginRequest, LoginResponse } from '@/types';
import { apiInstance } from '../utils';

export type LoginApi = (data: LoginRequest) => Promise<LoginResponse>;

export const login: LoginApi = (data) => apiInstance.post(`/auth/users/login`, data).then((res) => res.data);
