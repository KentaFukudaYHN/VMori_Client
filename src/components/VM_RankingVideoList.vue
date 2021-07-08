<style>
</style>

<template>
    <div class="rankingvideos-container" :class="{'rankingvideos-container-multi': isMulti}">
        <div v-for="(item, index) in videos" :key="item.id"
             :ref="refs[index][item.id]">
            <div class="rankingvideos-thumbnail">
                <img :src="item.thumbnailLink"/>
            </div>
            <div class="rankingvideos-description">
                <span class="rankingvideos-title">{{ item.title }}</span>
                <span class="rankingvideos-channel">{{ item.channelTitle }}</span>
                <span class="rankingvideos-statics">
                    <span class="rankingvideos-viewcount">
                        {{ displayStatistics(item.viewCount, item.publishDateTime) }}
                    </span>
                </span>
            </div>
        </div>
    </div>

</template>

<script lang="ts">
import { VideoService } from '@/services/VideoService'
import { VideoItem } from '@/store/modules/VideoModule'
import { computed, defineComponent, PropType, ref, SetupContext, watch } from 'vue'

type Props = {
    isMulti: boolean
    videos: Array<VideoItem>
}

let videoService: VideoService
const refs = []
const refKeys = []
export default defineComponent({
    props:{
        isMulti:{
            type: Boolean,
            default: false
        },
        videos:{
            type: Object as PropType<VideoItem[]>,
            default: [] as VideoItem[]
        }

    },
    setup(props: Props, context: SetupContext) {
        videoService = new VideoService()
        let videos = ref(props.videos.slice(0, props.videos.length))
        watch(props.videos, (newval, oldval) => {
            videos.value.splice(0, videos.value.length)
            newval.forEach(x => {
                videos.value.push(x)
            })
            //動画リストが更新されたら合わせて、サムネイルのrefも再生成する
            createThmbnailRefs(videos.value)

            setTimeout(() =>{
                //サムネイルサイズの再計算
                //onResizeThumbnail()
            })

        })

        //サムネイルのrefを生成
        createThmbnailRefs(props.videos)

        return {
            isMulti: computed(() => props.isMulti),
            videos: videos,
            refs,
            displayStatistics: (viewCount: number, publishDate: Date) => { return videoService.createDisplayStatistics(viewCount, publishDate) }
        }
    },
})

//サムネイルのrefを生成
function createThmbnailRefs(videos: VideoItem[]){
    //サムネイルのrefを初期化
    refs.splice(0, refs.length)
    refKeys.splice(0, refKeys.length)

    //サムネイルのrefを生成
    videos.forEach(x => {
        refs.push({ [x.id]: ref(null) })
        refKeys.push(x.id)
    })
}
</script>
