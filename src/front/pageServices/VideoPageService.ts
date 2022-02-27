import { VideoService } from "@/core/services/VideoService";
import { State } from "@/dataAccess/store/store";
import { Router, useRoute } from "vue-router";
import { Store } from "vuex";
import VMoriRepository from "@/dataAccess/repository/VMoriRepository";
import { onMounted, onUnmounted, Ref, ref } from "@vue/runtime-core";
import { VideoComment } from "@/dataAccess/entities/VideoComment";
import { VideoSummary } from "@/dataAccess/entities/VideoSummary";
import { ChannelTransition } from "../componentReqRes/channelTransition";
import { appSetting } from "@/dataAccess/entities/AppSetting";
import { gsap } from 'gsap'
import { videoUtility } from "../utilitys/videoUtility";
import { VideoLanguageKinds, VideoLanguageKindsToString } from "@/core/enum";
import { VideoCommentApiRes } from "@/core/apiReqRes/Video";
import { SetupContext } from "@vue/composition-api";
import { AppStateService } from "@/core/services/AppStateService";
import { vueUtility } from "../utilitys/vueUtility";
import { computed } from "vue";
import CheckBoxItem from "../form/CheckBoxItem";
import { idText } from "typescript";
import { HistoryVideoService } from "@/core/services/historyVideoService";


/**動画サービス */
export class VideoPageService{
    private _videoService: VideoService
    private _historyVideoService: HistoryVideoService
    private _appStateServicve: AppStateService
    private _router: Router

    //#region State
    /**状態 */
    private _state = {
        video:{
            id:  ref(''),
            videoId: ref(''),
            tags: ref([]) as Ref<string[]>,
            title: ref(''),
            description: ref(''),
            statistics: ref(''),
            speakLangs: ref([]) as Ref<string[]>,
            speakJP: ref(false),
            speakEnglish: ref(false),
            speakOther: ref(false),
            translationLangs: ref([]) as Ref<string[]>,
            translationJP: ref(false),
            translationEnglish: ref(false),
            translationOther: ref(false),
            isPlaying: ref(false),
            isMouseMoveOnFullScreenLayer: ref(false)
        },
        comment:{
            inputText: ref(''),
            comments:ref([] as VideoComment[]),
        },
        info:{
            list: ref([
                { text: '概要', kinds:infoKinds.summary, selected: true  },
                { text: 'チャンネル情報', kinds: infoKinds.channel, selected: false },
                { text: '動画一覧', kinds: infoKinds.videolist, selected: false },
                { text: 'チャンネル推移表', kinds: infoKinds.graph, selected: false }
            ]) as Ref<infoItem[]>,
            spList: ref([
                { text: '概要', kinds:infoKinds.summary, selected: true  },
                { text: 'チャンネル', kinds: infoKinds.channel, selected: false },
                { text: '動画一覧', kinds: infoKinds.videolist, selected: false },
                { text: 'グラフ', kinds: infoKinds.graph, selected: false }
            ])
        },
        channel:{
            thumbnailUrl: ref(''),
            title: ref(''),
            subscriverCount: ref(0),
            description: ref(''),
            videos: ref([]) as Ref<VideoSummary[]>,
            transitions: ref([]) as Ref<ChannelTransition[]>
        },
        tagRegister:{
            showModal: ref(false),
            taglist: ref([]) as Ref<string[]>,
        },
        langRegister:{
            showModal: ref(false),
            langlist: ref([]) as Ref<CheckBoxItem[]>
        },
        taranslationLangRegister:{
            showModal: ref(false),
            langlist: ref([]) as Ref<CheckBoxItem[]>
        }
    }

    //#endregion

    //#region その他プロパティ
    //Youtube埋め込み動画情報
    private _player

    //Domのref
    // private _playerRef
    // private _playerCommentRef
    // private _fullScreenContainerRef
    // private _fullScreenLayerRef
    // private _fullScreenBtnRef
    // private _fullScreenCommentRef 
    // private _playerOverlayRef

    //コメント最大の長さ
    private MAX_COMMENT_LENGTH = 75

    //コメント元情報
    private _originalCommentItems = [] as VideoComment[]

    //iframeOverLayObserver
    private _observer: ResizeObserver

    //フルスクリーンレイヤーでマウスを動かしたかどうかの時に使うsetTimeout
    private _setTimeoutOnMouseMove: NodeJS.Timeout

    /*************************
     * コメントアニメーション用
     * 1秒ごとにYoutubeの再生時間を取得し、該当の時間に登録されているコメントを流す
     *************************/
     private _getPlayTimeInterval: NodeJS.Timeout
     private _beforeTime = 0
     private _animations = [] as gsap.core.Tween[] 

     //#endregion

