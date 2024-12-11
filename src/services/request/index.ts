import axios, { AxiosResponse, AxiosRequestConfig, AxiosInstance, AxiosError } from 'axios'



export interface HttpJson<T = any> {
    state: number;
    message: string;
    data: T;
}
export type RequestConfig = {

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

request.interceptors.response.use((response: AxiosResponse<HttpJson>) => {
    const { state, message, data } = response.data
    console.log('state', state)
    if (state === 0) {
        console.log(111111)
        return data
    } else {
        return Promise.reject(new Error(message))
    }
}, (error: AxiosError) => {
    return Promise.reject(error)
})


export const createApi = request


// export const http = {

// }