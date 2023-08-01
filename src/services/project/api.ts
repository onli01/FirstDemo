import { httpRequest } from '@/utils/httpRequest';

export async function addProject(params: any) {
  return httpRequest(`/api/project/addProject`, {
    method: 'POST',
    data: params,
  });
}

export async function getProject(params: { name: any }) {
  return httpRequest(`/api/project/getProjectByName`, {
    method: 'GET',
    params: params,
  });
}

export async function getProjectAll(options?: Record<string, any>) {
  return httpRequest(`/api/project/getProjectAll`, {
    method: 'GET',
    ...(options || {}),
  });
}
