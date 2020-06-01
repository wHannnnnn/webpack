import {request} from './request.js'
const api = {
    banner: 'wanghan/' + 'banner/list',
}
const http = {
    banner: params => request.http('get', api.banner, params)
}
export {http}