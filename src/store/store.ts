import { computed, InjectionKey } from 'vue'
import { createStore, Store, useStore as baseUseStore } from 'vuex'
import { AccountModule } from '@/store/modules/AccountModule'
import { VideoModule, VideoItem } from '@/store/modules/VideoModule'
import * as MutaitonTypes from './mutationTypes'
import * as ActionTypes from './actionTypes'
import * as GetterTypes from './getterTypes'
import { AccountStoreReq } from '@/storeReqRes/Account'
import { VideoImtesStoreReq } from '@/storeReqRes/Video'
import { SearchCriteriaVideoModule } from './modules/SearchCriteriaVideoModule'
import { SearchVideoGenreKinds, SearchVideoTranslationKinds, VideoLanguageKinds } from '@/commons/enum'

//stateの型定義
export type State = {
    account: AccountModule,
    video: VideoModule,
    searchCriteriaVideo: SearchCriteriaVideoModule
}

//storeをprovide/injectするためのキー
export const key: InjectionKey<Store<State>> = Symbol()

//Store本体
export const store = createStore<State>({
    state:{
        //アカウント情報
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
        //動画情報
        video: {
            items: new Array<VideoItem>()
        },
        //検索条件
        searchCriteriaVideo: {
            text: '',
            genle: SearchVideoGenreKinds.TOP,
            isActiveDetail: false,
            detail: {
                langs: [VideoLanguageKinds.UnKnown] as VideoLanguageKinds[],
                translation: SearchVideoTranslationKinds.All,
                translationLangs:[VideoLanguageKinds.UnKnown] as VideoLanguageKinds[],
            }
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
        },
        /** 動画検索情報の更新 */
        //検索テキストの検索
        [MutaitonTypes.SearchCriteriaVideoModule.UPDATE_SEARCH_TEXT](state, val: string){
            state.searchCriteriaVideo.text = val
        },
        //詳細検索の有効有無を更新
        [MutaitonTypes.SearchCriteriaVideoModule.UPDATE_DETAIL_AVAILABLE](state, val:boolean){
            state.searchCriteriaVideo.isActiveDetail = val
        },
        //ジャンルの更新
        [MutaitonTypes.SearchCriteriaVideoModule.UPDATE_GENRE](state, val:SearchVideoGenreKinds){
            state.searchCriteriaVideo.genle = val
        },
        //話している言語の更新
        [MutaitonTypes.SearchCriteriaVideoModule.UPDATE_DETAIL_LANG](state, item: VideoLanguageKinds){
            const targetIndex = state.searchCriteriaVideo.detail.langs.indexOf(item)
            if(targetIndex < 0){
                state.searchCriteriaVideo.detail.langs.push(item)
            }else{
                state.searchCriteriaVideo.detail.langs.splice(targetIndex, 1)
            }
        },
        //翻訳の有無を更新
        [MutaitonTypes.SearchCriteriaVideoModule.UPDATE_DETAIL_TLAMSLATION](state, val: SearchVideoTranslationKinds){
            state.searchCriteriaVideo.detail.translation = val
        },
        //翻訳している言語の更新
        [MutaitonTypes.SearchCriteriaVideoModule.UPDATE_DETAIL_TRASLAIONLANG](state, item: VideoLanguageKinds){
             const targetIndex = state.searchCriteriaVideo.detail.translationLangs.indexOf(item)
            if(targetIndex < 0){
                state.searchCriteriaVideo.detail.translationLangs.push(item)
            }else{
                state.searchCriteriaVideo.detail.translationLangs.splice(targetIndex, 1)
            }
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
        },
        /** 動画検索情報 */
        //検索テキストの更新
        [ActionTypes.SearchCriteriaVideoModule.UPDATE_SEARCH_TEXT]({ commit }, val: string){
            commit(MutaitonTypes.SearchCriteriaVideoModule.UPDATE_SEARCH_TEXT, val)
        },
        //詳細検索の有効有無を更新
        [ActionTypes.SearchCriteriaVideoModule.UPDATE_DETAIL_AVAILABLE]({ commit }, val: boolean){
            commit(MutaitonTypes.SearchCriteriaVideoModule.UPDATE_DETAIL_AVAILABLE, val)
        },
        //ジャンルの更新
        [ActionTypes.SearchCriteriaVideoModule.UPDATE_GENRE]({ commit }, val: SearchVideoGenreKinds){
            commit(MutaitonTypes.SearchCriteriaVideoModule.UPDATE_GENRE, val)
        },
        //話している言語の更新
        [ActionTypes.SearchCriteriaVideoModule.UPDATE_DETAIL_LANG]({ commit }, item: VideoLanguageKinds){
            commit(MutaitonTypes.SearchCriteriaVideoModule.UPDATE_DETAIL_LANG, item)
        },
        //翻訳の有無更新
        [ActionTypes.SearchCriteriaVideoModule.UPDATE_DETAIL_TRANSLATION]({ commit }, val: SearchVideoTranslationKinds){
            commit(MutaitonTypes.SearchCriteriaVideoModule.UPDATE_DETAIL_TLAMSLATION, val)
        },
        //翻訳している言葉の更新
        [ActionTypes.SearchCriteriaVideoModule.UPDATE_DETAIL_TRANSLATIONLANG]({ commit }, val: VideoLanguageKinds){
            commit(MutaitonTypes.SearchCriteriaVideoModule.UPDATE_DETAIL_TRASLAIONLANG, val)
        }
    },
});

//useStoreを使う時にキーの指定を省略するためのラッパー関数
export const useStore = () =>{
    return baseUseStore(key)
}