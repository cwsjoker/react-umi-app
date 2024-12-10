import axios, { AxiosResponse, AxiosRequestConfig } from 'axios'

export interface HttpJson<T = any> {
    retCode: string;
    retMsg: string;
    data: T;
}
// export type RequestType<T extends RequestConfig> = Omit<RequestConfig, keyof T> & T;

// export type RequestGetType<T = Record<string, any>> = RequestType<{
//     params: T;
//   }>;
export type RequestConfig = AxiosRequestConfig

// type AxiosHttpJsonResponse<T = any> = AxiosResponse<HttpJson<T>>

const request = axios<RequestConfig,  () => Promise<AxiosResponse<HttpJson>>>({
    baseURL: '',
    timeout: 60000,
    headers: {
        'Content-Type': 'application/json;charset=utf-8',
        'X-Requested-With': 'XMLHttpRequest',
        Accept: 'application/json',
    },
})

export const createApi = request
