<style lang="scss" scoped>
    .selectsort{
        &-item-select{
            border: solid 1px $form-border-color;
            padding: 4px 0px 4px 10px;
            cursor: pointer;
            -webkit-user-select: none;
            -moz-user-select: none;
            -ms-user-select: none;
            user-select: none;
            margin: 4px 0px;
            &::after{
                content: '';
                display: INLINE-BLOCK;
                background-color: transparent;
                width: 0;
                /* margin-bottom: -1px; */
                margin: 0px 5px -1px 5px;
                border-left: 7px solid transparent;
                border-right: 7px solid transparent;
                border-top: 10px solid $base-font-color;
            }
        }

    }

    .selectmodal{
        ::v-deep &-window{
            top: 30%;
            left: 40%;
            @include sp{
                top: 50%;
                left: 50%;
            }
        }
        &-container{
            margin: 0 20px;
        }
        &-selectitem{
            margin-bottom: 20px;
            padding: 10px;
            cursor: pointer;
            border: solid 1px $form-border-color;
            min-width:90px;
            -webkit-user-select: none;
            -moz-user-select: none;
            -ms-user-select: none;
            user-select: none;
        }
    }
    .icon-vmoriviewcount-before::before{
        width: 20px;
        height: 20px;
        margin-bottom: 2px;
        margin-right: 2px;
        vertical-align: middle;
    }

    .icon-youtubeviewcount-before::before{
        width: 20px;
        height: 20px;
        margin-bottom: 2px;
        margin-right: 2px;
        vertical-align: middle;
    }
</style>

<template>
    <div class="selectsort-container">
        <span class="selectsort-item-select" @click="showModal">
            <span :class="selctItem.css">{{selctItem.text}}</span>
        </span>

        <vm-modal v-if="showSelectModal" windowClass="selectmodal-window" :showCloseBtn="true" @emit-clickCloseBtn="closeModal" @emit-outsideClick="clickModalOverLay">
            <template v-slot:content>
                <span class="title-success">並び順の選択</span>
                <div class="selectmodal-container">
                    <div v-for="item in sortList" :key="item.val"
                          :class="item.css"
                          class="selectmodal-selectitem"
                          @click="changeSortKinds(item.val)">
                        {{ item.text }}
                    </div>
                </div>
            </template>
        </vm-modal>
    </div>
</template>

<script lang="ts">
import { SortKinds } from '@/core/enum'
import { computed, defineComponent, PropType, reactive, ref, SetupContext, toRefs, watchEffect } from 'vue'
import VM_Modal from '@/front/components/VM_Modal.vue'
import { appSetting } from '@/dataAccess/entities/AppSetting'
//ソート情報
type sortItem = {
    css: string
    text: string
}

//ソート情報のリスト
const sortList = [
    {
        css: 'icon-youtubeviewcount-before',
        text: '再生回数順',
        val: SortKinds.ViewCount
    },
    {
        css: 'icon-vmoriviewcount-before',
        text: '再生回数順',
        val: SortKinds.VMoriViewCount
    }
]

const state = toRefs(reactive({
    //選択中のソート種類
    selSortKinds: SortKinds.ViewCount,
    showSelectModal: false
}))
export default defineComponent({
    components:{
        'vm-modal': VM_Modal
    },
    emits:['emit-changeSort'],
    props:{
        selSortKinds: {
            type: Object as PropType<SortKinds>,
            default: SortKinds.ViewCount
        }
    },
    setup(props, context: SetupContext) {

        watchEffect(() => {
            state.selSortKinds.value = props.selSortKinds
        })

        return{
            //選択中のソート情報
            selctItem: computed(() =>  sortList.find(x => x.val == state.selSortKinds.value)) ,
            sortList: sortList,
            showSelectModal: state.showSelectModal,
            //選択モーダルの表示
            showModal: () => state.showSelectModal.value = true,
            closeModal:() => state.showSelectModal.value = false,
            clickModalOverLay:() => {
                if(window.matchMedia('(max-width:' + appSetting.media.sp + 'px)').matches){
                    return
                }else{
                    state.showSelectModal.value = false
                }
            },
            changeSortKinds: (val: SortKinds) => {
                state.showSelectModal.value = false
                context.emit('emit-changeSort', val)
            }
        }
    },
})
</script>
