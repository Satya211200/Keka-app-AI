import { useState, useCallback } from 'react';
import { useNotification } from '@/context/NotificationContext';

interface UseApiOptions {
  onSuccess?: (data: any) => void;
  onError?: (error: Error) => void;
  showNotification?: boolean;
}

export function useApi<T = any>(options: UseApiOptions = {}) {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const { showNotification } = useNotification();

  const execute = useCallback(
    async (url: string, config: RequestInit = {}) => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch(url, {
          ...config,
          headers: {
            'Content-Type': 'application/json',
            ...config.headers,
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();
        setData(result);
        options.onSuccess?.(result);

        if (options.showNotification) {
          showNotification('success', 'Operation completed successfully');
        }

        return result;
      } catch (err) {
        const error = err instanceof Error ? err : new Error('An error occurred');
        setError(error);
        options.onError?.(error);

        if (options.showNotification) {
          showNotification('error', error.message);
        }

        throw error;
      } finally {
        setIsLoading(false);
      }
    },
    [options, showNotification]
  );

  return {
    data,
    isLoading,
    error,
    execute,
  };
} 