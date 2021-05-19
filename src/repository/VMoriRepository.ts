import axios, { AxiosError, AxiosInstance, AxiosRequestConfig } from 'axios'
import { textChangeRangeIsUnchanged } from 'typescript'
import { useRouter } from '@/router/router'
import { Router } from 'vue-router'

const BASE_URL = process.env.API_URL


export default class VMoriRepository{
    private client: AxiosInstance
    private router: Router

    async get<T>(url:string, config?:AxiosRequestConfig) : Promise<T>{
        if(config == null){
            config = {}
        }

        //クロスドメインでset-cookieを有効化するために必要
        config.withCredentials = true

        try{
            const res = await this.client.get(url, config)

            this.CheckErrorRouting(res.status)

            return res.data
        }catch(error){
            console.log(error)
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
        config.headers["Content-Type"] = 'application/json'

        try{
            const res = await this.client.post(url, data, config)
            
            this.CheckErrorRouting(res.status)

            return res.data
        }catch(error){
            console.log(error)
            throw error
        }
    }

    //エラーの内容によってRouting
    CheckErrorRouting(status: number){
        switch(status){
            case 401:
                this.router.push('Login')
                break;
        }
    }

    constructor(router: Router){
        this.router = router;
        this.client = axios.create({
            baseURL: BASE_URL,
            validateStatus: function(status){
                return status < 500 //500系以外は正常としてあつかう
            }
        })
    }
}