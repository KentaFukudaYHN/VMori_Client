<style lang="scss" scoped>

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
                    <span class="statics-viewcount">{{ displayStatistics(item.viewCount, item.publishDateTime) }}</span>
                    <img class="statics-platformicon" :src="getPlatFormIconSrc(item.platFormKinds)">
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, onBeforeUnmount, onMounted, ref, watch, PropType, SetupContext } from 'vue'
import { VideoService } from '@/services/VideoService'
import { VideoItem } from '@/store/modules/VideoModule'
import { VideoPlatFormKinds } from '@/commons/enum'
import { appSetting } from '@/entities/AppSetting'


type Props = {
    videos: Array<VideoItem>
}

let videoService: VideoService
const refs = []
const refKeys = []
export default defineComponent({
    props:{
        videos:{
            type: Object as PropType<VideoItem[]>,
            default: [] as VideoItem[]
        }
    },
    emits:['emit-selectedVideo'],
    async setup(props: Props, context: SetupContext) {
        videoService = new VideoService()

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

        var videos = ref(props.videos.slice(0,props.videos.length))

        watch(props.videos, (newval, oldval) =>{
            videos.value.splice(0, videos.value.length)
            newval.forEach(x => {
                videos.value.push(x)
            })

            //動画リストが更新されたら合わせて、サムネイルのrefも再生成する
            createRef()
            setTimeout(() =>{
                //サムネイルサイズの再計算
                onResizeThumbnail()
            })
        })


        //サムネイルのrefを生成
        const createRef = () => {
            refs.splice(0, refs.length)
            refKeys.splice(0, refKeys.length)
            videos.value.forEach(x => {
                refs.push({ [x.id]: ref(null) })
                refKeys.push(x.id)
            })
        }

        createRef()

        return{
            items: videos,
            refs,
            displayStatistics: (view:number, d:Date) => { return displayStatistics(view, d) },
            getPlatFormIconSrc: (kinds: VideoPlatFormKinds) => { return getPlatFormIconSrc(kinds) },
            selectedVideo: (val) => { selectedVideo(val, context) }
        }
    },
})

async function selectedVideo(videoId: string, context: SetupContext){
    context.emit('emit-selectedVideo', videoId)
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
    }else if(listContainerWidth > appSetting.media.pc){
        colum = 4
    }else if(window.innerWidth > appSetting.media.tab){
        colum = 3
    // }else if(listContainerWidth > 480) {
    //     colum = 2
    // }
    }else {
        colum = 2
    }
    let margin = 30

    //スマホ表示はmarginが10になる ※cssで設定
    if(window.innerWidth < appSetting.media.sp){
        margin = 10
    }

    //動画のmargin分を際引いた表示表示領域
    const canDisplayWidth = listContainerWidth - (margin * colum)

    //１動画のwidth
    let calcVideoWidth = Math.floor(canDisplayWidth / colum) 
    console.log(calcVideoWidth)

    //スマホ表示はboderを1px引くのでその分widthを引く ※borderはcssで設定済み
    calcVideoWidth -= 2

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
