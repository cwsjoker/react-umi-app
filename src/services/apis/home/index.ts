import { createApi } from '@/services/request'
import { HomeApi }  from './types'

export default {
    test: {
        get: createApi<null, HomeApi.testGetResponse>({
            url: '',
            method: 'get'
        })
    }
}