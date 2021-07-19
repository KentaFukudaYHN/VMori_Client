<style lang="scss" scoped>
    .guide{
        display: flex;
        &-container{
            width:200px;
            height: 100%;
        }

        &-content{
            width: 100%;
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
                width: 30px;
                height: 30px;
                background-position: center;
                background-repeat: no-repeat;
                background-size: contain;
            }
        }
    }
</style>

<template>
    <vm-header :searchText="searchText" @emit-clickMenuBtn="onClickMenuBtn" @emit-clickSearchBtn="onClickSearchBtn"/>
    <div class="guide">
        <div v-if="menu.show" class="guide-container">
            <nav>
                <ul>
                    <li>
                        ホーム
                    </li>
                    <li>
                        ライブラリ
                    </li>
                </ul>
            </nav>
        </div>
        <div class="guide-content">
            <slot name="content"></slot>
        </div>
    </div>
    <div class="guide-sp">
        <div class="guidesp-menu icon-menusp-search"></div>
        <div class="guidesp-menu icon-menusp-like"></div>
        <div class="guidesp-menu icon-menusp-up" @click="showUploadVideo"></div>
        <div class="guidesp-menu icon-menusp-history"></div>
        <div class="guidesp-menu icon-menusp-channels"></div>
    </div>

    <vm-upvideo v-if="isShowUploadVideo" @emit-clickCloseBtn="closeUploadVideo"></vm-upvideo>

</template>

<script lang="ts">
import VM_Header from '@/front/components/VM_VideoHeader.vue'
import { defineComponent, reactive, toRefs, ref, SetupContext, watchEffect, computed } from 'vue'
import VM_UploadVideo from '@/front/components/VM_UploadVideo.vue'

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

        watchEffect(() => {
            state.searchText.value = props.searchText
        })

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