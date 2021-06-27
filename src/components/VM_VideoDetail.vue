<style lang="scss">
    #videoContainer{
        margin:auto;
        font-size:15px;
        & #player{
            display: block;
            width:100%;
        }

        & #playeroOverlay{
            z-index: 1;
        }

        & #playerComment:active{
            pointer-events:none;
        }

        & #playerComment{
            position: absolute;
            background: transparent;
            pointer-events:none;
            z-index: 2;
            color: #fff;
            font-size: 30px;
            font-weight: bold;
            -webkit-text-stroke: 1px $gray-font-color;
            overflow: hidden;

            & span.player-comment{
                display: inline-block;
                position: absolute;
                right:0;
                visibility: hidden;
            }
        }


        & .fullscreen-on.player-playing-no  .fullscreen-item{
            visibility: visible;
        }

        & .fullscreen-item:hover{
            visibility: visible !important;
        }

        & .fullscreen-none.player-playing .fullscreen-item{
            visibility: hidden ;
        }

        & .fullscreen-on.player-playing  .fullscreen-item{
            visibility: hidden ;
        }
        & .fullscreen-none:hover  .fullscreen-item{
            visibility: visible !important;
        }
        & .fullscreen-on:hover  .fullscreen-item{
            animation-name: hiddenAnimation;
            animation-duration: 3s;
        }
        & .player-mousemove .fullscreen-item{
            visibility: visible !important;
        }
        @keyframes hiddenAnimation {
            to{
                visibility: visible;
            }
            from{
                visibility: hidden;
            }
        }
        & .fullscreen-none.player-playing-no .fullscreen-item{
            visibility: hidden;
        }
        & #fullScreenBtn{
            position: absolute;
            color: #fff;
            font-weight: bold;
            background: $theme-color;
            padding: 5px 10px;
            cursor: pointer;
        }

        & #fullScreeenLayer{
            position: absolute;
            background: transparent;
            cursor: pointer;
            pointer-events:none;
        }

        & .fullscreen-on #fullScreeenLayer{
            pointer-events:auto;
        }

        & .fullscreen-none #fullScreenCommentContainer{
            display: none;
        }
        & #fullScreenCommentContainer{
            position: absolute;
            background: #fff;
            border-radius: 5px;
            left: 50%;
            transform: translate(-50%, -50%);
            -webkit-transform: translate(-50%, -50%);
            -ms-transform: translate(-50%, -50%);
        }

        & .comment-container{
            margin: 20px auto 0 auto;
            display: flex;
            justify-content: center;
        }

        & .comment-input{
            border-top-right-radius: 0px;
            border-bottom-right-radius: 0px;
            height:34px;
            max-width: 700px;
            width:80%;
        }
        & .comment-btn{
            width: 7em;
            background-color: $theme-color;
            font-size:12px;
            font-weight: bold;
            background-size: 1.2em;
            background-position: left 0.4em center;
            background-repeat:no-repeat;
            color:#fff;
            padding: 5px 5px 5px 1.2em;
            border: solid 1px $form-border-color;
            text-align: center;
            border-top-right-radius: 5px;
            border-bottom-right-radius: 5px;
        }

        & .comment-btn-disable{
            opacity: 0.6;
            pointer-events: none;
        }
        & #fullScreenCommentContainer.comment-container{
            margin:0;
            height:38px;
        }

        & #fullScreenCommentContainer .comment-input{
            width: 100%;
            max-width: 100%;
            height: 100%;
        }

        & #fullScreenCommentContainer .comment-btn{
            font-size: 1em;
            padding-left: 1.5em;
        }

        & #videoInfo{
            margin-top:0;
        }
        & #videoTitle{
            font-size: 20px;
        }
        & #videoStatistics{
            margin-top: 10px;
            font-size: 14px;
            color: $gray-font-color;
            font-weight: 300;

            & .statistics{
                &-langcontainer{
                    margin-top: 10px;
                    &:first-child{
                        margin-top: 3px;
                    }
                }
                &-langlabel{
                    padding: 0 5px;
                    border:solid 1px $gray-font-color;
                    border-radius: 3px;
                }
                &-langitem{
                    margin-left:5px;
                }
            }
        }
        & #tagContainer{
            margin-top: 20px;
            & .tag-item{
                cursor: pointer;
                margin: 0 3px;
                &:first-child{
                    margin: 0 3px 0 0;
                }

                &::before{
                    display: inline;
                    content: '#'
                }
            }
        }
        & .info-container{
            padding-bottom: 50px;
        }
        & .info-border{
                content: '';
                display: block;
                height: 1px;
                width: 100%;
                background: $form-border-color;
                border-radius: 1px;
                margin: 20px auto 40px auto;

        }

        & .info-header{
            display: flex;
            justify-content: space-evenly;
            margin: 20px auto;

            & span{
                display: block;
                width:100%;
                text-align: center;
                cursor: pointer;
                -webkit-user-select: none;
                -moz-user-select: none;
                -ms-user-select: none;
                user-select: none;
            }

            & .info-item-select::after{
                content: '';
                display: block;
                width: 100%;
                margin: 5px auto 0 auto;
                height: 10px;
                background: $theme-color-lightgreen;
                border-radius: 5px;
            }
        }

        & .info{
            &-summarycontainer{
                white-space: pre-wrap;
            }
        }

        & .channel{
            &-header{
                display: flex;
                align-items: center;
                margin-bottom: 20px;
            }
            &-titlecontainer{
                margin-left: 20px;
            }
            &-title{
                display: block;
                font-size:20px;
            }
            &-subscriver{
                display: block;
                font-weight: 500;
                color: $gray-font-color;
            }
            &-icon{
                width:90px;
            }
        }


        & #channelContainer{
            white-space: pre-wrap;

        }

    }
