<style lang="scss" scoped>
.videolist-container{
    display: flex;
    flex-wrap: wrap;
    margin: 40px;

    @include tab{
        justify-content: center;
    }
}
.video{
    &-container {
        cursor: pointer;
        margin: 0 15px 60px 15px;
        min-width: 214.5px;
        // min-height: 250px;
    }
    &-thumbnail{
        width:100%;
        height:80%;
        min-height: 112px;
        overflow: hidden;
        position: relative;
        & img{
            position: absolute;
            top: 50%;
            left: 50%;
            -webkit-transform: translate(-50%, -50%);
            -ms-transform: translate(-50%, -50%);
            transform: translate(-50%, -50%);
            width: 100%;
            height: auto;
        }
    }
    &-description{
        height: 20%;
        min-height: 6em;
        overflow: hidden;
    }
    &-title{
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        overflow: hidden;
        max-height: 3em;
        color: #030303;
        font-weight: bold;
    }
    &-channel{
        display: block;
        color:#606060;
        max-height:1.5em;
    }
    &-stastics{
        display: flex;
        color: #606060;
        max-height: 1.5em;
        align-items: center;
        justify-content: space-between;

        & .statics-platformicon{
            height: 1em;
        }
    }
}
</style>

<template>
    <div id="videoListContainer" class="videolist-container">
        <div v-for="(item, index) in items" :key="item.id"
             :ref="refs[index][item.id]" class="video-container"  
             @click="selectedVideo(item.id)">
            <div class="video-thumbnail">
                <img :src="item.thumbnailLink"/>
            </div>
            <div class="video-description">
                <span class="video-title">{{ item.title}}</span>
                <span class="video-channel">{{ item.channelTitle }}</span>
                <div class="video-stastics">
                    <span>{{ displayStatistics(item.viewCount, item.publishDateTime) }}</span>
                    <img class="statics-platformicon" :src="getPlatFormIconSrc(item.platFormKinds)">
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { VideoService } from '@/services/VideoService'
import { useStore } from '@/store/store'
import { useRouter } from '@/router/router'
import VMoriRepository  from '@/repository/VMoriRepository'
import { Video } from '@/store/getterTypes'
import { VideoItem } from '@/store/modules/VideoModule'
import { date } from 'yup/lib/locale'
import { VideoPlatFormKinds } from '@/commons/enum'
import { Router } from 'vue-router'

const refs = []
const refKeys = []
let videoService: VideoService
let router : Router
export default defineComponent({
    async setup() {
        const store = useStore()
        router = useRouter()
        videoService = new VideoService();

        onMounted(() => {
            //動的に画像の幅を変える為にresizeイベントを監視
            window.addEventListener('resize', onResizeThumbnail)
            //画像のサイズ調整
            onResizeThumbnail()
        })

        onBeforeUnmount(() =>{
            //resizeイベントの破棄
            window.removeEventListener('resize', onResizeThumbnail)
        })

        //動画リストの更新
        await videoService.initVideoItems()


        var videos = store.getters[Video.VIDEO_ITEM_LIST] as Array<VideoItem>

        const createRef = () => {
            refs.splice(0, refs.length)
            refKeys.splice(0, refKeys.length)
            videoService.getVideoItems().forEach(x => {
                refs.push({ [x.id]: ref(null) })
                refKeys.push(x.id)
            })
        }

        createRef()

        watch(videoService.getVideoItems(), (newval, oldval) => {
            createRef()
            setTimeout(() =>{
                onResizeThumbnail()
            })
        })

        return{
            items: store.getters[Video.VIDEO_ITEM_LIST] as Array<VideoItem>,
            refs,
            displayStatistics: (view:number, d:Date) => { return displayStatistics(view, d) },
            getPlatFormIconSrc: (kinds: VideoPlatFormKinds) => { return getPlatFormIconSrc(kinds) },
            selectedVideo: (val) => { selectedVideo(val) }
        }
    },
})

async function selectedVideo(videoId: string){
    router.push({name: 'Video', query: { v:videoId }})
}

//親要素のサイズに合わせてサムネイルのサイズを変える
function onResizeThumbnail(){
    const videoListContainer = document.getElementById('videoListContainer')
    const videoContainer = videoListContainer.getElementsByClassName('video-container')

    //現在のvideoListContainerのwidtからサイズ調整
    const listContainerWidth = videoListContainer.clientWidth

    //videoListContainerが1024px以上なら4カラムで表示される様にサイズ調整
    let colum = 4;
    if(listContainerWidth > 1500){
        colum = 5
    }else if(listContainerWidth > 1024){
        colum = 4
    }else if(listContainerWidth > 748){
        colum = 3
    }else if(window.innerWidth > 748){
        colum = 3
    }else if(listContainerWidth > 480) {
        colum = 2
    }
    const margin = 30

    //動画のmargin分を際引いた表示表示領域
    console.log(colum)
    const canDisplayWidth = listContainerWidth - (margin * colum)
    console.log(canDisplayWidth)
    console.log(margin * colum)

    //１動画のwidth
    const calcVideoWidth = Math.floor(canDisplayWidth / colum) 
    console.log(calcVideoWidth)

    //1動画のheight 横1 縦 0.7
    const calcVideoHeight = Math.floor(calcVideoWidth * 0.7)

    //計算したwidthとheightに更新
    for(let i=0;i<refs.length;i++){
        var target = (refs[i][refKeys[i]].value as HTMLElement)
        if(target == null){ continue }
        target.style.width = String(calcVideoWidth) + 'px'
        // target.style.height = String(calcVideoHeight) + 'px'

        var thumsnail =  target.getElementsByClassName('video-thumbnail')[0] as HTMLElement
        thumsnail.style.height = String(Math.floor(calcVideoHeight * 0.8)) + 'px'
    }
}

//表示用、動画プラットフォームのsrcを取得
function getPlatFormIconSrc(kinds:VideoPlatFormKinds){
   switch(kinds){
        case VideoPlatFormKinds.Youtube:
            return 'assets/yt_logo_rgb_light.png'
        case VideoPlatFormKinds.NikoNiko:
            return 'assets/nikoniko_icon.png'
   } 
}  


//表示用の統計情報を生成
function displayStatistics(viewCount: number, publishDate: Date){
    return videoService.createDisplayStatistics(viewCount, publishDate)
}
</script>
