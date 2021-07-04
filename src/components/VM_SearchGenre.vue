<style lang="scss" scoped>
    .searchgenre{
        &-container{
            @include sp{
                display: none;
            }

            &-sp{
                display: none;
                @include sp{
                    display: block;
                }
            }
        }
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

            &-selectsp{
                background-color: $gray-font-color;
                color: #fff;
                padding: 5px 0px 5px 10px;

                &::after{
                    content: '';
                    display: INLINE-BLOCK;
                    background-color: transparent;
                    width: 0;
                    /* margin-bottom: -1px; */
                    margin: 0px 5px -1px 5px;
                    border-left: 7px solid transparent;
                    border-right: 7px solid transparent;
                    border-top: 10px solid #FFF;
                }
            }
        }
    }

    ::v-deep .genrepalette-window{
        @include sp{
            width: 90%;
        }

        & .genrepalette-container{
            height: auto;
        }
    }
</style>

<template>
    <div>
        <div class="searchgenre-container">
            <span v-for="item in genreList" :key="item.kinds"
                class="searchgenre-item" :class="{'searchgenre-item-select': item.selected}" 
                @click="selectItem(item.val)">
                {{ item.text }}
            </span>
        </div>
        <div class="searchgenre-container-sp">
            <span class="searchgenre-item-selectsp" @click="showGenrePalette">{{ selectedItem.text }}</span>
        </div>

        <vm-selgenrepalette v-if="isShowGenrePalette" @emit-selectedGenre="selectGenrePalette" @emit-clickCloseBtn="closeGenrePalette" 
                            windowClass="genrepalette-window" :addTop="true"></vm-selgenrepalette>
    </div>
</template>

<script lang="ts">
import { SearchVideoGenreKinds, SearchVideoGenreKindsToString, VideoGenreKinds, VideoGenreKindsToString } from '@/commons/enum'
import { VideoService } from '@/services/VideoService'
import { computed, defineComponent, reactive, Ref, ref, toRefs, watch } from 'vue'
import { SelecterItem } from '@/componentReqRes/Selecter'
import VM_SelGenrePalette from '@/components/VM_SelGenrePalette.vue'

const state = toRefs(reactive({
    selectGenre: SearchVideoGenreKinds.TOP, //選択中のジャンル
    genreSelecerItems: [] as SelecterItem[],//ジャンルの選択肢
    showGenrePalette: false
}))
let videoSearvice: VideoService
export default defineComponent({
    components:{
        'vm-selgenrepalette' : VM_SelGenrePalette
    },
    setup() {
        videoSearvice = new VideoService()

        //ジャンルの設定
        initWatchGenre()
        initGenreSelecterItems()

        return {
            //ジャンル選択リスト
            genreList: state.genreSelecerItems,
            //選択中のジャンル取得 ※モバイル表示用
            selectedItem: computed(() => { 
                const result = state.genreSelecerItems.value.find(x => x.selected == true)  as SelecterItem
                if(result == null){
                    return {}
                }

                return result
            }),
            //ジャンル選択パレッドの表示有無
            isShowGenrePalette: state.showGenrePalette,
            //ジャンル選択パレッドの表示
            showGenrePalette: () => { state.showGenrePalette.value = true },
            //ジャンル選択パレッドを閉じる
            closeGenrePalette: () => { state.showGenrePalette.value = false },
            //ジャンルの選択
            selectItem: (val) => { selectItem(val) },
            //ジャンル選択パレッドでジャンルの選択
            selectGenrePalette: (val) => { 
                state.showGenrePalette.value = false
                selectItem(val)
            },
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
}


</script>
