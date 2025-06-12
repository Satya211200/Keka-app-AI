import { getToken } from './auth';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

interface ApiOptions extends RequestInit {
  requiresAuth?: boolean;
}

let isRefreshing = false;
let failedQueue: Array<{
  resolve: (value: any) => void;
  reject: (reason?: any) => void;
}> = [];

const processQueue = (error: any = null, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

const refreshToken = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/refresh`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    });

    if (!response.ok) {
      throw new Error('Failed to refresh token');
    }

    const data = await response.json();
    localStorage.setItem('token', data.token);
    return data.token;
  } catch (error) {
    localStorage.removeItem('token');
    window.location.href = '/login';
    throw error;
  }
};

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

    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        ...fetchOptions,
        headers,
      });

      if (response.status === 401 && !isRefreshing) {
        isRefreshing = true;

        try {
          const newToken = await refreshToken();
          isRefreshing = false;
          processQueue(null, newToken);

          // Retry the original request with the new token
          headers.set('Authorization', `Bearer ${newToken}`);
          const retryResponse = await fetch(`${API_BASE_URL}${endpoint}`, {
            ...fetchOptions,
            headers,
          });

          if (!retryResponse.ok) {
            throw new Error('Request failed after token refresh');
          }

          return retryResponse.json();
        } catch (error) {
          processQueue(error, null);
          throw error;
        }
      }

      if (!response.ok) {
        const error = await response.json().catch(() => ({}));
        throw new Error(error.message || 'An error occurred');
      }

      return response.json();
    } catch (error) {
      if (error instanceof Error && error.message === 'Failed to fetch') {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        });
      }
      throw error;
    }
  },
};

// API endpoints
export const endpoints = {
  auth: {
    login: '/auth/login',
    register: '/auth/register',
    logout: '/auth/logout',
    refresh: '/auth/refresh',
    me: '/auth/me',
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