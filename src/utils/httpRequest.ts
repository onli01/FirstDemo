import { notification } from 'antd';
import { history } from 'umi';
import { extend } from 'umi-request';

/**异常处理 */
const codeMessage = {
  200: '服务器成功返回请求数据',
  201: '新建或修改数据成功',
  202: '一个请求已经进入后台排队（异步任务）',
  204: '删除数据成功',
  400: '发出的请求有错误，服务没有进行操作',
  401: '用户没有权限（令牌、用户名、密码错误）',
  403: '用户得到授权，但服务器禁止访问',
  404: '发出的请求不存在记录',
  406: '请求格式不对',
  410: '请求的资源被永久删除',
  422: '当创建一个对象时，发生一个验证错误',
  500: '服务器错误',
  502: '网关错误',
  503: '服务不可用，过载或维护',
  504: '网关超时',
};

const errorHandler = (error: any) => {
  const { response } = error;
  if (response && response.status) {
    const errorText = codeMessage[response.status] || response.statusText;
    const { status, url } = response;
    notification.error({
      message: `请求错误${status}:${url}`,
      description: errorText,
    });
  } else if (!response) {
    notification.error({
      description: '网络异常，无法连接服务器',
      message: '网络异常',
    });
  }
  return response;
};

/**对extend实例进行封装 */
export const httpRequest = extend({
  // prefix: '', //统一的请求前缀
  timeout: 3000, //超时时间
  headers: {
    //header中增加token等信息
    'Content-Type': 'application/json',
    Authorization: localStorage.getItem('token') || '',
  },
  //处理请求错误，调用上面的错误处理逻辑
  errorHandler: errorHandler,
});

/**对实例request进行请求拦截
 * 可以在里面对url，option中的参数进行处理
 */
httpRequest.interceptors.request.use((url, options) => {
  return {
    options: {
      ...options,
      interceptors: true,
    },
  };
});

/**对实例request进行相应拦截，统一处理接口错误信息 */
httpRequest.interceptors.response.use(async (response) => {
  if (response.status !== 200) {
    switch (response.status) {
      case 401:
        notification.warn({
          message: '登录超时，请重新登录！',
        });
        history.push('/user/login');
        break;
    }
  }
  return response;
});
