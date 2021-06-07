<style lang="scss" scoped>
.genrepalette{
    &-container{
        display: flex;
        width: 720px;
        height: 600px;
        flex-wrap: wrap;
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
    }
}
</style>

<template>
    <div>
        <vm-modal>
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

type genrePallet = {
    text: string,
    kinds: VideoGenreKinds,
    css: string
}

const state = toRefs(reactive({
    pickerModal:{
        list: new Array() as genrePallet[]
    }
}))
export default defineComponent({
    components:{
        'vm-modal': VM_Modal
    },
    emits:['emit-selectedGenre'],
    setup(props, context: SetupContext) {
        if(state.pickerModal.value.list == null || state.pickerModal.value.list.length == 0){
            Object.entries(VideoGenreKinds).forEach(([key, val]) =>{
                var kindsNum = Number(key)
                if(isNaN(kindsNum) == false && kindsNum != VideoGenreKinds.UnKnown){
                    state.pickerModal.value.list.push({
                        text: VideoGenreKindsToString(kindsNum),
                        kinds: kindsNum,
                        css: 'genrepalette-item genre-color-' + (val as string).toLowerCase()
                    })
                }
            })
        }

        return {
            pickerModal: state.pickerModal.value,
            onClickGenle: (kinds: VideoGenreKinds) => { context.emit('emit-selectedGenre', kinds) }
        }
    },
})

</script>
