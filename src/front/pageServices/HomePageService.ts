import { VideoService } from "@/core/services/VideoService"
import VMoriRepository from "@/dataAccess/repository/VMoriRepository"
import { State } from "@/dataAccess/store/store"
import { ref } from "@vue/runtime-core"
import { Router } from "vue-router"
import { Store } from "vuex"
import { gsap } from 'gsap'
import { VideoComment } from "@/dataAccess/entities/VideoComment"
import { VideoCommentApiRes, VideoItemApitRes } from "@/core/apiReqRes/Video"
import { stringUtility } from "../utilitys/stringUtility"
import { appSetting } from "@/dataAccess/entities/AppSetting"
import { onMounted } from "vue"

/**
 * ホーム画面PageService
 */
export class HomePageService {
    private _repository: VMoriRepository
    private _videoService: VideoService

    //Youtube埋め込み情報
    private _topViewplayer

    private  _state = {
        topViewVideo: {
            videoId: ref(''),
            isPlaying: ref(false),
            comments: ref([] as VideoComment[]),
            title: ref(''),
            channelTitle: ref('')
        }
    }

    //コメント元情報
    private _originalCommentItems = [] as VideoComment[]

    /*******************************
     * コメントアニメーション用
     * 1秒ごとにYoutubeの再生時間を取得し、該当の時間に登録されているコメント流す
     *******************************/
     private _getPlayTimeInterval: NodeJS.Timeout
     private _beforeTime = 0
     private _animations = [] as gsap.core.Tween[] 

     /**
      * 初期化処理
      */
     async init(){
         onMounted(() => {
            //windowsの幅に合わせて動的に動画の幅を変えるためにresizeイベントを監視
            window.removeEventListener('resize', this.onResizeVideo)
            window.addEventListener('resize', this.onResizeVideo)
         })
        await this._initTopViewVideoInfo(document.getElementById('playerOverLay'))
        await this.getYoutubeIFramwApi()
     }

     /**
      * State取得
      * @returns 
      */
     getState(){
         return this._state
     }

     /**
      * ウィンドウに合わせてサイズ調整
      */
     async onResizeVideo(){
        const windowWidth = window.innerWidth

        //動画サイズの計算
        let videoWidth = 0
        if(windowWidth > 1400){
            videoWidth = Math.floor(windowWidth * 0.265)
        }else if(windowWidth > appSetting.media.pc){
            videoWidth = Math.floor(windowWidth * 0.35)
        }else if(windowWidth > appSetting.media.tab){
            videoWidth = Math.floor(windowWidth * 0.4)
        }else{
            videoWidth = Math.floor(windowWidth * 0.4)
        }

        const videoHeight = Math.floor(videoWidth * 0.563)

        const topViewIframe = document.getElementById('player')
        topViewIframe.style.width = String(videoWidth) + 'px'
        topViewIframe.style.height = String(videoHeight) + 'px'

        const topViewDescribe = document.getElementById('playerDescribe')
        topViewDescribe.style.width =  String(Math.floor(videoWidth / 2)) + 'px'

        const topViweCommentOverLay = document.getElementById('commentOverLay')
        topViweCommentOverLay.style.width = String(videoWidth) + 'px'
        topViweCommentOverLay.style.height = String(videoHeight) + 'px'
     }

    /**
     * YoutubeAPIのスクリプトが読み込まれてなければ、読み込んでからYoutubeを初期化、読み込まれてたらそのまま初期化
     */
    async getYoutubeIFramwApi(){
        if(this._videoService.getIsLoadedYoutubePlayer() == false){
            var tag = document.createElement('script');

            tag.src = "https://www.youtube.com/iframe_api";
            var firstScriptTag = document.getElementsByTagName('script')[0];
            firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

            await this._videoService.updateIsLoadedYoutubePlayer(true)

            window['onYouTubeIframeAPIReady'] = async () => { 
                await this.initTopViewYoutube(this._state.topViewVideo.videoId.value) 
            }
        }else{
            await this.initTopViewYoutube(this._state.topViewVideo.videoId.value)

        }
    }

    /**
     * トップ表示動画情報の取得
     */
    async _initTopViewVideoInfo(playerOverLay: HTMLElement){
        //動画情報の取得
        const video = await this._videoService.getVideoByRandom()
        /*********************
         * 取得した動画情報の設定
         *********************/
        this._state.topViewVideo.videoId.value = video.videoId
        this._state.topViewVideo.title.value = video.videoTitle
        this._state.topViewVideo.channelTitle.value = video.channelTitle
        //動画コメントの設定
        const videoComments = await this._videoService.getVideoCommentsByApi(video.videoId)
        this._setTopViewVideoCommentAnimation(videoComments)
    }

