import { State, useStore } from "@/store/store";
import { Store } from "vuex";
import VMoriRepository from "@/repository/VMoriRepository";
import { VideoSummaryInfoApiRes}  from '@/apiReqRes/Video'
import { Video } from '@/store/actionTypes'
import { SearchVideoGenreKinds, SearchVideoTranslationKinds, VideoGenreKinds, VideoLanguageKinds } from "@/commons/enum";
import { SearchCriteriaVideoModule } from "@/store/actionTypes";
import { useRouter } from "@/router/router";

export class VideoService {
    private _store: Store<State>
    private _repository: VMoriRepository

    private TOP_VAL = 9999
    private DISPLAYNUM = 30

    //検索テキストを取得
    getSearchText(){
        return this._store.state.searchCriteriaVideo.text
    }

    //検索条件の取得
    getSearchCreteriaVideoModule(){
        return this._store.state.searchCriteriaVideo
    }

    //ジャンルの取得
    getGenre(){
        return this._store.state.searchCriteriaVideo.genle
    }

    //詳細検索の有効有無を取得

    getDetailAvailavle(){
        return this._store.state.searchCriteriaVideo.isActiveDetail
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

    //動画リストの取得
    getVideoItems(){
        return this._store.state.video.items
    }

    //検索テキストの更新
    async updateSearchText(val: string){
        await this._store.dispatch(SearchCriteriaVideoModule.UPDATE_SEARCH_TEXT, val)
    }

    //詳細検索の有効有無を更新
    async updateDetailAbailavle(val: boolean){
        await this._store.dispatch(SearchCriteriaVideoModule.UPDATE_DETAIL_AVAILABLE, val)
    }

    //ジャンルの更新
    async updateGenre(kinds: SearchVideoGenreKinds){
        await this._store.dispatch(SearchCriteriaVideoModule.UPDATE_GENRE, kinds)
        await this.changeGenreVideoItem()
        await this.updateSearchText('')
        await this.updateDetailAbailavle(false)
    }

    //話している言語の更新
    async updateLang(kinds: VideoLanguageKinds){
        await this._store.dispatch(SearchCriteriaVideoModule.UPDATE_DETAIL_LANG, kinds)
    }

    //翻訳の有無を更新
    async updateTranslation(val: SearchVideoTranslationKinds){
        if(this._store.state.searchCriteriaVideo.detail.translation == SearchVideoTranslationKinds.All && val == SearchVideoTranslationKinds.All){
            val = SearchVideoTranslationKinds.Yes
        }
        await this._store.dispatch(SearchCriteriaVideoModule.UPDATE_DETAIL_TRANSLATION, val)
    }

    //翻訳している言語の更新
    async updateTranslationLang(val: VideoLanguageKinds){
        await this._store.dispatch(SearchCriteriaVideoModule.UPDATE_DETAIL_TRANSLATIONLANG, val)
    }
    
    //テキスト検索
    async searchTextVideoItem(){
        let text = this._store.state.searchCriteriaVideo.text
        if(text == ''){
            text = null
        }
        
        var res = await this._repository.post<VideoSummaryInfoApiRes>('video/getsearchlist',{
            Page: 1,
            DisplayNum: this.DISPLAYNUM,
            Text: text
        })

        await this._store.dispatch(SearchCriteriaVideoModule.UPDATE_GENRE, SearchVideoGenreKinds.TOP)
        await this.changeGenreVideoItem()
        await this.updateDetailAbailavle(false)
        await this._store.dispatch(Video.UPDATE_VIDEO_ITEMS, res.data.items)

    }

    //ジャンル選択
    async changeGenreVideoItem(){
        let genre = this._store.state.searchCriteriaVideo.genle
        if(genre == SearchVideoGenreKinds.TOP){
            genre = null
        }

        const res = await this._repository.post<VideoSummaryInfoApiRes>('video/getsearchlist',{
            Page:1,
            DisplayNum: this.DISPLAYNUM,
            genre:genre
        })

        await this._store.dispatch(Video.UPDATE_VIDEO_ITEMS, res.data.items)
    }

    //詳細検索実行
    async searchDetailVideoItem(){

        let text = await this.getSearchText()

        if(text == ''){
            text = null
        }

        let genre = this._store.state.searchCriteriaVideo.genle
        if(genre == SearchVideoGenreKinds.TOP){
            genre = null
        }

        let langs = null
        if(this._store.state.searchCriteriaVideo.detail.langs.indexOf(VideoLanguageKinds.UnKnown) == -1){
            langs = this._store.state.searchCriteriaVideo.detail.langs
        }

        let isTranslation = null
        if(this._store.state.searchCriteriaVideo.detail.translation != SearchVideoTranslationKinds.All){
            isTranslation = this._store.state.searchCriteriaVideo.detail.translation == SearchVideoTranslationKinds.Yes
        }

        let translationLangs = null;
        if(isTranslation == true && this._store.state.searchCriteriaVideo.detail.translationLangs.indexOf(VideoLanguageKinds.UnKnown) == -1){
            translationLangs = this._store.state.searchCriteriaVideo.detail.translationLangs
        }

        const data = {
            Page: 1,
            DisplayNum: this.DISPLAYNUM,
            Text: text,
            Genre: genre,
            Langs: langs,
            IsTranslation: isTranslation,
            TransrationLangs: translationLangs
        }

        const res = await this._repository.post<VideoSummaryInfoApiRes>('video/getsearchlist',data)

        await this._store.dispatch(Video.UPDATE_VIDEO_ITEMS, res.data.items)
    }

    //動画リストの初期化
    async initVideoItems(){
        const res = await this._repository.get<VideoSummaryInfoApiRes>('video/getlist', {
            params:{
                page: 1,
                displayNum: this.DISPLAYNUM
            }
        })

        await this._store.dispatch(Video.UPDATE_VIDEO_ITEMS, res.data.items)
    }

    //コンストラクタ
    constructor(){
        this._store = useStore()
        this._repository = new VMoriRepository(useRouter())
    }
}