import { createApi } from '@/services/request'
import { HomeApi }  from './types'

export default {
    test: {
        get: createApi<HomeApi.testGetResponse>({
            url: '/api/users',
            method: 'get'
        })
    }
}