import { InjectionKey } from 'vue'
import { createStore, Store, useStore as baseUseStore } from 'vuex'
import { AccountModule } from '@/store/modules/AccountModule'
import { VideoModule, VideoItem } from '@/store/modules/VideoModule'
import * as MutaitonTypes from './mutationTypes'
import * as ActionTypes from './actionTypes'
import * as GetterTypes from './getterTypes'
import { AccountStoreReq } from '@/storeReqRes/Account'
import { VideoImtesStoreReq } from '@/storeReqRes/Video'

//stateの型定義
export type State = {
    account: AccountModule,
    video: VideoModule
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
        },
        video: {
            items: new Array<VideoItem>()
        }
    },
    getters:{
        //アカウントのアイコンsrc
        accounticon: state => {
            return state.account.icon
        },
        //動画情報のリスト
        [GetterTypes.Video.VIDEO_ITEM_LIST](state){
            return state.video.items
        }
    },
    mutations:{
        //アカウント情報の初期化
        [MutaitonTypes.AccountModule.INIT_ACCOUNT](state, module: AccountModule){
            state.account = module
        },
        //動画情報の更新
        [MutaitonTypes.VideoModule.UPDATE_VIDEO_ITEMS](state, items: Array<VideoItem>){
            //現在の動画のリストを削除
            state.video.items.splice(0, state.video.items.length)

            //新しい動画のリストを追加
            items.forEach(x => {
                state.video.items.push(x)
            })
        }
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

            if(module.icon == null || module.icon == ''){
                module.icon = 'assets/icon_default.png'
            }
            commit(MutaitonTypes.AccountModule.INIT_ACCOUNT, module)
        },
        //動画情報の登録
        async [ActionTypes.Video.UPDATE_VIDEO_ITEMS]({ commit }, items: Array<VideoImtesStoreReq>){
            if(items == null) { return }
            const moduleImtes = new Array<VideoItem>()
            items.forEach(x => {
                moduleImtes.push({
                    id: x.id,
                    title: x.title,
                    link: x.link,
                    channelTitle: x.channelTitle,
                    thumbnailLink: x.thumbnailLink,
                    description: x.description,
                    viewCount: x.viewCount,
                    platFormKinds: x.platFormKinds,
                    publishDateTime: new Date(Date.parse(x.publishDateTime)),
                    registDateTime: new Date(Date.parse(x.registDateTime))
                } as VideoItem)
            })

            commit(MutaitonTypes.VideoModule.UPDATE_VIDEO_ITEMS, items)
        }
    },
});

//useStoreを使う時にキーの指定を省略するためのラッパー関数
export const useStore = () =>{
    return baseUseStore(key)
}