</style>

<template>
    <vm-guide>
        <template v-slot:content>
            <div id="videoContainer">
                <div ref="fullScreenContainer"  :class="{'fullscreen-none': !isFullScreenMode, 'fullscreen-on': isFullScreenMode, 'player-playing': isPlaying, 'player-playing-no': !isPlaying, 'player-mousemove': isMouseMove}">
                    <div  id="playeroOverlay" ref="playerOverlayRef" >
                        <div ref="playerRef" id="player" ></div>
                        <!-- <iframe id="player" width="560" height="315" :src="youtubeVideoSrc" frameborder="0" allow="accelerometer; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe> -->
                    </div>
                    <div id="playerComment" ref="playerCommentRef" @mousemove="() => {console.log('move!!') }">
                        <!-- このspanがないとなぜかiframeの下に動的に追加したspanが隠れる -->
                        <span></span>
                        <span v-for="item in playerCommentItems" :key="item.id" :id="item.id" class="player-comment"> {{ item.text}}</span>
                    </div>
                    <span ref="fullScreenBtnRef" id="fullScreenBtn" class="fullscreen-item" @click="onClickFullScreen">フルスクリーン</span>
                    <!-- 1.フルスクリーン時に透明状態で表示してmouseoverイベントを検知してフルスクリーンを表示 -->
                    <!-- 2.クリックによるYoutubeの再生の切り替えを制御 -->
                    <div id="fullScreeenLayer" ref="fullScreenLayerRef" @mousemove="onMouseMoveFullScreenLayer" @click="playVideo"></div>

                    <!-- コメント -->
                    <div ref="fullScreenCommentRef" id="fullScreenCommentContainer" class="comment-container fullscreen-item">
                        <input class="input-normal comment-input" v-model="commentInputVal" placeholder=" コメント入力/75文字以内">
                        <button @click="registComment" class="comment-btn icon-comment-send" :class="{'comment-btn-disable': isOkComment == false}">コメント</button>
                    </div>                    
                </div>

                <div class="comment-container">
                    <input class="input-normal comment-input" v-model="commentInputVal" placeholder="コメント入力/75文字以内">
                    <button @click="registComment" class="comment-btn icon-comment-send" :class="{'comment-btn-disable': isOkComment == false}">コメント</button>
                </div>
                <div id="tagContainer">
                    <span v-for="tag in video.tags" :key="tag" class="tag-item">
                        {{tag}}
                    </span>
                </div>
                <div id="videoInfo">
                    <h1 id="videoTitle">
                        {{video.title}}
                    </h1>
                    <div id="videoStatistics">
                        {{ video.statistics }}
                        <div class="statistics-langcontainer">
                            <span class="statistics-langlabel">speak</span>
                            <span v-for="lang in video.speakLangs" :key="lang" class="statistics-langitem" >{{ lang }}</span>
                        </div>
                        <div v-if="showTranslationLangs" class="statistics-langcontainer">
                            <span class="statistics-langlabel">translation</span>
                            <span v-for="lang in video.translationLangs" :key="lang" class="statistics-langitem" >{{ lang }}</span>
                        </div>
                    </div>
                </div>

                <div class="info-border">

                </div>

                <div class="info-container" >
                    <div class="info-header">
                        <span v-for="item in infoList" :key="item.kinds"
                            :class="{'info-item-select': item.selected}"
                            @click="changeInfo(item.kinds)">
                            {{ item.text }}
                        </span>
                    </div>
                    <div v-if="channel.title != null" class="channel-header">
                        <img class="channel-icon" :src="channel.thumbnailUrl"/>
                        <div class="channel-titlecontainer">
                            <span class="channel-title">{{ channel.title }}</span>
                            <span class="channel-subscriver">{{displaySubscriverCount()}}</span>
                        </div>
                    </div>

                    <div v-if="showSummaryInfo" class="info-summarycontainer">
                        {{ video.description }}
                    </div>

                    <div v-if="showChannelInfo" id="channelContainer">
                        <div>
                            {{ channel.description }}
                        </div>
                    </div>

                    <div v-if="showChannelVideos">
                        <vm-videolist :videos="channelVideos" @emit-selectedVideo="selectedVideo"></vm-videolist>
                    </div>

                    <div v-if="showGraph">
                        <vm-chart :list="channelTransitions"></vm-chart>
                    </div>
                </div>

            </div>
        </template>
    </vm-guide>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, reactive, ref, SetupContext, toRef, toRefs, Ref, watch, onUnmounted } from 'vue'
