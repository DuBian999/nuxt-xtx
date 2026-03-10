import axios from 'axios';
import type { AxiosRequestConfig, AxiosResponse } from 'axios';

// 创建 axios 实例

const api = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_API,
  timeout: 10000,
});

// 响应数据类型
interface Response<T> {
  code: string;
  msg: string;
  result: T;
}

// 请求拦截器
api.interceptors.request.use(
  (config) => {
    // 确保请求的路径地址与 VITE_APP_BASE_API 进行拼接
    if (config.baseURL && config.url && !config.url.startsWith('http')) {
      config.url = config.baseURL + config.url;
    }
    // 可以在这里添加 token 等认证信息
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 响应拦截器
api.interceptors.response.use(
  (response: AxiosResponse<Response<any>>) => {
    const res = response.data;
    if (res.code !== '1') {
      // 处理错误
      return Promise.reject(new Error(res.msg || 'Error'));
    }
    return res.result;
  },
  (error) => {
    console.error('API Error:', error);
    return Promise.reject(error);
  }
);

// 封装请求方法
const request = {
  get: <T = any>(url: string, config?: AxiosRequestConfig): Promise<T> => {
    return api.get(url, config);
  },
  post: <T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<T> => {
    return api.post(url, data, config);
  },
  put: <T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<T> => {
    return api.put(url, data, config);
  },
  delete: <T = any>(url: string, config?: AxiosRequestConfig): Promise<T> => {
    return api.delete(url, config);
  },
};

export default request;
