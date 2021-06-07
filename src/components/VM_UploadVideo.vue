<style lang="scss" scoped>
    .upurl-container{
        min-width: 600px;
    
        & .btn-primary{
            margin-top:30px;
            width: 100%;
        }
    }
    .upvideo{
        &-thmbnail-container{
            margin-top: 0;
        }
        &-required{
            color: #fff;
            font-size: 11px;
            padding: 2px 5px;
            /* font-weight: bold; */
            background: red;
            border-radius: 3px;
            margin: 0 0 0 5px;
        }
        &-container{
            display: flex;
            min-width:740px;
            @include pc{
                min-width: 600px;
            }
            @include tab{
                display: block;
            }
            & .title-success{
                margin-bottom: 15px;
            }
            & .genre-container{
                display: flex;
                cursor: pointer;
                margin: 10px 0;
                align-items: center;
            }

            & .genre-select-item{
                padding:0 10px;
                height: 30px;
                line-height: 30px;
                border-radius: 5px;
                color: #fff;
            }

            & .genre-picker-btn{
                margin-bottom: -5px;
            }
        }
        &-content{
            width:100%;
            margin: 0 0 0 20px;
        }
        &-thumbnail{
            width:300px
        }
        &-platform-icon{
            width:80px;
            margin:10px auto;
        }
        &-btn-ok button{
            width:100%;
            font-weight: bold;
        }

    }
    .upvideo-progress{
        &-container{
            width: 100%;
            height: 34px;
            display: flex;
            margin-bottom: 20px;
        }

        &-item{
            cursor: pointer;
            text-align: center;
            line-height: 34px;
            width: calc(100% / 2);
            height:100%;
            display: block;
            background-color: #ccc;
        }
        &-item-select-permit{
            @extend .upvideo-progress-item;
            background-color: #c3d8e8;
            font-weight:bold;
            color: #fff
        }
        &-item-select{
            @extend .upvideo-progress-item;
            cursor: default;
            font-weight: bold;
            background-color: $theme-color;
            color: #fff;
        }
    }
</style>

<template>
    <!-- #region urlモーダル -->
    <!-- Urlモーダル -->
    <vm-modal v-if="urlModal.showModal" @emit-outsideClick="outsideClick">
        <template v-slot:content>
            <div class="upurl-container">
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
                        <button class="btn-primary" @click="onSubmit">確認</button>
                    </div>
                </div>
            </div>
        </template>
    </vm-modal>
    <!-- #endregion -->

    <!-- 結果モーダル -->
    <vm-confirm v-if="confirmModal.showModal"
                :title="confirmModal.title"
                :msg="confirmModal.msg"
                :kinds="confirmModal.kinds"/>

    <!-- 動画アップロード確認モーダル -->
    <vm-modal v-if="true">
        <template v-slot:content>
            <div>
                <span class="title-success">動画のアップロード</span>
                <div class="upvideo-progress-container">
                    <span class="upvideo-progress-item-select-permit">URL入力</span>
                    <span class="upvideo-progress-item-select">設定</span>
                </div>
                <div class="upvideo-container">
                    <div>
                        <div class="form-item upvideo-thmbnail-container">
                            <!-- <img :src="upVideoModal.displayData.thumbnailLink"> -->
                            <img class="upvideo-thumbnail" src="https://i.ytimg.com/vi/Z6wEJLnNxMs/hqdefault.jpg"/>
                        </div>
                        <div class="upvideo-readonly">
                            <div class="form-item">
                                <label>タイトル</label>
                                <vm-input :value="upVideoModal.displayData.videoTitle" name="upvideo-title" :disabled="true" />
                            </div>
                            <div class="form-item">
                                <label>説明</label>
                                <textarea class="form-textarea" v-model="upVideoModal.displayData.description" disabled/>
                            </div>
                            <div class="form-item">
                                <label>チャンネル名</label>
                                <vm-input :value="upVideoModal.displayData.chanelTitle" name="upvideo-chanel" :disabled="true"/>
                            </div>
                            <div class="form-item">
                                <label>動画サイト</label>
                                <img class="upvideo-platform-icon" src="assets/yt_logo_rgb_light.png"/>
                            </div>
                        </div>
                    </div>
                    <div class="upvideo-content">
                        <span class="title-success">設定欄</span>
                        <div class="form-item">
                            <label>ジャンル <span class="upvideo-required">必須</span></label>
                            <div class="genre-container" @click="showGenreModal">
                                <div :class="upVideoModal.selKindsCss()">
                                    {{upVideoModal.kindsStr()}}
                                </div>
                                <button class="genre-picker-btn"></button>
                            </div>
                        </div>
                        <div class="form-item">
                            <label>タグ</label>
                            <vm-tag @emit-add="addTag" @emit-delete="deleteTag"></vm-tag>
                        </div>
                        <div class="form-item">
                            <label>話している言葉<span class="upvideo-required">必須</span></label>
                            <vm-checkbox :list="upVideoModal.langListForCheckBox" 
                                @emit-change="onChangeLang"
                                name="upvide-lang">
                            </vm-checkbox>
                        </div>
                        <div class="form-item">
                            <label>翻訳の有無</label>
                            <vm-radiobox name="upvideo-transition" :list="upVideoModal.transitionForRadioBox" @emit-change="onChangeTransition"></vm-radiobox>
                        </div>
                        <div  v-if="showTransitionLang" class="form-item">
                            <label>翻訳した言葉<span class="upvideo-required">必須</span></label>
                            <vm-checkbox :list="upVideoModal.langListForCheckBox" name="upvideo-transition-lang"></vm-checkbox>
                        </div>
                    </div>
                </div>
                <div class="upvideo-btn-ok">
                    <button class="btn-primary">OK</button>
                </div>
            </div>
        </template>
    </vm-modal>
    <vm-genre v-if="genreModal.showModal" @emit-selectedGenre="selectedGenre"></vm-genre>
