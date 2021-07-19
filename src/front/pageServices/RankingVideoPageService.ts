import VMoriRepository from "@/dataAccess/repository/VMoriRepository";
import { State } from "@/dataAccess/store/store";
import { onMounted, ref, onBeforeMount, Ref, } from "vue";
import { Router } from "vue-router";
import { Store } from "vuex";
import { appSetting } from '@/dataAccess/entities/AppSetting'
import { VideoSummaryByGenreApiRes} from '@/core/apiReqRes/RankingVideo'
import { VideoSummaryItemApiRes } from "@/core/apiReqRes/Video";
import { PeriodKinds, SearchVideoTranslationKinds, SortKinds, VideoGenreKinds, VideoGenreKindsToString, VideoLanguageKinds } from "@/core/enum";
import { SelecterItem } from "../componentReqRes/Selecter";
import { VideoService } from "@/core/services/VideoService";
import { vueUtility } from "../utilitys/vueUtility";
import { GenrePallete } from "../componentReqRes/GenrePalette";
import { AppStateService } from "@/core/services/AppStateService";
import { HistoryVideoService } from "@/core/services/HistoryVideoService";
import { SearchDetail } from "../componentReqRes/SearchDetail";

/**
 * ランキング動画PageService
 */
export class RankingVideoPageService {
    //ランキング動画Service
    private _videoService: VideoService
    //アプリケーション状態サービス
    private _appStateService: AppStateService
    //動画履歴サービス
    private _historyService: HistoryVideoService
    //VueRouter
    private _router: Router
    //ジャンル選択欄にTOPを追加するので、そのEnumの値を無理やり定義しておく...動けばよいのだ...
    private TOP_GENRE_KINDS_VAL = 99999
    //ジャンルの選択肢情報
    private _genreSelecterItems = [] as SelecterItem[]
    private DISPLAY_NUM = 50
    //画面の状態
    private _state = {
        //動画情報APIレスポンス
        videos: ref([]) as Ref<VideoSummaryByGenreApiRes[]>,
        //ジャンルごとに分けた動画情報ref
        videosByGenreRef: ref(null),
        //複数ジャンル表示モードの有無　※ジャンル選択時にフラグを変える
        isMulti: ref(true),
        //並び順
        sortKinds: ref(SortKinds.ViewCount),
        //期間
        periodKinds: ref(PeriodKinds.All),
        //期間の選択リスト
        periodList: ref([]),
        //ランキングの表示ナンバーリストs
        rankingNumber: ref([] as number[]),
        //表示数
        displayNum: 50,
        //選択中のジャンル
        search:{
            genre: ref(this.TOP_GENRE_KINDS_VAL as VideoGenreKinds),
            text: ref(''),
            searchDetail:{
                langs: ref([VideoLanguageKinds.UnKnown]),
                translation: ref(SearchVideoTranslationKinds.All),
                translationLangs: ref([VideoLanguageKinds.UnKnown])
            }
        }
    }

    /*******************************************
     * 初期化処理
     *******************************************/
    /**
     * ランキング動画ページの初期化処理
     */
    async init(){
        onMounted(() => {
            //動的に画像の幅を変える為にresizeイベントを監視
            window.addEventListener('resize', this.onResizeTumbnail.bind(this))
            //画像のサイズ調整
            this.onResizeTumbnail()
        })

        onBeforeMount(() =>{
            //resizeイベントの破棄
            window.removeEventListener('resize', this.onResizeTumbnail.bind(this))
        })

        try{
            //ローディング開始
            this._appStateService.updateIsLoadin(true)

            //期間の選択し設定
            vueUtility.updateArray(this._createPeriodList() as [], this._state.periodList as Ref<[]>)

            /**
             * 動画情報の取得
             * ①画面幅が1カラム構成であれば、『全て』ジャンルの動画を取得、そうでなければ、複数ジャンルの動画を取得
             */
            await this._updateVideos()

            /**************************
             * ジャンル選択のリストを生成
             * 1.ランキイングページ専用の、『ＴＯＰ』ジャンルを追加
             * 2.現在選択中のジャンルをstoreから取得
             * 3.SearchVideoGenreKindsに合わせて選択ジャンルリストを生成
             **************************/
            //1.ランキイングページ専用の、『ＴＯＰ』ジャンルを追加
            this._state.search.genre.value = this.TOP_GENRE_KINDS_VAL as VideoGenreKinds
            this._genreSelecterItems.push({
                text: 'TOP',
                val: this.TOP_GENRE_KINDS_VAL,
                selected: this._state.search.genre.value == this.TOP_GENRE_KINDS_VAL
            })

            Object.entries(VideoGenreKinds).forEach(([key, val]) =>{
                const kindsNum = Number(key)
                const kinds = kindsNum as VideoGenreKinds
                if(isNaN(kindsNum) == false){
                    this._genreSelecterItems.push({
                        val: kinds,
                        text: VideoGenreKindsToString(kinds),
                        selected: this._state.search.genre.value == kinds
                    })
                }
            })

            //各動画のrefをジャンル別に生成
            this._state.videosByGenreRef = this.createVideoRefs(this._state.videos.value)
        }catch(error){
        }finally{
            //ローディング終了
            this._appStateService.updateIsLoadin(false)
        }
    }