    //#region 初期化処理
     /**
     * 初期化処理
     */
    async init(playerOverlay: HTMLElement, playerComment:HTMLElement, fullScreenLayer: HTMLElement, fullScreenBtn: HTMLElement, fullScreenComment: HTMLElement){
        //GETパラメータークエリから動画ID抽出
        this._state.video.videoId.value = useRoute().query.v as string

        //入力コメントの初期化
        this._state.comment.inputText.value = ''

        //windowsの幅に合わせて動的に動画の幅を変えるためにresizeイベントを監視
        window.removeEventListener('resize', this.onResizeVideo)
        window.addEventListener('resize', this.onResizeVideo)
        
        //フルスクリーンモードの切り替えを監視
        document.removeEventListener('fullscreenchange', this.changeFullScreen.bind(this))
        document.addEventListener('fullscreenchange', this.changeFullScreen.bind(this))

        //iframeのサイズの変更を検知してオーバーレイするコメント欄のサイズとフルスクリーンボタンの位置を調整する
        const playerDom = playerOverlay as HTMLDivElement
        this._observer = new ResizeObserver(async (entries) => {
            this.adjustContentSize(entries[0].target as HTMLDivElement, playerComment,
                fullScreenLayer, fullScreenBtn, fullScreenComment)
        })
        this._observer.observe(playerDom)

        //YoutubeAPIのスクリプトが読み込まれてなければ、読み込んでからYoutubeを初期化、読み込まれてたらそのまま初期化
        await this.getYoutubeIFrameApi()

        //onUnMountedの処理
        onUnmounted(() =>{
            this._observer.disconnect()
        })

        //視聴回数のカウントアップリクエスト
        this._historyVideoService.registHistory(this._state.video.videoId.value)

        //動画情報取得
        this._initVideoInfo(playerOverlay)

        //フルスクリーン時に動画のサイズ調整
        const fullScreenChange = () => {
            console.log('FullScreenChane!')
            if(document.fullscreenElement){
                document.getElementById('player').style.height = '100vh'
            }else{
                document.getElementById('player').style.height = ''
            }
            //要素のサイズ調整
            this.adjustContentSize(playerOverlay, playerComment,
                fullScreenLayer, fullScreenBtn, fullScreenComment)
        }
        document.removeEventListener('fullscreenchange', fullScreenChange)
        document.addEventListener('fullscreenchange',fullScreenChange)
    }

    //#endregion

    //#region 取得系処理

    /**
     * State取得
     * @returns 
     */
    getState(){
        return this._state
    }

    getYoutubeVideoSrc(){
        return "https://www.youtube.com/embed/" + this._state.video.videoId
    }

    getIsFullScreenMode(){
        return this._videoService.getIsFullScreenMode()
    }

    getIsOkComment(){
        if(this._state.comment.inputText.value == '' || this._state.comment.inputText.value == null || this._state.comment.inputText.value.length > this.MAX_COMMENT_LENGTH){
            return false
        }else{
            return true
        }
    }

    /**
     * 該当のメニューが選択されているか
     * @param kinds 
     * @returns 
     */
     isSelectedInfo(kinds: number){
        const target = this._state.info.list.value.find(x => x.kinds == kinds)
        if(target == null) { return false }
    
        return target.selected
    }

    //#endregion

    //#region 登録・処理系
    /***********************************
     * 登録・更新系処理
     ***********************************/

    /**
     * コメントの登録
     * @returns 
     */
    async registComment(playerOverlay: HTMLElement){
        if(this._state.comment.inputText.value == null || this._state.comment.inputText.value == '' || this._state.comment.inputText.value.length > this.MAX_COMMENT_LENGTH){ return }

        await this._videoService.registCommentForApi(this._state.video.videoId.value, this._state.comment.inputText.value, Math.floor(this._player.getCurrentTime()))
    
        const comment = {
            id: this._getUniqueStr(100),
            text: this._state.comment.inputText.value,
            time: Math.floor(this._player.getCurrentTime()),
            top:50
        } as VideoComment
        this._addVideoComment(comment, playerOverlay)
        this._originalCommentItems.push(comment)
        setTimeout(() => {
            this._settingAddVideoCommentPosition(comment)
        })
    
        this._state.comment.inputText.value = ''
    }

    /**
     * メニュー変更
     * @param kinds 
     * @returns 
     */
    changeInfo(kinds:number){
        const index = this._state.info.list.value.findIndex(x => x.kinds == kinds)
        if(index < 0) { return }

        const dummyList = this._state.info.list.value.splice(0, this._state.info.list.value.length)
        const dummySpList = this._state.info.spList.value.splice(0, this._state.info.spList.value.length)

        dummyList.forEach((x, i) => {
            let selected = false;
            if(i == index){
                x.selected = true
            }else{
                x.selected = false
            }

            this._state.info.list.value.push(x)
        })

        dummySpList.forEach((x, i) => {
            let selected = false;
            if(i == index){
                x.selected = true
            }else{
                x.selected = false
            }

            this._state.info.spList.value.push(x)
        })
    }

