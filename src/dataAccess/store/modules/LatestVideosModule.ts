import { SearchVideoTranslationKinds, VideoGenreKinds, VideoLanguageKinds } from "@/core/enum";
import { VideoSummary } from "@/dataAccess/entities/VideoSummary";
import { ModuleTree } from "vuex";
import * as MutationTypes  from '@/dataAccess/store/mutationTypes'
import * as ActionTypes from '@/dataAccess/store/actionTypes'
import { SearchDetailUpdateReq } from "@/core/serviceReqRes/SearchDetail";

//動画概要情報Model
export type State = {
    //動画リスト
    list:VideoSummary[],
    //検索条件
    search:{
        //検索テキスト
        text: string,
        //ジャンル
        genre: VideoGenreKinds,
        //詳細検索の有無
        isActiveDetail: boolean,
        //詳細検索
        detail:{
            //話している言語
            langs:VideoLanguageKinds[],
            //翻訳の有無
            translation: SearchVideoTranslationKinds,
            //翻訳している言語
            translationLangs:VideoLanguageKinds[],
        }
    }
}
export const latestVideoModule = {
    namespace: true,
    state: {
        //動画リスト
        list: [] as VideoSummary[],
        //検索条件
        search:{
            //検索テキスト
            text: '',
            //ジャンル
            genre: VideoGenreKinds.All,
            //詳細検索の有無
            isActiveDetail: false,
            //詳細検索
            detail:{
                //話している言語
                langs: [VideoLanguageKinds.UnKnown] as VideoLanguageKinds[],
                //翻訳の有無
                translation: SearchVideoTranslationKinds.All,
                //翻訳している言語
                translationLangs:[VideoLanguageKinds.UnKnown] as VideoLanguageKinds[],
            }
        }
    },
    mutations:{
        //動画リストの更新
        [MutationTypes.LatestVideoModule.UPDATE_VIDEO_ITEMS](state, items: Array<VideoSummary>){
            //現在の動画のリストを削除
            state.list.splice(0, state.list.length)

            //新しい動画のリストを追加
            items.forEach(x => {
                state.list.push(x)
            })
        },
        //検索テキストの更新
        [MutationTypes.LatestVideoModule.UPDATE_SEARCH_TEXT](state, val: string){
            state.search.text = val
        },
        //詳細検索の有無を更新
        [MutationTypes.LatestVideoModule.UPDATE_DETAIL_AVAILABLE](state, val:boolean){
            state.search.isActiveDetail = val
        },
        //ジャンルの更新
        [MutationTypes.LatestVideoModule.UPDATE_GENRE](state, val:VideoGenreKinds){
            state.search.genre = val
        },
        //話している言語の更新
        [MutationTypes.LatestVideoModule.UPDATE_DETAIL_LANG](state: State, items: VideoLanguageKinds[]){
            state.search.detail.langs.splice(0, state.search.detail.langs.length)
            items.forEach(x => {
                state.search.detail.langs.push(x)
            })
        },
        //翻訳の有無を更新
        [MutationTypes.LatestVideoModule.UPDATE_DETAIL_TLANSLATION](state, val: SearchVideoTranslationKinds){
            state.search.detail.translation = val
        },
        //翻訳している言語の更新
        [MutationTypes.LatestVideoModule.UPDATE_DETAIL_TRASLAIONLANG](state:State, items: VideoLanguageKinds[]){
            state.search.detail.translationLangs.splice(0, state.search.detail.langs.length)
            items.forEach(x => {
                state.search.detail.translationLangs.push(x)
            })
       },
    },
    actions:{
        //動画情報の登録
        async [ActionTypes.LatestVideoModule.UPDATE_VIDEO_ITEMS]({ commit }, items: Array<VideoSummary>){
            if(items == null) { return }
            commit(MutationTypes.LatestVideoModule.UPDATE_VIDEO_ITEMS, items)
        },
        //検索テキストの更新
        [ActionTypes.LatestVideoModule.UPDATE_SEARCH_TEXT]({ commit }, val: string){
            commit(MutationTypes.LatestVideoModule.UPDATE_SEARCH_TEXT, val)
        },
        //詳細検索の有効有無を更新
        [ActionTypes.LatestVideoModule.UPDATE_DETAIL_AVAILABLE]({ commit }, val: boolean){
            commit(MutationTypes.LatestVideoModule.UPDATE_DETAIL_AVAILABLE, val)
        },
        //ジャンルの更新
        [ActionTypes.LatestVideoModule.UPDATE_GENRE]({ commit }, val: VideoGenreKinds){
            commit(MutationTypes.LatestVideoModule.UPDATE_GENRE, val)
        },
        //詳細検索の更新
        [ActionTypes.LatestVideoModule.UPDATE_DETAIL]({ commit }, req: SearchDetailUpdateReq){
            commit(MutationTypes.LatestVideoModule.UPDATE_DETAIL_LANG, req.langs)
            commit(MutationTypes.LatestVideoModule.UPDATE_DETAIL_TLANSLATION, req.translation)
            commit(MutationTypes.LatestVideoModule.UPDATE_DETAIL_TRASLAIONLANG, req.translationLangs)
        }
    }
} as ModuleTree<State>