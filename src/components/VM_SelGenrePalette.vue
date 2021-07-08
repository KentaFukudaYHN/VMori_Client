<style lang="scss" scoped>
.genrepalette{
    &-container{
        display: flex;
        width: 720px;
        height: 600px;
        flex-wrap: wrap;
        @include tab{
            width:420px;
        }
        @include sp{
            width: 200px;
            display: table-caption;
        }
    }
    &-item{
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
        border-radius: 3px;
        width:120px;
        height: 120px;
        margin:10px;
        color:#fff;
        user-select: none;

        @include sp{
            width: 80%;
            margin: 5px auto;
            height: 30px;
        }
    }
}
</style>

<template>
    <div>
        <vm-modal :windowClass="windowClass" :showCloseBtn="true" @emit-clickCloseBtn="clickCloseBtn">
            <template v-slot:content>
                <span class="title-success">ジャンルの選択</span>
                <div class="genrepalette-container">
                    <div v-for="item in pickerModal.list" :key="item.kinds" 
                        :class="item.css"
                        @click="onClickGenle(item.kinds)">
                        <span>{{ item.text }}</span>
                    </div>
                </div>
            </template>
        </vm-modal> 
    </div>

</template>

<script lang="ts">
import { defineComponent, reactive, toRefs, SetupContext } from 'vue'
import VM_Modal from '@/components/VM_Modal.vue'
import { VideoGenreKinds, VideoGenreKindsToString } from '@/commons/enum'
import { boolean } from 'yup/lib/locale'

type genrePallet = {
    text: string,
    kinds: VideoGenreKinds,
    css: string
}

type Props = {
    windowClass: string,
    addTop: boolean
}

const state = toRefs(reactive({
    pickerModal:{
        list: new Array() as genrePallet[]
    },
}))
export default defineComponent({
    components:{
        'vm-modal': VM_Modal
    },
    emits:['emit-selectedGenre', 'emit-clickCloseBtn'],
    props:{
        windowClass:{
            type: String
        },
        addTop:{
            type: Boolean,
            default: false,
        }
    },
    setup(props: Props, context: SetupContext) {
        if(state.pickerModal.value.list == null || state.pickerModal.value.list.length == 0){
            Object.entries(VideoGenreKinds).forEach(([key, val]) =>{
                var kindsNum = Number(key)
                if(isNaN(kindsNum) == false && kindsNum != VideoGenreKinds.All){
                    state.pickerModal.value.list.push({
                        text: VideoGenreKindsToString(kindsNum),
                        kinds: kindsNum,
                        css: 'genrepalette-item genre-color-' + (val as string).toLowerCase()
                    })
                }
            })

            if(props.addTop){
                state.pickerModal.value.list.unshift({
                    text: 'TOP',
                    kinds: VideoGenreKinds.All,
                    css: 'genrepalette-item genre-color-top'
                })
            }
        }



        return {
            pickerModal: state.pickerModal.value,
            onClickGenle: (kinds: VideoGenreKinds) => { context.emit('emit-selectedGenre', kinds) },
            windowClass: props.windowClass,
            clickCloseBtn: () => { context.emit('emit-clickCloseBtn') }
        }
    },
})

</script>
