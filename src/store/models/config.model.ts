import { defineModel } from 'foca';
import configApi from '@/services/apis/config'


const configModel = defineModel('config', {
    initialState: {
        config: <any>{}
    },
    reducers: {

    },
    methods: {
        async getConfig() {
            await configApi.config.get().then(res => {
                console.log('resconfig', res)
                this.setState((state) => {
                    state.config = res
                })
            })
        }
    }
})

export default configModel