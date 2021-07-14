import { ModuleTree } from "vuex"
import * as MutationTypes  from '@/dataAccess/store/mutationTypes'
import * as ActionTypes from '@/dataAccess/store/actionTypes'

//動画モジュール
export type State = {
    //Youtubeの動画プレイヤーをローディング済みか
    isLoadedYoutubePlayer : boolean,
    //フルスクリーンモードかどうか
    isFullScreenMode: boolean,
    //選択中の動画ID
    selectedVideoId: string
}

//選択中の動画情報
export const videoModule = {
    namespace: true,
    state: {
        //Youtubeの動画プレイヤーをローディング済みか
        isLoadedYoutubePlayer : false,
        //フルスクリーンモードかどうか
        isFullScreenMode: false,
        //選択中の動画ID
        selectedVideoId: ''
    },
    mutations:{
        //選択中動画IDの更新
        [MutationTypes.VideoModule.UPDATE_SELECTED_VIDEOID](state:State, videoId: string){
            state.selectedVideoId = videoId
        },
        //Youtube動画プレイヤースクリプトの読み込み状態を更新
        [MutationTypes.VideoModule.UPDATE_YOUTUBEPLAYER_ISLOADED](state:State, isloaded: boolean){
            state.isLoadedYoutubePlayer = isloaded
        },
        //フルスクリーンモードか更新
        [MutationTypes.VideoModule.UPDATE_FULLSCREENMODE](state:State, isFllScreenMode: boolean){
            state.isFullScreenMode = isFllScreenMode
        },
    },
    actions:{
        //選択中動画IDの更新
        async [ActionTypes.VideoModule.UPDATE_SELECTED_VIDEOID]({ commit }, videoId: string){
            commit(MutationTypes.VideoModule.UPDATE_SELECTED_VIDEOID, videoId)
        },
        //Youtube動画プレイヤーの読み込み状態更新
        async [ActionTypes.VideoModule.UPDATE_YOUTUBEPLAYER_ISLOADED]({ commit }, isLoaded: boolean){
            commit(MutationTypes.VideoModule.UPDATE_YOUTUBEPLAYER_ISLOADED, isLoaded)
        },
        //フルスクリーンもづかどうか更新
        async [ActionTypes.VideoModule.UPDATE_FULLSCREENMODE]({ commit }, isFullScreenMode: boolean){
            commit(MutationTypes.VideoModule.UPDATE_FULLSCREENMODE, isFullScreenMode)
        },
    }
} as ModuleTree<State>

