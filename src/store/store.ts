import { InjectionKey } from 'vue'
import { createStore, Store, useStore as baseUseStore } from 'vuex'
import { RecommendVideoHeader, RecommendVideo } from '../entities/RecommendVideoEntities'
import { RecommendVideoHeaderRes, RecoomendVideoRes } from '../reqRes/RecommendVideoReqRes'
import * as MutaitonTypes from './mutationTypes'
import * as ActionTypes from './actionTypes'
import repository from '../repository/VTimesRepository'

//stateの型定義
type State = {
    recommendVideoHeader: RecommendVideoHeader
}

//storeをprovide/injectするためのキー
export const key: InjectionKey<Store<State>> = Symbol()

//Store本体
export const store = createStore<State>({
    state:{
        recommendVideoHeader:{
            videos:[{
                id: '',
                title: ''
            }]
        }
    },
    mutations:{
        [MutaitonTypes.INIT_RECOMMEND_VIDEO_HEADER](state, header: RecommendVideoHeaderRes){
            state.recommendVideoHeader.videos.splice(0, state.recommendVideoHeader.videos.length)
            for(let i = 0; i< header.videos.length; i++){
                state.recommendVideoHeader.videos.push(header.videos[i])
            }
        },
    },
    actions:{
        async [ActionTypes.INITIALIZE_RECOMMEND_VIDEOS]({ commit }){
            const VideoHeader = await new repository().get<RecommendVideoHeaderRes>('RecommendVideos')
            console.log(VideoHeader)
            commit(MutaitonTypes.INIT_RECOMMEND_VIDEO_HEADER, VideoHeader)
        }
    }
});

//useStoreを使う時にキーの指定を省略するためのラッパー関数
export const useStore = () =>{
    return baseUseStore(key)
}