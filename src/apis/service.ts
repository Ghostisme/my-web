import axios, { type AxiosInstance, type AxiosRequestConfig } from 'axios';
// import { useUserStoreHook } from "@/store/modules/user"
import { notification } from 'antd';
import { get } from 'lodash-es';
import { getToken } from '@/utils/cache/cookies';
import { successRequest } from '@/utils/http/successRequest';
import { errorCode } from '@/utils/http/errorRequest';

/** 创建请求实例 */
function createService() {
  // 创建一个 Axios 实例
  const service = axios.create();
  // 请求拦截
  service.interceptors.request.use(
    (config) => config,
    // 发送失败
    (error) => Promise.reject(error)
  );
  // 响应拦截（可根据具体业务作出相应的调整）
  service.interceptors.response.use(
    (response) => {
      // apiData 是 API 返回的数据
      const apiData = response.data as any;
      // 这个 Code 是和后端约定的业务 Code
      const code = apiData.code;
      if (response.status === 200) {
        if (response.headers['content-type'] === 'application/zip') {
          // 下载文件
        }
        return successRequest(code, apiData);
      } else {
        notification.error(
          Object.assign({}, errorCode(code, apiData), { closeIcon: false })
        );
      }
    },
    (error) => {
      // Status 是 HTTP 状态码
      const status = get(error, 'response.status');
      notification.error(
        Object.assign({}, errorCode(status, error), { closeIcon: false }) ?? ''
      );
      if (error.name === 'AxiosError') {
        return Promise.resolve(null);
      } else {
        return Promise.reject(error);
      }
    }
  );
  return service;
}

/** 创建请求方法 */
function createRequestFunction(service: AxiosInstance) {
  return function <T>(config: AxiosRequestConfig): Promise<T> {
    const configDefault = {
      headers: {
        // 携带 Token
        Authorization: 'token ' + getToken(),
        token: getToken(),
        'Content-Type': get(config, 'headers.Content-Type', 'application/json'),
      },
      timeout: 5000,
      baseURL: import.meta.env.VITE_BASE_API,
      data: {},
    };
    return service(Object.assign(configDefault, config));
  };
}

/** 用于网络请求的实例 */
export const service = createService();
/** 用于网络请求的方法 */
export const request = createRequestFunction(service);
interface Config extends AxiosRequestConfig<any> {
  isResponseType?: boolean;
}
const createFileFunction = (obj: Config) => {
  return axios({
    ...obj,
    responseType: obj.isResponseType ? 'blob' : 'json',
    headers: {
      ...obj.headers,
      token: getToken(),
    },
    timeout: 60 * 60 * 1000,
    // onDownloadProgress: (progressEvent) => {
    //   console.log(progressEvent, "progressEvent")
    // }
  });
};
export const fileRequest = createFileFunction;
