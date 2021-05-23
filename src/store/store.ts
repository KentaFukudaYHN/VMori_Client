import { InjectionKey } from 'vue'
import { createStore, Store, useStore as baseUseStore } from 'vuex'
import { AccountModule } from '@/store/modules/AccountModule'
import * as MutaitonTypes from './mutationTypes'
import * as ActionTypes from './actionTypes'
import { AccountStoreReq } from '@/storeReqRes/Account'

//stateの型定義
type State = {
    account: AccountModule
}

//storeをprovide/injectするためのキー
export const key: InjectionKey<Store<State>> = Symbol()

//Store本体
export const store = createStore<State>({
    state:{
        account: {
            isLogin: false,
            displayID: "",
            name: "",
            mail: "",
            icon: "",
            birthdayYear: "",
            birthdayMonth: "",
            birthdayDate: "",
            appMail: false,
    }
    },
    mutations:{
        [MutaitonTypes.AccountModule.INIT_ACCOUNT](state, module: AccountModule){
            state.account = module;
        },
    },
    actions:{
        //アカウント情報の登録
        async [ActionTypes.Account.INITIALIZE_ACCOUNT]({ commit }, req: AccountStoreReq){
            const module: AccountModule = {
                isLogin: req.isLogin,
                displayID: req.displayID,
                name: req.name,
                icon: req.icon,
                mail: req.mail,
                birthdayYear: req.birthdayYear,
                birthdayMonth: req.birthdayMonth,
                birthdayDate: req.birthdayDate,
                appMail: req.appMail
            }
            commit(MutaitonTypes.AccountModule.INIT_ACCOUNT, module)
        }
    },

});

//useStoreを使う時にキーの指定を省略するためのラッパー関数
export const useStore = () =>{
    return baseUseStore(key)
}