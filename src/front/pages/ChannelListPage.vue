<style lang="scss" scoped>
    .channel-title{
        background:#13d5c7;
        color:#fff;
        font-weight: bold;
        width: 80%;
        margin: auto;
        padding: 10px 20px;

    }
    .channel-container{
        display: flex;
        flex-wrap: wrap;
        width:80%;
        margin:auto;

        @include sp{
            width: 100%;
        }
        & p {
            margin:0;
        }
        & .channel{
            &-item{
                //左右のmargin変えたらrisizeイベントのでサイズ調整しているmarginも変える
                margin: 20px 30px;
                @include pc{
                    width: 25%;
                }
                @include sp{
                    margin: 10px 15px;
                }
                & img{
                    width: 100%;
                    border-radius: 50%;
                    margin:10px;
                }

                & .item{
                    &-title{
                        font-size: 18px;
                        height: 3.1em;
                        overflow: hidden;
                        display: -webkit-box;
                        -webkit-box-orient: vertical;
                        -webkit-line-clamp: 2;
                        @include pc{
                            font-size: 16px
                        }
                        @include tab{
                            font-size: 14px;
                        }
                    }

                    &-info{
                        font-size:13px;
                        color: $gray-font-color;
                        margin: 2px 0 10px 0;
                        @include tab{
                            font-size: 12px;
                        }
                        @include sp{
                            font-size:  11px;
                        }
                    }
                }
                & .btn-primary{
                    width: 100%;
                }
            }
        }
    }
</style>

<template>
    <vm-guide>
        <template v-slot:content>
            <h2 class="channel-title">
                チャンネル一覧
            </h2>
            <div id="channelContainer" class="channel-container">
                <div class="channel-item" v-for="(item, index) in channels" :key="index">
                    <p>
                        <img :src="item.thmbnailUrl">
                    </p>
                    <p class="item-title">
                        {{ item.title }}
                    </p>
                    <div class="item-info">
                        <p>登録者数: {{ createDisplaySubscriber(item.subscriverCount) }}人</p>
                        <p>総再生数: {{ createDisplayViewCount(item.viewCount) }}回</p>
                        <p>動画数: {{ item.videoCount }}本</p>
                    </div>
                    <button class="btn-primary">掲示板</button>
                </div>
            </div>
        </template>
    </vm-guide>
</template>

<script>
import { defineComponent } from 'vue'
import { ChannelListPageService } from '@/front/pageServices/ChannelListPageService'
import { useStore } from '@/dataAccess/store/store'
import { useRouter } from '@/router/router'
import VM_Guide from '@/front/components/VM_GuideMenu.vue'
import { videoUtility } from '../utilitys/videoUtility'


export default defineComponent({
    components:{
        'vm-guide': VM_Guide,
    },
    async setup() {
        //ページ情報初期化処理
        const channelListPageService = new ChannelListPageService(useStore(), useRouter())
        await channelListPageService.init()

        //ページ状態を取得
        const state = channelListPageService.getState()

        return {
            channels: state.channels,
            createDisplayViewCount: (viewCount) =>  { return videoUtility.createDisplayViewCount(viewCount) },
            createDisplaySubscriber: (subscriber) => { return videoUtility.crateDisplaySubscriber(subscriber)}

        }
    },
})
</script>