    /*******************************************
     * 取得系
     *******************************************/

    /**
     * Stateの取得
     * @returns ページ状態情報
     */
     getState(){
        return this._state
    }

    /**
     * 表示形式の取得
     * @returns 
     */
    getIsMulti(){
        return this._state.isMulti
    }

    /**
     * ランキングナンバーを取得
     * @returns 表示用のランキングナンバー ※動画数に合わせて生成済み
     */
    getRankingNumbers(){
        return this._state.rankingNumber
    }

    /**
     * ジャンル選択肢情報を取得
     * @returns 
     */
    getGenreSelecterItems(){
        return this._genreSelecterItems
    }

    /**
     * ジャンルパレッドの選択肢取得
     */
    getPaletteItemsByGenre(){
        const items = [] as GenrePallete[]
        items.push({
            text: '全て',
            kinds: VideoGenreKinds.All,
            css: 'genrepalette-item genre-color-top'
        })
        Object.entries(VideoGenreKinds).forEach(([key, val]) =>{
            var kindsNum = Number(key)
            if(isNaN(kindsNum) == false && kindsNum != VideoGenreKinds.All){
                items.push({
                    text: VideoGenreKindsToString(kindsNum),
                    kinds: kindsNum,
                    css: 'genrepalette-item genre-color-' + (val as string).toLowerCase()
                })
            }
        })

        return items
    }

    /**
     * 期間選択情報の取得
     */
    getPeriods(){
        return this._state.periodList
    }

    /**
     * 検索テキスト
     * @returns 
     */
    getSearchText(){
        return this._state.search.text
    }

    /*******************************************
     * 更新系
     *******************************************/
    /**
     * 動画情報の選択
     * @param videoId 動画ID
     */
    selectedVideo(videoId: string){
        this._historyService.registHistory(videoId)
        this._router.push({name: 'Video', query: { v:videoId }})
    }

    /**
     * 期間の選択
     */
    async selectedPeriod(periodKinds: PeriodKinds){
        try{
            this._appStateService.updateIsLoadin(true)
            this._state.periodKinds.value = periodKinds

            await this._updateVideos()

            //表示選択期間の更新
            vueUtility.updateArray(this._createPeriodList() as [], this._state.periodList as Ref<[]>)
        }finally{
            this._appStateService.updateIsLoadin(false)
        }
    }

    /**
     * ジャンルの変更
     * @param val 
     */
    async changeGenreVideos(val: VideoGenreKinds){
        try{
            this._appStateService.updateIsLoadin(true)
            //TOPに変更する場合はテキストをリセット
            if(val == this.TOP_GENRE_KINDS_VAL) { 
                debugger
                this._state.search.text.value = ''
            }
            this._state.search.genre.value = val
            await this._updateVideos()
        }finally{
            this._appStateService.updateIsLoadin(false)
        }
    }
    
    /**
     * 詳細検索
     * @param searchDetail 
     */
    async searchVieoByDetail(searchDetail: SearchDetail){
        try{
            this._appStateService.updateIsLoadin(true)
            //詳細検索の更新
            vueUtility.updateArray(searchDetail.langs as [], this._state.search.searchDetail.langs as Ref<[]>)
            this._state.search.searchDetail.translation.value = searchDetail.translation
            vueUtility.updateArray(searchDetail.translationLangs as [], this._state.search.searchDetail.translationLangs as Ref<[]>) 
            
            this._updateVideos()
        }finally{
            this._appStateService.updateIsLoadin(false)
        }
    }

    /**
     * テキスト検索
     */
    async changeText(text: string){
        try{
            this._appStateService.updateIsLoadin(true)
            //テキストの変更
            this._state.search.text.value = text
            //動画情報の更新
            await this._updateVideos()
        }finally{
            this._appStateService.updateIsLoadin(false)
        }
    }

    
    /**
     * 並び順の変更
     * @param val 
     */
     async changeSort(val: SortKinds){
        this._state.sortKinds.value = val
        try{
            this._appStateService.updateIsLoadin(true)
            await this._updateVideos()
        }finally{
            this._appStateService.updateIsLoadin(false)
        }
    }

