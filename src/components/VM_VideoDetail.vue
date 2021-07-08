<style lang="scss">
    #videoContainer{
        margin:auto;
        font-size:15px;
        @include pc{
            width:80%;
        }

        @include sp{
            font-size: 12px;
        }

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
            @include sp{
                font-size:15px;
            }
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
            //スマホの時はフルスクリーンアイテム表示 ※タブレットも考えるとpc幅にせざるを得ない...?
            @include pc{
                visibility: visible;
            }
        }
        & #fullScreenBtn{
            position: absolute;
            color: #fff;
            font-weight: bold;
            background: transparent;
            padding: 5px 10px;
            cursor: pointer;
              text-shadow    : 
                    1px  1px 0.5px black,
                    -1px  1px 0.5px black,
                    1px -1px 0.5px black,
                    -1px -1px 0.5px black,
                    1px  0px 0.5px black,
                    0px  1px 0.5px black,
                    -1px  0px 0.5px black,
                    0px -1px 0.5px black; 
            & .fulscreenbtn-border{
                &-one{
                    position: absolute;
                    left:0;
                    top:0;
                    width:8px;
                    height:8px;
                    background:transparent;
                    border-top:solid 3px #fff;
                    border-left:solid 3px #fff;
                    z-index:200;
                    &back{
                        @extend .fulscreenbtn-border-one;
                        top: -1px;
                        left: -1px;
                        border-top:solid 5px black;
                        border-left:solid 5px black;
                        z-index:100;
                    }
                }
                &-two{
                    position: absolute;
                    right:0;
                    top:0;
                    width:8px;
                    height:8px;
                    background:transparent;
                    border-top:solid 3px #fff;
                    border-right:solid 3px #fff;
                    z-index:200;
                    &back{
                        @extend .fulscreenbtn-border-two;
                        top: -1px;
                        right: -1px;
                        border-top:solid 5px black;
                        border-right:solid 5px black;
                        z-index:100;
                    }
                }
                &-three{
                    position: absolute;
                    left:0;
                    bottom:0;
                    width:8px;
                    height:8px;
                    background:transparent;
                    border-bottom:solid 3px #fff;
                    border-left:solid 3px #fff;
                    z-index:200;
                    &back{
                        @extend .fulscreenbtn-border-three;
                        bottom: -1px;
                        left: -1px;
                        border-bottom:solid 5px black;
                        border-left:solid 5px black;
                        z-index:100;
                    }
                }
                &-four{
                    position: absolute;
                    right:0;
                    bottom:0;
                    width:8px;
                    height:8px;
                    background:transparent;
                    border-bottom:solid 3px #fff;
                    border-right:solid 3px #fff;
                    z-index:200;
                    &back{
                        @extend .fulscreenbtn-border-four;
                        bottom: -1px;
                        right: -1px;
                        border-bottom:solid 5px black;
                        border-right:solid 5px black;
                        z-index:100;
                    }
                }
            }
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
            background: transparent;
            border-radius: 5px;
            left: 50%;
            transform: translate(-50%, -50%);
            -webkit-transform: translate(-50%, -50%);
            -ms-transform: translate(-50%, -50%);
            & .comment-input{
                opacity: 0.7;

                &:focus{
                    opacity: 1;
                }
            }
            & .comment-btn{
                background-color: rgb(161, 161, 161);
            }
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
            min-width: 7em;
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
            height: 100%;
            background: #fff;
        }

        & #fullScreenCommentContainer .comment-btn{
            font-size: 1em;
            padding-left: 1.5em;
        }

        & .videoinfo-container{
            @include tab{
                margin: 0 15px;
            }
            @include sp {
                margin: 0 12px;
            }
        }

        & #videoInfo{
            margin-top:0;
        }
        & #videoTitle{
            font-size: 20px;
            @include tab{
                font-size: 18px;
            }
            @include sp{
                font-size: 14px;
            }
        }
        & #videoStatistics{
            margin-top: 10px;
            font-size: 14px;
            color: $gray-font-color;
            font-weight: 300;

            @include sp {
                font-size: 12px;
            }

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
            color: $gray-font-color;
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

            & .info-item-pc{
                display: inline;

                @include sp{
                    display: none;
                }
            }

            & .info-item-sp{
                display: none;

                @include sp{
                    display: inline-block;
                }
            }



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
                @include tab{
                    font-size:15px;
                }
                @include sp{
                    font-size:15px;
                }
            }
            &-subscriver{
                display: block;
                font-weight: 500;
                color: $gray-font-color;
            }
            &-icon{
                width:90px;
                @include tab{
                    width: 60px;
                }
                @include sp{
                    width:45px;
                }
            }
        }

        & #summaryContainer{
            white-space: pre-wrap;
            word-wrap: break-word;
            @include sp{
                color: $gray-font-color;
            }
        }

        & #channelContainer{
            white-space: pre-wrap;
            word-wrap: break-word;
            @include sp{
                color: $gray-font-color;
            }
        }

    }
