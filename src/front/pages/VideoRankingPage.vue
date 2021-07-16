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
        background: #f1f1f1;
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

        @include tab{
            margin-top: 10px;
        }
    }
    &-sort{
        margin-right: 5px;

        display: inline-block;
        @include tab{
            margin-top: 10px;
        }
    }
    &-searchdetail{
        margin-right: 5px;
        @include tab{
            margin-top: 15px;
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
</style>

<template>
    <vm-guide>
        <template v-slot:content>
            <div class="vranking-searchcontainer">
                <vm-search-genre class="vranking-searchgenre" :list="getGenreSelecterItems" :palleteList="getPaletteItemsByGenre" :selectGenre="selectedGenre" @emit-selectGenre="changeGenreVideos"></vm-search-genre>
                <vm-search-detail class="vranking-searchdetail"></vm-search-detail>
                <vm-selectsort :selSortKinds="selSortKinds" @emit-changeSort="changeSort" class="vranking-sort"> </vm-selectsort>
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
                            :ref="rankingVideosByGenreRef[Number(genreVideo.genreKinds)].refs[Number(index2)][item.id]"
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
import { SortKinds, VideoGenreKinds, VideoGenreKindsToString } from '@/core/enum'
import VM_SelectSort from '@/front/components/VM_SelectSort.vue'

export default defineComponent({
    components:{
        'vm-guide': VM_Guide,
        'vm-search-genre': VM_SearchGenre,
        'vm-search-detail': VM_SearchDetail,
        'vm-ranking-videolist': VM_RankingVideoList,
        'vm-selectsort': VM_SelectSort
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
            rankingNumbers: rankingVideoService.getRankingNumbers(),
            //ジャンル分けされた各動画のref
            rankingVideosByGenreRef: state.videosByGenreRef,
            //複数ジャンルのランキングを表示するかどうか
            isMulti: computed(() => rankingVideoService.getIsMulti()),
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
            selSortKinds: state.sortKinds
        }
    },
})
</script>