import VM_Guide from '@/components/VM_GuideMenu.vue'
import { VideoService } from '@/services/VideoService'
import { useRouter } from '@/router/router'
import { useStore } from '@/store/store'
import { Router, useRoute } from 'vue-router'
import { VideoComment, VideoItem } from '@/store/modules/VideoModule'
import { VideoCommentApiRes, VideoItemApitRes } from '@/apiReqRes/Video'
import { VideoLanguageKinds } from '@/commons/enum'
import { ChannelApiRes } from '@/apiReqRes/Video'
import VM_VideoList from '@/components/VM_VideoList.vue'
import VM_Chart from '@/components/VM_ChannelTransitionChart.vue'
import { ChannelTransition } from '@/componentReqRes/channelTransition'
import { gsap } from 'gsap'
import { VideoModule } from '@/store/mutationTypes'


type Props = {
    id: string
}

const infoKinds = {
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

let state = toRefs(reactive({
    video:{
        id:  '',
        tags: [] as string[],
        title: '',
        description: '',
        statistics: '',
        speakLangs: [] as string[],
        translationLangs: [] as string[],
    },
    info:{
        list: [
            { text: '概要', kinds:infoKinds.summary, selected: true  },
            { text: 'チャンネル情報', kinds: infoKinds.channel, selected: false },
            { text: '動画一覧', kinds: infoKinds.videolist, selected: false },
            { text: 'チャンネル推移表', kinds: infoKinds.graph, selected: false }
        ] as infoItem[]
    },
    channel:{
        thumbnailUrl: '',
        title: '',
        subscriverCount: 0,
        description: '',
        videos: [] as VideoItem[],
        transitions: [] as ChannelTransition[]
    }
}))

function randRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}



