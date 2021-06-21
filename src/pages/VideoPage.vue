<style lang="scss">
    #videoContainer{
        margin:auto;
        font-size:15px;
        & #player{
            display: block;
            width:100%;
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
                <div id="player"></div>
                <div id="tagContainer">
                    <span v-for="tag in tags" :key="tag" class="tag-item">
                        {{tag}}
                    </span>
                </div>
                <div id="videoInfo">
                    <h1 id="videoTitle">
                        {{title}}
                    </h1>
                    <div id="videoStatistics">
                        {{ statistics }}
                        <div class="statistics-langcontainer">
                            <span class="statistics-langlabel">speak</span>
                            <span v-for="lang in speakLangs" :key="lang" class="statistics-langitem" >{{ lang }}</span>
                        </div>
                        <div v-if="showTranslationLangs" class="statistics-langcontainer">
                            <span class="statistics-langlabel">translation</span>
                            <span v-for="lang in translationLangs" :key="lang" class="statistics-langitem" >{{ lang }}</span>
                        </div>
                    </div>
                </div>

                <div class="info-border">

                </div>

                <div class="info-header">
                    <span v-for="item in infoList" :key="item.kinds"
                        :class="{'info-item-select': item.selected}"
                        @click="changeInfo(item.kinds)">
                        {{ item.text }}
                    </span>
                </div>
                <div v-if="channel != null" class="channel-header">
                    <img class="channel-icon" :src="channel.thumbnailUrl"/>
                    <div class="channel-titlecontainer">
                        <span class="channel-title">{{ channel.title }}</span>
                        <span class="channel-subscriver">{{displaySubscriverCount()}}</span>
                    </div>
                </div>

                <div v-if="showSummaryInfo" class="info-summarycontainer">
                    {{ description }}
                </div>

                <div v-if="showChannelInfo" id="channelContainer">
                    <div>
                        {{ channel.description }}
                    </div>
                </div>
            </div>
        </template>
    </vm-guide>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, reactive, ref, SetupContext, toRef, toRefs, Ref } from 'vue'
import VM_Guide from '@/components/VM_GuideMenu.vue'
import { VideoService } from '@/services/VideoService'
import { useRouter } from '@/router/router'
import { Router, useRoute } from 'vue-router'
import { VideoItem } from '@/store/modules/VideoModule'
import { VideoItemApitRes } from '@/apiReqRes/Video'
import { VideoLanguageKinds } from '@/commons/enum'
import { ChannelApiRes } from '@/apiReqRes/Video'



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
const infoList = [
    { text: '概要', kinds:infoKinds.summary, selected: true  },
    { text: 'チャンネル情報', kinds: infoKinds.channel, selected: false },
    { text: '動画一覧', kinds: infoKinds.videolist, selected: false },
    { text: 'チャンネルのび率', kinds: infoKinds.graph, selected: false }
] as infoItem[]

const state = toRefs(reactive({
    info:{
        list: [
            { text: '概要', kinds:infoKinds.summary, selected: true  },
            { text: 'チャンネル情報', kinds: infoKinds.channel, selected: false },
            { text: '動画一覧', kinds: infoKinds.videolist, selected: false },
            { text: 'チャンネルのび率', kinds: infoKinds.graph, selected: false }
        ] as infoItem[]
    }
}))