    /*******************************************
     * Private
     *******************************************/

    /**
     * ランキングナンバーを生成
     * @param num 
     */
    private _initRankingNumber(){
        let maxItemLength = 0
        if(this._state.videos.value.length > 0){
            maxItemLength = this._state.videos.value.sort((a, b) =>{
                return b.items.length - a.items.length
            })[0].items.length
        }
        this._state.rankingNumber.value.splice(0, this._state.rankingNumber.value.length)
        for (let i = 0; i < maxItemLength; i++) {
            this._state.rankingNumber.value.push(i+1)
        }
    }

    /**
     * 詳細検索条件インスタンスの生成
     * @returns 
     */
    private _createSearchDetail(){
        return {
            langs: this._state.search.searchDetail.langs.value,
            translation: this._state.search.searchDetail.translation.value,
            translationLangs: this._state.search.searchDetail.translationLangs.value
        } as SearchDetail
    }

    /**
     * TOPジャンルの更新
     * @param sort 
     */
    private async _updateVideos(){
        //TOPでテキスト検索された場合、ジャンルを『全て』に変更
        if(this._state.search.genre.value == this.TOP_GENRE_KINDS_VAL  && this._state.search.text.value != '' && this._state.search.text.value != null){
            this._state.search.genre.value = VideoGenreKinds.All
        }

        /** ウィンドウが『PC Media』以下の場合はTOPは取得しない */
        if(this._state.search.genre.value == this.TOP_GENRE_KINDS_VAL && window.matchMedia('(min-width:' + appSetting.media.pc + 'px)').matches){
            //動画情報の取得
            const videosInfo = await this._videoService.getRankingVideosByGenre(this._state.sortKinds.value, this._createSearchDetail(), this._state.periodKinds.value)
            //動画のないジャンルは除外
            const videos = videosInfo.items.filter(x => x.items.length != 0)
            this._state.videos.value.splice(0, this._state.videos.value.length)
            videos.forEach((genreItems, index) => {
                this._state.videos.value.push(genreItems)
            })
        }else{
            //PC以下はカラム構成なので『全てのジャンルの動画を取得』
            debugger
            if(this._state.search.genre.value == this.TOP_GENRE_KINDS_VAL){ this._state.search.genre.value = VideoGenreKinds.All }
            const videosInfo = await this._videoService.getVideos(1, this.DISPLAY_NUM, this._state.search.text.value,this._state.search.genre.value, this._createSearchDetail(),
                             this._state.sortKinds.value, true, this._state.periodKinds.value, true)
            
            const stateVideoData = [{
                genreKinds: this._state.search.genre.value,
                items: videosInfo.items
            }] as VideoSummaryByGenreApiRes[]
            vueUtility.updateArray(stateVideoData as [], this._state.videos as Ref<[]>)
        }

        //refの再生成
        this._state.videosByGenreRef = this.createVideoRefs(this._state.videos.value)
        //ランキングナンバーの再生成
        this._initRankingNumber()
        //サムネイルサイズを再計算
        setTimeout(() => {
            this.onResizeTumbnail()
        })

    }

    /**
     * ジャンル別ランキング動画のrefを生成
     * @param apiRes 
     * @returns 
     */
    private createVideoRefs(items: VideoSummaryByGenreApiRes[]){
        const result = {}
        //ジャンルごとにrefを生成
        items.forEach(videoRankingByGenre => {
            //追加するrankingVideoByGenreRefを生成
            const rankingVideosByGenreRef = {} as rankingVideosByGenreRef
            rankingVideosByGenreRef.refs = []
            rankingVideosByGenreRef.refKeys = []

            //動画ごとにregを生成
            videoRankingByGenre.items.forEach(video => {
                rankingVideosByGenreRef.refs.push({[video.id]: ref(null)})
                rankingVideosByGenreRef.refKeys.push(video.id)
            })
            result[videoRankingByGenre.genreKinds] = rankingVideosByGenreRef
        })
        return result
    }


