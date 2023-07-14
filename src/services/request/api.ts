import { httpRequest } from '@/utils/httpRequest';

export async function sendRequest(params: any) {
  return httpRequest(`/api/request/sendRequest`, {
    method: 'POST',
    data: params,
  });
}
