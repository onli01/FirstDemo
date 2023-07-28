// @ts-ignore
/* eslint-disable */
// import { request } from 'umi';
import { httpRequest } from '@/utils/httpRequest';

/** 注册接口 POST /api/user/register */
export async function register(body: API.RegisterParams, options?: Record<string, any>) {
  return httpRequest<API.DefaultResult>('/api/user/register', {
    method: 'POST',
    data: body,
    ...(options || {}),
  });
}

/** 登录接口 POST /api/login/account */
export async function login(body: API.LoginParams, options?: Record<string, any>) {
  return httpRequest<API.LoginResult>('/api/user/login', {
    method: 'POST',
    data: body,
    ...(options || {}),
  });
}

/** 退出登录接口 POST /api/login/outLogin */
export async function outLogin(options?: Record<string, any>) {
  return httpRequest<Record<string, any>>('/api/user/outLogin', {
    method: 'POST',
    ...(options || {}),
  });
}

/** 退出登录接口 POST /api/login/outLogin */
export async function userList(options?: Record<string, any>) {
  return httpRequest<Record<string, any>>('/api/user/userList', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 获取当前的用户 GET /api/currentUser */
// export async function currentUser(options?: { [key: string]: any }) {
//   return request<{
//     data: API.CurrentUser;
//   }>('/api/currentUser', {
//     method: 'GET',
//     ...(options || {}),
//   });
// }
