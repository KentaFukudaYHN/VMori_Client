import { State } from "@/dataAccess/store/store";
import { Store } from "vuex";
import VMoriRepository from "@/dataAccess/repository/VMoriRepository";
import { ChannelApiRes, VideoItemApitRes, VideoSummaryInfoApiRes, VideoSummaryItemApiRes, ChannelTransitionApiRes, VideoCommentApiRes}  from '@/core/apiReqRes/Video'
import { VideoModule } from '@/dataAccess/store/actionTypes'
import { PeriodKinds, SearchVideoGenreKinds, SearchVideoTranslationKinds, SortKinds, VideoGenreKinds, VideoLanguageKinds } from "../enum";
import { SearchDetail } from "@/front/componentReqRes/SearchDetail";
import { VideoSummaryInfoByGenreApiRes } from "../apiReqRes/RankingVideo";
import { dateUtility } from "@/front/utilitys/dateUtility";

export class VideoService {
    private _store: Store<State>
    private _repository: VMoriRepository

    // /**
    //  * 動画リストの取得
    //  * @param page 
    //  * @param displayNum 
    //  * @returns 
    //  */
    // async getLatestVideos(page: number, displayNum: number){
    //     const res = await this._repository.get<VideoSummaryInfoApiRes>('video/getlist', {
    //         params:{
    //             page: page,
    //             displayNum: displayNum
    //         }
    //     })

    //     if(res.isOk()){
    //         return res.data
    //     }else{
    //         return null
    //     }
    // }

    /**
     * 詳細検索
     * @param page 
     * @param displayNum 
     * @param text 
     * @param genre 
     * @param searchDetail 
     * @returns 
     */
    async getVideos(page: number, displayNum: number, text: string, genre: VideoGenreKinds, searchDetail: SearchDetail, sortKinds: SortKinds, isDesc: boolean, periodKinds: PeriodKinds, isVmoriPeriod: boolean){

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
            TransrationLangs: translationLangs,
            sortKinds: sortKinds,
            isDesc: isDesc,
            PeriodKinds: periodKinds,
            isPublish: isVmoriPeriod
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
     * 期間情報の生成
     * @param period 
     * @returns 
     */
    private createPeriodDateTime(period: PeriodKinds){
        const result = {
            start:null as Date,
            end: null as Date
        }
        let now = new Date()
        now.setHours(0, 0, 0, 0)
        switch(period){
            //今日
            case PeriodKinds.ToDay:
                
                const startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0 ,0)
                const endDate = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59 ,59)
                result.start = startDate
                result.end = endDate
                break
            //今週
            case PeriodKinds.Week:
                //週の月曜日
                const monday = new Date(now)
                const day_num = monday.getDay()
                //計算の都合上、日曜は特別扱い
                if(day_num == 0){
                    monday.setDate(monday.getDate() - 5)
                }else{
                    monday.setDate(monday.getDate() - monday.getDay() + 1)
                }

                // //週の日曜日
                // const sunday = new Date(now)
                // sunday.setDate(sunday.getDate() - sunday.getDay() + 7)

                result.start = monday
                result.end = new Date()
                break
            //今月
            case PeriodKinds.Month:
                const startMonth = new Date()
                startMonth.setDate(1)

                const endMonth = new Date()
                endMonth.setMonth(endMonth.getMonth() + 1)
                endMonth.setDate(0)

                result.start =  dateUtility.getUtc(startMonth)
                result.end = dateUtility.getUtc(endMonth)
                break
        }

        if(result.start != null) { result.start = dateUtility.getUtc(result.start) }
        if(result.end != null) { result.end = dateUtility.getUtc(result.end) }
        
        return result
    }

    // /**
    //  * ジャンル検索
    //  * @param page 
    //  * @param displayNum 
    //  * @param genre 
    //  */
    // async getVideosByGenre(page: number, displayNum: number, genre: VideoGenreKinds, sortKinds: SortKinds, isDesc: boolean){
    //     if(genre == VideoGenreKinds.All){
    //         genre = null
    //     }

    //     const res = await this._repository.post<VideoSummaryInfoApiRes>('video/getsearchlist',{
    //         Page:page,
    //         DisplayNum: displayNum,
    //         genre:genre,
    //         sortKinds: sortKinds,
    //         isDesc: isDesc
    //     })

    //     if(res.isOk()){
    //         return res.data
    //     }else{
    //         return null
    //     }
    // }

    /**
     * ジャンルごとの動画ランキングを取得
     * @returns 
     */
    async getRankingVideosByGenre(sortKinds: SortKinds, searchDetail: SearchDetail, periodKinds: PeriodKinds){

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

        //const periodData = this.createPeriodDateTime(periodKinds)

        const res = await this._repository.post<VideoSummaryInfoByGenreApiRes>('video/GetListByGenre',{
            searchReq:{
                page: 1,
                displayNum: 30,
                sortKinds: sortKinds,
                isDesc: false,
                langs: langs,
                isTranslation: isTranslation,
                translationLangs: translationLangs,
                PeriodKinds: periodKinds,
                isPublish: false
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
     * ランダムに動画情報を取得
     */
    async getVideoByRandom(){
        const res = await this._repository.get<VideoItemApitRes>('video/getRandom')
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

    /**
     * タグの更新
     * @param string 
     * @param id 
     * @param tags 
     */
    async updateTags(id: string, tags: string[]){
        await this._repository.post('video/UpdateTags', {
            id: id,
            tags: tags
        })
    }

    /**
     * 話している言語の更新
     * @param id 
     * @param speakJp 
     * @param speakEnglish 
     * @param speakOther 
     */
    async updateLangs(id: string, speakJp: boolean, speakEnglish: boolean, speakOther: boolean){
        await this._repository.post('video/UpdateLangs', {
            Id: id,
            speakJP: speakJp,
            speakEnglish: speakEnglish,
            speakOther: speakOther
        })
    }

    /**
     * 翻訳している言語の更新
     * @param id 
     * @param translationJp 
     * @param translationEnglish 
     * @param translationOther 
     */
    async updateTranslationLangs(id: string, translationJp: boolean, translationEnglish: boolean, translationOther: boolean){
        await this._repository.post('video/UpdateTranslationLangs',{
            Id: id,
            TranslationJP: translationJp,
            TranslationEnglish: translationEnglish,
            TranslationOther: translationOther
        })
    }

    //コンストラクタ
    constructor(store: Store<State>, repository: VMoriRepository){
        this._store = store
        this._repository = repository
    }
}