import { RankingVideoService } from "@/core/services/RankingVideoService";
import VMoriRepository from "@/dataAccess/repository/VMoriRepository";
import { State } from "@/dataAccess/store/store";
import { onMounted, reactive, toRefs, ref, onBeforeMount, Ref } from "vue";
import { Router } from "vue-router";
import { Store } from "vuex";
import { appSetting } from '@/dataAccess/entities/AppSetting'
import { VideoSummaryByGenreApiRes, VideoSummaryInfoByGenreApiRes } from '@/core/apiReqRes/RankingVideo'
import { VideoSummaryItemApiRes } from "@/core/apiReqRes/Video";
import { SearchVideoGenreKinds, SearchVideoGenreKindsToString, VideoGenreKinds } from "@/core/enum";
import { SelecterItem } from "../componentReqRes/Selecter";

/**
 * ランキング動画PageService
 */
export class RankingVideoPageService {
    //ランキング動画Service
    private _rankingVideoService: RankingVideoService
    //VueRouter
    private _router: Router
    //ジャンル選択欄にTOPを追加するので、そのEnumの値を無理やり定義しておく...動けばよいのだ...
    private TOP_GENRE_KINDS_VAL = 99999
    //ランキングナンバー
    private _rankingNumbers = [] as number[]
    //ジャンルの選択肢情報
    private _genreSelecterItems = [] as SelecterItem[]
    //画面の状態
    private _state = toRefs(reactive({
        //動画情報APIレスポンス
        videos: [] as VideoSummaryByGenreApiRes[],
        //ジャンルごとに分けた動画情報ref
        videosByGenreRef: null,
        //複数ジャンル表示モードの有無
        isMulti: false,
        //選択中のジャンル
        search:{
            genre: SearchVideoGenreKinds.All
        }
    }))

    /*************************************************
     * 処理系
     *************************************************/

    /**
     * ランキング動画ページの初期化処理
     */
    async init(){
        onMounted(() => {
            //動的に画像の幅を変える為にresizeイベントを監視
            window.addEventListener('resize', this.onResizeTumbnail)
            //画像のサイズ調整
            this.onResizeTumbnail()
        })

        onBeforeMount(() =>{
            //resizeイベントの破棄
            window.removeEventListener('resize', this.onResizeTumbnail)
        })

        //動画情報の取得
        const videosInfo = await this._rankingVideoService.getTopVideos()
        //動画のないジャンルは除外
        const videos = videosInfo.items.filter(x => x.items.length != 0)
        this._state.videos = ref(videos)

        /*********************************************************
        *1.ジャンル別のランキング動画で、一番項目数の多いジャンルを取得
        *2.その数に合わせてジャンルのナンバーを生成
        ***********************************************************/
        //1.ジャンル別のランキング動画で、一番項目数の多いジャンルを取得
        const maxItemLength = this._state.videos.value.sort((a, b) =>{
            return b.items.length - a.items.length
        })[0].items.length
        
        //2.その数に合わせてジャンルのナンバーを生成
        for (let i = 0; i < maxItemLength; i++) {
            this._rankingNumbers.push(i+1)
        }

        /**************************
         * ジャンル選択のリストを生成
         * 1.ランキイングページ専用の、『ＴＯＰ』ジャンルを追加
         * 2.現在選択中のジャンルをstoreから取得
         * 3.SearchVideoGenreKindsに合わせて選択ジャンルリストを生成
         **************************/
        //1.ランキイングページ専用の、『ＴＯＰ』ジャンルを追加
        this._state.search.value.genre = this.TOP_GENRE_KINDS_VAL as SearchVideoGenreKinds
        this._genreSelecterItems.push({
            text: 'TOP',
            val: this.TOP_GENRE_KINDS_VAL,
            selected: this._state.search.value.genre == this.TOP_GENRE_KINDS_VAL
        })

        Object.entries(SearchVideoGenreKinds).forEach(([key, val]) =>{
            const kindsNum = Number(key)
            const kinds = kindsNum as SearchVideoGenreKinds
            if(isNaN(kindsNum) == false){
                this._genreSelecterItems.push({
                    val: kinds,
                    text: SearchVideoGenreKindsToString(kinds),
                    selected: this._state.search.value.genre == kinds
                })
            }
        })

        //各動画のrefをジャンル別に生成
        this._state.videosByGenreRef = this.createVideoRefs(videosInfo)
    }

    /**
     * ジャンル別ランキング動画のrefを生成
     * @param apiRes 
     * @returns 
     */
    createVideoRefs(apiRes: VideoSummaryInfoByGenreApiRes){
    const result = {}
    //ジャンルごとにrefを生成
    apiRes.items.forEach(videoRankingByGenre => {
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
        //windowが1024px以上なら5カラムで表示される様にサイズ調整
        let colum = 5;
        if(window.matchMedia('(min-width:1500px)').matches){
            colum = 5
        }else if(window.matchMedia('(min-width:' + appSetting.media.pc + 'px)').matches ){
            console.log('window.match pc')
            colum = 5
        }else if(window.matchMedia('(min-width:' + appSetting.media.tab + 'px)').matches ){
            console.log('window.match tab')
            colum = 1
            this.setResizeVideos(this._state.videos.value[0].items, this._state.videos.value[0].genreKinds, 'auto', 'auto')
            setTimeout(() =>{
                this.initResizeRankingNumber(true)
            })
            this._state.isMulti.value = false
        }else {
            console.log('window.match sp')
            colum = 1
            this.setResizeVideos(this._state.videos.value[0].items, this._state.videos.value[0].genreKinds, 'auto', 'auto')
            setTimeout(() =>{
                this.initResizeRankingNumber(true)
            })
            this._state.isMulti.value = false
        }

        if(colum == 1){ return }
        this._state.isMulti.value = true

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
        debugger
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
        const targetRefEntity = this._state.videosByGenreRef[genre]
        for (let j = 0; j < targetRankingVideos.length; j++) {
            const target = targetRefEntity.refs[j][targetRankingVideos[j].id].value as HTMLElement
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
            const targetHeight = videoHeighjt + 15
            if(setLineHeight){
                target.style.lineHeight = String(targetHeight) + 'px'
                target.style.height = String(targetHeight - 15) + 'px'
                target.style.marginBottom = '15px'
            }else{
                target.style.lineHeight = 'none'
                target.style.height = String(targetHeight) + 'px'
                target.style.marginBottom = '0'
            }
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
     * ランキングナンバーを取得
     * @returns 表示用のランキングナンバー ※動画数に合わせて生成済み
     */
    getRankingNumbers(){
        return this._rankingNumbers
    }

    /**
     * ジャンル選択肢情報を取得
     * @returns 
     */
    getGenreSelecterItems(){
        return this._genreSelecterItems
    }

    /**
     * コンストラクタ
     * @param store 
     * @param router 
     */
    constructor(store: Store<State>, router: Router){
        this._rankingVideoService = new RankingVideoService(store, new VMoriRepository(router))
        this._router = router
    }

}

//ジャンル別ランキング動画情報のref
type rankingVideosByGenreRef = {
    refs: any[],
    refKeys: string[]
}