</style>

<template>
    <vm-guide>
        <template v-slot:content>
            <div id="videoContainer">
                <div ref="fullScreenContainer"  :class="{'fullscreen-none': !isFullScreenMode, 'fullscreen-on': isFullScreenMode, 'player-playing': isPlaying, 'player-playing-no': !isPlaying, 'player-mousemove': isMouseMove}">
                    <div  id="playeroOverlay" ref="playerOverlayRef">
                        <div ref="playerRef" id="player" ></div>
                        <!-- <iframe id="player" width="560" height="315" :src="youtubeVideoSrc" frameborder="0" allow="accelerometer; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe> -->
                    </div>
                    <div id="playerComment" ref="playerCommentRef" @mousemove="() => {console.log('move!!') }">
                        <!-- このspanがないとなぜかiframeの下に動的に追加したspanが隠れる -->
                        <span></span>
                        <span v-for="item in playerCommentItems" :key="item.id" :id="item.id" class="player-comment"> {{ item.text}}</span>
                    </div>
                    <div ref="fullScreenBtnRef" id="fullScreenBtn" class="fullscreen-item" @click="onClickFullScreen">
                        <span class="fulscreenbtn-border-one"></span>
                        <span class="fulscreenbtn-border-two"></span>
                        <span class="fulscreenbtn-border-three"></span>
                        <span class="fulscreenbtn-border-four"></span>
                    <span class="fulscreenbtn-border-oneback"></span>
                        <span class="fulscreenbtn-border-twoback"></span>
                        <span class="fulscreenbtn-border-threeback"></span>
                        <span class="fulscreenbtn-border-fourback"></span>

                        フルスクリーン
                    </div>
                    <!-- 1.フルスクリーン時に透明状態で表示してmouseoverイベントを検知してフルスクリーンを表示 -->
                    <!-- 2.クリックによるYoutubeの再生の切り替えを制御 -->
                    <div id="fullScreeenLayer" ref="fullScreenLayerRef" @mousemove="onMouseMoveFullScreenLayer" @click="playVideo"></div>

                    <!-- コメント -->
                    <div ref="fullScreenCommentRef" id="fullScreenCommentContainer" class="comment-container fullscreen-item">
                        <input class="input-normal comment-input" v-model="commentInputVal">
                        <button @click="registComment" class="comment-btn icon-comment-send" :class="{'comment-btn-disable': isOkComment == false}">コメント</button>
                    </div>                    
                </div>
                <div class="videoinfo-container">
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
                                class="info-item-pc"
                                :class="{'info-item-select': item.selected}"
                                @click="changeInfo(item.kinds)">
                                {{ item.text }}
                            </span>
                            <span v-for="item in infoSpList" :key="item.kinds"
                                class="info-item-sp"
                                :class="{'info-item-select': item.selected}"
                                @click="changeInfo(item.kinds)">
                                {{ item.text }}
                            </span>                        </div>
                        <div v-if="channel.title != null" class="channel-header">
                            <img class="channel-icon" :src="channel.thumbnailUrl"/>
                            <div class="channel-titlecontainer">
                                <span class="channel-title">{{ channel.title }}</span>
                                <span class="channel-subscriver">{{displaySubscriverCount()}}</span>
                            </div>
                        </div>

                        <div v-if="showSummaryInfo" id="summaryContainer">
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
import { appSetting } from '@/entities/AppSetting'


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
        ] as infoItem[],
        spList: [
            { text: '概要', kinds:infoKinds.summary, selected: true  },
            { text: 'チャンネル', kinds: infoKinds.channel, selected: false },
            { text: '動画一覧', kinds: infoKinds.videolist, selected: false },
            { text: 'グラフ', kinds: infoKinds.graph, selected: false }
        ]
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
let fullScreenLayerRef = ref(null)
let fullScreenBtnRef = ref(null)
let fullScreenCommentRef = ref(null)
let playerOverlayRef = ref(null)
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
        playerOverlayRef = ref(null)
        playerCommentRef = ref(null)
        fullScreenBtnRef = ref(null)
        fullScreenCommentRef = ref(null)
        fullScreenLayerRef = ref(null)
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
                adjustContentSize(entries[0].target as HTMLDivElement)
            })
            observer.observe(playerDom)
            
            //YoutubeAPIのスクリプトが読み込まれてなければ、読み込んでからYoutubeを初期化、読み込まれてたらそのまま初期化
            if(videoService.getIsLoadedYoutubePlayer() == false){
                var tag = document.createElement('script');

                tag.src = "https://www.youtube.com/iframe_api";
                var firstScriptTag = document.getElementsByTagName('script')[0];
                firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

                await videoService.updateIsLoadedYoutubePlayer(true)

                window['onYouTubeIframeAPIReady'] = async () => { 
                    console.log('initYoutuve: ' + videoId)
                    await initYoutube(videoId) 
                }
            }else{
                await initYoutube(videoId)

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

            //要素のサイズ調整
            adjustContentSize(playerOverlayRef.value as HTMLDivElement)
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
            infoSpList: state.info.value.spList,
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
            registComment: async () => { await registComment(videoId) },
        }
    },
})