    /**
     * 親要素のサイズに合わせて動画情報のサイズを変える
     * @returns 
     */
    onResizeTumbnail(){
        const videoListContainer = document.getElementById('rankingVideoListContainer')
        const rankingNumberContainer = document.getElementsByClassName('vranking-videolist-number')[0]

        const windowWidth = document.body.clientWidth;

        //windo幅がpc以上でジャンルがTOPならIsMulti
        if(window.matchMedia('(min-width:' + appSetting.media.pc + 'px)').matches && this._state.search.genre.value == this.TOP_GENRE_KINDS_VAL){
            this._state.isMulti.value = true
        }else{
            this._state.isMulti.value = false
        }

        //windowが1024px以上なら5カラムで表示される様にサイズ調整
        let colum = 5;

        if(window.matchMedia('(min-width:1500px)').matches){
            if(this._state.isMulti.value){
                colum = 5
            }else{
                colum = 1
            }  
        }else if(window.matchMedia('(min-width:' + appSetting.media.pc + 'px)').matches ){
            if(this._state.isMulti.value){
                colum = 5
            }else{
                colum = 1
            }  
        }else if(window.matchMedia('(min-width:' + appSetting.media.tab + 'px)').matches ){
            colum = 1
        }else {
            colum = 1
        }

        if(colum == 1){ 
            this.setResizeVideos(this._state.videos.value[0].items, this._state.videos.value[0].genreKinds, 'auto', 'auto')
            setTimeout(() =>{
                this.initResizeRankingNumber(true)
            })
            return 
        }

        let margin = 30


        //スマホ表示はmarginが10になる ※cssで設定
        if(window.innerWidth < appSetting.media.sp){
            margin = 10
        }

        //動画表示可能領域
        let listContainerWidth = videoListContainer.clientWidth - rankingNumberContainer.clientWidth - 20 - 20

        //動画のmargin分を際引いた表示表示領域
        const canDisplayWidth = listContainerWidth - (margin * colum)

        //１動画のwidth
        let calcVideoWidth = Math.floor(canDisplayWidth / colum) 

        //スマホ表示はboderを1px引くのでその分widthを引く ※borderはcssで設定済み
        calcVideoWidth -= 2

        //1動画のheight 横1 縦 0.7
        const calcVideoHeight = Math.floor(calcVideoWidth * 0.7)

        //計算したwidthとheightに更新
        for(let i=0;i<this._state.videos.value.length;i++){
            const width = String(calcVideoWidth) + 'px'
            const height = String(Math.floor(calcVideoHeight * 0.8)) + 'px'
            this.setResizeVideos(this._state.videos.value[i].items, this._state.videos.value[i].genreKinds, width, height)
        }
        //ランキングのナンバーの高さも調整
        setTimeout(() =>{
            this.initResizeRankingNumber(false)
        })
    }

    /**
     * 動画のリサイズ
     * @param targetRankingVideos 
     * @param genre 
     * @param width 
     * @param height 
     */
    setResizeVideos(targetRankingVideos: VideoSummaryItemApiRes[], genre: VideoGenreKinds, width: string, height: string){
        const targetRefEntity = document.getElementsByClassName('video-container')
        for (let j = 0; j < targetRefEntity.length; j++) {
            const target = targetRefEntity[j] as HTMLElement
            if(target == null) { continue }
            target.style.width = width

            var thumsnail =  target.getElementsByClassName('video-thumbnail')[0] as HTMLElement
            thumsnail.style.height = height
        }
    }

    /**
     * ランキングナンバーのリサイズ
     * @param setLineHeight 
     */
    initResizeRankingNumber(setLineHeight: boolean){
        const rankingNumberElms = document.getElementsByClassName('ranking-number')
        for(let i=0; i< rankingNumberElms.length; i++){
            const target = rankingNumberElms[i] as HTMLElement
            const videoHeighjt = (document.getElementsByClassName('video-container')[0] as HTMLElement ).clientHeight
            const targetHeight = videoHeighjt + 15 + 1 //border
            if(setLineHeight){
                target.style.lineHeight = String(targetHeight) + 'px'
                target.style.height = String(targetHeight - 15) + 'px'
                target.style.marginBottom = '0px'
            }else{
                target.style.lineHeight = 'none'
                target.style.height = String(targetHeight) + 'px'
                target.style.marginBottom = '0'
            }
        }
    }

    private _createPeriodList(){
        return[
            {
                text: '今日',
                val: PeriodKinds.ToDay,
                selected: PeriodKinds.ToDay == this._state.periodKinds.value
            },
            {
                text: '今週',
                val: PeriodKinds.Week,
                selected: PeriodKinds.Week == this._state.periodKinds.value
            },
            {
                text: '今月',
                val: PeriodKinds.Month,
                selected: PeriodKinds.Month == this._state.periodKinds.value
            },
            {
                text: '全期間',
                val: PeriodKinds.All,
                selected: PeriodKinds.All == this._state.periodKinds.value
            },
        ]
    }

    /**
     * コンストラクタ
     * @param store 
     * @param router 
     */
    constructor(store: Store<State>, router: Router){
        this._videoService = new VideoService(store, new VMoriRepository(router))
        this._appStateService = new AppStateService(store)
        this._historyService = new HistoryVideoService(new VMoriRepository(router))
        this._router = router
    }

}

//ジャンル別ランキング動画情報のref
type rankingVideosByGenreRef = {
    refs: any[],
    refKeys: string[]
}