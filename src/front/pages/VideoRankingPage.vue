<style lang="scss" scoped>
.vranking{
    &-searchcontainer{
        width: 80%;
        max-width: 1020px;
        margin: 0 auto;
        flex-wrap: wrap;

        @include pc {
            display: flex;
            width:auto;
            margin: 0 15px;
            align-items: center;
            justify-content: end;
        }
    }

    &-searchgenre{
        padding: 10px;
        margin-bottom: 10px;
        background: #f1f1f1;
        @include pc{
            margin-bottom: 0;
        }
    }

    &-searchdetail{
        margin: 10px 0px 10px 0;

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
        @include tab{
            font-size: 35px;
            text-align: right;
        }
        @include pc{
            display: none;
        }
    }

    &-searchgenre{
        // margin-right: 5px;
        @include pc{
            padding: 0px;
            background: transparent;
            margin-right: 5px;
        }

        // @include tab{
        //     margin-top: 10px;
        // }
    }
    &-sort{
        margin-right: 5px;

        display: inline-block;
        // @include tab{
        //     margin-top: 10px;
        // }
    }
    &-searchdetail{
        margin-right: 5px;
        // @include tab{
        //     margin-top: 15px;
        // }
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
                height:3em;
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

        & .icon-youtubeviewcount-before::before{
            vertical-align: middle;
            margin-right: 5px;
            margin-bottom: 2px; 
            width:20px;
            height: 1em;
        }

        & .icon-vmoriviewcount-before::before{
            vertical-align: middle;
            margin-right: 5px;
            margin-bottom: 2px; 
            width:20px;
            height: 1em;
        }
    }
    &-genre-title{
        text-align: center;
        font-weight: bold;
        @include sp{
            display: none;
        }
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
    justify-content: center;
    width: auto;
    margin: auto;
    & .vranking-videolist-content{
        width: auto;
    }
    & .video-container{
        display: flex;
        width:auto !important;
        max-width: 900px ;
        margin-bottom:0;
        border-bottom: 0;
        @include sp{
            margin:0;
        }
        & .video-thumbnail{
            width:610px !important;
            height: 200px !important;
            @include pc{
                width: 300px !important;
                height: 120px !important;
            }

            @include sp{
                width: 156px !important;
                height: 88px !important;
                flex-shrink: 0;
            }
        }

        & .video-title{
            font-size: 16px;
            color: #358a00;
            height: auto;
            @include sp{
                font-size: 12px;
                color: $base-font-color;
            }
        }

        & .video-channel{
            font-size: 15px;
            @include sp{
                font-size: 10px;
            }
        }

        & .video-stastics{
            font-size: 15px;
            @include sp{
                font-size: 10px;
            }
        }

        & .video-description{
            width: 100%;
            padding:3px;
        }
    }
}

.vranking-period{
    &-container{
        margin: 10px 0;
        display: flex;
        justify-content: space-around;
        @include pc{
            order: 4;
            width: 100%;
            margin: 0;
        }
    }
    &-item{
        cursor: pointer;
        width: 100%;
        text-align: center;
        font-weight: bold;
        border: solid 1px $theme-color;
        border-radius: 3px;
        background: #fff;
        padding: 10px 0;
        margin: 10px 10px 10px 0px;
        color: $theme-color;;
        white-space: nowrap;

        @include pc{
            padding: 5px 10px;
        }
    }
}
.period-item-selected{
    background: $theme-color;
    color: #fff;
}

.vranking-pagination{
    display: flex;
    justify-content: center;
}
.vranking-pagination{
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
.vranking-pagination-header{
    @include sp{
        margin-bottom: 10px;
    }
}

.vranking-pagination-footer{
    margin-top:10px;
}
</style>

<template>
    <vm-guide @emit-search="changeText" :searchText="searchText">
        <template v-slot:content>
            <div class="vranking-searchcontainer">
                <vm-search-genre class="vranking-searchgenre" :list="getGenreSelecterItems" :palleteList="getPaletteItemsByGenre" :selectGenre="selectedGenre" @emit-selectGenre="changeGenreVideos"></vm-search-genre>
                <div class="vranking-period-container">
                    <span class="vranking-period-item" :class="{'period-item-selected': item.selected}"
                      v-for="item in periods" :key="item.val"
                      @click="selectPeriod(item.val)">
                        {{ item.text }}
                    </span>
                </div>
                <vm-selectsort :selSortKinds="selSortKinds" @emit-changeSort="changeSort" class="vranking-sort"> </vm-selectsort>
                <vm-search-detail class="vranking-searchdetail" @emit-clickSearchBtn="searchVieoByDetail"></vm-search-detail>
                <div class="vranking-pagination vranking-pagination-header" v-if="showPagination">
                    <vm-pagination :currentPage="currentPage" :totalRecord="totalRecord" :displayItem="displayItem" :rangeSize="paginationRange" @emit-clickPage="selectedPage"></vm-pagination>
                </div>
            </div>
            
            <div id="rankingVideoListContainer" class="vranking-videolist-container" :class="{'vranking-single': !isMulti }">
                <!-- <vm-ranking-videolist v-for="genreVideo in genreVideos" :key="genreVideo.genre" 
                                    class="vranking-videolist"
                                    :isMulti="false"
                                    :videos="genreVideo.items"/> -->

                <!-- ランキングナンバー -->
                <div class="vranking-videolist-number">
                    <div v-for="ranking in rankingNumbers" :key="ranking"
                         class="ranking-number">
                        {{ ranking }}
                    </div>
                </div>

                <!-- ランキング動画 -->
                <div class="vranking-videolist-content">
                    <div  v-for="(genreVideo, index) in genreVideos" :key="index" v-show="isMulti != false || index ==0"
                        class="videolist-container">
                        <p class="videolist-genre-title">{{displayGenre(genreVideo.genreKinds)}}</p>
                        <div v-for="(item, index2) in genreVideo.items" :key="index2"
                            @click="selectedVideo(item.id)"
                            class="video-container">
                            <div class="video-thumbnail">
                                <img :src="item.thumbnailLink"/>
                            </div>
                            <div class="video-description ">
                                <span class="video-title">{{ item.title }}</span>
                                <span class="video-channel">{{ item.channelTitle }}</span>
                                <span class="video-stastics">
                                    <span class="video-viewcount-vmori icon-vmoriviewcount-before">    
                                        {{ displayStatistics(item.vMoriViewCount, item.registDateTime) }}
                                    </span>
                                    <span class="video-viewcount icon-youtubeviewcount-before">
                                        {{ displayStatistics(item.viewCount, item.publishDateTime) }}
                                    </span>
                                </span>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
            <div class="vranking-pagination vranking-pagination-footer" v-if="showPagination">
                <vm-pagination :currentPage="currentPage" :totalRecord="totalCount" :displayItem="displayNum" :rangeSize="paginationRange" @emit-clickPage="selectedPage">></vm-pagination>
            </div>

            <!-- <vm-videolist :videos="videos" @emit-selectedVideo="selectedVideo"></vm-videolist> -->
        </template>
    </vm-guide>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import VM_Guide from '@/front/components/VM_GuideMenu.vue'
import VM_SearchGenre from '@/front/components/VM_SearchGenre.vue'
import VM_SearchDetail from '@/front/components/VM_SearchDetail.vue'
import VM_RankingVideoList from '@/front/components/VM_RankingVideoList.vue'
import { useRouter } from '@/router/router'
import { useStore } from '@/dataAccess/store/store'
import { RankingVideoPageService } from '@/front/pageServices/RankingVideoPageService'
import { videoUtility } from '@/front/utilitys/videoUtility'
import { PeriodKinds, SortKinds, VideoGenreKinds, VideoGenreKindsToString } from '@/core/enum'
import VM_SelectSort from '@/front/components/VM_SelectSort.vue'
import { SearchDetail } from '../componentReqRes/SearchDetail'
import VM_Pagenation from '@/front/components/VM_Pagination.vue'

export default defineComponent({
    components:{
        'vm-guide': VM_Guide,
        'vm-search-genre': VM_SearchGenre,
        'vm-search-detail': VM_SearchDetail,
        'vm-ranking-videolist': VM_RankingVideoList,
        'vm-selectsort': VM_SelectSort,
        'vm-pagination': VM_Pagenation,
    },
    async setup() {

        //初期化処理
        const rankingVideoService = new RankingVideoPageService(useStore(), useRouter())
        await rankingVideoService.init()

        //状態取得
        const state = rankingVideoService.getState()
        return{
            //ジャンル別ランキング動画のリスト
            genreVideos: state.videos,
            //動画統計情報
            displayStatistics: (viewCount: number, publishDate: Date) =>  videoUtility.createDisplayStatistics(viewCount, publishDate),
            //ジャンルの表示文字列
            displayGenre: (val) =>  VideoGenreKindsToString(val),
            //ランキングのナンバー ※一番動画が多いジャンルの数に合わせて生成
            rankingNumbers: state.rankingNumber,
            //複数ジャンルのランキングを表示するかどうか
            isMulti: state.isMulti,
            //複数ジャンルのランキングを表示するかどうか
            //ジャンル選択肢情報
            getGenreSelecterItems: rankingVideoService.getGenreSelecterItems(),
            //ジャンルパレッド選択肢情報
            getPaletteItemsByGenre: rankingVideoService.getPaletteItemsByGenre(),
            //選択中のジャンル
            selectedGenre: state.search.genre,
            //ジャンルの変更
            changeGenreVideos: (val: VideoGenreKinds) => rankingVideoService.changeGenreVideos(val),
            //並び順の変更
            changeSort: (val:SortKinds) => rankingVideoService.changeSort(val),
            //動画の選択
            selectedVideo: (videoId: string) => rankingVideoService.selectedVideo(videoId),
            //並び順種類
            selSortKinds: state.sortKinds,
            //詳細検索
            searchVieoByDetail: (searchDetail: SearchDetail) => rankingVideoService.searchVieoByDetail(searchDetail),
            //期間
            periods: state.periodList,
            //期間選択
            selectPeriod: (kinds: PeriodKinds) => rankingVideoService.selectedPeriod(kinds),
            //テキスト検索
            changeText: (text: string) => rankingVideoService.changeText(text),
            //検索テキスト
            searchText: state.search.text,
            //現在のページ
            currentPage: state.currentPage,
            //ページネーションの表示有無
            showPaging: state.showPaging,
            //1ページの表示数
            displayNum: rankingVideoService.getDisplayNum(),
            //動画の総数
            totalCount: state.totalItemCount,
            //ページの選択
            selectedPage: (page: number) => rankingVideoService.selectedPatge(page),
            //ページネーションの表示有無
            showPagination: rankingVideoService.showPagination(),
            //ページネーションの番号どれだけ表示するか
            paginationRange: state.pagingRangeSize
        }
    },
})
</script>
