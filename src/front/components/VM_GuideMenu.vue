<style lang="scss" scoped>
    .guide{
        display: flex;
        &-container{
            min-width:200px;
            height: 100%;
        }

        &-content{
            width: 100%;
            margin-bottom: 60px;
        }
        & .icon-latest-before{
            &:not(.active-page):hover{
                background: #e9e9e9;
            }
            display: flex;
            align-items: center;
            &::before{
                width: 25px;
                height: 25px;
                margin: 0 10px;
            }
        }

        & .icon-ranking-before{
            &:not(.active-page):hover{
                background: #e9e9e9;
            }
            display: flex;
            align-items: center;
            &::before{
                width: 25px;
                height: 25px;
                margin: 0 10px;
            }
        }

        & .icon-channels-before{
            &:not(.active-page):hover{
                background: #e9e9e9;
            }
            display: flex;
            align-items: center;
            &::before{
                width: 25px;
                height: 25px;
                margin: 0 10px;
            }
        }

        & .guide-container{
            nav{
                border-top: solid 1px #dcdcdc;
                border-bottom: solid 1px #dcdcdc;
                cursor: pointer;
            }
            li{
                padding: 15px 0;
                font-size: 15px;
            }
        }

        & .active-page{
            background: #cecece;
        }
    }
    .guide-sp{
        display: none;
        @include sp{
            display: flex;
            align-items: center;
            justify-content: space-around;
            position: fixed;
            bottom: 0;
            width: 100%;
            background: #fff;
            padding: 10px 0 10px 0;
                        
        }
        & .guidesp{

            &-menu{
                width: 23px;
                height: 23px;
                background-position: center;
                background-repeat: no-repeat;
                background-size: contain;
                opacity: 0.5;
            }
        }
        & .active-icon{
            opacity: 1;
        }
    }
</style>

<template>
    <vm-header :searchText="searchText" @emit-clickMenuBtn="onClickMenuBtn" @emit-clickSearchBtn="onClickSearchBtn"/>
    <div class="guide">
        <div v-if="menu.show" class="guide-container">
            <nav>
                <ul>
                    <li class="icon-latest-before" :class="{'active-page': openPageIsLatest}"
                        @click="clickLatestMenu">
                        NEW動画！！
                    </li>
                    <li class="icon-ranking-before" :class="{'active-page': openPageIsRanking}"
                        @click="clickRankingMenu">
                        逆ランキング
                    </li>
                    <li class="icon-channels-before" :class="{'active-page': openPageIsChannels}"
                        @click="clickChannelMenu">
                        チャンネル一覧
                    </li>
                </ul>
            </nav>
        </div>
        <div class="guide-content">
            <slot name="content"></slot>
        </div>
    </div>
    <div class="guide-sp">
        <div class="guidesp-menu icon-menusp-search" @click="clickLatestMenu" :class="{'active-icon': openPageIsLatest}"></div>
        <div class="guidesp-menu icon-menusp-like" @click="clickRankingMenu" :class="{'active-icon': openPageIsRanking}"></div>
        <div class="guidesp-menu icon-menusp-up" @click="showUploadVideo"></div>
        <div class="guidesp-menu icon-menusp-channels" @click="clickChannelMenu" :class="{'active-icon': openPageIsChannels}"></div>
        <div class="guidesp-menu icon-menusp-account" @click="clickAccountMenu" :class="{'active-icon': openPageIsAccount}"></div>
    </div>

    <vm-upvideo v-if="isShowUploadVideo" @emit-clickCloseBtn="closeUploadVideo"></vm-upvideo>

</template>

<script lang="ts">
import VM_Header from '@/front/components/VM_VideoHeader.vue'
import { defineComponent, reactive, toRefs, ref, SetupContext, watchEffect, computed } from 'vue'
import VM_UploadVideo from '@/front/components/VM_UploadVideo.vue'
import { AppStateService } from '@/core/services/AppStateService'
import { useStore } from '@/dataAccess/store/store'
import { pageSetting } from '@/dataAccess/entities/PageSetting'
import { useRouter } from '@/router/router'
import { useRoute } from 'vue-router'

type Props = {
    searchText: string
}

const state = toRefs(reactive({
    menu:{
        show: false
    },
    searchText: ''
}))

export default defineComponent({
    components:{
        'vm-header': VM_Header,
        'vm-upvideo': VM_UploadVideo
    },
    props:{
        searchText: {
            type: String
        }
    },
    emits:['emit-search'],
    setup(props: Props, context: SetupContext) {
        let isShowUploadVideo = ref(false)

        const router = useRouter()
        const route = useRoute()

        watchEffect(() => {
            state.searchText.value = props.searchText
        })

        const appStateService = new AppStateService(useStore())

        //メニュー
        return{
            menu: state.menu.value,
            onClickMenuBtn,
            //動画アップロードコンポーネントの表示フラグ
            isShowUploadVideo,
            //動画アップロードコンポーネントの表示
            showUploadVideo : () => { isShowUploadVideo.value = true },
            //動画アップロードコンポーネントを閉じる
            closeUploadVideo : () => { isShowUploadVideo.value = false },
            //検索実行
            onClickSearchBtn: (text: string) => { onClickSearchBtn(text, context) },
            //検索テキスト
            searchText: state.searchText,
            //現在のページ名
            pageName: computed(() => appStateService.getPageName()),
            //最新情報ページを開いているかどうか
            openPageIsLatest: computed(() => appStateService.getPageName() == pageSetting.LatesetVideo),
            //ランキング動画ページを開いているかどうか
            openPageIsRanking: computed(() => appStateService.getPageName() == pageSetting.VideoRanking),
            openPageIsAccount: computed(() => appStateService.getPageName() == pageSetting.Account),
            openPageIsChannels: computed(() => route.path.slice(1) == pageSetting.Channels),
            clickLatestMenu: () => router.push(pageSetting.LatesetVideo),
            clickRankingMenu: () => router.push(pageSetting.VideoRanking),
            clickChannelMenu: () => router.push(pageSetting.Channels),
            clickAccountMenu: () => router.push(pageSetting.Account)
        }
    },
})

//メニューボタンクリック
function onClickMenuBtn(){
    state.menu.value.show = !state.menu.value.show
}

//検索実行
function onClickSearchBtn(text: string, context: SetupContext){
    context.emit('emit-search', text)
}
</script>