<style lang="scss" scoped>
.home{
    &-searchcontainer{
        width: 80%;
        max-width: 1020px;
        margin: 0 auto;
    }

    &-searchdetail{
        margin: 5px 10px;
    }
}

</style>

<template>
    <vm-guide>
        <template v-slot:content>
            <div class="home-searchcontainer">
                <vm-search-genre></vm-search-genre>
                <vm-search-detail class="home-searchdetail"></vm-search-detail>
            </div>
                
            <vm-videolist :videos="videos" @emit-selectedVideo="selectedVideo"></vm-videolist>
        </template>
    </vm-guide>
</template>

<script lang="ts">
import { defineComponent, watch, ref } from 'vue'
import VM_Guide from '@/components/VM_GuideMenu.vue'
import VM_VideoList from '@/components/VM_VideoList.vue'
import VM_SearchGenre from '@/components/VM_SearchGenre.vue'
import VM_SearchDetail from '@/components/VM_SearchDetail.vue'
import { VideoService } from '@/services/VideoService'
import { useRouter } from '@/router/router'
import { Router } from 'vue-router'

let router: Router
export default defineComponent({
    components:{
        'vm-videolist': VM_VideoList,
        'vm-guide': VM_Guide,
        'vm-search-genre': VM_SearchGenre,
        'vm-search-detail': VM_SearchDetail
    },
    async setup() {
        //動画情報の初期化
        router = useRouter()
        const videoService = new VideoService()
        await videoService.initVideoItems()

        var tmpVideos = videoService.getVideoItems()
        const videos = ref(tmpVideos.slice(0, tmpVideos.length))

        watch(videoService.getVideoItems(), (newval, oldval)=>{
            const dummy = newval.slice(0, newval.length)
            videos.value.splice(0, videos.value.length)
            dummy.forEach(x => {
                videos.value.push(x)
            })
        })
        return{
            videos: videos,
            selectedVideo: (videoId: string) => { selectedVideo(videoId) }
        }
    },
})

function selectedVideo(videoId: string){
    router.push({name: 'Video', query: { v:videoId }})
}
</script>
