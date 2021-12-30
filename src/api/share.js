import request from '@/utils/request'
export function fetchAllCode() {
  return request({
    url:'/share/code',
    method:'get'
  })
}