    /**
     * タグの更新
     */
    async updateTags(){
        try{
            await this._appStateServicve.updateIsLoadin(true)
            await this._videoService.updateTags(this._state.video.id.value, this._state.tagRegister.taglist.value)
            vueUtility.updateArray(this._state.tagRegister.taglist.value as [], this._state.video.tags as Ref<[]>)
            this._state.tagRegister.showModal.value = false
        }finally{
            this._appStateServicve.updateIsLoadin(false)
        }
    }

    /**
     * 話している言語の更新
     */
    async updateLangs(){
        try{
            await this._appStateServicve.updateIsLoadin(true)
            const speakJp = this._state.langRegister.langlist.value.find(x => x.val == VideoLanguageKinds.JP).selected
            const speakEnglish = this._state.langRegister.langlist.value.find(x => x.val == VideoLanguageKinds.English).selected
            const speakOther = this._state.langRegister.langlist.value.find(x => x.val == VideoLanguageKinds.Other).selected

            if(!speakJp && !speakEnglish && !speakOther){
                alert('『話している言語』は一つ以上選択する必要があります')
            }else{
                await this._videoService.updateLangs(this._state.video.id.value, speakJp, speakEnglish, speakOther)
                this._settingLangs(speakJp, speakEnglish, speakOther)
                this._state.langRegister.showModal.value = false
            }

        }finally{
            await this._appStateServicve.updateIsLoadin(false)
        }
    }

    /**
     * 話している言語の更新
     */
     async updateTranslationLangs(){
        try{
            await this._appStateServicve.updateIsLoadin(true)
            const speakJp = this._state.taranslationLangRegister.langlist.value.find(x => x.val == VideoLanguageKinds.JP).selected
            const speakEnglish = this._state.taranslationLangRegister.langlist.value.find(x => x.val == VideoLanguageKinds.English).selected
            const speakOther = this._state.taranslationLangRegister.langlist.value.find(x => x.val == VideoLanguageKinds.Other).selected

            if(!speakJp && !speakEnglish && !speakOther){
                alert('『話している言語』は一つ以上選択する必要があります')
            }else{
                await this._videoService.updateTranslationLangs(this._state.video.id.value, speakJp, speakEnglish, speakOther)
                this._settingTranslationLangs(speakJp, speakEnglish, speakOther)
                this._state.taranslationLangRegister.showModal.value = false
            }

        }finally{
            await this._appStateServicve.updateIsLoadin(false)
        }
    }

    //#endregion
    
    //#region その他の処理
    /****************************
     * その他の処理
     ****************************/

    /**
     * 動画再生の切り替え
     */
    playVideo(){
        if(this._player.getPlayerState() == 1){
            this._player.pauseVideo()
        }else{
            this._player.playVideo()
        }
    }

    /**
     * 動画の停止
     */
    stopVideo(){
        this._player.stopVideo()
    }    

    /**
     * フルスクリーンレイヤーでマウスの動きを検知
     * @param event 
     */
    onMouseMoveFullScreenLayer(event){
        this._state.video.isMouseMoveOnFullScreenLayer.value = true
        clearTimeout(this._setTimeoutOnMouseMove)
        this._setTimeoutOnMouseMove = setTimeout(() => {
            this._state.video.isMouseMoveOnFullScreenLayer.value = false
        },3000)
    }    

    /**
     * チャンネル登録者数文字列生成
     * @param subscriverCount 
     * @returns 
     */
    createDisplaySubscriverCount(subscriverCount: number){
        let displayCount
        if(subscriverCount < 10000){
            displayCount = subscriverCount + '人'
        }else{
            displayCount = (Math.floor((subscriverCount * 10) / 10000) / 10) + '万人'
        }
        return 'チャンネル登録者数 ' + displayCount 
    }

    //チャンネルに紐づく動画の選択
    selectedVideo(videoId: string, context){
        context.emit('emit-changeVideo', videoId)
    }

    /**
     * タグ登録モーダルの表示
     */
    openTagRegister(){
        //タグモーダルに現在登録されているタグリストを渡す
        this._state.tagRegister.taglist.value.splice(0, this._state.tagRegister.taglist.value.length)
        if(this._state.video.tags.value != null){
            this._state.video.tags.value.forEach(x => {
                this._state.tagRegister.taglist.value.push(x)
            })
        }
    
        this._state.tagRegister.showModal.value = true
    }

    /**
     * タグ登録モーダルを閉じる
     */
    closeTagRegister(){
        this._state.tagRegister.showModal.value = false
    }

    /**
     * タグの追加
     */
    addTag(tag: string){
        if(tag == '' || tag.length > 20){
            return;
        }

        const tags = this._state.tagRegister.taglist.value.slice()
        tags.push(tag)
        this._state.tagRegister.taglist.value = tags
    }

    /**
     * タグの削除
     */
    deleteTag(tag: string){
        const index = this._state.video.tags.value.indexOf(tag)
        if(index < 0) { return }

        const tags = this._state.tagRegister.taglist.value.slice()
        tags.splice(index, 1)
        this._state.tagRegister.taglist.value = tags
    }   

