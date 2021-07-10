<style lang="scss" scoped>
.vranking{
    &-searchcontainer{
        width: 80%;
        max-width: 1020px;
        margin: 0 auto;

        @include pc {
            display: flex;
            width:auto;
            margin: 0 11px;
            align-items: center;
            justify-content: end;
        }
    }

    &-searchgenre{
        padding: 10px;
        background: #f1f1f1;
    }

    &-searchdetail{
        margin: 5px 10px;

        @include pc{
            margin: 5px 0;
        }
    }

    &-videolist-container{
        display: flex;
        margin: 0 20px;
        width:100%;
        @include pc{
            margin: 0;
        }
    }

    &-videolist-content{
        display: flex;
        width: 100%;
    }

    &-videolist-number{
        margin-top:46px;
        font-family: 'Open Sans', sans-serif;
        font-size: 45px;
        color: $gray-font-color;
        text-align: center;
        @include pc{
            font-size: 35px;
            text-align: right;
        }
        @include sp{
            display: none;
        }
    }
}

.videolist{
    &-container{
        display: block;
        margin:0;

        & .video{
            &-container{
                border: solid 1px #cccccc;
            }

            &-thumbnail{
                min-height: 0;
            }

            &-description{
                padding: 5px 5px 5px 5px;
                height: auto;
            }

            &-title{
                font-size: 12px;
            }

            &-stastics{
                max-height: none;
                display: block;
            }

            & .statics-viewcount{
                display: block;
                margin-bottom: 2px;
            }
        }
    }
    &-genre-title{
        text-align: center;
        font-weight: bold;
    }
}
.video{
    &-container{
        margin-bottom: 15px;
    }
    &-channel{
        overflow: hidden;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 1;
    }
    &-viewcount{
        overflow: hidden;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 1;
    }
}

.vranking-single{
    & .video-container{
        display: flex;
        max-width: 900px ;
        @include sp{
            margin:0;
        }
        & .video-thumbnail{
            width: 300px !important;
            height: 120px !important;

            @include sp{
                width: 200px !important;
                height: 82px !important;
            }
        }

        & .video-title{
            font-size: 14px;
        }

        & .video-description{
            width: 100%;
        }
    }
}
</style>

<template>
    <vm-guide>
        <template v-slot:content>
            <div class="vranking-searchcontainer">
                <vm-search-genre></vm-search-genre>
                <vm-search-detail class="vranking-searchdetail"></vm-search-detail>
            </div>
            
            <div id="rankingVideoListContainer" class="vranking-videolist-container" :class="{'vranking-single': !isMulti}">
                <!-- <vm-ranking-videolist v-for="genreVideo in genreVideos" :key="genreVideo.genre" 
                                    class="vranking-videolist"
                                    :isMulti="false"
                                    :videos="genreVideo.items"/> -->

                <div class="vranking-videolist-number">
                    <div v-for="ranking in rankingNumbers" :key="ranking"
                         class="ranking-number">
                        {{ ranking }}
                    </div>
                </div>
                <div class="vranking-videolist-content">
                    <div  v-for="(genreVideo, index) in genreVideos" :key="genreVideo.genreKinds" v-show="isMulti != false || index ==0"
                        class="videolist-container">
                        <p class="videolist-genre-title">{{displayGenre(genreVideo.genreKinds)}}</p>
                        <div v-for="(item, index) in genreVideo.items" :key="item.id"
                            :ref="rankingVideosByGenreRef[Number(genreVideo.genreKinds)].refs[Number(index)][item.id]"
                            class="video-container">
                            <div class="video-thumbnail">
                                <img :src="item.thumbnailLink"/>
                            </div>
                            <div class="video-description ">
                                <span class="video-title">{{ item.title }}</span>
                                <span class="video-channel">{{ item.channelTitle }}</span>
                                <span class="video-stastics">
                                    <span class="video-viewcount">
                                        {{ displayStatistics(item.viewCount, item.publishDateTime) }}
                                    </span>
                                </span>
                            </div>
                        </div>

                    </div>
                </div>

            </div>
            <!-- <vm-videolist :videos="videos" @emit-selectedVideo="selectedVideo"></vm-videolist> -->
        </template>
    </vm-guide>
