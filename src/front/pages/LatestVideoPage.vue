<style lang="scss" scoped>
.home{
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
            flex-wrap: wrap;
        }
    }

    &-sort{
        margin: 15px 0px 10px 0;
        @include pc{
            margin: 0 10px 0 0;
        }
    }

    &-searchgenre{
        padding: 10px;
        background: #f1f1f1;
        @include pc{
            background: transparent;
        }
    }

    &-searchdetail{
        margin: 5px 0px;

        @include pc{
            margin: 5px 0;
        }
    }
}

.home-pagination{
    display: flex;
    justify-content: center;
}
.home-pagination{
    display: flex;
    justify-content: center;
    @include pc{
        order: 5;
        width: 100%;

        & ::v-deep{
            & .pagination-item{
                @include sp{
                    margin: 0 3px;
                }
            }
            & .item-next {
                @include tab{
                    background: transparent;
                    font-size:0;
                    cursor: pointer;
                    position: relative;
                    vertical-align: middle;
                    text-decoration: none;
                }

                @include sp{
                    padding: 5px 5px;
                    margin: 0;
                }
                
                &::after{
                    @include tab{
                        position: absolute;
                        margin: auto;
                        content: "";
                        vertical-align: middle;
                        left: 5px;
                        top: 0px;
                        width: 8px;
                        height: 8px;
                        border-top: 2px solid $gray-font-color;
                        border-right: 2px solid $gray-font-color;
                        -webkit-transform: rotate(45deg);
                        transform: rotate(45deg);
                    }

                    @include sp{
                        left:0;
                        margin: 0;
                    }
                }
            }

            & .item-prev {
                @include tab{
                    background: transparent;
                    font-size:0;
                    cursor: pointer;
                    position: relative;
                    vertical-align: middle;
                    text-decoration: none;
                }

                @include sp{
                    padding: 5px 5px;
                }
                
                &::after{
                    @include tab{
                        position: absolute;
                        margin: auto;
                        content: "";
                        vertical-align: middle;
                        right: 5px;
                        top: 0px;
                        width: 8px;
                        height: 8px;
                        border-top: 2px solid $gray-font-color;
                        border-right: 2px solid $gray-font-color;
                        -webkit-transform: rotate(225deg);
                        transform: rotate(225deg);
                    }

                    @include sp{
                        right:0;
                    }
                }
            }

        }
    }
}
.home-pagination-header{
    @include sp{
        margin-bottom: 10px;
    }
}

.home-pagination-footer{
    margin-top:10px;
}

</style>

<template>
    <vm-guide @emit-search="searchVideosByText">
        <template v-slot:content>
            <div class="home-searchcontainer">
                <vm-search-genre class="home-searchgenre" :list="genreSelecterItems" :palleteList="genrePaletteItems" :selectGenre="selectedGenre" @emit-selectGenre="onSelectGenre"></vm-search-genre>
                <vm-select-sort :selectList="selectSortList" :selSortKinds="selectedSortKinds" @emit-changeSort="selectedSort" class="home-sort"> </vm-select-sort>

                <vm-search-detail class="home-searchdetail" @emit-clickSearchBtn="searchVideoByDetail"></vm-search-detail>
                <div v-if="showPagination" class="home-pagination home-pagination-header">
                    <vm-pagination :currentPage="currentPage" :totalRecord="totalRecord" :displayItem="displayNum" :rangeSize="pageRenge" @emit-clickPage="selectedPage"></vm-pagination>
                </div>
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
import VM_SelectSort  from '@/front/components/VM_SelectSort.vue'
import VM_Pagination from '@/front/components/VM_Pagination.vue'
import { LatestVideoPageService } from '@/front/pageServices/LatestVideoPageService'
import { useRouter } from '@/router/router'
import { Router } from 'vue-router'
import { useStore } from '@/dataAccess/store/store'
import VMoriRepository from '@/dataAccess/repository/VMoriRepository'
import { SearchDetail } from '../componentReqRes/SearchDetail'
import { SortKinds } from '@/core/enum'

let router: Router
let latestVideoPageService: LatestVideoPageService
export default defineComponent({
    components:{
        'vm-videolist': VM_VideoList,
        'vm-guide': VM_Guide,
        'vm-search-genre': VM_SearchGenre,
        'vm-search-detail': VM_SearchDetail,
        'vm-select-sort': VM_SelectSort,
        'vm-pagination': VM_Pagination
    },
    async setup() {
        router = useRouter()
        latestVideoPageService = new LatestVideoPageService(useStore(), new VMoriRepository(router))
        
        //初期設定
        latestVideoPageService.init()

        const state = latestVideoPageService.getState()

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
            searchVideoByDetail: (searchDetail: SearchDetail) => latestVideoPageService.searchVideoByDetail(searchDetail),
            //並び替えの選択肢
            selectSortList: [SortKinds.RegistDateTime, SortKinds.PublishDateTime],
            //選択している並び替え
            selectedSortKinds: state.sortKinds,
            //並び順の選択
            selectedSort: (val: SortKinds) => latestVideoPageService.selectedSort(val),
            //現在のページ
            currentPage: state.currentPage,
            //1ページあたりの表示数
            displayNum: latestVideoPageService.getDisplayNum(),
            //総レコード数
            totalRecord: state.totalRecords,
            //ページ番号表示範囲
            pageRenge: state.pageRange,
            //ページネーション表示の有無
            showPagination: latestVideoPageService.getShowPagination(),
            //ページの選択
            selectedPage: (page :number) => latestVideoPageService.selectedPage(page) 
        }
    },
})
</script>
