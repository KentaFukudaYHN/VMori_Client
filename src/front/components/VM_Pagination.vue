<style lang="scss" scoped>
    .pagination{
        display: flex;
        align-items: center;

        //一番前に戻るボタン
        & .before-chunk{
            cursor: pointer;
            width: 20px;
            height: 15px;
            position: relative;
            vertical-align: middle;
            text-decoration: none;
            border-left: 2px solid $gray-font-color;
            font-size: 15px;
            
            &::after{
                position: absolute;
                margin: auto;
                content: "";
                vertical-align: middle;
                right: 5px;
                top: 2.5px;
                width: 8px;
                height: 8px;
                border-top: 2px solid $gray-font-color;
                border-right: 2px solid $gray-font-color;
                -webkit-transform: rotate(225deg);
                transform: rotate(225deg);
            }
        }
        /* 一番後に進ボタン */
        & .after-chunk{
            cursor: pointer;
            width: 20px;
            height: 15px;
            position: relative;
            vertical-align: middle;
            text-decoration: none;
            border-right: 2px solid $gray-font-color;
            font-size: 15px;
            
            &::after{
                position: absolute;
                margin: auto;
                content: "";
                vertical-align: middle;
                left: 5px;
                top: 2.5px;
                width: 8px;
                height: 8px;
                border-top: 2px solid $gray-font-color;
                border-right: 2px solid $gray-font-color;
                -webkit-transform: rotate(45deg);
                transform: rotate(45deg);
            }
        }

        /** 前に戻るボタン */
        & .item-prev{
            cursor: pointer;
            background: $gray-font-color;
            color:#fff;
            padding: 5px 10px;
            margin: 0 5px;
        }

        /** ページ番号 */
        & .pagination-item{
            cursor: pointer;
            background: $gray-font-color;
            color:#fff;
            padding: 5px 10px;
            margin: 0 5px;
            opacity: 0.5;
            //選択中のアイテム
            &.pagination-item-active{
                background: $theme-color;
                opacity: 1;
            }
        }



        /** 次に進むボタン */
        & .item-next{
            cursor: pointer;
            background: $gray-font-color;
            color:#fff;
            padding: 5px 10px;
            margin: 0 5px;
        }
    }
</style>

<template>
    <ul class="pagination">
        <li class="before-chunk" @click="selectedPage(1)"></li>
        <li class="item-prev" @click="beforePage">もどる</li>
        <li class="pagination-item" @click="selectedPage(1)" :class="{'pagination-item-active': currentPage == 1}">1</li>
        <li class="pagination-beforeshort" v-if="isBeforeShort">･･</li>
        <li class="pagination-item" @click="selectedPage(item)" :class="{'pagination-item-active': currentPage == item}" v-for="item in items" :key="item">{{ item }}</li>
        <li class="pagination-aftershort" v-if="isAfterShort == true">･･</li>
        <li class="pagination-item" @click="selectedPage(endPage)" :class="{'pagination-item-active': currentPage == endPage}">{{endPage}}</li>
        <li class="item-next" @click="afterPage">すすむ</li>
        <li class="after-chunk" @click="selectedPage(endPage)"></li>
    </ul>
</template>

<script lang="ts">
import { defineComponent, Ref, ref, SetupContext, watch, watchEffect } from 'vue'

//表示アイテム種類
enum displayItemKinds{
    //値を持ったアイテム
    val = 10,
    //表示用の何の動作もしないアイテム
    display = 20,
}

//表示アイテムType
type displayItem = {
    text: string,
    val: number,
    type: displayItemKinds,
}

type Props = {
    //現在のページ
    currentPage: number
    //総ページ数
    totalRecord: number
    //１ページに表示するアイテム数
    displayItem: number
    //現在のページ数を基準にいくつページ番号を表示するか
    rangeSize: number
}

//
const state = {
    //表示アイテム
    items: ref([]) as Ref<number[]>,
    //最終ページ(総ページ数)
    endPage: ref(0),
    //現在のページ
    currentPage: ref(1),
    //総アイテム数
    total: ref(1),
    //開始省略の有無
    isBeforeShort: ref(false),
    //終了省略の有無
    isAfterShort: ref(false),
    //現在のページ数を基準にいくつページ番号を表示するか
    rangeSize: ref(1),
    //１ページに表示するアイテム数
    displayItem: ref(1),
}

export default defineComponent({
    props:{
        //現在のページ
        currentPage: {
            type: Number,
            default: 1
        },
        //総レコード数
        totalRecord:{
            type:Number
        },
        //一ページに表示するアイテム数
        displayItem:{
            type: Number
        },
        //現在のページ数を基準にいくつページ番号を表示するか
        rangeSize:{
            type:Number
        }
    },
    emits:['emit-clickPage'],
    setup(props: Props, context:SetupContext) {

        state.currentPage.value = props.currentPage
        state.total.value = props.totalRecord
        state.rangeSize.value = props.rangeSize
        state.displayItem.value = props.displayItem

        watch(props,(newval, oldval) => {
            let isRefresh = false
            if(state.currentPage.value != newval.currentPage){
                state.currentPage.value = newval.currentPage
                isRefresh = true
            }

            if(state.total.value != newval.totalRecord){
                state.total.value = newval.totalRecord
                isRefresh = true
            }

            if(state.rangeSize.value != newval.rangeSize){
                state.rangeSize.value = newval.rangeSize
                isRefresh = true
            }

            if(isRefresh){
                refreshPagination()
            }
        })

        refreshPagination()

        return{
            //表示番号
            items: state.items,
            //開始省略の有無
            isBeforeShort: state.isBeforeShort,
            //終了省略の有無
            isAfterShort: state.isAfterShort,
            //最終ページ
            endPage: state.endPage,
            //現在のページ
            currentPage: state.currentPage,
            selectedPage: (page: number) =>{
                context.emit('emit-clickPage', page)
                // state.currentPage.value = page
                // refreshPagination()
            },
            beforePage: () =>{
                if(state.currentPage.value -1 == 0) { return }
                context.emit('emit-clickPage', state.currentPage.value -1)
            },
            afterPage: () =>{
                if(state.currentPage.value + 1 >= state.endPage.value) { return }
                context.emit('emit-clickPage', state.currentPage.value + 1)
            }
        }
    }
})

/**ページネーションをリフレッシュ */
function refreshPagination(){
        //ページ数を計算
        state.endPage.value = Math.ceil(state.total.value / state.displayItem.value)

        //開始ページを計算
        let startPage = 2
        if(state.currentPage.value > (state.rangeSize.value)){
            startPage = state.currentPage.value - state.rangeSize.value
            state.isBeforeShort.value = true
        }

        //終了ページを計算
        let endPage = state.endPage.value
        if(state.currentPage.value < (state.endPage.value - state.rangeSize.value)){
            if(state.currentPage.value <= state.rangeSize.value){
                endPage = state.rangeSize.value * 2 + 1
            }else{
                endPage = state.currentPage.value + state.rangeSize.value
            }

            if(endPage > state.endPage.value){
                endPage = state.endPage.value
                state.isAfterShort.value = false
            }else{
                state.isAfterShort.value = true
            }
        }else{
                state.isAfterShort.value = false
        }

        //表示番号を生成
        state.items.value.splice(0, state.items.value.length)
        for(let i=startPage;i<endPage;i++){
            state.items.value.push(i)
        }
}
</script>
