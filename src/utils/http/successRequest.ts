import { notification } from 'antd';
import useUserHook from '@/hooks/useUser';

export const successRequest = (code: number | undefined, apiData: any) => {
  if (code === undefined) {
    notification.error({
      message: '服务器异常',
      closeIcon: false,
    });
    return Promise.reject(new Error('服务器异常'));
  } else {
    switch (code) {
      case 0:
        // code === 0 代表没有错误
        return apiData.data;
      case 10000004:
      case 10000005:
        notification.error({
          message: apiData.msg || 'Error',
          closeIcon: false,
        });
        setTimeout(() => {
          useUserHook().logout();
        }, 2000);
        return Promise.reject(new Error('Error'));
      default:
        // 不是正确的 Code
        notification.error({
          message: apiData.msg || 'Error',
          closeIcon: false,
        });
        return Promise.reject(new Error('Error'));
    }
  }
};
