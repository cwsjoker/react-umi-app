import { createApi } from '@/services/request'
import { ConfigApi } from './types'

export default {
    config: {
        get: () => createApi<ConfigApi.configResponse>({
            url: '/api/config',
            method: 'get'
        }),
    }
}