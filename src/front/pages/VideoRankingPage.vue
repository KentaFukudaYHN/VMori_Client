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
                <vm-search-genre :list="getGenreSelecterItems" :selectGenre="selectedGenre"></vm-search-genre>
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
import { computed, defineComponent } from 'vue'
import VM_Guide from '@/front/components/VM_GuideMenu.vue'
import VM_SearchGenre from '@/front/components/VM_SearchGenre.vue'
import VM_SearchDetail from '@/front/components/VM_SearchDetail.vue'
import VM_RankingVideoList from '@/front/components/VM_RankingVideoList.vue'
import { useRouter } from '@/router/router'
import { useStore } from '@/dataAccess/store/store'
import { RankingVideoPageService } from '@/front/pageServices/RankingVideoPageService'
import { videoUtility } from '@/front/utilitys/videoUtility'
import { VideoGenreKindsToString } from '@/core/enum'

export default defineComponent({
    components:{
        'vm-guide': VM_Guide,
        'vm-search-genre': VM_SearchGenre,
        'vm-search-detail': VM_SearchDetail,
        'vm-ranking-videolist': VM_RankingVideoList
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
            isMulti: state.isMulti,
            //ジャンル選択肢情報
            getGenreSelecterItems: rankingVideoService.getGenreSelecterItems(),
            //選択中のジャンル
            selectedGenre: computed(() => state.search.value.genre)
        }
    },
})
</script>