let player
let playerRef
let playerCommentRef
let fullScreenContainer
let videoService: VideoService
let router: Router
let channel: ChannelApiRes
let commentStartRight
let isMouseMoveOnFullScreenLayer = ref(false)
let isPlaying = ref(false)
let commentInputVal = ref('')
let playerCommentItems = ref([] as VideoComment[])
let originalCommentItems = [] as VideoComment[]
const maxCommentLength = 75
export default defineComponent({
    components:{
        'vm-guide': VM_Guide,
        'vm-videolist': VM_VideoList,
        'vm-chart': VM_Chart
    },
    props:{
        id: {
            type: String,
            default: ''
        }
    },
    emits:['emit-changeVideo'],
    async setup(props: Props, context: SetupContext) {
        router = useRouter()
        videoService = new VideoService()

        if(props.id == '' || props.id == null){
            router.push('home')
        }

        //コメントの初期化
        commentInputVal.value = ''

        playerRef = ref(null)
        let playerOverlayRef = ref(null)
        playerCommentRef = ref(null)
        let fullScreenBtnRef = ref(null)
        let fullScreenCommentRef = ref(null)
        let fullScreenLayerRef = ref(null)
        fullScreenContainer = ref(null)

        let observer: ResizeObserver
        let getPlayTimeInterval: NodeJS.Timeout
        let videoId = props.id
        if(videoId == '' || videoId == null){
            videoId = useRoute().query.v as string
        }
        onMounted(async () => {
            //windowsの幅に合わせて動的に動画の幅を変えるためにresizeイベントを監視
            window.removeEventListener('resize', onResizeVideo)
            window.addEventListener('resize', onResizeVideo)

            //フルスクリーンモードの切り替えを監視
            const changeFullScreen = async () => {
                if(document.fullscreenElement){
                    await videoService.updateIsFullScreenMode(true)
                }else{
                    await videoService.updateIsFullScreenMode(false)
                }
            }
            document.removeEventListener('fullscreenchange', changeFullScreen)
            document.addEventListener('fullscreenchange', changeFullScreen)

            //iframeのサイズの変更を検知してオーバーレイするコメント欄のサイズとフルスクリーンボタンの位置を調整する
            const playerDom = playerOverlayRef.value as HTMLDivElement
            console.log('observer')
            observer = new ResizeObserver(async (entries) => {
                // console.log(entries[0].contentRect.toJSON())
                // console.log(`width: ${entries[0].contentRect.width}`);
                // console.log(`height: ${entries[0].contentRect.height}`);

                let contentRectJson = entries[0].contentRect.toJSON();

                let target = entries[0].target as HTMLElement
                let targetWidth = entries[0].target.getBoundingClientRect().width
                let targetHeight = entries[0].target.getBoundingClientRect().height

                let setHeigt = ''
                let setWidth = ''
                if(targetHeight == 0){
                    setHeigt = '100vh'
                    setWidth = '100vw'
                }else{
                    setHeigt = String(targetHeight) + 'px'
                    setWidth = String(targetWidth) + 'px'
                }

                let ss = String(contentRectJson.top as number) as string
                console.log(`width: ${contentRectJson.top}`);
                (playerCommentRef.value as HTMLElement).style.position = 'absolute' as string

                
                //コメント用のオーバーレイを動画サイズに合わせて調整
                (playerCommentRef.value as HTMLElement).style.top = (target.getBoundingClientRect().top + "px") as string
                (playerCommentRef.value as HTMLElement).style.left = (target.getBoundingClientRect().left + "px") as string
                (playerCommentRef.value as HTMLElement).style.right = (target.getBoundingClientRect().right + "px") as string
                (playerCommentRef.value as HTMLElement).style.bottom = (target.getBoundingClientRect().bottom + "px") as string


                (playerCommentRef.value as HTMLElement).style.width = setWidth as string
                (playerCommentRef.value as HTMLElement).style.height = setHeigt as string

                //フルスクリーンレイヤーのサイズ調整
                const fullCreenLayerElement = fullScreenLayerRef.value as HTMLElement
                fullCreenLayerElement.style.width = setWidth as string
                fullCreenLayerElement.style.height = String(Math.floor(targetHeight * 0.8)) + 'px'
                fullCreenLayerElement.style.top = (target.getBoundingClientRect().top + "px") as string
                fullCreenLayerElement.style.left = (target.getBoundingClientRect().left + "px") as string
                fullCreenLayerElement.style.right = (target.getBoundingClientRect().right + "px") as string

                //フルスクリーンボタンの位置を動画サイズに合わせて調整
                let rightEnd = target.getBoundingClientRect().right - targetWidth
                let fullScreenSetTop = target.getBoundingClientRect().bottom - (Math.floor(targetHeight * 0.15)) as number
                let fullScreenSetRight = rightEnd as number + 20 as number

                const fullScreenBtnTarget = fullScreenBtnRef.value as HTMLElement
                fullScreenBtnTarget.style.right = String(fullScreenSetRight) + 'px' as string
                fullScreenBtnTarget.style.top = String(fullScreenSetTop) + 'px' as string

                //フルスクリーン時のコメントボックスを動画サイズに合わせて調整
                const fullScreenCommentTarget = fullScreenCommentRef.value as HTMLElement
                let fullScreenCommentWidth = target.getBoundingClientRect().right * 0.7

                //フルスクリーンボタンとかぶらないようにwidthを調整する ※5pxは余分にとる
                const fullScreenCommentWidthAddBtnArea = fullScreenBtnTarget.getBoundingClientRect().width +  (target.getBoundingClientRect().right * 0.3 * 0.5) + 5
                if(target.getBoundingClientRect().right < fullScreenCommentWidthAddBtnArea){
                    fullScreenCommentWidth -= fullScreenCommentWidthAddBtnArea - target.getBoundingClientRect().right
                }

                //最大の長さは850pxにする
                if(fullScreenCommentWidth > 850) { fullScreenCommentWidth = 850 }

                // const fullScreenCommentDomRect = fullScreenCommentTarget.getBoundingClientRect()

                //leftのサイズを計算
                fullScreenCommentTarget.style.top = String(fullScreenSetTop) + 'px' as string
                fullScreenCommentTarget.style.width = String(fullScreenCommentWidth) + 'px' as string
                // const comments = document.getElementsByClassName('player-comment')
                // if(comments != null){
                //     for (let i = 0; i < comments.length; i++) {
                //         (comments[i] as HTMLElement).style.right = commentStartRight + 'px' as string
                //     }
                // }

                // console.log('フルスクリーンボタンのサイズ計算')
                // console.log(`width: ${ target.getBoundingClientRect().bottom}`);
                // console.log(`height: ${(Math.floor(targetHeight * 0.1))}`);

                // console.log('コメントコンテナのサイズ')
                // console.log(`width: ${ (playerCommentRef.value as HTMLElement).style.width}`);
                // console.log(`height: ${(playerCommentRef.value as HTMLElement).style.height}`);
            })
            observer.observe(playerDom)
            
            //YoutubeAPIのスクリプトが読み込まれてなければ、読み込んでからYoutubeを初期化、読み込まれてたらそのまま初期化
            if(videoService.getIsLoadedYoutubePlayer() == false){
                var tag = document.createElement('script');

                tag.src = "https://www.youtube.com/iframe_api";
                var firstScriptTag = document.getElementsByTagName('script')[0];
                firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

                await videoService.updateIsLoadedYoutubePlayer(true)

                window['onYouTubeIframeAPIReady'] = () => { 
                    console.log('initYoutuve')
                    initYoutube(videoId) 
                }
            }else{
                initYoutube(videoId)

            }
        })

        onUnmounted(() =>{
            console.log('videoPage/onUnmounted')
            observer.disconnect()
        })


        //動画情報取得
        initVideoSetup(props.id)
        let youtubeVideoSrc = "https://www.youtube.com/embed/" + videoId

        //フルスクリーン時に動画のサイズ調整
        const fullScreenChange = () => {
            console.log('FullScreenChane!')
            if(document.fullscreenElement){
                document.getElementById('player').style.height = '100vh'
            }else{
                document.getElementById('player').style.height = ''
            }
        }
        document.removeEventListener('fullscreenchange', fullScreenChange)
        document.addEventListener('fullscreenchange',fullScreenChange)


        return {
            playerRef,
            playerOverlayRef,
            playerCommentRef,
            playerCommentItems,
            fullScreenBtnRef,
            fullScreenLayerRef,
            fullScreenContainer,
            fullScreenCommentRef,
            video: state.video.value,
            youtubeVideoSrc: youtubeVideoSrc,
            //コメント
            commentInputVal,
            //コメントが送信可能かどうか
            isOkComment: computed(() => {
                if(commentInputVal.value == '' || commentInputVal.value == null || commentInputVal.value.length > maxCommentLength){
                    return false
                }else{
                    return true
                }
            }),
            //翻訳せいている言語を表示するか
            showTranslationLangs: computed(() => { 
                if(state.video.value.translationLangs != null){
                    return state.video.value.translationLangs.length > 0 
                }else{
                    return []
                }
            }),
            // //説明
            // description: state.video.value.description,
            //メニュー情報
            infoList: state.info.value.list,
            //メニュー変更
            changeInfo : (kinds: number) => { changeInfo(kinds) },
            //概要を表示するか
            showSummaryInfo: computed(() => { return isSelectedInfo(infoKinds.summary) }),
            //チャンネルを表示するか
            showChannelInfo: computed(() => { return isSelectedInfo(infoKinds.channel) }),
            //チャンネル情報
            channel: state.channel.value,
            //チャンネル登録者数
            displaySubscriverCount: () => { return createDisplaySubscriverCount(state.channel.value.subscriverCount) },
            //チャンネルに紐づく動画情報
            channelVideos: state.channel.value.videos,
            showChannelVideos: computed(() => { return isSelectedInfo(infoKinds.videolist) }),
            selectedVideo: async (id: string) => { await selectedVideo(id, context) },
            //チャンネル推移情報
            channelTransitions: state.channel.value.transitions,
            showGraph: computed(() => { return isSelectedInfo(infoKinds.graph) }),
            //フルスクリーン
            onClickFullScreen: () => { 
                if(document.fullscreenElement){
                    document.exitFullscreen()
                }else{
                    fullScreenContainer.value.requestFullscreen()
                }
            },
            //フルスクリーンモードか
            isFullScreenMode: computed(() => videoService.getIsFullScreenMode()),
            //動画再生中か
            isPlaying: isPlaying,
            onMouseMoveFullScreenLayer: (event) => { onMouseMoveFullScreenLayer(event) },
            isMouseMove: computed(() => {
                return isMouseMoveOnFullScreenLayer.value
            }),
            playVideo: () => { playVideo() },
            registComment: async () => { await registComment(videoId) }
        }
    },
})

