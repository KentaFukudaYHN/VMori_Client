import { State, useStore } from "@/dataAccess/store/store";
import { Store } from "vuex";
import VMoriRepository from "@/dataAccess/repository/VMoriRepository";
import { ChannelApiRes, VideoItemApitRes, VideoSummaryInfoApiRes, VideoSummaryItemApiRes, ChannelTransitionApiRes, VideoCommentApiRes}  from '@/core/apiReqRes/Video'
import { VideoModule } from '@/dataAccess/store/actionTypes'
import { SearchVideoGenreKinds, SearchVideoTranslationKinds, VideoGenreKinds, VideoLanguageKinds } from "@/core/enum";
import { useRouter } from "@/router/router";

export class VideoService {
    private _store: Store<State>
    private _repository: VMoriRepository

    private TOP_VAL = 9999
    private DISPLAYNUM = 30

    //選択されている動画のID取得
    // getSelectedVideoId(){
    //     return this._store.state.video.selectedVideoId
    // }

    //動画情報の取得
    async getVideo(videoId: string){
        const res = await this._repository.get<VideoItemApitRes>('video/get', {params:{ videoId }})
        if(res.isOk()){
            return res.data
        }else{
            return null
        }
    }

    //チャンネル推移情報の取得
    async getChannelTransition(channelId: string){
        const res = await this._repository.get<ChannelTransitionApiRes[]>('video/getChannelTransitions', { params:{ channelId} })

        if(res.isOk()){
            return res.data;
        }else{
            return null
        }
    }

    //動画コメントの取得　APIから
    async getVideoCommentsByApi(videoId: string){
        const res = await this._repository.get<VideoCommentApiRes[]>('video/getcomments', {params:{ videoId }})

        if(res.isOk()){
            return res.data
        }else{
            return null
        }
    }

    //Youtube動画プレイヤーが読み込まれているか取得
    getIsLoadedYoutubePlayer(){
        return this._store.state.video.isLoadedYoutubePlayer
    }

    //フルスクリーンモードかどうか取得
    getIsFullScreenMode(){
        return this._store.state.video.isFullScreenMode
    }

    // getVideoItem(videoId: string){
    //     return this._store.state.video.items.find(x => x.id == videoId)
    // }

    // //検索テキストを取得
    // getSearchText(){
    //     return this._store.state.searchCriteriaVideo.text
    // }

    // //検索条件の取得
    // getSearchCreteriaVideoModule(){
    //     return this._store.state.searchCriteriaVideo
    // }

    // //ジャンルの取得
    // getGenre(){
    //     return this._store.state.searchCriteriaVideo.genle
    // }

    // //詳細検索の有効有無を取得

    // getDetailAvailavle(){
    //     return this._store.state.searchCriteriaVideo.isActiveDetail
    // }

    // //検索の詳細を取得
    // getDetail(){
    //     return this._store.state.searchCriteriaVideo.detail
    // }

    // //話している言語の取得
    // getLangs(){
    //     return this._store.state.searchCriteriaVideo.detail.langs
    // }

    // getTranlation(){
    //     return this._store.state.searchCriteriaVideo.detail.translation
    // }

    // //翻訳している言葉の言語
    // getTranslationLangs(){
    //     return this._store.state.searchCriteriaVideo.detail.translationLangs
    // }

    // //動画リストの取得
    // getVideoItems(){
    //     return this._store.state.video.items
    // }

    //チャンネル情報の取得
    async getChannel(channelId){
        const res = await this._repository.get<ChannelApiRes>('video/getchannel', {
            params:{
                id: channelId
            }
        })
        if(res.isOk()){
            return res.data
        }
    }

    //チャンネルに紐づく動画のリストを取得
    async getChannelVideos(channelId, page){
        const res = await this._repository.get<VideoSummaryItemApiRes[]>('video/getchannelvideos', {
            params:{
                channelId: channelId,
                page: page,
                take: 10
            }
        })

        if(res.isOk()){
            return res.data
        }else{
            return null;
        }
    }

    //動画の選択
    // async selectedVideo(videoId: string){
    //     await this._store.dispatch(VideoModule.UPDATE_SELECTED_VIDEOID, videoId)
    // }

    //Youtube動画プレイヤーの読み込み状態更新
    async updateIsLoadedYoutubePlayer(isloaded: boolean){
        await this._store.dispatch(VideoModule.UPDATE_YOUTUBEPLAYER_ISLOADED, isloaded)
    }

    //フルスクリーンモードかどうか更新
    async updateIsFullScreenMode(isFullScreen: boolean){
        await this._store.dispatch(VideoModule.UPDATE_FULLSCREENMODE, isFullScreen)
    }

    // //検索テキストの更新
    // async updateSearchText(val: string){
    //     await this._store.dispatch(SearchCriteriaVideoModule.UPDATE_SEARCH_TEXT, val)
    // }

    // //詳細検索の有効有無を更新
    // async updateDetailAbailavle(val: boolean){
    //     await this._store.dispatch(SearchCriteriaVideoModule.UPDATE_DETAIL_AVAILABLE, val)
    // }

