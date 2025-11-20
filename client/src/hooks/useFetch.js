import { useState, useEffect, useCallback } from 'react';

export const useFetch = (apiCall, initialParams = null) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [params, setParams] = useState(initialParams);

  const fetchData = useCallback(async (currentParams = params) => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await apiCall(currentParams);
      setData(result);
      return result;
    } catch (err) {
      setError(err);
      console.error('Fetch error:', err);
      return null;
    } finally {
      setIsLoading(false);
    }
  }, [apiCall, params]);

  useEffect(() => {
    if (apiCall) {
      fetchData();
    }
  }, [fetchData, apiCall]);

  return { data, isLoading, error, setParams, refetch: fetchData };
};