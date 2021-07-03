import { createApp } from 'vue'
import App from '@/App.vue'
import { key, store } from '@/store/store' 
import { router } from '@/router/router'
import { AuthService } from './services/AuthServices'
import VMoriRepository from './repository/VMoriRepository'
import { AccountService } from './services/AccountService'
import { boolean } from 'yup/lib/locale'
const app = createApp(App)

//スクリプト読み込みフラグのグルーバル変数を更新
window['isLoading'] = true

app.use(store, key)
app.use(router)

//1.ログイン中かどうか確認
//2.ログイン中ならアカウント情報取得して保存
var repository =  new VMoriRepository(router)
new AuthService(store, repository).getIsLogginByApi().then((isLogging) => {
    if(isLogging == true){
        new AccountService(store, repository).getAndStoreSaveByApi()
    }
})


app.mount('#app')