async function registComment(videoId: string){
    if(commentInputVal.value == null || commentInputVal.value == '' || commentInputVal.value.length > maxCommentLength){ return }

    await videoService.registCommentForApi(videoId, commentInputVal.value, Math.floor(player.getCurrentTime()))

    commentInputVal.value = ''
}

//Youtube動画再生の切り替え
function playVideo(){
    if(player.getPlayerState() == 1){
        player.pauseVideo()
    }else{
        player.playVideo()
    }
}

//フルスクリーンレイヤーでマウスの動きを検知
let setTimeoutOnMouseMove
function onMouseMoveFullScreenLayer(event){
    isMouseMoveOnFullScreenLayer.value = true
    clearTimeout(setTimeoutOnMouseMove)
    setTimeoutOnMouseMove = setTimeout(() => {
        isMouseMoveOnFullScreenLayer.value = false
    },3000)
}

//1秒ごとにYoutubeの再生時間を取得し、該当の時間に登録されているコメントを流す
let getPlayTimeInterval: NodeJS.Timeout
let beforeTime = 0
function setVideoCommentAnimation(comments: VideoCommentApiRes[]){
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
                sortVideoCommentData[i].id = getUniqueStr(100)
                
            }
            originalCommentItems = sortVideoCommentData.slice(0, sortVideoCommentData.length)

            //Storeにコメントを登録
            // videoService.registCommentsForStore(sortVideoCommentData)

            console.log('でーた')
            console.log(sortVideoCommentData)
            getPlayTimeInterval = setInterval(() => {
                if(player.getPlayerState() == 1){
                    const currentTime = Math.floor(player.getCurrentTime())

                    //動画の時間が戻ったらコメントデータを再生成
                    if(currentTime < beforeTime){
                        console.log('コメント再生成!')
                        sortVideoCommentData = originalCommentItems.slice(0, originalCommentItems.length)
                        playerCommentItems.value.splice(0, playerCommentItems.value.length)
                        // videoService.deleteCommentForStore()
                    }
                    beforeTime = currentTime
                    const targetComments = sortVideoCommentData.filter(x => x.time == currentTime)

                    if(targetComments == null || targetComments.length == 0){
                        return
                    }
                    console.log(targetComments)
                    setTimeout(() => {
                        targetComments.forEach(x => {
                            playerCommentItems.value.push(x)
                            // videoService.registCommentForStore(x)
                            setTimeout(() => {
                                gsap.to('#' + x.id,{
                                    duration:25,
                                    x: - 5000,
                                    ease: 'none'
                                })
                            })
                        })
                    })

                    setTimeout(() => {
                        if(targetComments != null){
                            for (let i = 0; i < targetComments.length; i++) {
                                const startRight = targetComments[i].text.length * 50 * -1
                                const target = document.getElementById(targetComments[i].id)
                                target.style.right = startRight + 'px'
                                target.style.top = targetComments[i].top + '%'
                                target.style.visibility = 'visible'
                            }
                        }
                    })
                    // playerCommentRef.value.style.zIndex = String(9999999999)

                    
                    sortVideoCommentData = sortVideoCommentData.filter(x => x.time != currentTime)

                }
            }, 1000)
}