let player
let videoService: VideoService
let router: Router
let video = {} as VideoItemApitRes
let videoId: string
let tags: Ref<string[]>
let speakLangs: Ref<string[]>
let translationLangs: Ref<string[]>
let channel: ChannelApiRes
export default defineComponent({
    components:{
        'vm-guide': VM_Guide
    },
    async setup(props: Props, context: SetupContext) {
        videoService = new VideoService()
        router = useRouter()
        onMounted(async () => {
            //windowsの幅に合わせて動的に動画の幅を変えるためにresizeイベントを監視
            window.addEventListener('resize', onResizeVideo)

            if(videoService.getIsLoadedYoutubePlayer() == false){
                var tag = document.createElement('script');

                tag.src = "https://www.youtube.com/iframe_api";
                var firstScriptTag = document.getElementsByTagName('script')[0];
                firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

                await videoService.updateIsLoadedYoutubePlayer(true)

                window['onYouTubeIframeAPIReady'] = () => { initYoutube() }
            }else{
                initYoutube()
            }
        })

        //動画情報取得
        videoId = useRoute().query.v as string
        if(videoId == null || videoId == ""){
            router.push('Home')
        }
        if(videoId != null && videoId != ''){
            video = await videoService.getVideo(videoId)
            if(video == null){
                video = {} as VideoItemApitRes
                router.push('Home')
            }
        }

        //再生回数・公開日の設定
        let statistics = ''
        if(video.videoId != null && video.videoId != ''){
            statistics = videoService.createDisplayStatistics(video.latestStatistic.viewCount, new Date(video.publishDateTime), true)
        }

        //タグの設定
        tags = ref(video.tags)

        //話している言葉の設定
        speakLangs = ref([])
        if(video.speakJP) { speakLangs.value.push(convertVideoLangeKindsToSimpleString(VideoLanguageKinds.JP)) }
        if(video.speakEnglish) { speakLangs.value.push(convertVideoLangeKindsToSimpleString(VideoLanguageKinds.English)) }
        if(video.speakOther) { speakLangs.value.push(convertVideoLangeKindsToSimpleString(VideoLanguageKinds.Other)) }

        //翻訳している言語の設定
        translationLangs = ref([])
        if(video.translationJp) { translationLangs.value.push(convertVideoLangeKindsToSimpleString(VideoLanguageKinds.JP)) }
        if(video.translationEnglish) { translationLangs.value.push(convertVideoLangeKindsToSimpleString(VideoLanguageKinds.English)) }
        if(video.translationOther) { translationLangs.value.push(convertVideoLangeKindsToSimpleString(VideoLanguageKinds.Other)) }

        //チャンネル情報の設定
        channel = await videoService.getChannel(video.channelId)

        return {
            //タイトル
            title: video.videoTitle,
            //再生回数・投稿日時
            statistics: statistics,
            //タグ
            tags: tags,
            //話している言語
            speakLangs,
            //翻訳している言語
            translationLangs,
            //翻訳せいている言語を表示するか
            showTranslationLangs: computed(() => { return translationLangs.value.length > 0 }),
            //説明
            description: video.description,
            //メニュー情報
            infoList: state.info.value.list,
            changeInfo : (kinds: number) => { changeInfo(kinds) },
            //概要を表示するか
            showSummaryInfo: computed(() => { return isSelectedInfo(infoKinds.summary) }),
            //チャンネルを表示するか
            showChannelInfo: computed(() => { return channel != null && isSelectedInfo(infoKinds.channel) }),
            //チャンネル情報
            channel,
            //チャンネル登録者数
            displaySubscriverCount: () => { return createDisplaySubscriverCount(channel.subscriverCount) }
        }
    },
})

function isSelectedInfo(kinds: number){
    const target = state.info.value.list.find(x => x.kinds == kinds)
    if(target == null) { return false }

    return target.selected
}

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

declare var YT :any
async function initYoutube(){
    if(videoId == null || videoId == ''){
        return
    }

    player = new YT.Player('player', {
        height: '360',
        width: '640',
        videoId: videoId,
        playerVars: {loop:1, playlist: videoId},
        events: {
        'onReady': onPlayerReady,
        'onStateChange': onPlayerStateChange
        },
    });

    onResizeVideo()
}

function onPlayerReady(event){
    event.target.playVideo()
}

function onPlayerStateChange(event){
    // //ポーズ中関連動画は消す
    // if (event.data == YT.PlayerState.PAUSED) {
    //     const iframe = document.getElementById('player') as HTMLIFrameElement
    //     const pauseOverlay = iframe
    //                             .contentWindow
    //                             .document
    //                             .querySelector('.ytp-pause-overlay')
    //     debugger
    //     if(pauseOverlay != null  ){
    //         debugger
    //         pauseOverlay[0].remove()
    //     }
    // }
    
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