</template>

<script lang="ts">
import { defineComponent, reactive,toRefs, Ref, ref, SetupContext, computed } from 'vue'
import VM_Modal from　'@/components/VM_Modal.vue'
import VM_Input from '@/components/VM_Input.vue'
import VM_SelGenrePalette from '@/components/VM_SelGenrePalette.vue'
import VM_TagRegister from '@/components/VM_TabRegister.vue'
import VM_CheckBox from '@/components/VM_CheckBox.vue'
import VM_RadioBox from '@/components/VM_RadioBox.vue'
import Repository from '@/repository/VMoriRepository'
import { urlRule } from '@/commons/valid/valid-rules'
import { useRouter } from '@/router/router'
import { GetUploadVideoRes, RegistUploadVideoReq, UploadVideoErrKinds} from '@/apiReqRes/UploadVideo'
import { ConfirmKinds, VideoGenreKinds, VideoGenreKindsToString, VideoLanguageKinds, VideoLanguageKindsToString } from '@/commons/enum'
import CheckBoxItem from '@/commons/form/CheckBoxItem'
import RadioBoxItem from '@/commons/form/RadioBoxItem'


//#region state
const state = toRefs(reactive({
    urlModal:{
        showModal: true,
        url: ''
    },
    uploadVideoModal:{
        displayData: {} as GetUploadVideoRes,
        requestData: {} as RegistUploadVideoReq,
        kinds: VideoGenreKinds.UnKnown,
        kindsStr: () => { return VideoGenreKindsToString(state.uploadVideoModal.value.kinds) },
        selKindsCss: () => { return 'genre-select-item genre-color-' + (VideoGenreKinds[state.uploadVideoModal.value.kinds]).toLowerCase()  },
        langListForCheckBox: [
            {
                text: VideoLanguageKindsToString(VideoLanguageKinds.JP),
                id: 'langJp',
                val: VideoLanguageKinds.JP,
                selected: false
            },
            {
                text: VideoLanguageKindsToString(VideoLanguageKinds.English),
                id: 'langEnglish',
                val: VideoLanguageKinds.English,
                selected: false
            },
            {
                text: VideoLanguageKindsToString(VideoLanguageKinds.Other),
                id: 'langOther',
                val: VideoLanguageKinds.Other,
                selected: false,
            }
        ] as CheckBoxItem[],
        transitionForRadioBox: [
            {
                text: '翻訳あり',
                id: 'yesTransition',
                val: 1,
                selected: false,
            },
            {
                text: '翻訳なし',
                id: 'noTransition',
                val: 0,
                selected: true,
            }
        ] as RadioBoxItem[],
        showModal: false
    },
    confirmModal:{
        showModal: false,
        title: '',
        msg: '',
        kinds: ConfirmKinds.Normal,
        click: () => {}
    },
    genreModal:{
        showModal: false
    }
}))
//#endregion

export default defineComponent({
    components: {
        'vm-modal': VM_Modal,
        'vm-input': VM_Input,
        'vm-checkbox': VM_CheckBox,
        'vm-radiobox': VM_RadioBox,
        'vm-genre': VM_SelGenrePalette,
        'vm-tag': VM_TagRegister
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
            upVideoModal: state.uploadVideoModal.value,
            //ジャンル選択モーダル
            genreModal: state.genreModal.value,
            showGenreModal: () => { showGenreModal() },
            selectedGenre,
            //タグの選択
            addTag: (tag: string) => { addTag(tag) },
            deleteTag: (tag: string) => { deleteTag(tag) },
            //言語の選択
            onChangeLang: (list) => { onChangeLang(list) },
            //翻訳の有無
            onChangeTransition: (val) =>{ onChangeTransition(val) },
            showTransitionLang: computed(() => { return state.uploadVideoModal.value.requestData.isTranslation })
        }
    },
})

//動画情報取得
async function getVideoInfo(url: string, repository: Repository){
    if(url == '' || url == null){
        return;
    }

    const res = await repository.get<GetUploadVideoRes>('uploadvideo/GetUploadVideoInfo?url=' + url)

    state.urlModal.value.showModal = false
    if(res.isOk() && res.data.success){
        state.uploadVideoModal.value.displayData = res.data
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

//ジャンル選択モーダルの表示
function showGenreModal(){
    state.genreModal.value.showModal = true
    state.uploadVideoModal.value.showModal = false
}

//ジャンルの選択
function selectedGenre(kinds: VideoGenreKinds){
    state.genreModal.value.showModal = false
    state.uploadVideoModal.value.showModal = true
    state.uploadVideoModal.value.kinds = kinds
}

//タグの追加
function addTag(tag: string){
    state.uploadVideoModal.value.requestData.tags.push(tag)
}

//タグの削除
function deleteTag(tag: string){
    const index = state.uploadVideoModal.value.requestData.tags.indexOf(tag)
    state.uploadVideoModal.value.requestData.tags.splice(index, 1)
}

//言語の選択
function onChangeLang(selectedList: string[]){
    state.uploadVideoModal.value.requestData.langes = new Array() as VideoLanguageKinds[]
    selectedList.forEach(item => {
        state.uploadVideoModal.value.requestData.langes.push(Number(item))
    });
}

//翻訳の有無を選択
function onChangeTransition(val: string){
    if(val == '1'){
        state.uploadVideoModal.value.requestData.isTranslation = true
    }else{
        state.uploadVideoModal.value.requestData.isTranslation = false
    }
}
</script>