    /**
     * 話している言語編集モーダルの表示
     */
    openLangRegister(){
        this._state.langRegister.langlist.value.splice(0, this._state.langRegister.langlist.value.length)
        
        this._state.langRegister.langlist.value.push({
                text: VideoLanguageKindsToString(VideoLanguageKinds.JP),
                id: 'registerLangJP',
                val: VideoLanguageKinds.JP,
                selected: this._state.video.speakJP.value
        } as CheckBoxItem)
        this._state.langRegister.langlist.value.push({
            text: VideoLanguageKindsToString(VideoLanguageKinds.English),
            id: 'registerLangEnglish',
            val: VideoLanguageKinds.English,
            selected: this._state.video.speakEnglish.value
        } as CheckBoxItem)
        this._state.langRegister.langlist.value.push({
            text: VideoLanguageKindsToString(VideoLanguageKinds.Other),
            id: 'registerLangOther',
            val: VideoLanguageKinds.Other,
            selected: this._state.video.speakOther.value
        } as CheckBoxItem)
        this._state.langRegister.showModal.value = true
    }

    /**
     * 話している言語編集モーダルを閉じる
     */
    closeLangRegister(){
        this._state.langRegister.showModal.value = false
    }

    //話している言語の選択
    onChangeLang(values: string[]){
        const tmpList = this._state.langRegister.langlist.value.slice()

        for(let i=0; i< tmpList.length; i++){
            const targetIndex = values.indexOf(String(tmpList[i].val))
            if(targetIndex > -1){
                tmpList[i].selected = true
            }else{
                tmpList[i].selected = false
            }
        }

        this._state.langRegister.langlist.value = tmpList
        // vueUtility.updateArray(list as [], this._state.langRegister.langlist as Ref<[]>)
    }

    /**
     * 翻訳している言語編集モーダルの表示
     */
     openTranslationLangRegister(){
        this._state.taranslationLangRegister.langlist.value.splice(0, this._state.taranslationLangRegister.langlist.value.length)
        
        this._state.taranslationLangRegister.langlist.value.push({
                text: VideoLanguageKindsToString(VideoLanguageKinds.JP),
                id: 'registerLangJP',
                val: VideoLanguageKinds.JP,
                selected: this._state.video.translationJP.value
        } as CheckBoxItem)
        this._state.taranslationLangRegister.langlist.value.push({
            text: VideoLanguageKindsToString(VideoLanguageKinds.English),
            id: 'registerLangEnglish',
            val: VideoLanguageKinds.English,
            selected: this._state.video.translationEnglish.value
        } as CheckBoxItem)
        this._state.taranslationLangRegister.langlist.value.push({
            text: VideoLanguageKindsToString(VideoLanguageKinds.Other),
            id: 'registerLangOther',
            val: VideoLanguageKinds.Other,
            selected: this._state.video.translationEnglish.value
        } as CheckBoxItem)
        this._state.taranslationLangRegister.showModal.value = true
    }

    /**
     * 翻訳している言語の編集モダールを閉じる
     */
    closeTranslationLangRegister(){
        this._state.taranslationLangRegister.showModal.value = false
    }

    /**
     * 翻訳している言語の選択
     * @param values 
     */
    onChangeTranslationLang(values: string[]){
        const tmpList = this._state.taranslationLangRegister.langlist.value.slice()

        for(let i=0; i< tmpList.length; i++){
            const targetIndex = values.indexOf(String(tmpList[i].val))
            if(targetIndex > -1){
                tmpList[i].selected = true
            }else{
                tmpList[i].selected = false
            }
        }

        this._state.taranslationLangRegister.langlist.value = tmpList
        // vueUtility.updateArray(list as [], this._state.taranslationLangRegister.langlist as Ref<[]>)
    }    //#endregion
    
    //#region Private処理
    /****************************
     * Private
     ****************************/