</template>

<script lang="ts">
import { defineComponent, onBeforeMount, onMounted, Ref, ref, watch } from 'vue'
import VM_Guide from '@/components/VM_GuideMenu.vue'
import VM_VideoList from '@/components/VM_VideoList.vue'
import VM_SearchGenre from '@/components/VM_SearchGenre.vue'
import VM_SearchDetail from '@/components/VM_SearchDetail.vue'
import VM_RankingVideoList from '@/components/VM_RankingVideoList.vue'
import { RankingVideoService } from '@/services/RankingVideoService'
import { useRouter } from '@/router/router'
import { Router } from 'vue-router'
import { useStore } from '@/store/store'
import VMoriRepository from '@/repository/VMoriRepository'
import { VideoGenreKinds, VideoGenreKindsToString } from '@/commons/enum'
import { VideoService } from '@/services/VideoService'
import { VideoSummaryByGenreApiRes, VideoSummaryInfoByGenreApiRes } from '@/apiReqRes/RankingVideo'
import { appSetting } from '@/entities/AppSetting'
import { VideoSummaryItemApiRes } from '@/apiReqRes/Video'

let router: Router
//ジャンル別ランキングの動画情報のref
type rankingVideosByGenreRef = {
    refs: any[],
    refKeys: string[]
}
let rankingVideosByGenreRef: {}
let rankingVideos: VideoSummaryByGenreApiRes[]
let isMulti: Ref<boolean>
export default defineComponent({
    components:{
        'vm-guide': VM_Guide,
        'vm-search-genre': VM_SearchGenre,
        'vm-search-detail': VM_SearchDetail,
        'vm-ranking-videolist': VM_RankingVideoList
    },
    async setup() {
        onMounted(() => {
            console.log('rankingmounted')
            //動的に画像の幅を変える為にresizeイベントを監視
            window.addEventListener('resize', onResizeTumbnail)
            //画像のサイズ調整
            onResizeTumbnail()
        })

        onBeforeMount(() =>{
            //resizeイベントの破棄
            window.removeEventListener('resize', onResizeTumbnail)
        })

        router = useRouter()
        const rankingVideoService = new RankingVideoService(useStore(), new VMoriRepository(router))
        const videoService = new VideoService()
        const rankingVideoInfo = await rankingVideoService.getTopVideos()
        isMulti = ref(false)
        rankingVideos = rankingVideoInfo.items.filter(x => x.items.length != 0)
        
        const maxItemLength = rankingVideoInfo.items.sort((a, b) =>{
            return b.items.length - a.items.length
        })[0].items.length
        const rankingNumbers = [] as number[]
        for (let i = 0; i < maxItemLength; i++) {
            rankingNumbers.push(i+1)
        }

        rankingVideosByGenreRef = createRefs(rankingVideoInfo)
        return{
            genreVideos: rankingVideos,
            getGenreDisplay: (val) => VideoGenreKindsToString(val),
            displayStatistics: (viewCount: number, publishDate: Date) => { return videoService.createDisplayStatistics(viewCount, publishDate) },
            displayGenre: (val) =>  VideoGenreKindsToString(val),
            rankingNumbers: rankingNumbers,
            rankingVideosByGenreRef: rankingVideosByGenreRef,
            isMulti: isMulti
        }
    },
})

//ジャンル別ランキング動画のrefを生成
function createRefs(apiRes: VideoSummaryInfoByGenreApiRes){
    const result = {}
    //ジャンルごとにrefを生成
    apiRes.items.forEach(videoRankingByGenre => {
        //追加するrankingVideoByGenreRefを生成
        const rankingVideosByGenreRef = {} as rankingVideosByGenreRef
        rankingVideosByGenreRef.refs = []
        rankingVideosByGenreRef.refKeys = []

        //動画ごとにregを生成
        videoRankingByGenre.items.forEach(video => {
            rankingVideosByGenreRef.refs.push({[video.id]: ref(null)})
            rankingVideosByGenreRef.refKeys.push(video.id)
        })
        result[videoRankingByGenre.genreKinds] = rankingVideosByGenreRef
    })
    return result
}

