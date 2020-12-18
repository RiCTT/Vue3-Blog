import { http } from '/@/utils/index'

export const getList = (params) => http('get', '/mock/blog/list', params, {}, {})

export const getComment = (params) => http('get', '/mock/blog/comment')

export const getBlogDetail = (params) => http('get', '/mock/blog/detail', params)