    /**
     * 動画情報の取得・設定
     */
    async _initVideoInfo(playerOverlay: HTMLElement){
        //動画IDが設定されてなければHomeに戻る
        if(this._state.video.videoId.value == null || this._state.video.videoId.value == ""){
            this._router.push('Home')
        }

        //動画情報の取得
        const video = await this._videoService.getVideo(this._state.video.videoId.value)
        //動画情報が取得できなければHomeへ
        if(video == null) { 
            this._router.push('Home')
            return;
        }

        /**********************
         * 取得した動画情報の設定
         *********************/

        //IDの設定
        this._state.video.id.value = video.id

        //タイトルの設定
        this._state.video.title.value = video.videoTitle

        //説明の設定
        this._state.video.description.value = video.description

        //再生回数・公開日の設定
        if(video.videoId != null && video.videoId != ''){
            this._state.video.statistics.value = videoUtility.createDisplayStatistics(video.viewCount, new Date(video.publishDateTime), true)
        }

        //タグの設定
        this._state.video.tags.value = video.tags
        if(video.tags == null) { this._state.video.tags.value = [] }

        //話している言葉の設定
        this._settingLangs(video.speakJP, video.speakEnglish, video.speakOther)
        this._state.video.speakJP.value = video.speakJP
        this._state.video.speakEnglish.value = video.speakEnglish
        this._state.video.speakOther.value = video.speakOther

        //翻訳している言語の設定
        this._settingTranslationLangs(video.translationJp, video.translationEnglish, video.translationOther)
        this._state.video.translationJP.value = video.translationJp
        this._state.video.translationEnglish.value = video.translationEnglish
        this._state.video.translationOther.value = video.translationOther


        //動画コメントの設定
        const videoComments = await this._videoService.getVideoCommentsByApi(video.videoId)
        this._setVideoCommentAnimation(videoComments, playerOverlay)

        //チャンネル情報の設定
        const channel = await this._videoService.getChannel(video.channelId)

        //チャンネルのタイトル・サムネイル設定・チャンネル登録者数・説明
        // state.channel.value = {} as any
        this._state.channel.thumbnailUrl.value = channel.thumbnailUrl
        this._state.channel.title.value = channel.title
        this._state.channel.subscriverCount.value = channel.subscriverCount
        this._state.channel.description.value = channel.description

        //チャンネルに紐づく動画の一覧取得
        let channelVideoApiReses = await this._videoService.getChannelVideos(video.channelId, 1)
        if(channelVideoApiReses == null) { channelVideoApiReses = [] }
        
        //チャンネルの推移データ取得
        const channelTransitions = await this._videoService.getChannelTransition(video.channelId)
        this._state.channel.transitions.value.splice(0, this._state.channel.transitions.value.length)
        if(channelTransitions != null){
            channelTransitions.forEach(x => {
                this._state.channel.transitions.value.push({
                    viewCount: x.viewCount,
                    subscriverCount: x.subscriverCount,
                    getDateTime: x.getDateTime
                })
            })
        }

        //チャンネル動画を動画リストコンポーネントに合わせて成形
        this._state.channel.videos.value.splice(0, this._state.channel.videos.value.length)
        channelVideoApiReses.forEach(x => {
            const videoItem = {} as VideoSummary
            videoItem.id = x.id
            videoItem.title = x.title
            videoItem.thumbnailLink = x.thumbnailLink
            videoItem.publishDateTime = new Date(x.publishDateTime)
            videoItem.platFormKinds = x.platFormKinds
            videoItem.viewCount = x.viewCount
            this._state.channel.videos.value.push(videoItem)
        })

        //scrollをTOPに持ってくる ※ページを更新した段階でScrollがTOPでないと、scroll位置を正確に取得することができずに、コンテンツのサイズの計算が狂ってしまう
        window.scrollTo(0,0)
    }

    /**
     * YoutubeAPIのスクリプトが読み込まれてなければ、読み込んでからYoutubeを初期化、読み込まれてたらそのまま初期化
     */
    async getYoutubeIFrameApi(){
        if(this._videoService.getIsLoadedYoutubePlayer() == false){
            var tag = document.createElement('script');

            tag.src = "https://www.youtube.com/iframe_api";
            var firstScriptTag = document.getElementsByTagName('script')[0];
            firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

            await this._videoService.updateIsLoadedYoutubePlayer(true)

            window['onYouTubeIframeAPIReady'] = async () => { 
                await this.initYoutube(this._state.video.videoId.value) 
            }
        }else{
            await this.initYoutube(this._state.video.videoId.value)

        }
    }

    /**
     * Youtube埋め込み動画の初期化
     * @param videoId 
     */
    async initYoutube(videoId: string){
        if(videoId == null || videoId == ''){
            return
        }
        this._player = new (YT as any).Player('player', {
            height: '360',
            width: '640',
            videoId: videoId,
            playerVars: {loop:1, playlist: videoId, modestbranding:1, wmode: 'transparent',frameborder: 0, fs:0, rel:0,origin: 'https://localhost:3000' },
            events: {
            'onReady': this.onPlayerReady.bind(this),
            'onStateChange': this.onPlayerStateChange.bind(this)
            },
        });
    
        var playerDom = document.getElementById('player')
        var target = (playerDom as HTMLIFrameElement)
        var youtubeSrc = target.src as string
        target.style.zIndex = '1' as string
        target.src = youtubeSrc + '&wmode=transparent'
        this.onResizeVideo()
    }

    /**
     * Youtube読み込み後の処理
     * @param event 
     */
    onPlayerReady(event){
        //event.target.playVideo()
    }

