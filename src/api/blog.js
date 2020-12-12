import { http } from '/@/utils/index'

export const getList = (params) => http('get', '/mock/blog/list', params, {}, {})

export const getComment = (params) => http('get', '/mock/blog/comment')