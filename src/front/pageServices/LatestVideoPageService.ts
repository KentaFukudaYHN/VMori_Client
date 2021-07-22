import VMoriRepository from "@/dataAccess/repository/VMoriRepository"
import { State } from "@/dataAccess/store/store"
import { Store } from "vuex"
import { onBeforeMount, onMounted, ref, Ref } from 'vue'
import { SelecterItem } from "../componentReqRes/Selecter"
import {  PeriodKinds, SearchVideoTranslationKinds, SortKinds, VideoGenreKinds, VideoGenreKindsToString, VideoLanguageKinds } from "@/core/enum"
import { useRouter } from "@/router/router"
import { Router } from "vue-router"
import { SearchDetail } from "../componentReqRes/SearchDetail"
import { vueUtility } from "../utilitys/vueUtility"
import { VideoSummaryItemApiRes } from "@/core/apiReqRes/Video"
import { VideoService } from "@/core/services/VideoService"
import { GenrePallete } from "../componentReqRes/GenrePalette"
import { AppStateService } from "@/core/services/AppStateService"
import { computed } from "vue"
import { appSetting } from '@/dataAccess/entities/AppSetting'

//最新動画情報PageService
export class LatestVideoPageService{
    //最新動画情報Service
    private _videoService: VideoService
    private _appStateService: AppStateService
    //VueRotuer
    private _router: Router
    //表示数
    private DISPLAY_NUM = 30

    //最新動画情報ページの変動データ
    private _state = {
        list:ref([]) as Ref<VideoSummaryItemApiRes[]>,
        sortKinds: ref(SortKinds.RegistDateTime),
        currentPage: ref(1),
        totalRecords: ref(1),
        pageRange: ref(1),
        search: {
            text: ref(''),
            genre: ref(VideoGenreKinds.All),
            isActiveDetail: ref(false),
            detail:{
                langs: ref([VideoLanguageKinds.UnKnown]) as Ref<VideoLanguageKinds[]>,
                translation: ref(SearchVideoTranslationKinds.All),
                translationsLangs: ref([VideoLanguageKinds.UnKnown])as Ref<VideoLanguageKinds[]>
            }
        }
    }

    /**
     * 初期処理
     */
    async init(){
        try{
            this._appStateService.updateIsLoadin(true)

            onMounted(() => {
                //動的に画像の幅を変える為にresizeイベントを監視
                window.addEventListener('resize', this.onResize.bind(this))
                //画像のサイズ調整
                this.onResize()
            })
    
            onBeforeMount(() =>{
                //resizeイベントの破棄
                window.removeEventListener('resize', this.onResize.bind(this))
            })
    

            //動画情報の初期化
            await this._updateVideos()
        }finally{
            this._appStateService.updateIsLoadin(false)
        }
    }

    /**
     * 動画情報の更新
     */
    private async _updateVideos(){
        const result = await this._videoService.getVideos(this._state.currentPage.value, this.DISPLAY_NUM, this._state.search.text.value, this._state.search.genre.value,
            this._createSearchDetail(), this._state.sortKinds.value, true, PeriodKinds.All, false)
        this._state.totalRecords.value = result.totalCount
        vueUtility.updateArray(result.items as [], this._state.list as Ref<[]>)
    }

    /**
     * 画面サイズが変わった時の処理
     */
    onResize(){
        if(window.matchMedia('(min-width:1500px)').matches){
            //ページネーションの番号表示数を画面幅によってかえる
            this._state.pageRange.value = 5
        }else if(window.matchMedia('(min-width:' + appSetting.media.pc + 'px)').matches ){
            //ページネーションの番号表示数を画面幅によってかえる
            this._state.pageRange.value = 5
        }else if(window.matchMedia('(min-width:' + appSetting.media.tab + 'px)').matches ){
            //ページネーションの番号表示数を画面幅によってかえる
            this._state.pageRange.value = 3
        }else {
            //ページネーションの番号表示数を画面幅によってかえる
            this._state.pageRange.value = 2
        }
    }

