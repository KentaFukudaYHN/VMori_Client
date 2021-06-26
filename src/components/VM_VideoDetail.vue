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


        & #playeroOverlay.fullscreen-on.player-playing-no + #playerComment + #fullScreenBtn{
            visibility: visible;
        }

        & #fullScreenBtn:hover{
            visibility: visible !important;
        }

        & #playeroOverlay.fullscreen-on.player-playing + #playerComment + #fullScreenBtn{
            visibility: hidden ;
        }
        & #playeroOverlay.fullscreen-none:hover + #playerComment + #fullScreenBtn{
            visibility: visible !important;
        }
        & #playeroOverlay.fullscreen-on:hover + #playerComment + #fullScreenBtn{
            animation-name: hiddenAnimation;
            animation-duration: 3s;
        }
        @keyframes hiddenAnimation {
            to{
                visibility: visible;
            }
            from{
                visibility: hidden;
            }
        }
        & #playeroOverlay.fullscreen-none.player-playing-no  + #playerComment + #fullScreenBtn{
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
                <div ref="fullScreenContainer"  >
                    <div  id="playeroOverlay" ref="playerOverlayRef" :class="{'fullscreen-none': !isFullScreenMode, 'fullscreen-on': isFullScreenMode, 'player-playing': isPlaying, 'player-playing-no': !isPlaying}">
                        <div ref="playerRef" id="player" ></div>
                        <!-- <iframe id="player" width="560" height="315" :src="youtubeVideoSrc" frameborder="0" allow="accelerometer; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe> -->
                    </div>
                    <div id="playerComment" ref="playerCommentRef">
                        <!-- このspanがないとなぜかiframeの下に動的に追加したspanが隠れる -->
                        <span></span>
                        <span v-for="item in playerCommentItems" :key="item.id" :id="item.id" class="player-comment"> {{ item.text}}</span>
                    </div>
                    <span ref="fullScreenBtnRef" id="fullScreenBtn" @click="onClickFullScreen">フルスクリーン</span>
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
import { Router, useRoute } from 'vue-router'
import { VideoItem } from '@/store/modules/VideoModule'
import { VideoItemApitRes } from '@/apiReqRes/Video'
import { VideoLanguageKinds } from '@/commons/enum'
import { ChannelApiRes } from '@/apiReqRes/Video'
import VM_VideoList from '@/components/VM_VideoList.vue'
import VM_Chart from '@/components/VM_ChannelTransitionChart.vue'
import { ChannelTransition } from '@/componentReqRes/channelTransition'
import { gsap } from 'gsap'


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

type commentItem = {
    id: string,
    text: string,
    time: number,
    top
}

function getUniqueStr(myStrong: number){
 var strong = 1000;
 if (myStrong) strong = myStrong;
 return 'a' +( new Date().getTime().toString(16)  + Math.floor(strong*Math.random()).toString(16))
}

function createTestDate(){
    //生成する文字列に含める文字セット
    var c = "あいうえおかきくけこさしすせそなにぬねのたちつてとさしすせそらりるれろはまやらわazkjovpojsbopreapojsdopj0-348905843985感蟻立鳥後濁下記食楽未来夢"
    var cl = c.length

    var result = [] as commentItem[]
    for (let i = 0; i < 100; i++) {
        //テキストの生成
        let text = '';
        let textL = randRange(1, 10)
        for (let l = 0; l < textL; l++) {
            text += c[Math.floor(Math.random()*cl)]          
        }

        let time = randRange(1, 100)

        result.push({
            id: getUniqueStr(100),
            text: text,
            time: time,
            top: 0
        })
    }

    return result
}

let player
let playerRef
let playerCommentRef
let fullScreenContainer
let videoService: VideoService
let router: Router
let channel: ChannelApiRes
let commentStartRight
let isPlaying = ref(false)
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

        playerRef = ref(null)
        let playerOverlayRef = ref(null)
        playerCommentRef = ref(null)
        let fullScreenBtnRef = ref(null)
        let playerCommentItems = ref([] as commentItem[])
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


                //フルスクリーンボタンの位置を動画サイズに合わせて調整
                let rightEnd = target.getBoundingClientRect().right - targetWidth
                let fullScreenSetTop = target.getBoundingClientRect().bottom - (Math.floor(targetHeight * 0.12)) as number
                let fullScreenSetRight = rightEnd as number + 20 as number

                (fullScreenBtnRef.value as HTMLElement).style.right = String(fullScreenSetRight) + 'px' as string
                (fullScreenBtnRef.value as HTMLElement).style.top = String(fullScreenSetTop) + 'px' as string

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
            
            //1秒ごとにYoutubeの再生時間を取得し、該当の時間に登録されているコメントを流す
            const testDatas = createTestDate()
            //時間でソート
            let sortTestData = testDatas.sort((a,b) => {
                return new Date(a.time).getTime() - new Date(b.time).getTime()
            })

            let beforeData:commentItem = null
            let cnt = 1
            for (let i = 0; i < sortTestData.length; i++) {
                if(beforeData == null){
                    sortTestData[i].top = 0
                }else{
                    if((sortTestData[i].time - beforeData.time) > 10){
                        sortTestData[i].top = 0
                        cnt = 1
                    }else{
                        sortTestData[i].top = (cnt * 10)
                        cnt++
                        if(cnt >= 10) { cnt = 1 }
                    }
                }

                beforeData = sortTestData[i]
            }
            console.log('でーた')
            console.log(sortTestData)
            getPlayTimeInterval = setInterval(() => {
                if(player.getPlayerState() == 1){
                    const currentTime = Math.floor(player.getCurrentTime())
                    console.log(currentTime)
                    const targetComments = sortTestData.filter(x => x.time == currentTime)

                    if(targetComments == null || targetComments.length == 0){
                        return
                    }
                    console.log(targetComments)
                    targetComments.forEach(x => {
                        playerCommentItems.value.push(x)
                        // const commentOvrery = document.getElementById('playerComment')
                        // const xVal = (commentOvrery.getBoundingClientRect().width + (x.text.length  * 50) + 100) * -1
                        setTimeout(() => {
                            gsap.to('#' + x.id,{
                                duration:500,
                                x: - 100000,
                                ease: 'none'
                            })
                        }, 1000)
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

                    
                    sortTestData = sortTestData.filter(x => x.time != currentTime)

                }
            }, 1000)

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
            fullScreenContainer,
            video: state.video.value,
            youtubeVideoSrc: youtubeVideoSrc,
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
            isPlaying: isPlaying
        }
    },
})



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
