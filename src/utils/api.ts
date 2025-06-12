import { getToken } from './auth';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

interface ApiOptions extends RequestInit {
  requiresAuth?: boolean;
}

export const api = {
  async get<T>(endpoint: string, options: ApiOptions = {}): Promise<T> {
    return this.request<T>(endpoint, { ...options, method: 'GET' });
  },

  async post<T>(endpoint: string, data: any, options: ApiOptions = {}): Promise<T> {
    return this.request<T>(endpoint, {
      ...options,
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  async put<T>(endpoint: string, data: any, options: ApiOptions = {}): Promise<T> {
    return this.request<T>(endpoint, {
      ...options,
      method: 'PUT',
      body: JSON.stringify(data),
    });
  },

  async delete<T>(endpoint: string, options: ApiOptions = {}): Promise<T> {
    return this.request<T>(endpoint, { ...options, method: 'DELETE' });
  },

  async request<T>(endpoint: string, options: ApiOptions = {}): Promise<T> {
    const { requiresAuth = true, ...fetchOptions } = options;
    const headers = new Headers({
      'Content-Type': 'application/json',
      ...(fetchOptions.headers as Record<string, string>),
    });

    if (requiresAuth) {
      const token = getToken();
      if (token) {
        headers.append('Authorization', `Bearer ${token}`);
      }
    }

    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...fetchOptions,
      headers,
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({}));
      throw new Error(error.message || 'An error occurred');
    }

    return response.json();
  },
};

// API endpoints
export const endpoints = {
  auth: {
    login: '/auth/login',
    register: '/auth/register',
    logout: '/auth/logout',
    refresh: '/auth/refresh',
  },
  employees: {
    list: '/employees',
    create: '/employees',
    get: (id: string) => `/employees/${id}`,
    update: (id: string) => `/employees/${id}`,
    delete: (id: string) => `/employees/${id}`,
  },
  attendance: {
    list: '/attendance',
    create: '/attendance',
    get: (id: string) => `/attendance/${id}`,
    update: (id: string) => `/attendance/${id}`,
    delete: (id: string) => `/attendance/${id}`,
  },
  leave: {
    list: '/leave',
    create: '/leave',
    get: (id: string) => `/leave/${id}`,
    update: (id: string) => `/leave/${id}`,
    delete: (id: string) => `/leave/${id}`,
  },
  payroll: {
    list: '/payroll',
    create: '/payroll',
    get: (id: string) => `/payroll/${id}`,
    update: (id: string) => `/payroll/${id}`,
    delete: (id: string) => `/payroll/${id}`,
  },
}; 