    _setTopViewVideoCommentAnimation(comments: VideoCommentApiRes[]){
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
            sortVideoCommentData[i].id = stringUtility.getUniqueStr(100)
            
        }
        this._originalCommentItems = sortVideoCommentData.slice(0, sortVideoCommentData.length)

        //Storeにコメントを登録
        // videoService.registCommentsForStore(sortVideoCommentData)

        this._getPlayTimeInterval = setInterval(() => {
            if(this._topViewplayer.getPlayerState == undefined) { return }
            if(this._topViewplayer.getPlayerState() == 1){
                const currentTime = Math.floor(this._topViewplayer.getCurrentTime())

                //動画の時間が戻ったら、または1秒以上進んだらコメントデータを再生成
                if(currentTime < this._beforeTime || currentTime > this._beforeTime + 1){
                    sortVideoCommentData = this._originalCommentItems.slice(0, this._originalCommentItems.length)
                    this._state.topViewVideo.comments.value.splice(0, this._state.topViewVideo.comments.value.length)
                    this._animations.splice(0, this._animations.length)
                }
                this._beforeTime = currentTime
                const targetComments = sortVideoCommentData.filter(x => x.time == currentTime)

                if(targetComments == null || targetComments.length == 0){
                    return
                }
                setTimeout(() => {
                    targetComments.forEach(x => {
                        this._addVideoComment(x)
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
         _addVideoComment(comment: VideoComment){
            this._state.topViewVideo.comments.value.push(comment)
            // videoService.registCommentForStore(x)
        
            //動画サイズを取得
            const playerOverLay = document.getElementById('player')
            const videoWidth = playerOverLay.getBoundingClientRect().width
        
            setTimeout(() => {
                this._animations.push(gsap.to('#' + comment.id,{
                    duration:10,
                    x: (videoWidth + 1000) * -1, //幅は変わる可能性があるが、1000px以上変わることはないだろうと想定
                    ease: 'none'
                }))
            })
        }

    /**
     * トップページ表示Youtubeの初期化
     */
    async initTopViewYoutube(videoId: string){
        if(videoId == null || videoId == ''){
            return
        }
        this._topViewplayer = new (YT as any).Player('player', {
            height: '360',
            width: '640',
            videoId: videoId,
            playerVars: {loop:1, playlist: videoId, modestbranding:1, wmode: 'transparent',frameborder: 0, fs:0, rel:0,origin: 'https://localhost:3000' },
            events: {
            'onReady': this.onPlayerReady.bind(this),
            'onStateChange': this.onPlayerStateChange.bind(this)
            },
        });

        const playerDom = document.getElementById('player') as HTMLIFrameElement
        const youtubeSrc = playerDom.src as string
        playerDom.src = youtubeSrc + '&wmode=transparent'
        this.onResizeVideo()
    }

    /**
     * Youtube読み込み後の処理
     */
    onPlayerReady(event){
        event.target.playVideo()
    }

    /**
     * Youtube状態変更時の処理
     * @param event 
     */
    onPlayerStateChange(event){
        //1.動画の再生状態を保持
        //2.動画の再生状態に合わせてアニメーションを止める・再開する
        //3.動画の時間が1秒以上変化していたらコメントを再生成する
        if (event.data == YT.PlayerState.PAUSED) {
            this._state.topViewVideo.isPlaying.value = false
            this._animations.forEach(x =>{
                x.pause()
            })
        }else {
            this._state.topViewVideo.isPlaying.value = true
            this._animations.forEach(x =>{
                x.play()
            })
        }
    
        if(this._beforeTime  > this._topViewplayer.getCurrentTime() || this._beforeTime + 2 < this._topViewplayer.getCurrentTime()){
            this._state.topViewVideo.comments.value.splice(0, this._state.topViewVideo.comments.value.length)
            this._animations.splice(0, this._animations.length)
        }
    }

    /**
     * コンストラクタ
     * @param store 
     * @param router 
     */
    constructor(store: Store<State>, router: Router){
        this._repository = new VMoriRepository(router)
        this._videoService = new VideoService(store, this._repository)
    }
}