//IDの生成
function getUniqueStr(myStrong: number){
 var strong = 1000;
 if (myStrong) strong = myStrong;
 return 'a' +( new Date().getTime().toString(16)  + Math.floor(strong*Math.random()).toString(16))
}

async function initVideoSetup(videoid: string){
    // state.video.value = {} as any
    state.video.value.id = videoid
    if(state.video.value.id == null || state.video.value.id == ""){
        router.push('Home')
    }

    let video = {} as VideoItemApitRes
    if(state.video.value.id != null && state.video.value.id != ''){
        video = await videoService.getVideo(state.video.value.id)
        if(video == null){
            video = {} as VideoItemApitRes
            router.push('Home')
        }
    }

    //タイトルの設定
    state.video.value.title = video.videoTitle

    //説明の設定
    state.video.value.description = video.description

    //再生回数・公開日の設定
    if(video.videoId != null && video.videoId != ''){
        state.video.value.statistics = videoService.createDisplayStatistics(video.latestStatistic.viewCount, new Date(video.publishDateTime), true)
    }

    //タグの設定
    state.video.value.tags = video.tags

    //話している言葉の設定
    state.video.value.speakLangs = []
    if(video.speakJP) { state.video.value.speakLangs.push(convertVideoLangeKindsToSimpleString(VideoLanguageKinds.JP)) }
    if(video.speakEnglish) { state.video.value.speakLangs.push(convertVideoLangeKindsToSimpleString(VideoLanguageKinds.English)) }
    if(video.speakOther) { state.video.value.speakLangs.push(convertVideoLangeKindsToSimpleString(VideoLanguageKinds.Other)) }

    //翻訳している言語の設定
    state.video.value.translationLangs = []
    if(video.translationJp) { state.video.value.translationLangs.push(convertVideoLangeKindsToSimpleString(VideoLanguageKinds.JP)) }
    if(video.translationEnglish) { state.video.value.translationLangs.push(convertVideoLangeKindsToSimpleString(VideoLanguageKinds.English)) }
    if(video.translationOther) { state.video.value.translationLangs.push(convertVideoLangeKindsToSimpleString(VideoLanguageKinds.Other)) }

    //動画コメントの設定
    const videoComments = await videoService.getVideoCommentsByApi(video.videoId)
    console.log()
    setVideoCommentAnimation(videoComments)

    //チャンネル情報の設定
    channel = await videoService.getChannel(video.channelId)

    //チャンネルのタイトル・サムネイル設定・チャンネル登録者数・説明
    // state.channel.value = {} as any
    state.channel.value.thumbnailUrl = channel.thumbnailUrl
    state.channel.value.title = channel.title
    state.channel.value.subscriverCount = channel.subscriverCount
    state.channel.value.description = channel.description

    //チャンネルに紐づく動画の一覧取得
    let channelVideoApiReses = await videoService.getChannelVideos(video.channelId, 1)
    if(channelVideoApiReses == null) { channelVideoApiReses = [] }
    
    //チャンネルの推移データ取得
    const channelTransitions = await videoService.getChannelTransition(video.channelId)
    state.channel.value.transitions.splice(0, state.channel.value.transitions.length)
    if(channelTransitions != null){
        channelTransitions.forEach(x => {
            state.channel.value.transitions.push({
                viewCount: x.viewCount,
                subscriverCount: x.subscriverCount,
                getDateTime: x.getDateTime
            })
        })
    }

    //チャンネル動画を動画リストコンポーネントに合わせて成形
    state.channel.value.videos.splice(0, state.channel.value.videos.length)
    channelVideoApiReses.forEach(x => {
        const videoItem = {} as VideoItem
        videoItem.id = x.id
        videoItem.title = x.title
        videoItem.thumbnailLink = x.thumbnailLink
        videoItem.publishDateTime = new Date(x.publishDateTime)
        videoItem.platFormKinds = x.platFormKinds
        videoItem.viewCount = x.viewCount
        state.channel.value.videos.push(videoItem)
    })
}

