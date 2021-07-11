<style lang="scss" scoped>
    .upurl-container{
        max-width: 600px;
        margin: 0 50px;

        & .btn-primary{
            margin-top:30px;
            width: 100%;
        }
    }
    .upvideo{
        &-platform-icon{
            width:80px;
            margin:10px auto;
        }
    }</style>

<template>
    <vm-guide>
        <template v-slot:content>
            <!-- Urlモーダル -->
            <div v-if="urlModal.showModal" class="upurl-container">
                <span class="title-success">動画のアップロード</span>
                <div>
                    <div class="form-item">
                        <label>アップロードする動画のURLを入力してください</label>
                        <vm-input name="link" @emit-input="onInputUrl" :rule="urlRule"></vm-input>
                        <div class="postscript-container">
                            <span class="postscript-title">PS.</span>
                            <span class="small-font">☆『Youtube』『ニコニコ動画』のみ対応しております</span>
                            <br>
                            <span class="small-font">☆ 例：https://www.youtube.com/watch?v=IW2t52ps27s</span>
                            
                        </div>
                    </div>
                    <div class="form-item">
                        <button class="btn-primary upload-btn-confirm" @click="onSubmit">確認</button>
                    </div>
                </div>
            </div>

            <!-- 結果モーダル -->
            <vm-confirm v-if="confirmModal.showModal"
                        :title="confirmModal.title"
                        :msg="confirmModal.msg"
                        :kinds="confirmModal.kinds"/>

            <!-- 動画アップロード確認モーダル -->
            <vm-modal v-if="false">
                <template v-slot:content>
                    <div class="upvideo-container">
                        <span class="title-success">動画のアップロード</span>
                        <div class="form-item">
                            <!-- <img :src="upVideoModal.data.thumbnailLink"> -->
                            <img src="https://i.ytimg.com/vi/Z6wEJLnNxMs/hqdefault.jpg"/>
                        </div>
                        <div class="form-item">
                            <label>タイトル</label>
                            <vm-input :value="upVideoModal.data.videoTitle" name="upvideo-title" :disabled="true" />
                        </div>
                        <div class="form-item">
                            <label>説明</label>
                            <textarea class="form-textarea" v-model="upVideoModal.data.description" disabled/>
                        </div>
                        <div class="form-item">
                            <label>動画サイト</label>
                            <img class="upvideo-platform-icon" src="assets/yt_logo_rgb_light.png"/>
                        </div>
                    </div>
                </template>
            </vm-modal>
        </template>
    </vm-guide>
</template>

<script lang="ts">
import { defineComponent, reactive,toRefs, Ref, ref, SetupContext } from 'vue'
import VM_Modal from　'@/front/components/VM_Modal.vue'
import VM_Input from '@/front/components/VM_Input.vue'
import VM_Guide from '@/front/components/VM_GuideMenu.vue'
import Repository from '@/dataAccess/repository/VMoriRepository'
import { urlRule } from '@/front/valid/valid-rules'
import { useRouter } from '@/router/router'
import { GetUploadVideoRes, UploadVideoErrKinds} from '@/core/apiReqRes/UploadVideo'
import { ConfirmKinds } from '@/core/enum'


const state = toRefs(reactive({
    urlModal:{
        showModal: true,
        url: ''
    },
    uploadVideoModal:{
        data: {} as GetUploadVideoRes,
        showModal: false
    },
    confirmModal:{
        showModal: false,
        title: '',
        msg: '',
        kinds: ConfirmKinds.Normal,
        click: () => {}
    }
}))
export default defineComponent({
    components: {
        'vm-modal': VM_Modal,
        'vm-input': VM_Input,
        'vm-guide': VM_Guide
    },
    emits: ['emit-outsideClick'],
    setup(proprs: any, context: SetupContext) {
        const repository = new Repository(useRouter())
        return{
            //Url入力モーダル
            urlModal: state.urlModal.value,
            onInputUrl: (val) => { state.urlModal.value.url = val },
            onSubmit: async () => { await getVideoInfo(state.urlModal.value.url, repository) },
            outsideClick: () => { context.emit('emit-outsideClick') },
            urlRule,
            //結果モーダル
            confirmModal: state.confirmModal.value,
            //アップロード確認モーダル
            upVideoModal: state.uploadVideoModal.value
        }
    },
})

async function getVideoInfo(url: string, repository: Repository){
    if(url == '' || url == null){
        return;
    }

    const res = await repository.get<GetUploadVideoRes>('uploadvideo/GetUploadVideoInfo?url=' + url)

    state.urlModal.value.showModal = false
    if(res.isOk() && res.data.success){
        state.uploadVideoModal.value.data = res.data
        state.uploadVideoModal.value.showModal = true
    }else{
        state.confirmModal.value.click = () => { state.urlModal.value.showModal = true }
        switch(res.data.errKinds){
            case UploadVideoErrKinds.None:
                state.confirmModal.value.msg = "原因不明のエラーです、お手数ですが再度お試しください。"
                break;
            case UploadVideoErrKinds.UrlFormat:
                state.confirmModal.value.msg = "読み取れない形式のUrlです。"
                break;
            case UploadVideoErrKinds.UnSupportPlatform:
                state.confirmModal.value.msg = "対応してないサイトのURLです。"
                break;
            case UploadVideoErrKinds.NoIdByYoutube:
                state.confirmModal.value.msg = "動画IDを検出できませんでした。『https://www.youtube.com/watch?v=xxxxxxxx』の形式にしてください"
                break;
            default:
                state.confirmModal.value.msg = "原因不明のエラーです、お手数ですが再度お試しください。"
        }
    }
}
</script>
