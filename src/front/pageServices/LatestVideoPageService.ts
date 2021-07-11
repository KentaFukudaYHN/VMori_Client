import { LatestVideoService } from "@/core/services/LatestVideoService";
import VMoriRepository from "@/dataAccess/repository/VMoriRepository";
import { State } from "@/dataAccess/store/store";
import { Store } from "vuex";
import { computed, ref, Ref, watchEffect } from 'vue'
import { SelecterItem } from "../componentReqRes/Selecter";
import {  VideoGenreKinds, VideoGenreKindsToString } from "@/core/enum";
import { useRouter } from "@/router/router";
import { Router } from "vue-router";
import { SearchDetail } from "../componentReqRes/searchDetail";

//最新動画情報PageService
export class LatestVideoPageService{
    //最新動画情報Service
    private _latestVideoService: LatestVideoService
    //VueRotuer
    private _router: Router
    //選択中のジャンルRef
    private _selectedGenre: Ref<VideoGenreKinds>

    /**
     * 初期処理
     */
    async init(){
        //動画情報の初期化
        await this._latestVideoService.initVideoItems()
        //watchの設定
        this._settingWatch()
    }

    /**
     * 動画検索
     */
    searchVideosByText(text: string){
        if(text == ''){
            text = null
        }
        this._latestVideoService.searchTextVideoItem(text)
    }

    /**
     * 詳細検索
     * @param searchDetail 
     */
    searchVideoByDetail(searchDetail: SearchDetail){
        this._latestVideoService.searchDetailVideoItem(searchDetail)
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
    selectedGenre(val: number){
        this._latestVideoService.updateGenre(val)
    }

    /**
     * 最新動画情報の取得
     * @returns 最新動画情報
     */
    getVideos(){
        return computed(() => this._latestVideoService.getVideoItems()) 
    }

    /**
     * 選択リストの取得
     * @returns ジャンル選択パレッド用のSelecterItems
     */
    getSelecterItemsByGenre(){
        const genreSelecterItems = [] as SelecterItem[]
        this._selectedGenre = ref(this._latestVideoService.getGenre())
        Object.entries(VideoGenreKinds).forEach(([key, val]) =>{
            const kindsNum = Number(key)
            const kinds = kindsNum as VideoGenreKinds
            if(isNaN(kindsNum) == false){
                genreSelecterItems.push({
                    val: kinds,
                    text: VideoGenreKindsToString(kinds),
                    selected: kinds == this._selectedGenre.value
                })
            }
        })

        return genreSelecterItems
    }

    /**
     * 選択中のジャンル取得
     * @returns 選択中のジャンル
     */
    getSelectedGenreRef(){
        return this._selectedGenre
    }

    /**
     * Watchの設定
     */
    private _settingWatch(){
        //選択中ジャンルの変更監視
        watchEffect(() => {
            const nowSelectedGenre = this._latestVideoService.getGenre()
            if(nowSelectedGenre != this._selectedGenre.value){
                this._selectedGenre.value = nowSelectedGenre
            }
        })
    }

    /**
     * コンストラクタ
     * @param store 
     * @param repository 
     */
    constructor(store: Store<State>, repository: VMoriRepository){
        this._latestVideoService = new LatestVideoService(store, repository)
        this._router = useRouter()
    }
}