import axios, { AxiosError, type Method } from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

function useFetch<Type>(
  url: string,
  method: Method,
  body?: any,
  dependency?: any
): {
  loading: boolean;
  error: AxiosError | null;
  data: Type | null;
} {
  const [loading, setLoading] = useState<boolean>(true);
  const [data, setData] = useState<Type | null>(null);
  const [error, setError] = useState<AxiosError | null>(null);
  const router = useRouter();

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      try {
        const response = await axios({
          url: url,
          method: method,
          data: body,
        });

        const data = response?.data;

        setData(data);
      } catch (error: any) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url, method, body, router, dependency]);

  return { loading, error, data };
}

export { useFetch };