//動画サイズに合わせて他の要素のサイズを調整する
async function adjustContentSize(target: HTMLDivElement){
                // console.log(entries[0].contentRect.toJSON())
                // console.log(`width: ${entries[0].contentRect.width}`);
                // console.log(`height: ${entries[0].contentRect.height}`);


                let targetWidth = target.getBoundingClientRect().width
                let targetHeight = target.getBoundingClientRect().height

                let setHeigt = ''
                let setWidth = ''
                if(targetHeight == 0){
                    setHeigt = '100vh'
                    setWidth = '100vw'
                }else{
                    setHeigt = String(targetHeight) + 'px'
                    setWidth = String(targetWidth) + 'px'
                }

                (playerCommentRef.value as HTMLElement).style.position = 'absolute' as string


                //基準値の設定
                let scrollX = 0
                let scrollY = 0

                // if(videoService.getIsFullScreenMode() == false){
                //     scrollX = window.scrollX
                //     scrollY = window.scrollY
                // }
                if(targetHeight != target.getBoundingClientRect().bottom){
                    scrollY = window.scrollY
                    scrollX = window.scrollX
                }

                const baseTop = target.getBoundingClientRect().top + scrollY as number
                const baseLeft = target.getBoundingClientRect().left + scrollX as number
                
                const baseRight = target.getBoundingClientRect().right + scrollX as number
                const baseBottom = target.getBoundingClientRect().bottom + scrollY as number
                
                //コメント用のオーバーレイを動画サイズに合わせて調整
                (playerCommentRef.value as HTMLElement).style.width = setWidth as string
                //widthよりheightが高い場合のフルスクリーンモードは、コメントがはみ出るので、heightを計算しなおす 横:縦 1:0.563で計算

                if(videoService.getIsFullScreenMode() && targetHeight > targetWidth){
                    (playerCommentRef.value as HTMLElement).style.top = (50+ "%") as string
                    (playerCommentRef.value as HTMLElement).style.left = '0' as string
                    (playerCommentRef.value as HTMLElement).style.right =  'auto' as string
                    (playerCommentRef.value as HTMLElement).style.bottom ='auto' as string
                    (playerCommentRef.value as HTMLElement).style.transform = 'translateY(-50%)' as string
                    (playerCommentRef.value as HTMLElement).style.height = (Math.floor(targetWidth * 0.563)) + 'px' as string
                }else{
                    (playerCommentRef.value as HTMLElement).style.top = (baseTop+ "px") as string
                    (playerCommentRef.value as HTMLElement).style.left = (baseLeft + "px") as string
                    (playerCommentRef.value as HTMLElement).style.right = (baseRight + "px") as string
                    (playerCommentRef.value as HTMLElement).style.bottom = (baseBottom + "px") as string
                    (playerCommentRef.value as HTMLElement).style.transform = 'none' as string

                    (playerCommentRef.value as HTMLElement).style.height = setHeigt as string
                }


                //フルスクリーンレイヤーのサイズ調整
                const isTatenaga = targetWidth < targetHeight
                var fullScreenLayerHeightRatio = 0.8

                    // if(targetWidth < appSetting.media.sp){
                    //     fullScreenLayerHeightRatio = 0.6
                    // }else if(targetWidth < appSetting.media.tab){
                    //     fullScreenLayerHeightRatio = 0.6
                    // }

                if(targetWidth < appSetting.media.sp){
                    fullScreenLayerHeightRatio = 0.6
                }else if(targetWidth < appSetting.media.tab){
                    fullScreenLayerHeightRatio = 0.6
                }

                if(isTatenaga){ fullScreenLayerHeightRatio = 0.7 }
                const fullCreenLayerElement = fullScreenLayerRef.value as HTMLElement
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
                const fullScreenBtnTarget = fullScreenBtnRef.value as HTMLElement
                const fullScreenCommentTarget = fullScreenCommentRef.value as HTMLElement
                let fullScreenSetTopByBtn = fullScreenSetTop
                if(isTatenaga){
                    fullScreenSetTopByBtn -= fullScreenCommentTarget.getBoundingClientRect().height + fullScreenBtnTarget.getBoundingClientRect().height
                }

                fullScreenBtnTarget.style.right = String(fullScreenSetRight) + 'px' as string
                fullScreenBtnTarget.style.top = String(fullScreenSetTopByBtn) + 'px' as string

                //フルスクリーン時のコメントボックスを動画サイズに合わせて調整
                let fullScreenCommentWidth = baseRight * 0.7

                //フルスクリーンボタンとかぶらないようにwidthを調整する ※5pxは余分にとる
                // const fullScreenCommentWidthAddBtnArea = (fullScreenBtnTarget.getBoundingClientRect().width + 10) * 2 - 10
                // if(fullScreenCommentWidth > fullScreenCommentWidthAddBtnArea){
                //     fullScreenCommentWidth = fullScreenCommentWidthAddBtnArea
                // }
                const fullScreenCommentWidthAddBtnArea = targetWidth - ((fullScreenBtnTarget.getBoundingClientRect().width + 10) * 2)
                if(targetHeight < targetWidth && fullScreenCommentWidth > fullScreenCommentWidthAddBtnArea){
                    fullScreenCommentWidth = fullScreenCommentWidthAddBtnArea - 35
                }

                //最大の長さは850pxにする
                if(fullScreenCommentWidth > 850) { fullScreenCommentWidth = 850 }

                // const fullScreenCommentDomRect = fullScreenCommentTarget.getBoundingClientRect()
                console.log('fullScreenCommentWidth: ' + fullScreenCommentWidth)
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
}

