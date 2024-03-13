import useUserHook from '@/hooks/useUser';

export const errorCode = (status: number, error: any) => {
  switch (status) {
    case 400:
      error.message = '请求错误';
      break;
    case 401:
      // Token 过期时，直接退出登录并强制刷新页面（会重定向到登录页）
      useUserHook().logout();
      location.reload();
      break;
    case 403:
      error.message = '拒绝访问';
      break;
    case 404:
      error.message = '请求地址出错';
      break;
    case 408:
      error.message = '请求超时';
      break;
    case 500:
      error.message = '服务器内部错误';
      break;
    case 501:
      error.message = '服务未实现';
      break;
    case 502:
      error.message = '网关错误';
      break;
    case 503:
      error.message = '服务不可用';
      break;
    case 504:
      error.message = '网关超时';
      break;
    case 505:
      error.message = 'HTTP 版本不受支持';
      break;
    default:
      error.message = error.msg;
      // if (error.config.url.includes('det')) {
      //   error.message = '阈值查询超时';
      // }
      // if (error.config.url.includes('lvef')) {
      //   error.message = '概率查询超时';
      // }
      // if (error.config.url.includes('template')) {
      //   error.message = '模板查询超时';
      // }
      // if (error.config.url.includes('grading/standard')) {
      //   error.message = '评级标准查询超时';
      // }
      break;
  }
  return error;
};