//該当のメニューが選択されているか
function isSelectedInfo(kinds: number){
    const target = state.info.value.list.find(x => x.kinds == kinds)
    if(target == null) { return false }

    return target.selected
}

//メニュー変更
function changeInfo(kinds:number){
    const index = state.info.value.list.findIndex(x => x.kinds == kinds)
    if(index < 0) { return }

    const dummyList = state.info.value.list.splice(0, state.info.value.list.length)

    dummyList.forEach((x, i) => {
        let selected = false;
        if(i == index){
            x.selected = true
        }else{
            x.selected = false
        }

        state.info.value.list.push(x)
    })
}

//チャンネルの登録者数生成
function createDisplaySubscriverCount(subscriverCount: number){
    let displayCount
    if(subscriverCount < 10000){
        displayCount = subscriverCount + '人'
    }else{
        displayCount = (Math.floor((subscriverCount * 10) / 10000) / 10) + '万人'
    }
    return 'チャンネル登録者数 ' + displayCount 
}

//チャンネルに紐づく動画の選択
function selectedVideo(videoId: string, context:SetupContext){
    context.emit('emit-changeVideo', videoId)
}

//Youtube Iframeの初期化
let count = 0
async function initYoutube(videoId: string){
    if(videoId == null || videoId == ''){
        return
    }
    player = new (YT as any).Player('player', {
        height: '360',
        width: '640',
        videoId: videoId,
        playerVars: {loop:1, playlist: videoId, modestbranding:1, wmode: 'transparent',frameborder: 0, fs:0, rel:0, },
        events: {
        'onReady': onPlayerReady,
        'onStateChange': onPlayerStateChange
        },
    });

    var playerDom = document.getElementById('player')
    var target = (playerDom as HTMLIFrameElement)
    var youtubeSrc = target.src as string
    target.style.zIndex = '1' as string
    target.src = youtubeSrc + '&wmode=transparent'
    onResizeVideo()

}