    // //ジャンルの更新
    // async updateGenre(kinds: SearchVideoGenreKinds){
    //     await this._store.dispatch(SearchCriteriaVideoModule.UPDATE_GENRE, kinds)
    //     await this.changeGenreVideoItem()
    //     await this.updateSearchText('')
    //     await this.updateDetailAbailavle(false)
    // }

    // //話している言語の更新
    // async updateLang(kinds: VideoLanguageKinds){
    //     await this._store.dispatch(SearchCriteriaVideoModule.UPDATE_DETAIL_LANG, kinds)
    // }

    // //翻訳の有無を更新
    // async updateTranslation(val: SearchVideoTranslationKinds){
    //     if(this._store.state.searchCriteriaVideo.detail.translation == SearchVideoTranslationKinds.All && val == SearchVideoTranslationKinds.All){
    //         val = SearchVideoTranslationKinds.Yes
    //     }
    //     await this._store.dispatch(SearchCriteriaVideoModule.UPDATE_DETAIL_TRANSLATION, val)
    // }

    // //翻訳している言語の更新
    // async updateTranslationLang(val: VideoLanguageKinds){
    //     await this._store.dispatch(SearchCriteriaVideoModule.UPDATE_DETAIL_TRANSLATIONLANG, val)
    // }

    //コメントの登録 api
    async registCommentForApi(videoId: string, text: string, time: number){
        await this._repository.post('video/registcomment', {
            videoId: videoId,
            text: text,
            time: time
        })
    }

    // //テキスト検索
    // async searchTextVideoItem(){
    //     let text = this._store.state.searchCriteriaVideo.text
    //     if(text == ''){
    //         text = null
    //     }
        
    //     var res = await this._repository.post<VideoSummaryInfoApiRes>('video/getsearchlist',{
    //         Page: 1,
    //         DisplayNum: this.DISPLAYNUM,
    //         Text: text
    //     })

    //     await this._store.dispatch(SearchCriteriaVideoModule.UPDATE_GENRE, SearchVideoGenreKinds.All)
    //     await this.changeGenreVideoItem()
    //     await this.updateDetailAbailavle(false)
    //     await this._store.dispatch(VideoModule.UPDATE_VIDEO_ITEMS, res.data.items)

    // }

    // //ジャンル選択
    // async changeGenreVideoItem(){
    //     let genre = this._store.state.searchCriteriaVideo.genle
    //     if(genre == SearchVideoGenreKinds.All){
    //         genre = null
    //     }

    //     const res = await this._repository.post<VideoSummaryInfoApiRes>('video/getsearchlist',{
    //         Page:1,
    //         DisplayNum: this.DISPLAYNUM,
    //         genre:genre
    //     })

    //     await this._store.dispatch(VideoModule.UPDATE_VIDEO_ITEMS, res.data.items)
    // }

    // //詳細検索実行
    // async searchDetailVideoItem(){

    //     let text = await this.getSearchText()

    //     if(text == ''){
    //         text = null
    //     }

    //     let genre = this._store.state.searchCriteriaVideo.genle
    //     if(genre == SearchVideoGenreKinds.All){
    //         genre = null
    //     }

    //     let langs = null
    //     if(this._store.state.searchCriteriaVideo.detail.langs.indexOf(VideoLanguageKinds.UnKnown) == -1){
    //         langs = this._store.state.searchCriteriaVideo.detail.langs
    //     }

    //     let isTranslation = null
    //     if(this._store.state.searchCriteriaVideo.detail.translation != SearchVideoTranslationKinds.All){
    //         isTranslation = this._store.state.searchCriteriaVideo.detail.translation == SearchVideoTranslationKinds.Yes
    //     }

    //     let translationLangs = null;
    //     if(isTranslation == true && this._store.state.searchCriteriaVideo.detail.translationLangs.indexOf(VideoLanguageKinds.UnKnown) == -1){
    //         translationLangs = this._store.state.searchCriteriaVideo.detail.translationLangs
    //     }

    //     const data = {
    //         Page: 1,
    //         DisplayNum: this.DISPLAYNUM,
    //         Text: text,
    //         Genre: genre,
    //         Langs: langs,
    //         IsTranslation: isTranslation,
    //         TransrationLangs: translationLangs
    //     }

    //     const res = await this._repository.post<VideoSummaryInfoApiRes>('video/getsearchlist',data)

    //     await this._store.dispatch(VideoModule.UPDATE_VIDEO_ITEMS, res.data.items)
    // }

    // //動画リストの初期化
    // async initVideoItems(){
    //     const res = await this._repository.get<VideoSummaryInfoApiRes>('video/getlist', {
    //         params:{
    //             page: 1,
    //             displayNum: this.DISPLAYNUM
    //         }
    //     })

    //     await this._store.dispatch(VideoModule.UPDATE_VIDEO_ITEMS, res.data.items)
    // }

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

    //コンストラクタ
    constructor(){
        this._store = useStore()
        this._repository = new VMoriRepository(useRouter())
    }
}