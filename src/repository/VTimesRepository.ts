import axios, { AxiosInstance, AxiosRequestConfig } from 'axios'
import { textChangeRangeIsUnchanged } from 'typescript'

const BASE_URL = "https://vmireba-dev.azurewebsites.net/api/"

export default class VTimesRepository{
    client: AxiosInstance

    async get<T>(url: string, config?:AxiosRequestConfig) : Promise<T>{
        const res = await this.client.get(url, config)
        if(res.status != 200){
            return null
        }

        return res.data
    }

    constructor(){
        this.client = axios.create({
            baseURL: BASE_URL
        })
    }
}