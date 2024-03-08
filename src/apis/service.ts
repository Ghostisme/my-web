import axios from 'axios';
import type { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { useHistory } from 'react-router-dom';
import { message } from 'antd';
import { getToken, setToken } from '@/utils';

// 导出Request，可以用来自定义传递配置来创建实例
const defaultMsg = '系统开小差，请稍后重试!';
const TOKEN = 'x-auth-token';
type Result<T> = {
  code: number;
  msg: string;
  data: T;
} & AxiosResponse<T>;
// 暂时只覆盖了如下部分的code值，可能会有遗漏
function handleError(code: number, msg: string = defaultMsg) {
  const history = useHistory();
  switch (code) {
    case 503:
      message.error('账户已被冻结');
      break;
    case 410:
    case 412:
    case 501:
      message.error(msg);
      history.push('/login');
      break;
    default:
      message.error(msg);
      break;
  }
}
export class Request {
  // axios 实例
  instance: AxiosInstance;
  // 基础配置，url和超时时间
  baseConfig: AxiosRequestConfig = { baseURL: '', timeout: 30 * 1000 };

  constructor(config: AxiosRequestConfig) {
    // 使用axios.create创建axios实例，配置为基础配置和我们传递进来的配置
    this.instance = axios.create(Object.assign(this.baseConfig, config));
    if (import.meta.env.VITE_API_BASE_URL) {
      this.instance.defaults.baseURL =
        import.meta.env.VITE_API_BASE_URL + import.meta.env.VITE_API_PREFIX_URL;
      // axios.defaults.baseURL = '/aaa/v1';
    }
    this.instance.interceptors.request.use(
      (config: AxiosRequestConfig) => {
        const token = getToken();
        if (token) {
          if (!config.headers) {
            config.headers = {};
          }
          config.headers[TOKEN] = token;
          // config.headers['accessToken'] = 'c043a1d3691a48a2a6355c83ecba7ffd_5088';
          // config.headers['version'] = '123456';
        }
        return config;
      },
      (error) => {
        message.error(error.msg || defaultMsg);
        return Promise.reject(error);
      }
    );
    this.instance.interceptors.response.use(
      (res: AxiosResponse) => {
        return res;
        // const token = res?.headers && res?.headers[TOKEN];
        // if( token ){
        //   setToken(token);
        // }
        // // console.log(res, '=res');
        // const resData = res.data || {}
        // const { code, data, msg } = resData;
        // if ( code === 200 || code === 0 ) return resData;
        // // if ( code === 0 ) return resData;
        // if ( code === undefined ) return resData; // 上传、下载文件的接口如果访问正常会直接返回文件数据，不会有code值
        // handleError(code, msg);
        // return Promise.reject(resData);
      },
      (error) => {
        message.error(error.msg || defaultMsg);
        return Promise.reject(error);
      }
    );
  }

  // 定义请求方法
  public request(config: AxiosRequestConfig): Promise<AxiosResponse> {
    return this.instance.request(config);
  }

  public get<T = any>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<Result<T>> {
    return this.instance.get(url, config);
  }

  public post<T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<Result<T>> {
    return this.instance.post(url, data, config).then((res) => {
      const token = res?.headers && res?.headers[TOKEN];
      if (token) {
        setToken(token);
      }
      const resData = res.data || {};
      const { code, data, msg } = resData;
      if (code === 200 || code === 0) return resData;
      if (code === undefined) return resData; // 上传、下载文件的接口如果访问正常会直接返回文件数据，不会有code值
      handleError(code, msg);
      // return Promise.reject(resData);
      return Promise.resolve(resData);
      // return resData;
    });
  }

  public put<T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<Result<T>> {
    return this.instance.put(url, data, config).then((res) => {
      const token = res?.headers && res?.headers[TOKEN];
      if (token) {
        setToken(token);
      }
      const resData = res.data || {};
      const { code, data, msg } = resData;
      if (code === 200 || code === 0) return resData;
      if (code === undefined) return resData; // 上传、下载文件的接口如果访问正常会直接返回文件数据，不会有code值
      handleError(code, msg);
      // return Promise.reject(resData);
      return Promise.resolve(resData);
      // return resData;
    });
  }

  public delete<T = any>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<Result<T>> {
    return this.instance.delete(url, config);
  }
}

// 默认导出Request实例
export default new Request({});