function onPlayerReady(event){
    //event.target.playVideo()
}

function onPlayerStateChange(event){
    console.log(event.data)
    if (event.data == YT.PlayerState.PAUSED) {
        isPlaying.value = false
    }else {
        isPlaying.value = true
    }
    
}

function stopVideo(){
    player.stopVideo()
}

//ウィンドウの幅にビデオを合わせる
function maxWindowVideo(){
    // //ウィンドウサイズを取得 途中！！！
    // const windowWidth =  window.innerWidth
    // const videoHeight = Math.floor(windowWidth * 0.5625)

    // const targetPlayer = document.getElementById('player')
    // if(targetPlayer != null){
    //     const targetElement = targetPlayer as HTMLIFrameElement
    //     targetElement.width = String(windowWidth) + 'px'
    //     targetElement.height = String(videoHeight) + 'px'
    // }
}


//VideoLanguesKindsを変換
function convertVideoLangeKindsToSimpleString(kinds: VideoLanguageKinds){
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

//動画のサイズをウィンドウに合わせて変更
function onResizeVideo(){
    //ウィンドウサイズを取得
    const windowWidth =  window.innerWidth

    //動画は横widowsサイズの70%で横縦の比率は 10:0.563にする
    const videoWidth = Math.floor(windowWidth * 0.65)
    const videoHeight = Math.floor(videoWidth * 0.563)
    
    const targetContainer = document.getElementById('videoContainer') as HTMLDivElement
    const targetIframe = document.getElementById('player') as HTMLIFrameElement
    if(targetContainer != null && targetIframe != null){
        targetContainer.style.width = String(videoWidth) + 'px'
        targetIframe.height = String(videoHeight) + 'px'
    }
}
</script>
