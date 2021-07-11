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
import { SearchVideoGenreKinds} from '@/core/enum'
import { computed, defineComponent, PropType, reactive, SetupContext, toRefs, watchEffect } from 'vue'
import { SelecterItem } from '@/front/componentReqRes/Selecter'
import VM_SelGenrePalette from '@/front/components/VM_SelGenrePalette.vue'

type Props = {
    //選択肢のリスト
    list:SelecterItem[],
    //選択中の値
    selectGenre: number
}

const state = toRefs(reactive({
    selectGenre: SearchVideoGenreKinds.All, //選択中のジャンル
    genreSelecerItems: [] as SelecterItem[],//ジャンルの選択肢
    showGenrePalette: false
}))
export default defineComponent({
    components:{
        'vm-selgenrepalette' : VM_SelGenrePalette
    },
    props:{
        list: Object as PropType<SelecterItem[]>,
        selectGenre: Number
    },
    emits:['emit-selectGenre'],
    setup(props: Props, context:SetupContext) {
        //ジャンルの設定
        watchEffect(() =>{
            if(state.selectGenre.value != props.selectGenre){
                initGenreSelecterItems(props.selectGenre, props.list)
            }
        })
        initGenreSelecterItems(props.selectGenre, props.list)

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
            selectItem: (val) => { selectItem(val, context) },
            //ジャンル選択パレッドでジャンルの選択
            selectGenrePalette: (val) => { 
                state.showGenrePalette.value = false
                selectItem(val, context)
            },
        }
    },
})

//ジャンルのリスト生成
function initGenreSelecterItems(selectGenre: number, genreSelecterItems: SelecterItem[]){
    //選択中のジャンルを取得
    state.selectGenre.value = selectGenre
    state.genreSelecerItems.value.splice(0, state.genreSelecerItems.value.length)
    genreSelecterItems.forEach(x => {
        state.genreSelecerItems.value.push({
            val: x.val,
            text: x.text,
            selected: state.selectGenre.value == x.val
        })
    })
}

//ジャンルを更新
function selectItem(val: number, context:SetupContext){
    context.emit('emit-selectGenre', val)
}


</script>
