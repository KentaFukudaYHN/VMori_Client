import { SearchVideoGenreKinds, SearchVideoGenreKindsToString, SearchVideoTranslationKinds, VideoGenreKindsToString, VideoLanguageKinds } from "@/commons/enum"
import { genreItem } from "@/componentReqRes/serarchGenre"
import { SearchCriteriaVideoModule } from "@/store/actionTypes";
import { useStore, State } from "@/store/store";
import { Store } from "vuex";


//動画検索サービス
export class SearchVideoService{
    private _store: Store<State>
    private TOP_VAL = 9999;

    //検索条件の取得
    getSearchCreteriaVideoModule(){
        return this._store.state.searchCriteriaVideo
    }

    //ジャンルの取得
    getGenre(){
        return this._store.state.searchCriteriaVideo.genle
    }

    //検索の詳細を取得
    getDetail(){
        return this._store.state.searchCriteriaVideo.detail
    }

    //話している言語の取得
    getLangs(){
        return this._store.state.searchCriteriaVideo.detail.langs
    }

    getTranlation(){
        return this._store.state.searchCriteriaVideo.detail.translation
    }

    //翻訳している言葉の言語
    getTranslationLangs(){
        return this._store.state.searchCriteriaVideo.detail.translationLangs
    }

    //ジャンルの更新
    updateGenre(kinds: SearchVideoGenreKinds){
        this._store.dispatch(SearchCriteriaVideoModule.UPDATE_GENRE, kinds)
    }

    //話している言語の更新
    updateLang(kinds: VideoLanguageKinds){
        this._store.dispatch(SearchCriteriaVideoModule.UPDATE_DETAIL_LANG, kinds)
    }

    //翻訳の有無を更新
    updateTranslation(val: SearchVideoTranslationKinds){
        this._store.dispatch(SearchCriteriaVideoModule.UPDATE_DETAIL_TRANSLATION, val)
    }

    //翻訳している言語の更新
    updateTranslationLang(val: SearchVideoTranslationKinds){
        this._store.dispatch(SearchCriteriaVideoModule.UPDATE_DETAIL_TRANSLATIONLANG, val)
    }

    //コンストラクタ
    constructor(store: Store<State>){
        this._store = store
    }
}