    /**
     * Youtubeの状態変更時の処理
     * @param event 
     */
    onPlayerStateChange(event){
        //1.動画の再生状態を保持
        //2.動画の再生状態に合わせてアニメーションを止める・再開する
        //3.動画の時間が1秒以上変化していたらコメントを再生成する
        if (event.data == YT.PlayerState.PAUSED) {
            this._state.video.isPlaying.value = false
            this._animations.forEach(x =>{
                x.pause()
            })
        }else {
            this._state.video.isPlaying.value = true
            this._animations.forEach(x =>{
                x.play()
            })
        }
    
        if(this._beforeTime  > this._player.getCurrentTime() || this._beforeTime + 2 < this._player.getCurrentTime()){
            this._state.comment.comments.value.splice(0, this._state.comment.comments.value.length)
            this._animations.splice(0, this._animations.length)
        }
    }

    /**
     * フルスクリーンモードの切り替え
     */
    async changeFullScreen(){
        if(document.fullscreenElement){
            await this._videoService.updateIsFullScreenMode(true)
        }else{
            await this._videoService.updateIsFullScreenMode(false)
        }
    }

    /**
     * ウィンドウに合わせて動画サイズを変更
     */
    onResizeVideo(){
        //ウィンドウサイズを取得
        const windowWidth =  window.innerWidth

        let videoWidth = 0
        if(windowWidth > appSetting.media.pc){
            //動画は横widowsサイズの70%で横縦の比率は 10:0.563にする
            videoWidth = Math.floor(windowWidth * 0.65)
        }else if(windowWidth > appSetting.media.tab){
            //pc幅の時はウィンドウサイズの90%に幅を設定する
            videoWidth = Math.floor(windowWidth * 0.9)
        }else{
            //pc幅以下のウィンドウは100%で表示する
            videoWidth = windowWidth
        }
        const videoHeight = Math.floor(videoWidth * 0.563)
        
        const targetContainer = document.getElementById('videoContainer') as HTMLDivElement
        const targetOverlay = document.getElementById('playeroOverlay') as HTMLDivElement
        const targetIframe = document.getElementById('player') as HTMLIFrameElement
        if(targetContainer != null && targetIframe != null){
            targetContainer.style.width = String(videoWidth) + 'px'
            targetIframe.height = String(videoHeight) + 'px'
            // targetOverlay.style.width = String(videoWidth) + 'px'
            // targetOverlay.style.height = String(videoHeight) + 'px'
        }
    }

