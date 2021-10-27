import axios from 'axios';

type AxiosConfig = {
  baseURL: string;
};

export const apiClientFactory = (config: AxiosConfig) => {
  const client = axios.create({
    ...config
  });

  client.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  return client;
};
