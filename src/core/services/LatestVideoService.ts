import { State } from "@/dataAccess/store/store"
import { Store } from "vuex"
import VMoriRepository from '@/dataAccess/repository/VMoriRepository'
import { VideoSummaryInfoApiRes } from "../apiReqRes/Video"
import { LatestVideoModule } from "@/dataAccess/store/actionTypes"
import { SearchVideoGenreKinds, SearchVideoTranslationKinds, VideoGenreKinds, VideoLanguageKinds } from "../enum"
import { SearchDetail } from "@/front/componentReqRes/searchDetail"
import { SearchDetailUpdateReq } from "@/dataAccess/storeReqRes/SearchDetail"

export class LatestVideoService  {
    // private _store: Store<State>
    private _repository: VMoriRepository

    private DISPLAY_NUM = 30

    /*最新動画情報取得*/
    // getVideoItems(){
    //     return this._store.state.latestVideo.list
    // }

    /*******************
     * 処理系
     *******************/
    //詳細検索実行
    async searchDetailVideoItem(text: string, genre: VideoGenreKinds, searchDetail: SearchDetail){

        //詳細検索の更新
        // const searchDetailUpdateStoreReq = {
        //     langs:  searchDetail.langs,
        //     translation: searchDetail.translation,
        //     translationLangs: searchDetail.translationLangs
        // } as SearchDetailUpdateReq
        // this._store.dispatch(LatestVideoModule.UPDATE_DETAIL, searchDetailUpdateStoreReq)

        // let text = await this.getSearchText()

        if(text == ''){
            text = null
        }

        // let genre = this._store.state.latestVideo.search.genre
        if(genre == VideoGenreKinds.All){
            genre = null
        }

        let langs = null
        //『全て(Unkonown)』が含まれていたら検索条件に含めない
        if(searchDetail.langs.indexOf(VideoLanguageKinds.UnKnown) == -1){
            langs = searchDetail.langs
        }

        let isTranslation = null
        //『全て』が含まれていたら検索条件に含めない
        if(searchDetail.translation != SearchVideoTranslationKinds.All){
            isTranslation = searchDetail.translation == SearchVideoTranslationKinds.Yes
        }

        let translationLangs = null;
        if(isTranslation == true && searchDetail.translationLangs.indexOf(VideoLanguageKinds.UnKnown) == -1){
            translationLangs = searchDetail.translationLangs
        }

        const data = {
            Page: 1,
            DisplayNum: this.DISPLAY_NUM,
            Text: text,
            Genre: genre,
            Langs: langs,
            IsTranslation: isTranslation,
            TransrationLangs: translationLangs
        }

        const res = await this._repository.post<VideoSummaryInfoApiRes>('video/getsearchlist',data)
        if(res.isOk()){
            return res.data
        }else{
            return null
        }
        // await this._store.dispatch(LatestVideoModule.UPDATE_VIDEO_ITEMS, res.data.items)
    }

    //動画リストの初期化
    async initVideoItems(){
        const res = await this._repository.get<VideoSummaryInfoApiRes>('video/getlist', {
            params:{
                page: 1,
                displayNum: this.DISPLAY_NUM
            }
        })

        if(res.isOk()){
            return res.data
        }else{
            return null
        }
        // await this._store.dispatch(LatestVideoModule.UPDATE_VIDEO_ITEMS, res.data.items)
    }
    /*テキスト検索*/
    async searchTextVideoItem(text: string, genre: VideoGenreKinds){
        if(text == ''){
            text = null
        }
        
        var res = await this._repository.post<VideoSummaryInfoApiRes>('video/getsearchlist',{
            Page: 1,
            DisplayNum: this.DISPLAY_NUM,
            Text: text,
            Genre: genre
        })

        if(res.isOk()){
            return res.data
        }else{
            return null
        }

        //テキスト検索の場合は全てのジャンルから検索するので、ジャンルを全てに更新する
        // await this._store.dispatch(LatestVideoModule.UPDATE_GENRE, SearchVideoGenreKinds.All)
        // await this.changeGenreVideoItem(genre)
        // await this.updateDetailAbailavle(false)



        // await this._store.dispatch(LatestVideoModule.UPDATE_VIDEO_ITEMS, res.data.items)
    }

    /*ジャンル選択*/
    async changeGenreVideoItem(genre: VideoGenreKinds){
        // let genre = this._store.state.latestVideo.search.genre
        if(genre == VideoGenreKinds.All){
            genre = null
        }

        const res = await this._repository.post<VideoSummaryInfoApiRes>('video/getsearchlist',{
            Page:1,
            DisplayNum: this.DISPLAY_NUM,
            genre:genre
        })

        if(res.isOk()){
            return res.data
        }else{
            return null
        }

        // await this._store.dispatch(LatestVideoModule.UPDATE_VIDEO_ITEMS, res.data.items)
    }

