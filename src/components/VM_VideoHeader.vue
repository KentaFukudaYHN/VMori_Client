<style lang="scss" scoped>
    .video-header{
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin: 10px 0 30px 0;

        & &-icon{
            min-width: 150px;
            display: flex;
            justify-content: flex-end;
        }

        & .icon-title{
            width: 200px;
            margin: 0;
        }
        & .icon-btn{
            cursor: pointer;
            border-radius: 50%;
            width: 50px;
            height: 50px;
            border:none;
            background-size: contain;
        }

        & .video-search{
            display: flex;
            width:50%;
            min-width: 200px;
            margin-left: 50px;
            &-input{
                width:100%;
                max-width: 800px;
                border:solid 1px $form-border-color;
                box-sizing: border-box;
                padding: 7px;
                &:focus {
                    outline: 0;
                    border-color: transparent;
                    box-shadow: 0 0 0 1px $form-border-sel-color;
                }
            }
            &-btn{
                button{
                    margin: 0;
                    height: 100%;
                    width: 50px;
                    border: solid 1px $form-border-color;
                }
            }
        }
    }
</style>
<template>
    <header class="video-header">
        <div>
            <img class="icon-title" src='assets/title_icon.png'>
        </div>
        <div class="video-search">
            <input class="video-search-input"/>
            <div class="video-search-btn">
                <button aria-label="検索を実行"></button>
            </div>
        </div>
        <div class="video-header-icon">
            <button class="icon-video-up" @click="showUpVideoModal"></button>
            <button class="icon-btn" ref="refIconBtn" :style="iconBtnStyle" aria-label="アカウント情報を開く"></button>
        </div>
    </header>
    <vm-upload-video v-if="uploadVideo.showModal"
                @emit-outsideClick="hideUpVideoModal"></vm-upload-video>
</template>

<script lang="ts">
import { defineComponent, computed, watch, ref, toRefs, reactive } from 'vue'
import VM_Input from '@/components/VM_Input.vue'
import VM_UploadVideo from '@/components/VM_UploadVideo.vue'
import { useStore } from '@/store/store'

const state = toRefs(reactive({
    uploadVideo:{
        showModal: false
    }
}))

export default defineComponent({
    components:{
        'vm-input': VM_Input,
        'vm-upload-video': VM_UploadVideo
    },
    setup() {
        const store = useStore()

        var iconBtnStyle = ref(createIconBtnStyle(store.getters.accounticon))
        store.watch((state, getters) => getters.accounticon,(newval, oldval)=>{
           iconBtnStyle.value = createIconBtnStyle(newval)
        })

        return{
            //動画アップロード
            uploadVideo: state.uploadVideo.value,
            showUpVideoModal: () => { state.uploadVideo.value.showModal = true },
            hideUpVideoModal: () => { state.uploadVideo.value.showModal = false },
            iconBtnStyle: iconBtnStyle,
        }
    },
})

function createIconBtnStyle(backgroundImageUrl: string){
    return {
        'background-image':'url(' +  backgroundImageUrl +')',
    }
}
</script>
