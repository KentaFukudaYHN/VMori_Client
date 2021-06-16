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
        <div :ref="refs[index][item.id]" class="video-container" v-for="(item, index) in items" :key="item.id">
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
import { defineComponent, onBeforeUnmount, onMounted, ref } from 'vue'
import { VideoService } from '@/services/VideoService'
import { useStore } from '@/store/store'
import { useRouter } from '@/router/router'
import VMoriRepository  from '@/repository/VMoriRepository'
import { Video } from '@/store/getterTypes'
import { VideoItem } from '@/store/modules/VideoModule'
import { date } from 'yup/lib/locale'
import { VideoPlatFormKinds } from '@/commons/enum'

const refs = []
const refKeys = []
export default defineComponent({
    async setup() {
        const store = useStore()
        const router = useRouter()
        const repository = new VMoriRepository(router)
        const videoService = new VideoService(store, repository);

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

        videos.forEach(x => {
            refs.push({ [x.id]: ref(null) })
            refKeys.push(x.id)
        })

        return{
            items: store.getters[Video.VIDEO_ITEM_LIST] as Array<VideoItem>,
            refs,
            displayStatistics: (view:number, d:Date) => { return displayStatistics(view, d) },
            getPlatFormIconSrc: (kinds: VideoPlatFormKinds) => { return getPlatFormIconSrc(kinds) }
        }
    },
})

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
    /*再生回数のテキスト生成*/
    let viewCountText = String(viewCount)
    const billion = 100000000
    if(viewCount >= 10000){
        viewCountText = String(Math.floor(viewCount/ 10000) / 10) + '万'
    }else if(viewCount >= billion){
        viewCountText = String(Math.floor(viewCount / billion) / 10) + '億'
    }
    viewCountText += ' 回視聴'

    /*投稿日時のテキスト生成*/
    //投稿日時と現在の差分を求める //1カ月は30日とする
    const now = new Date()
    const nowByUtc = new Date(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(), now.getUTCHours(), now.getUTCMinutes(), now.getUTCSeconds(), now.getUTCMilliseconds())
    const diffByMm = (nowByUtc.getTime() - new Date(publishDate).getTime())

let dateText = ''
    if(diffByMm < (1000 * 60)){
        //1分以内なら秒を表示
        dateText = String(Math.floor(diffByMm / 1000)) + '秒'
    } else if(diffByMm < (1000 * 60 * 60)){
        //1時間以内なら分を表示
        dateText = String(Math.floor(diffByMm / 1000 / 60)) + '分'
    }else if(diffByMm < (1000 * 60 * 60 * 24)){
        //1日以内なら時間を表示
        dateText = String(Math.floor(diffByMm / 1000 / 60 / 60)) + '時間'
    }else if(diffByMm < (1000 * 60 * 60 * 24 * 30)){
        //1カ月以内なら日にちを表示
        dateText = String(Math.floor(diffByMm / 1000 / 60 / 60 / 24)) + '日'
    }else if(diffByMm < (1000 * 60 * 60 * 24 * 30 * 12)){
        //一年以内なら月を表示
        dateText = String(Math.floor(diffByMm / 1000 / 60 / 60 / 24 / 30)) + '月'
    }else{
        //それ以上は年で計算
        dateText = String(Math.floor(diffByMm / 1000 / 60 / 60 / 24 / 30 / 12)) + '年'
    }

    dateText += '前'

    return viewCountText + '・' + dateText
}
</script>
