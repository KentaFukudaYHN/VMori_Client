<style lang="scss" scoped>
.vranking{
    &-searchcontainer{
        width: 80%;
        max-width: 1020px;
        margin: 0 auto;

        @include sp {
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

        @include sp{
            margin: 5px 0;
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
            
            <vm-ranking-videolist v-for="genreVideo in genreVideos" :key="genreVideo.genre" 
                                  :isMulti="false"
                                  :videos="genreVideo.items"/>
            <!-- <vm-videolist :videos="videos" @emit-selectedVideo="selectedVideo"></vm-videolist> -->
        </template>
    </vm-guide>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue'
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

let router: Router
export default defineComponent({
    components:{
        'vm-guide': VM_Guide,
        'vm-search-genre': VM_SearchGenre,
        'vm-search-detail': VM_SearchDetail,
        'vm-ranking-videolist': VM_RankingVideoList
    },
    async setup() {
        router = useRouter()
        const rankingVideoService = new RankingVideoService(useStore(), new VMoriRepository(router))
        const genreVideos = await rankingVideoService.getTopVideos()
        console.log(genreVideos)
        return{
            genreVideos: genreVideos.items,
            selectedVideo: (videoId: string) => { selectedVideo(videoId) }
        }
    },
})

function selectedVideo(videoId: string){
    router.push({name: 'Video', query: { v:videoId }})
}
</script>