function selectedVideo(videoId: string){
    router.push({name: 'Video', query: { v:videoId }})
}

//親要素のサイズに合わせて動画情報のサイズを変える
function onResizeTumbnail(){
    const videoListContainer = document.getElementById('rankingVideoListContainer')
    const rankingNumberContainer = document.getElementsByClassName('vranking-videolist-number')[0]

    const windowWidth = document.body.clientWidth;
    //windowが1024px以上なら5カラムで表示される様にサイズ調整
    let colum = 5;
    if(window.matchMedia('(min-width:1500px)').matches){
        colum = 5
    }else if(window.matchMedia('(min-width:' + appSetting.media.pc + 'px)').matches ){
        console.log('window.match pc')
        colum = 5
    }else if(window.matchMedia('(min-width:' + appSetting.media.tab + 'px)').matches ){
        console.log('window.match tab')
        colum = 1
        setResizeVideos(rankingVideos[0].items, rankingVideos[0].genreKinds, 'auto', 'auto')
        setTimeout(() =>{
            initResizeRankingNumber(true)
        })
        isMulti.value = false
    }else {
        console.log('window.match sp')
        colum = 1
        setResizeVideos(rankingVideos[0].items, rankingVideos[0].genreKinds, 'auto', 'auto')
        setTimeout(() =>{
            initResizeRankingNumber(true)
        })
        isMulti.value = false
    }

    if(colum == 1){ return }
    isMulti.value = true

    let margin = 30


    //スマホ表示はmarginが10になる ※cssで設定
    if(window.innerWidth < appSetting.media.sp){
        margin = 10
    }

    //動画表示可能領域
    let listContainerWidth = videoListContainer.clientWidth - rankingNumberContainer.clientWidth - 20 - 20

    //動画のmargin分を際引いた表示表示領域
    const canDisplayWidth = listContainerWidth - (margin * colum)

    //１動画のwidth
    let calcVideoWidth = Math.floor(canDisplayWidth / colum) 

    //スマホ表示はboderを1px引くのでその分widthを引く ※borderはcssで設定済み
    calcVideoWidth -= 2

    //1動画のheight 横1 縦 0.7
    const calcVideoHeight = Math.floor(calcVideoWidth * 0.7)

    //計算したwidthとheightに更新
    for(let i=0;i<rankingVideos.length;i++){
        const width = String(calcVideoWidth) + 'px'
        const height = String(Math.floor(calcVideoHeight * 0.8)) + 'px'
        setResizeVideos(rankingVideos[i].items, rankingVideos[i].genreKinds, width, height)
    }
    debugger
    //ランキングのナンバーの高さも調整
    setTimeout(() =>{
        initResizeRankingNumber(false)
    })
}

//動画のリサイズ
function setResizeVideos(targetRankingVideos: VideoSummaryItemApiRes[], genre: VideoGenreKinds, width: string, height: string){
    const targetRefEntity = rankingVideosByGenreRef[genre]
    for (let j = 0; j < targetRankingVideos.length; j++) {
        const target = targetRefEntity.refs[j][targetRankingVideos[j].id].value as HTMLElement
        if(target == null) { continue }
        target.style.width = width

        var thumsnail =  target.getElementsByClassName('video-thumbnail')[0] as HTMLElement
        thumsnail.style.height = height
    }
}

//ランキングナンバーのリサイズ
function initResizeRankingNumber(setLineHeight: boolean){
    const rankingNumberElms = document.getElementsByClassName('ranking-number')
    for(let i=0; i< rankingNumberElms.length; i++){
        const target = rankingNumberElms[i] as HTMLElement
        const videoHeighjt = (document.getElementsByClassName('video-container')[0] as HTMLElement ).clientHeight
        const targetHeight = videoHeighjt + 15
        if(setLineHeight){
            target.style.lineHeight = String(targetHeight) + 'px'
            target.style.height = String(targetHeight - 15) + 'px'
            target.style.marginBottom = '15px'
        }else{
            target.style.lineHeight = 'none'
            target.style.height = String(targetHeight) + 'px'
            target.style.marginBottom = '0'
        }
    }
}

</script>
