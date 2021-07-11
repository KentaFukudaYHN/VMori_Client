import { ModuleTree } from "vuex"
import * as MutationTypes  from '@/dataAccess/store/mutationTypes'
import * as ActionTypes from '@/dataAccess/store/actionTypes'
import { Account } from "@/dataAccess/entities/Account"

//アカウントモジュール
export type State = {
    //ログインの有無
    isLogin: boolean,
    //表示ID
    displayID: string,
    //名前
    name: string,
    //メールアドレス
    mail: string,
    //アイコン
    icon: string,
    //生年月日 年
    birthdayYear: string,
    //生年月日 月
    birthdayMonth: string,
    //生年月日 日
    birthdayDate: string,
    //メールアドレス認証の有無
    appMail: boolean
} 

export const accountModule = {
    state:{
        //ログインの有無
        isLogin: false,
        //表示ID
        displayID: '',
        //名前
        name: '',
        //メールアドレス
        mail: '',
        //アイコン
        icon: '',
        //生年月日 年
        birthdayYear: '',
        //生年月日 月
        birthdayMonth: '',
        //生年月日 日
        birthdayDate: '',
        //メールアドレス認証の有無
        appMail: false
    },
    mutations:{
        //アカウント情報の初期化
        [MutationTypes.AccountModule.INIT_ACCOUNT](state:State, account: Account){
            state.isLogin = account.isLogin
            state.displayID = account.displayID
            state.name = account.name
            state.mail = account.mail
            state.icon = account.icon
            state.birthdayYear = account.birthdayYear
            state.birthdayMonth = account.birthdayMonth
            state.birthdayDate = account.birthdayDate
            state.appMail = account.appMail
        },
    },
    actions:{
        //アカウント情報の登録
        async [ActionTypes.AccountModule.INITIALIZE_ACCOUNT]({ commit }, req: Account){
            commit(MutationTypes.AccountModule.INIT_ACCOUNT, req)
        },
    }
} as ModuleTree<State>
