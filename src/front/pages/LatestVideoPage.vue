<style lang="scss" scoped>
.home{
    &-searchcontainer{
        width: 80%;
        max-width: 1020px;
        margin: 0 auto;

        @include tab {
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

        @include tab{
            margin: 5px 0;
        }
    }
}

</style>

<template>
    <vm-guide @emit-search="searchVideosByText">
        <template v-slot:content>
            <div class="home-searchcontainer">
                <vm-search-genre class="home-searchgenre" :list="genreSelecterItems" :palleteList="genrePaletteItems" :selectGenre="selectedGenre" @emit-selectGenre="onSelectGenre"></vm-search-genre>
                <vm-search-detail class="home-searchdetail" @emit-clickSearchBtn="searchVideoByDetail"></vm-search-detail>
            </div>
                
            <vm-videolist :videos="videos" @emit-selectedVideo="selectedVideo"></vm-videolist>
        </template>
    </vm-guide>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import VM_Guide from '@/front/components/VM_GuideMenu.vue'
import VM_VideoList from '@/front/components/VM_VideoList.vue'
import VM_SearchGenre from '@/front/components/VM_SearchGenre.vue'
import VM_SearchDetail from '@/front/components/VM_SearchDetail.vue'
import { LatestVideoPageService } from '@/front/pageServices/LatestVideoPageService'
import { useRouter } from '@/router/router'
import { Router } from 'vue-router'
import { useStore } from '@/dataAccess/store/store'
import VMoriRepository from '@/dataAccess/repository/VMoriRepository'
import { SearchDetail } from '../componentReqRes/SearchDetail'

let router: Router
let latestVideoPageService: LatestVideoPageService
export default defineComponent({
    components:{
        'vm-videolist': VM_VideoList,
        'vm-guide': VM_Guide,
        'vm-search-genre': VM_SearchGenre,
        'vm-search-detail': VM_SearchDetail
    },
    async setup() {
        router = useRouter()
        latestVideoPageService = new LatestVideoPageService(useStore(), new VMoriRepository(router))
        
        //初期設定
        latestVideoPageService.init()

        return{
            videos: latestVideoPageService.getVideos(),
            //ジャンル選択リスト
            genreSelecterItems: latestVideoPageService.getSelecterItemsByGenre(),
            //ジャンルパレッド選択肢リスト
            genrePaletteItems: latestVideoPageService.getPaletteItemsByGenre(),
            //選択中のジャンル
            selectedGenre: latestVideoPageService.getSelectedGenreRef(),
            //ジャンルの選択
            onSelectGenre: (val: number) => { latestVideoPageService.selectedGenre(val)},
            //動画の選択
            selectedVideo: (videoId: string) => { latestVideoPageService.selectedVideo(videoId) },
            //テキスト検索
            searchVideosByText: (text: string) => latestVideoPageService.searchVideosByText(text),
            //詳細検索
            searchVideoByDetail: (searchDetail: SearchDetail) => latestVideoPageService.searchVideoByDetail(searchDetail)
        }
    },
})
</script>
