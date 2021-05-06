import axios, { AxiosError, AxiosInstance, AxiosRequestConfig } from 'axios'
import { textChangeRangeIsUnchanged } from 'typescript'

const BASE_URL = process.env.API_URL


export default class VMoriRepository{
    private client: AxiosInstance

    async get<T>(url:string, config?:AxiosRequestConfig) : Promise<T>{
        if(config == null){
            config = {}
        }

        //クロスドメインでset-cookieを有効化するために必要
        config.withCredentials = true

        try{
            const res = await this.client.get(url, config)
            return res.data
        }catch(error){
            console.log(error.response.status)
            throw error
        }
    }

    async post<T>(url:string, data?:any, config?:AxiosRequestConfig): Promise<T>{
        if(config == null){
            config = { headers: {} }
        }

        //クロスドメインでset-cookieを有効化するために必要
        config.withCredentials = true
        //CSRF対策としてヘッダーに独自の値を設定し、プリフライトリクエスト発生させる
        config.headers["vmori-csrf"] = "vmori-csrf"

        try{
            const res = await this.client.post(url, data, config)
            console.log(res.headers)
            return res.data
        }catch(error){
            console.log(error.response.status)
            throw error
        }
    }

    constructor(){
        this.client = axios.create({
            baseURL: BASE_URL
        })
    }
}