    /**
     * 動画検索
     */
    async searchVideosByText(text: string){
        if(text == ''){
            text = null
        }
        try{
            this._appStateService.updateIsLoadin(true)
            this._state.search.text.value = text
            await this._updateVideos()
        }finally{
            this._appStateService.updateIsLoadin(false)
        }
    }

    /**
     * 詳細検索
     * @param searchDetail 
     */
    async searchVideoByDetail(searchDetail: SearchDetail){
        try{
            this._appStateService.updateIsLoadin(true)
            //詳細検索の更新
            vueUtility.updateArray(searchDetail.langs as [], this._state.search.detail.langs as Ref<[]>)
            this._state.search.detail.translation.value = searchDetail.translation
            vueUtility.updateArray(searchDetail.translationLangs as [], this._state.search.detail.translationsLangs as Ref<[]>)

            await this._updateVideos()
        }finally{
            this._appStateService.updateIsLoadin(false)
        }
    }

    /**
     * 動画情報の選択
     * @param videoId 動画ID
     */
    selectedVideo(videoId: string){
        this._router.push({name: 'Video', query: { v:videoId }})
    }

    /**
     * 並び順の選択
     * @param val 
     */
    async selectedSort(val: SortKinds){
        try{
            this._appStateService.updateIsLoadin(true)
            this._state.sortKinds.value = val
            await this._updateVideos()
        }finally{
            this._appStateService.updateIsLoadin(false)
        }
    }

    /**
     * ジャンルの選択
     * @param val VideoGenreKindsの値
     */
    async selectedGenre(val: number){
        try{
            this._appStateService.updateIsLoadin(true)
            this._state.search.genre.value = val
            await this._updateVideos()
        }finally{
            this._appStateService.updateIsLoadin(false)
        }
    }

    /**
     * ページの選択
     * @param val 
     */
    async selectedPage(val: number){
        try{
            this._appStateService.updateIsLoadin(true)
            this._state.currentPage.value = val
            await this._updateVideos()
        }finally{
            this._appStateService.updateIsLoadin(false)
        }
    }

    /**
     * 最新動画情報の取得
     * @returns 最新動画情報
     */
    getVideos(){
        return this._state.list
    }

    /**
     * 1ページの表示数
     */
    getDisplayNum(){
        return this.DISPLAY_NUM
    }

    /**
     * ページネーションを表示するかどうか
     */
    getShowPagination(){
        return computed(() => this._state.totalRecords.value > this.DISPLAY_NUM)
    }

    /**
     * 状態取得
     * @returns 
     */
    getState(){
        return this._state
    }

    /**
     * 選択リストの取得
     * @returns ジャンル選択パレッド用のSelecterItems
     */
    getSelecterItemsByGenre(){
        const genreSelecterItems = [] as SelecterItem[]
        Object.entries(VideoGenreKinds).forEach(([key, val]) =>{
            const kindsNum = Number(key)
            const kinds = kindsNum as VideoGenreKinds
            if(isNaN(kindsNum) == false){
                genreSelecterItems.push({
                    val: kinds,
                    text: VideoGenreKindsToString(kinds),
                    selected: kinds == this._state.search.genre.value
                })
            }
        })

        return genreSelecterItems
    }

    /**
     * ジャンルパレッドの選択肢取得
     */
    getPaletteItemsByGenre(){
        const items = [] as GenrePallete[]
        items.push({
            text: 'TOP',
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
     * 選択中のジャンル取得
     * @returns 選択中のジャンル
     */
    getSelectedGenreRef(){
        return this._state.search.genre
    }

    /**
     * 詳細検索情報生成
     */
    private _createSearchDetail(){
        const searchDetail = {
            langs: this._state.search.detail.langs.value,
            translation: this._state.search.detail.translation.value,
            translationLangs: this._state.search.detail.translationsLangs.value
        }as SearchDetail

        return searchDetail
    }

    /**
     * コンストラクタ
     * @param store 
     * @param repository 
     */
    constructor(store: Store<State>, repository: VMoriRepository){
        this._videoService = new VideoService(store, repository)
        this._appStateService = new AppStateService(store)
        this._router = useRouter()
    }
}