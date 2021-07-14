import { State } from "@/dataAccess/store/store";
import { Store } from "vuex";
import VMoriRepository from "@/dataAccess/repository/VMoriRepository";
import { ChannelApiRes, VideoItemApitRes, VideoSummaryInfoApiRes, VideoSummaryItemApiRes, ChannelTransitionApiRes, VideoCommentApiRes}  from '@/core/apiReqRes/Video'
import { VideoModule } from '@/dataAccess/store/actionTypes'
import { SearchVideoGenreKinds, SearchVideoTranslationKinds, SortKinds, VideoGenreKinds, VideoLanguageKinds } from "../enum";
import { SearchDetail } from "@/front/componentReqRes/searchDetail";
import { VideoSummaryInfoByGenreApiRes } from "../apiReqRes/RankingVideo";

export class VideoService {
    private _store: Store<State>
    private _repository: VMoriRepository

    /**
     * 動画リストの取得
     * @param page 
     * @param displayNum 
     * @returns 
     */
    async getLatestVideos(page: number, displayNum: number){
        const res = await this._repository.get<VideoSummaryInfoApiRes>('video/getlist', {
            params:{
                page: page,
                displayNum: displayNum
            }
        })

        if(res.isOk()){
            return res.data
        }else{
            return null
        }
    }

    /**
     * 詳細検索
     * @param page 
     * @param displayNum 
     * @param text 
     * @param genre 
     * @param searchDetail 
     * @returns 
     */
    async getVideosBySearchDetail(page: number, displayNum: number, text: string, genre: VideoGenreKinds, searchDetail: SearchDetail){

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
            Page: page,
            DisplayNum: displayNum,
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
    }

    /**
     * テキスト検索
     * @param text 
     * @param genre 
     * @returns 
     */
    async getVideosByText(page: number, displayNum: number,text: string, genre: VideoGenreKinds){
        if(text == ''){
            text = null
        }
        
        var res = await this._repository.post<VideoSummaryInfoApiRes>('video/getsearchlist',{
            Page: page,
            DisplayNum: displayNum,
            Text: text,
            Genre: genre
        })

        if(res.isOk()){
            return res.data
        }else{
            return null
        }
    }

    /**
     * ジャンル検索
     * @param page 
     * @param displayNum 
     * @param genre 
     */
    async getVideosByGenre(page: number, displayNum: number, genre: VideoGenreKinds){
        if(genre == VideoGenreKinds.All){
            genre = null
        }

        const res = await this._repository.post<VideoSummaryInfoApiRes>('video/getsearchlist',{
            Page:page,
            DisplayNum: displayNum,
            genre:genre
        })

        if(res.isOk()){
            return res.data
        }else{
            return null
        }
    }

    /**
     * ジャンルごとの動画ランキングを取得
     * @returns 
     */
    async getRankingVideosByGenre(){
        const res = await this._repository.post<VideoSummaryInfoByGenreApiRes>('video/GetListByGenre',{
            searchReq:{
                page: 1,
                displayNum: 30,
                sortKinds: SortKinds.ViewCount                
            },
            genres:[SearchVideoGenreKinds.All, SearchVideoGenreKinds.SmallTalk,
                SearchVideoGenreKinds.Entertainment, SearchVideoGenreKinds.Game,
                SearchVideoGenreKinds.Song]
        })
        console.log(res.data)
        if(res.isOk()){
            return res.data
        }
    }

    /**
     * 動画情報の取得
     * @param videoId 
     * @returns 
     */
    async getVideo(videoId: string){
        const res = await this._repository.get<VideoItemApitRes>('video/get', {params:{ videoId }})
        if(res.isOk()){
            return res.data
        }else{
            return null
        }
    }

    /**
     * チャンネル推移情報の取得
     * @param channelId 
     * @returns 
     */
    async getChannelTransition(channelId: string){
        const res = await this._repository.get<ChannelTransitionApiRes[]>('video/getChannelTransitions', { params:{ channelId} })

        if(res.isOk()){
            return res.data;
        }else{
            return null
        }
    }

    /**
     * 動画コメントの取得
     * @param videoId 
     * @returns 
     */
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

    //Youtube動画プレイヤーの読み込み状態更新
    async updateIsLoadedYoutubePlayer(isloaded: boolean){
        await this._store.dispatch(VideoModule.UPDATE_YOUTUBEPLAYER_ISLOADED, isloaded)
    }

    //フルスクリーンモードかどうか更新
    async updateIsFullScreenMode(isFullScreen: boolean){
        await this._store.dispatch(VideoModule.UPDATE_FULLSCREENMODE, isFullScreen)
    }

    //コメントの登録 api
    async registCommentForApi(videoId: string, text: string, time: number){
        await this._repository.post('video/registcomment', {
            videoId: videoId,
            text: text,
            time: time
        })
    }

    //コンストラクタ
    constructor(store: Store<State>, repository: VMoriRepository){
        this._store = store
        this._repository = repository
    }
}