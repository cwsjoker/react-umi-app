import axios, { AxiosResponse, AxiosInstance, AxiosError, InternalAxiosRequestConfig } from 'axios'

export interface HttpJson<T = any> {
    state: number;
    message: string;
    data: T;
}

const request: AxiosInstance = axios.create({
    baseURL: '',
    timeout: 60000,
    headers: {
        'Content-Type': 'application/json;charset=utf-8',
        'X-Requested-With': 'XMLHttpRequest',
        Accept: 'application/json',
    },
})

request.interceptors.request.use((config: InternalAxiosRequestConfig) => {
    config.headers['pl'] = 'h5';
    config.headers['version'] = 'v1';
    config.headers['Authorization'] = '';
    
    return config
}, (error: AxiosError) => {
    return Promise.reject(error);
})


request.interceptors.response.use((response: AxiosResponse<HttpJson>) => {
    console.log('response', response)
    const { state, message, data } = response.data
    console.log('state', state)
    if (state === 0) {
        return data
    } else {
        if (state === 401) {
            console.log('401')
            return false;
        }

        if (state === 500) {
            console.log('500')
            return false
        }
    }
}, (error: AxiosError) => {
    return Promise.reject(error)
})

export const createApi = request