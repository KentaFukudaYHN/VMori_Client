import VMoriRepository from "@/dataAccess/repository/VMoriRepository"
import { State } from "@/dataAccess/store/store"
import { Store } from "vuex"
import { ref, Ref } from 'vue'
import { SelecterItem } from "../componentReqRes/Selecter"
import {  SearchVideoTranslationKinds, VideoGenreKinds, VideoGenreKindsToString, VideoLanguageKinds } from "@/core/enum"
import { useRouter } from "@/router/router"
import { Router } from "vue-router"
import { SearchDetail } from "../componentReqRes/searchDetail"
import { vueUtility } from "../utilitys/vueUtility"
import { VideoSummaryItemApiRes } from "@/core/apiReqRes/Video"
import { VideoService } from "@/core/services/VideoService"
import { GenrePallete } from "../componentReqRes/GenrePalette"

//最新動画情報PageService
export class LatestVideoPageService{
    //最新動画情報Service
    private _videoService: VideoService
    //VueRotuer
    private _router: Router
    //表示数
    private DISPLAY_NUM = 30

    //最新動画情報ページの変動データ
    private _state = {
        list:ref([]) as Ref<VideoSummaryItemApiRes[]>,
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
        //動画情報の初期化
        const result = await this._videoService.getLatestVideos(1, this.DISPLAY_NUM)
        vueUtility.updateArray(result.items as [], this._state.list as Ref<[]>)
    }

    /**
     * 動画検索
     */
    async searchVideosByText(text: string){
        if(text == ''){
            text = null
        }
        const result =  await this._videoService.getVideosByText(1, this.DISPLAY_NUM, text, this._state.search.genre.value)
        vueUtility.updateArray(result.items as [], this._state.list as Ref<[]>)
    }

    /**
     * 詳細検索
     * @param searchDetail 
     */
    async searchVideoByDetail(searchDetail: SearchDetail){
        //詳細検索の更新
        vueUtility.updateArray(searchDetail.langs as [], this._state.search.detail.langs as Ref<[]>)
        this._state.search.detail.translation.value = searchDetail.translation
        vueUtility.updateArray(searchDetail.translationLangs as [], this._state.search.detail.translationsLangs as Ref<[]>)

        const result = await this._videoService.getVideosBySearchDetail(1, this.DISPLAY_NUM, this._state.search.text.value, 
            this._state.search.genre.value, searchDetail)

        vueUtility.updateArray(result.items as [], this._state.list as Ref<[]>)
    }

    /**
     * 動画情報の選択
     * @param videoId 動画ID
     */
    selectedVideo(videoId: string){
        this._router.push({name: 'Video', query: { v:videoId }})
    }

    /**
     * ジャンルの選択
     * @param val VideoGenreKindsの値
     */
    async selectedGenre(val: number){
        this._state.search.genre.value = val
        const result = await this._videoService.getVideosByGenre(1, this.DISPLAY_NUM,val)
        vueUtility.updateArray(result.items as [], this._state.list as Ref<[]>)
    }

    /**
     * 最新動画情報の取得
     * @returns 最新動画情報
     */
    getVideos(){
        return this._state.list
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
     * コンストラクタ
     * @param store 
     * @param repository 
     */
    constructor(store: Store<State>, repository: VMoriRepository){
        this._videoService = new VideoService(store, repository)
        this._router = useRouter()
    }
}