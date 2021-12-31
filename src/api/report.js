import request from '@/utils/request'

export function getNewestdata(channel, inst_id, inst_type) {
  return request({
    url: '/cc/SwapOpenInterest/newest',
    method: 'post',
    params: {
        channel,
        inst_id,
        inst_type
    }
  })
}

export function getStockdata(channel, inst_id, inst_type) {
  return request({
    url: '/cc/SwapOpenInterest/stock',
    method: 'post',
    params: {
        channel,
        inst_id,
        inst_type
    }
  })
}