//コメントの登録
async function registComment(videoId: string){
    if(commentInputVal.value == null || commentInputVal.value == '' || commentInputVal.value.length > maxCommentLength){ return }

    await videoService.registCommentForApi(videoId, commentInputVal.value, Math.floor(player.getCurrentTime()))

    const comment = {
        id: getUniqueStr(100),
        text: commentInputVal.value,
        time: Math.floor(player.getCurrentTime()),
        top:50
    } as VideoComment
    addVideoComment(comment)
    originalCommentItems.push(comment)
    setTimeout(() => {
        settingAddVideoCommentPosition(comment)
    })

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
let animations = [] as gsap.core.Tween[]
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
                if(player.getPlayerState == undefined) { return }
                if(player.getPlayerState() == 1){
                    const currentTime = Math.floor(player.getCurrentTime())

                    //動画の時間が戻ったら、または1秒以上進んだらコメントデータを再生成
                    if(currentTime < beforeTime || currentTime > beforeTime + 1){
                        console.log('コメント再生成!')
                        sortVideoCommentData = originalCommentItems.slice(0, originalCommentItems.length)
                        playerCommentItems.value.splice(0, playerCommentItems.value.length)
                        animations.splice(0, animations.length)
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
                            addVideoComment(x)
                        })
                    })

                    setTimeout(() => {
                        if(targetComments != null){
                            for (let i = 0; i < targetComments.length; i++) {
                                settingAddVideoCommentPosition(targetComments[i])
                                // const startRight = targetComments[i].text.length * 50 * -1
                                // const target = document.getElementById(targetComments[i].id)
                                // target.style.right = startRight + 'px'
                                // target.style.top = targetComments[i].top + '%'
                                // target.style.visibility = 'visible'
                            }
                        }
                    })
                    // playerCommentRef.value.style.zIndex = String(9999999999)

                    
                    sortVideoCommentData = sortVideoCommentData.filter(x => x.time != currentTime)

                }
            }, 500)
}

