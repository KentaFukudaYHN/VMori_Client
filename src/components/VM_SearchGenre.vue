<style lang="scss" scoped>
    .searchgenre{
        &-item{
            display: inline-block;
            cursor: pointer;
            margin: 5px 10px;
            padding: 5px 10px;
            background:#cecece ;

            &-select{
                background-color: rgb(54, 54, 54);
                color: #fff;
            }
        }
    }
</style>

<template>
    <div class="searchgenre-container">
        <span v-for="item in genreList" :key="item.kinds"
              class="searchgenre-item" :class="{'searchgenre-item-select': item.selected}" 
              @click="selectItem(item.val)">
            {{ item.text }}
        </span>
    </div>
</template>

<script lang="ts">
import { SearchVideoGenreKinds, SearchVideoGenreKindsToString, VideoGenreKinds, VideoGenreKindsToString } from '@/commons/enum'
import { genreItem } from '@/componentReqRes/serarchGenre'
import { VideoService } from '@/services/VideoService'
import { defineComponent, reactive, Ref, ref, toRefs, watch } from 'vue'
import { useStore } from '@/store/store'
import { useRouter } from '@/router/router'
import { SelecterItem } from '@/componentReqRes/Selecter'
import VMRepository from '@/repository/VMoriRepository'
const state = toRefs(reactive({
    selectGenre: SearchVideoGenreKinds.TOP, //選択中のジャンル
    genreSelecerItems: [] as SelecterItem[] //ジャンルの選択肢
}))
let videoSearvice: VideoService
export default defineComponent({
    setup() {
        videoSearvice = new VideoService()

        //ジャンルの設定
        initWatchGenre()
        initGenreSelecterItems()

        return {
            genreList: state.genreSelecerItems,
            selectItem: (val) => { selectItem(val) }
        }
    },
})

//ジャンルの監視
function initWatchGenre(){
    watch(videoSearvice.getSearchCreteriaVideoModule(), (newval, oldval) => {
        if(state.selectGenre.value != newval.genle){
            initGenreSelecterItems()
        }  
    })
}

//ジャンルのリスト生成
function initGenreSelecterItems(){
    //選択中のジャンルを取得
    state.selectGenre.value = videoSearvice.getGenre()
    state.genreSelecerItems.value.splice(0, state.genreSelecerItems.value.length)

    Object.entries(SearchVideoGenreKinds).forEach(([key, val]) =>{
        const kindsNum = Number(key)
        const kinds = kindsNum as SearchVideoGenreKinds
        if(isNaN(kindsNum) == false){
            state.genreSelecerItems.value.push({
                val: kinds,
                text: SearchVideoGenreKindsToString(kinds),
                selected: state.selectGenre.value == kinds
            })
        }
    })
}

//ジャンルを更新
function selectItem(val: number){
    videoSearvice.updateGenre(val)
    videoSearvice.changeGenreVideoItem()
}


</script>