    /**
     * 動画サイズに合わせて他の要素のサイズを調整する
     * @param target 
     */
    async adjustContentSize(playerOverlay: HTMLElement, playerComment: HTMLElement, fullScreenLayer: HTMLElement, fullScreenBtn: HTMLElement, fullScreenComment: HTMLElement){
        let targetWidth = playerOverlay.getBoundingClientRect().width
        let targetHeight = playerOverlay.getBoundingClientRect().height

        let setHeigt = ''
        let setWidth = ''
        if(targetHeight == 0){
            setHeigt = '100vh'
            setWidth = '100vw'
        }else{
            setHeigt = String(targetHeight) + 'px'
            setWidth = String(targetWidth) + 'px'
        }

        playerComment.style.position = 'absolute' as string


        //基準値の設定
        let scrollX = 0
        let scrollY = 0

        if(targetHeight != playerOverlay.getBoundingClientRect().bottom){
            scrollY = window.scrollY
            scrollX = window.scrollX
        }

        const baseTop = playerOverlay.getBoundingClientRect().top + scrollY as number
        const baseLeft = playerOverlay.getBoundingClientRect().left + scrollX as number
        
        const baseRight = playerOverlay.getBoundingClientRect().right + scrollX as number
        const baseBottom = playerOverlay.getBoundingClientRect().bottom + scrollY as number
        
        //コメント用のオーバーレイを動画サイズに合わせて調整
        playerComment.style.width = setWidth as string
        //widthよりheightが高い場合のフルスクリーンモードは、コメントがはみ出るので、heightを計算しなおす 横:縦 1:0.563で計算

        if(this._videoService.getIsFullScreenMode() && targetHeight > targetWidth){
            playerComment.style.top = (50+ "%") as string
            playerComment.style.left = '0' as string
            playerComment.style.right =  'auto' as string
            playerComment.style.bottom ='auto' as string
            playerComment.style.transform = 'translateY(-50%)' as string
            playerComment.style.height = (Math.floor(targetWidth * 0.563)) + 'px' as string
        }else{
            playerComment.style.top = (baseTop+ "px") as string
            playerComment.style.left = (baseLeft + "px") as string
            playerComment.style.right = (baseRight + "px") as string
            playerComment.style.bottom = (baseBottom + "px") as string
            playerComment.style.transform = 'none' as string

            playerComment.style.height = setHeigt as string
        }


        //フルスクリーンレイヤーのサイズ調整
        const isTatenaga = targetWidth < targetHeight
        var fullScreenLayerHeightRatio = 0.8

        if(targetWidth < appSetting.media.sp){
            fullScreenLayerHeightRatio = 0.6
        }else if(targetWidth < appSetting.media.tab){
            fullScreenLayerHeightRatio = 0.6
        }

        if(isTatenaga){ fullScreenLayerHeightRatio = 0.7 }
        const fullCreenLayerElement = fullScreenLayer
        fullCreenLayerElement.style.width = setWidth as string
        fullCreenLayerElement.style.height = String(Math.floor(targetHeight * fullScreenLayerHeightRatio)) + 'px'
        fullCreenLayerElement.style.top = (baseTop+ "px") as string
        fullCreenLayerElement.style.left = (baseLeft + "px") as string
        fullCreenLayerElement.style.right = (baseRight+ "px") as string

        //フルスクリーンボタンの位置を動画サイズに合わせて調整
        let rightEnd = baseRight - targetWidth
        //下から話す比率は画面サイズで変動させる
        let bottomRatio = 0.18
        if(isTatenaga == false){
            if(targetWidth < appSetting.media.sp){
                bottomRatio = 0.5
            }else if(targetWidth < appSetting.media.tab){
                bottomRatio = 0.3
            }
        }else{
            if(targetWidth < appSetting.media.sp){
                bottomRatio = 0.15
            }else if(targetWidth < appSetting.media.tab){
                bottomRatio = 0.15
            }
        }


        let fullScreenSetTop = baseBottom - (Math.floor(targetHeight * bottomRatio)) as number
        let fullScreenSetRight = rightEnd as number + 20 as number

        //ボタンの位置 ※縦長の時はコメントとずらす
        const fullScreenBtnTarget = fullScreenBtn
        const fullScreenCommentTarget = fullScreenComment
        let fullScreenSetTopByBtn = fullScreenSetTop
        if(isTatenaga){
            fullScreenSetTopByBtn -= fullScreenCommentTarget.getBoundingClientRect().height + fullScreenBtnTarget.getBoundingClientRect().height
        }

        fullScreenBtnTarget.style.right = String(fullScreenSetRight) + 'px' as string
        fullScreenBtnTarget.style.top = String(fullScreenSetTopByBtn) + 'px' as string

        //フルスクリーン時のコメントボックスを動画サイズに合わせて調整
        let fullScreenCommentWidth = baseRight * 0.7

        //フルスクリーンボタンとかぶらないようにwidthを調整する ※5pxは余分にとる
        const fullScreenCommentWidthAddBtnArea = targetWidth - ((fullScreenBtnTarget.getBoundingClientRect().width + 10) * 2)
        if(targetHeight < targetWidth && fullScreenCommentWidth > fullScreenCommentWidthAddBtnArea){
            fullScreenCommentWidth = fullScreenCommentWidthAddBtnArea - 35
        }

        //最大の長さは850pxにする
        if(fullScreenCommentWidth > 850) { fullScreenCommentWidth = 850 }

        //leftのサイズを計算
        fullScreenCommentTarget.style.top = String(fullScreenSetTop) + 'px' as string
        fullScreenCommentTarget.style.width = String(fullScreenCommentWidth) + 'px' as string
    }

    /**
     * VideoLanguesKindsを変換
     * @param kinds 
     * @returns 
     */
    private _convertVideoLangeKindsToSimpleString(kinds: VideoLanguageKinds){
        switch(kinds){
            case VideoLanguageKinds.JP:
                return 'jp'
            case VideoLanguageKinds.English:
                return 'english'
            case VideoLanguageKinds.Other:
                return 'other'
            default:
                return ''
        }
    }

    /**
     * 1秒ごとにYoutubeの再生時間を取得し、該当の時間に登録されているコメントを流
     * @param comments 
     */
    _setVideoCommentAnimation(comments: VideoCommentApiRes[], playerOverlay: HTMLElement){
        //時間でソート
        const sortData = comments.sort((a,b) => {
            return a.time - b.time
        })

        let sortVideoCommentData = sortData as VideoComment[]

        let beforeData:VideoComment = null
        let cnt = 1
        for (let i = 0; i < sortVideoCommentData.length; i++) {
            if(beforeData == null){
                sortVideoCommentData[i].top = 0
            }else{
                if((sortVideoCommentData[i].time - beforeData.time) > 10){
                    sortVideoCommentData[i].top = 0
                    cnt = 1
                }else{
                    sortVideoCommentData[i].top = (cnt * 10)
                    cnt++
                    if(cnt >= 10) { cnt = 1 }
                }
            }

            beforeData = sortVideoCommentData[i]
        }

        //コメントにユニークなidを設定
        for (let i = 0; i < sortVideoCommentData.length; i++) {
            sortVideoCommentData[i].id = this._getUniqueStr(100)
            
        }
        this._originalCommentItems = sortVideoCommentData.slice(0, sortVideoCommentData.length)

        //Storeにコメントを登録
        // videoService.registCommentsForStore(sortVideoCommentData)

        this._getPlayTimeInterval = setInterval(() => {
            if(this._player.getPlayerState == undefined) { return }
            if(this._player.getPlayerState() == 1){
                const currentTime = Math.floor(this._player.getCurrentTime())

                //動画の時間が戻ったら、または1秒以上進んだらコメントデータを再生成
                if(currentTime < this._beforeTime || currentTime > this._beforeTime + 1){
                    sortVideoCommentData = this._originalCommentItems.slice(0, this._originalCommentItems.length)
                    this._state.comment.comments.value.splice(0, this._state.comment.comments.value.length)
                    this._animations.splice(0, this._animations.length)
                }
                this._beforeTime = currentTime
                const targetComments = sortVideoCommentData.filter(x => x.time == currentTime)

                if(targetComments == null || targetComments.length == 0){
                    return
                }
                setTimeout(() => {
                    targetComments.forEach(x => {
                        this._addVideoComment(x, playerOverlay)
                    })
                })

                setTimeout(() => {
                    if(targetComments != null){
                        for (let i = 0; i < targetComments.length; i++) {
                            this._settingAddVideoCommentPosition(targetComments[i])
                        }
                    }
                })
                
                sortVideoCommentData = sortVideoCommentData.filter(x => x.time != currentTime)

            }
        }, 500)
    }

