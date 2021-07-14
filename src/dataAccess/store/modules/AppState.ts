import { ModuleTree } from "vuex"
import * as MutationTypes  from '@/dataAccess/store/mutationTypes'
import * as ActionTypes from '@/dataAccess/store/actionTypes'

//動画モジュール
export type State = {
    //ローディング中かどうか
    isLoading: boolean
}
//選択中の動画情報
export const appStateModule = {
    namespace: true,
    state: {
        //ローディング中かどうか
        isLoading: false
    },
    mutations:{
        //ローディング中かどうか更新
        [MutationTypes.AppStateModule.UPDATE_LOADING](state: State, isloading: boolean){
            state.isLoading = isloading
        },
    },
    actions:{
        //ローディング中かどうか更新
        async [ActionTypes.AppStateModule.UPDATE_LOADING]({ commit }, isloading: boolean){
            commit(MutationTypes.AppStateModule.UPDATE_LOADING, isloading)
        },
    }
} as ModuleTree<State>