//動画コメントを追加して画面に流す
function addVideoComment(comment: VideoComment){
    playerCommentItems.value.push(comment)
    // videoService.registCommentForStore(x)

    //動画サイズを取得
    const videoWidth = (playerOverlayRef.value as HTMLElement).getBoundingClientRect().width

    setTimeout(() => {
        animations.push(gsap.to('#' + comment.id,{
            duration:10,
            x: (videoWidth + 1000) * -1, //幅は変わる可能性があるが、1000px以上変わることはないだろうと想定
            ease: 'none'
        }))
    })
}

//動画コメントの開始位調整
function settingAddVideoCommentPosition(comment: VideoComment){
    const startRight = comment.text.length * 50 * -1
    const target = document.getElementById(comment.id)
    target.style.right = startRight + 'px'
    target.style.top = comment.top + '%'
    target.style.visibility = 'visible'
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
        state.video.value.statistics = videoService.createDisplayStatistics(video.viewCount, new Date(video.publishDateTime), true)
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

    //scrollをTOPに持ってくる ※ページを更新した段階でScrollがTOPでないと、scroll位置を正確に取得することができずに、コンテンツのサイズの計算が狂ってしまう
    window.scrollTo(0,0)
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
    const dummySpList = state.info.value.spList.splice(0, state.info.value.spList.length)

    dummyList.forEach((x, i) => {
        let selected = false;
        if(i == index){
            x.selected = true
        }else{
            x.selected = false
        }

        state.info.value.list.push(x)
    })

    dummySpList.forEach((x, i) => {
        let selected = false;
        if(i == index){
            x.selected = true
        }else{
            x.selected = false
        }

        state.info.value.spList.push(x)
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
        playerVars: {loop:1, playlist: videoId, modestbranding:1, wmode: 'transparent',frameborder: 0, fs:0, rel:0,origin: 'https://localhost:3000' },
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
    //1.動画の再生状態を保持
    //2.動画の再生状態に合わせてアニメーションを止める・再開する
    //3.動画の時間が1秒以上変化していたらコメントを再生成する
    if (event.data == YT.PlayerState.PAUSED) {
        isPlaying.value = false
        animations.forEach(x =>{
            x.pause()
        })
    }else {
        isPlaying.value = true
        animations.forEach(x =>{
            x.play()
        })
    }

    if(beforeTime  > player.getCurrentTime() || beforeTime + 2 < player.getCurrentTime()){
        playerCommentItems.value.splice(0, playerCommentItems.value.length)
        animations.splice(0, animations.length)
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
    const targetIframe = document.getElementById('player') as HTMLIFrameElement
    if(targetContainer != null && targetIframe != null){
        targetContainer.style.width = String(videoWidth) + 'px'
        targetIframe.height = String(videoHeight) + 'px'
    }
}
</script>