    //動画コメントの開始位調整
    _settingAddVideoCommentPosition(comment: VideoComment){
        const startRight = comment.text.length * 50 * -1
        const target = document.getElementById(comment.id)
        target.style.right = startRight + 'px'
        target.style.top = comment.top + '%'
        target.style.visibility = 'visible'
    }
    /**
     * 動画コメントを追加して画面に流す
     * @param comment 
     */
    _addVideoComment(comment: VideoComment, playerOverLay: HTMLElement){
        this._state.comment.comments.value.push(comment)
        // videoService.registCommentForStore(x)
    
        //動画サイズを取得
        const videoWidth = playerOverLay.getBoundingClientRect().width
    
        setTimeout(() => {
            this._animations.push(gsap.to('#' + comment.id,{
                duration:10,
                x: (videoWidth + 1000) * -1, //幅は変わる可能性があるが、1000px以上変わることはないだろうと想定
                ease: 'none'
            }))
        })
    }
    

    //IDの生成
    _getUniqueStr(myStrong: number){
        var strong = 1000;
        if (myStrong) strong = myStrong;
        return 'a' +( new Date().getTime().toString(16)  + Math.floor(strong*Math.random()).toString(16))
    }

    /**
     * 言語の設定
     * @param speakJp 
     * @param speakEnglish 
     * @param speakOther 
     */
    _settingLangs(speakJP: boolean, speakEnglish: boolean, speakOther: boolean){
        this._state.video.speakLangs.value.splice(0, this._state.video.speakLangs.value.length)
        if(speakJP) { this._state.video.speakLangs.value.push(this._convertVideoLangeKindsToSimpleString(VideoLanguageKinds.JP)) }
        if(speakEnglish) { this._state.video.speakLangs.value.push(this._convertVideoLangeKindsToSimpleString(VideoLanguageKinds.English)) }
        if(speakOther) { this._state.video.speakLangs.value.push(this._convertVideoLangeKindsToSimpleString(VideoLanguageKinds.Other)) }
        
        this._state.video.speakJP.value = speakJP
        this._state.video.speakEnglish.value = speakEnglish
        this._state.video.speakOther.value = speakOther
    }

    /**
     * 翻訳している言語の設定
     * @param translationJP 
     * @param translationEnglish 
     * @param translationOther 
     */
    _settingTranslationLangs(translationJP: boolean, translationEnglish: boolean, translationOther: boolean){
        this._state.video.translationLangs.value.splice(0, this._state.video.translationLangs.value.length)
        if(translationJP) { this._state.video.translationLangs.value.push(this._convertVideoLangeKindsToSimpleString(VideoLanguageKinds.JP)) }
        if(translationEnglish) { this._state.video.translationLangs.value.push(this._convertVideoLangeKindsToSimpleString(VideoLanguageKinds.English)) }
        if(translationOther) { this._state.video.translationLangs.value.push(this._convertVideoLangeKindsToSimpleString(VideoLanguageKinds.Other)) }
        
        this._state.video.translationJP.value = translationJP
        this._state.video.translationEnglish.value = translationEnglish
        this._state.video.translationOther.value = translationOther
    }

    //#endregion

    /**
     * コンストラクタ
     * @param store 
     * @param router 
     */
    constructor(store: Store<State>, router: Router){
        const repository =  new VMoriRepository(router)
        this._videoService = new VideoService(store, repository)
        this._historyVideoService = new HistoryVideoService(repository)
        this._appStateServicve = new AppStateService(store)
        this._router = router
    }
}

export const infoKinds = {
    summary: 10,
    channel: 20,
    videolist: 30,
    graph: 40
} as const

type infoItem = {
    text: string,
    kinds: number,
    selected: boolean
}