    //表示用の統計情報を生成
    createDisplayStatistics(viewCount: number, publishDate: Date, detail = false){
        /*再生回数のテキスト生成*/
        let viewCountText = String(viewCount)
        const billion = 100000000
        if(viewCount >= 10000){
            viewCountText = String(Math.floor(viewCount/ 10000)) + '万'
        }else if(viewCount >= billion){
            viewCountText = String(Math.floor(viewCount / billion)) + '億'
        }
        viewCountText += ' 回視聴'

        /*投稿日時のテキスト生成*/
        //投稿日時と現在の差分を求める //1カ月は30日とする
        let dateText = ''
        const now = new Date()
        const nowByUtc = new Date(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(), now.getUTCHours(), now.getUTCMinutes(), now.getUTCSeconds(), now.getUTCMilliseconds())
        const diffByMm = (nowByUtc.getTime() - new Date(publishDate).getTime())
    
        //1以内かどうか
        let whithInOneDat = false;
        if(diffByMm < (1000 * 60)){
            //1分以内なら秒を表示
            dateText = String(Math.floor(diffByMm / 1000)) + '秒'
            whithInOneDat = true
        } else if(diffByMm < (1000 * 60 * 60)){
            //1時間以内なら分を表示
            dateText = String(Math.floor(diffByMm / 1000 / 60)) + '分'
            whithInOneDat = true
        }else if(diffByMm < (1000 * 60 * 60 * 24)){
            //1日以内なら時間を表示
            dateText = String(Math.floor(diffByMm / 1000 / 60 / 60)) + '時間'
            whithInOneDat = true
        }else if(detail == true){
            //詳細モードなら詳細なyyyy/MM/ddの形で表示
            dateText = publishDate.getFullYear() + '/' + (publishDate.getMonth() + 1)+ '/' + publishDate.getDate()
        }else if(diffByMm < (1000 * 60 * 60 * 24 * 30)){
            //1カ月以内なら日にちを表示
            dateText = String(Math.floor(diffByMm / 1000 / 60 / 60 / 24)) + '日'
        }else if(diffByMm < (1000 * 60 * 60 * 24 * 30 * 12)){
            //一年以内なら月を表示
            dateText = String(Math.floor(diffByMm / 1000 / 60 / 60 / 24 / 30)) + '月'
        }else{
            //それ以上は年で計算
            dateText = String(Math.floor(diffByMm / 1000 / 60 / 60 / 24 / 30 / 12)) + '年'
        }
    
        if(detail == true){
            if(whithInOneDat == true){
                dateText += ' 前に'
            }else{
                dateText += ' '
            }
            dateText += '公開'
        }else{
            dateText += '前'
        }
        return viewCountText + '・' + dateText
    }
    
    /*******************
     * 取得系
     *******************/
    // //検索テキストを取得
    // getSearchText(){
    //     return this._store.state.latestVideo.search.text
    // }

    // //検索条件の取得
    // getSearchCreteriaVideoModule(){
    //     return this._store.state.latestVideo.search
    // }

    // //検索条件_ジャンルの取得
    // getGenre(){
    //     return this._store.state.latestVideo.search.genre
    // }

    // //詳細検索の有効有無を取得

    // getDetailAvailavle(){
    //     return this._store.state.latestVideo.search.isActiveDetail
    // }

    // //検索の詳細を取得
    // getDetail(){
    //     return this._store.state.latestVideo.search.detail
    // }

    // /**
    //  *　検索条件_話している言語の取得
    //  * @returns 
    //  */
    // getLangs(){
    //     return this._store.state.latestVideo.search.detail.langs
    // }

    // /**
    //  * 検索条件_翻訳の有無を取得
    //  * @returns 
    //  */
    // getTranlation(){
    //     return this._store.state.latestVideo.search.detail.translation
    // }

    // /**
    //  * 検索条件_翻訳している言葉の言語を取得
    //  * @returns 
    //  */
    // getTranslationLangs(){
    //     return this._store.state.latestVideo.search.detail.translationLangs
    // }

    /***************
     *　更新系 
     ***************/
    //検索テキストの更新
    // async updateSearchText(val: string){
    //     await this._store.dispatch(LatestVideoModule.UPDATE_SEARCH_TEXT, val)
    // }

    //ジャンルの更新
    // async updateGenre(kinds: VideoGenreKinds){
    //     // await this._store.dispatch(LatestVideoModule.UPDATE_GENRE, kinds)
    //     // await this.changeGenreVideoItem(kinds)
    //     // await this.updateSearchText('')
    //     // await this.updateDetailAbailavle(false)
    // }

    //詳細検索の有効有無を更新
    // async updateDetailAbailavle(val: boolean){
    //     await this._store.dispatch(LatestVideoModule.UPDATE_DETAIL_AVAILABLE, val)
    // }        

    /**
     * コンストラクタ
     * @param store 
     * @param repository 
     */
    constructor(repository: VMoriRepository){
        // this._store = store
        this._repository = repository
    }
}