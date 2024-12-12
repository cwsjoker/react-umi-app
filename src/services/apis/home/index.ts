import { createApi } from '@/services/request'
import { HomeApi }  from './types'

export default {
    user: {
        get: () => createApi({
            url: '/api/user',
            method: 'get'
        }),
        create: (data: HomeApi.userCreateRequest) => createApi({
            url: '/api/users/create',
            method: 'post',
            data: data
        }),
        put: (data: HomeApi.userCreateRequest) => createApi({
            url: '/api/users',
            method: 'put',
            data: data
        }),
        delete: (data: {id: number}) => createApi({
            url: `/api/users/${data.id}`,
            method: 'delete',
            data: data
        }),
    }
}