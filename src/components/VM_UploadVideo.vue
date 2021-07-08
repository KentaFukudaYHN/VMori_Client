<style lang="scss" scoped>
    .upurl-container{
        min-width: 600px;
        @include tab{
            min-width: 400px;
        }
        @include sp{
            min-width: 200px;
            display: table-caption;
        }
        & .btn-primary{
            margin-top:30px;
            width: 100%;

            @include sp{
                margin-top: 20px;
            }
        }

        & .form-item{
            @include sp{
                margin:0;
            }
        }
    }
    .upvideo{
        @include tab{
            display: table-caption;
            margin-bottom: 20px;
        }
        &-thmbnail-container{
            margin-top: 0;
            @include tab{
                text-align: center;
            }
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
                min-width: 400px;
            }
            @include sp{
                min-width: 280px;
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
            @include tab{
                margin:0;
            }
        }
        &-thumbnail{
            width:300px;
            @include sp{
                width:250px;
            }
        }
        &-platform-icon{
            width:80px;
            margin:10px auto;
        }
        &-btn-ok button{
            width:100%;
            font-weight: bold;
        }

        &-postscript-text{
            @include tab{
                display: block;
            }
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
            cursor: default;
            text-align: center;
            line-height: 34px;
            width: calc(100% / 2);
            height:100%;
            display: block;
            background-color: #ccc;
            color: #fff;
        }
        &-item-select-permit{
            @extend .upvideo-progress-item;
            cursor: pointer;
            background-color: #c3d8e8;
            font-weight:bold;
            color: #fff
        }
        &-item-select{
            @extend .upvideo-progress-item;
            font-weight: bold;
            background-color: $theme-color;
            color: #fff;
        }
    }

    .postscript-container{
        margin: 20px auto 10px auto;
        padding: 50px 20px;

        @include sp{
            margin: 20px auto 0px auto;
            padding: 20px 20px;
        }
    }

    ::v-deep .modal-upvideo-window{
        @include sp{
            margin: 10px 0 0 0;
        }
    }

    ::v-deep .modal-confirm-window{
        @include sp{
            width: 80%;
        }
    }
</style>

<template>
    <!-- #region urlモーダル -->
    <!-- Urlモーダル -->
    <vm-modal v-if="urlModal.showModal" @emit-clickCloseBtn="clickCloseBtn" :showCloseBtn="true">
        <template v-slot:content>
            <div class="upurl-container">
                <span class="title-success">動画のアップロード</span>
                <div class="upvideo-progress-container">
                    <span class="upvideo-progress-item-select" @click="backUrlInputModal">URL入力</span>
                    <span class="upvideo-progress-item">設定</span>
                </div>
                <div>
                    <div class="form-item">
                        <label>アップロードする動画のURLを入力してください</label>
                        <vm-input name="link" @emit-input="onInputUrl" :rule="urlRule"></vm-input>
                        <div class="postscript-container">
                            <span class="small-font upvideo-postscript-text">☆『Youtube』『ニコニコ動画』のみ対応しております</span>
                            <br>
                            <span class="small-font upvideo-postscript-text">☆ 例：https://www.youtube.com/watch?v=IW2t52ps27s</span>
                            <br>
                            <span class="small-font upvideo-postscript-text font-color-red">☆ Vtuberに全く関係ないコンテンツのアップロードはお控えください</span>
                            <br>
                            <span class="small-font upvideo-postscript-text font-color-red">☆ アップロードは必ず本人の許可を得てから行ってください</span>
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
                windowClass="modal-confirm-window"
                :kinds="confirmModal.kinds"
                @emit-clickBtn="confirmModal.click"/>

    <!-- 動画アップロード確認モーダル -->
    <vm-modal v-if="upVideoModal.showModal" @emit-clickCloseBtn="clickCloseBtn" :showCloseBtn="true" windowClass="modal-upvideo-window">
        <template v-slot:content>
            <div class="upvideo">
                <span class="title-success">動画のアップロード</span>
                <div class="upvideo-progress-container">
                    <span class="upvideo-progress-item-select-permit" @click="backUrlInputModal">URL入力</span>
                    <span class="upvideo-progress-item-select">設定</span>
                </div>
                <div class="upvideo-container">
                    <div>
                        <div class="form-item upvideo-thmbnail-container">
                            <img class="upvideo-thumbnail" :src="upVideoModal.thumbnailLink">
                        </div>
                        <div class="upvideo-readonly">
                            <div class="form-item">
                                <label>タイトル</label>
                                <vm-input :value="upVideoModal.videoTitle" name="upvideo-title" :disabled="true" />
                            </div>
                            <div class="form-item">
                                <label>説明</label>
                                <textarea class="form-textarea" v-model="upVideoModal.description" disabled/>
                            </div>
                            <div v-if="upVideoModal.showChanelTitleInput()" class="form-item">
                                <label>チャンネル名</label>
                                <vm-input :value="upVideoModal.chanelTitle" name="upvideo-chanel" :disabled="true"/>
                            </div>
                            <div class="form-item">
                                <label>動画サイト</label>
                                <img class="upvideo-platform-icon" :src="upVideoModal.platformImgSrc()"/>
                            </div>
                        </div>
                    </div>
                    <div class="upvideo-content">
                        <span class="title-success">設定欄</span>
                        <div class="form-item">
                            <label>ジャンル <span class="upvideo-required">必須</span></label>
                            <div class="genre-container" @click="showGenreModal">
                                <div :class="upVideoModal.selgenreKindsCss()">
                                    {{upVideoModal.genreKindsStr()}}
                                </div>
                                <button class="genre-picker-btn"></button>
                            </div>
                            <span v-if="upVideoModal.showRequiredByGenre" class="valid-msg">※設定必須です</span>
                        </div>
                        <div class="form-item">
                            <label>タグ</label>
                            <vm-tag :list="upVideoModal.tags"
                                    @emit-add="addTag" @emit-delete="deleteTag"></vm-tag>
                        </div>
                        <div class="form-item">
                            <label>話している言葉<span class="upvideo-required">必須</span></label>
                            <vm-checkbox :list="upVideoModal.langListForCheckBox" 
                                @emit-change="onChangeLang"
                                name="upvide-lang">
                            </vm-checkbox>
                            <span v-if="upVideoModal.showRequiredByLang" class="valid-msg">※設定必須です</span>
                        </div>
                        <div class="form-item">
                            <label>翻訳の有無</label>
                            <vm-radiobox name="upvideo-transition" :list="upVideoModal.transitionForRadioBox" @emit-change="onChangeTransition"></vm-radiobox>
                        </div>
                        <div  v-if="showTransitionLang" class="form-item">
                            <label>翻訳した言葉<span class="upvideo-required">必須</span></label>
                            <vm-checkbox :list="upVideoModal.transitionLangListForCheckBox" name="upvideo-transition-lang"
                                        @emit-change="onChangeTransitionLang"></vm-checkbox>
                            <span v-if="upVideoModal.showRequiredByTransitionLang" class="valid-msg">※設定必須です</span>
                        </div>
                    </div>
                </div>
                <div class="upvideo-btn-ok">
                    <button class="btn-primary" @click="uploadRequest">OK</button>
                </div>
            </div>
        </template>
    </vm-modal>
    <vm-genre v-if="genreModal.showModal" @emit-selectedGenre="selectedGenre" @emit-clickCloseBtn="closeGenreModal"></vm-genre>
</template>

<script lang="ts">
import { defineComponent, reactive,toRefs, SetupContext, computed } from 'vue'
import VM_Modal from　'@/components/VM_Modal.vue'
import VM_Confirm from '@/components/VM_ConfirmModal.vue'
import VM_Input from '@/components/VM_Input.vue'
import VM_SelGenrePalette from '@/components/VM_SelGenrePalette.vue'
import VM_TagRegister from '@/components/VM_TabRegister.vue'
import VM_CheckBox from '@/components/VM_CheckBox.vue'
import VM_RadioBox from '@/components/VM_RadioBox.vue'
import Repository from '@/repository/VMoriRepository'
import { urlRule } from '@/commons/valid/valid-rules'
import { useRouter } from '@/router/router'
import { GetUploadVideoRes, RegistUploadVideoRes, UploadVideoErrKinds} from '@/apiReqRes/UploadVideo'
import { ConfirmKinds, VideoGenreKinds, VideoGenreKindsToString, VideoLanguageKinds, VideoLanguageKindsToString, VideoPlatFormKinds } from '@/commons/enum'
import CheckBoxItem from '@/commons/form/CheckBoxItem'
import RadioBoxItem from '@/commons/form/RadioBoxItem'


//#region state
const state = toRefs(reactive({
    urlModal:{
        showModal: true,
        url: ''
    },
    uploadVideoModal:{
        /**
         * 元動画情報
         */
        currentVideoUrl: '',                        //対象の動画url
        platFormKinds: VideoPlatFormKinds.UnKnown,  //動画プラットフォーム種類
        videoTitle: '',                             //ビデオタイトル
        chanelTitle: '',                           //チャンネルタイトル
        thumbnailLink: '',                           //サムネイルリンク
        description: '',                            //動画説明
        /**
         * 設定情報
         */
        upReqOutsourceVideoToken: '',                           //動画登録リクエストToken
        genre: VideoGenreKinds.All,                         //動画種類
        tags: new Array() as string[],                          //タグ          
        langes: new Array() as VideoLanguageKinds[],            //言語
        isTransition: false,                                    //翻訳の有無
        langForTransition: new Array() as VideoLanguageKinds[], //翻訳言語
        /**
         * 表示情報
         */
        platformImgSrc: () => {                        //動画プラットフォームのアイコン
        debugger
            switch(state.uploadVideoModal.value.platFormKinds){
                case VideoPlatFormKinds.Youtube:
                    return 'assets/yt_logo_rgb_light.png'
                case VideoPlatFormKinds.NikoNiko:
                    return 'assets/nikoniko_icon.png'
                default:
            }
        },
        showChanelTitleInput: () => { return state.uploadVideoModal.value.chanelTitle != null && state.uploadVideoModal.value.chanelTitle.length >0 },   //チャンネル名を表示するかどうか ※ニコニコ動画はチェンネル名が空なので表示しない
        genreKindsStr: () => { return VideoGenreKindsToString(state.uploadVideoModal.value.genre) },                                                        //選択しているジャンルの表示文字列
        selgenreKindsCss: () => { return 'genre-select-item genre-color-' + (VideoGenreKinds[state.uploadVideoModal.value.genre]).toLowerCase()  },         //選択しているジャンルの表示CSS
        langListForCheckBox: [              //言語のチェックボックス選択肢
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
        transitionLangListForCheckBox: [    //翻訳言語のチェックボックス選択肢
            {
                text: VideoLanguageKindsToString(VideoLanguageKinds.JP),
                id: 'transitionLangJp',
                val: VideoLanguageKinds.JP,
                selected: false
            },
            {
                text: VideoLanguageKindsToString(VideoLanguageKinds.English),
                id: 'transitionLangEnglish',
                val: VideoLanguageKinds.English,
                selected: false
            },
            {
                text: VideoLanguageKindsToString(VideoLanguageKinds.Other),
                id: 'transitionLangOther',
                val: VideoLanguageKinds.Other,
                selected: false,
            }
        ] as CheckBoxItem[],
        transitionForRadioBox: [            //翻訳有無の選択肢
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
        /*
        * エラーメッセージのフラグ
        */
        showRequiredByGenre: false,
        showRequiredByLang: false,
        showRequiredByTransitionLang: false,
        showModal: false
    },
    /**
     * 結果表示モーダル
     */
    confirmModal:{
        showModal: false,
        title: '',
        msg: '',
        kinds: ConfirmKinds.Normal,
        click: () => {}
    },
    /**
     * ジャンル選択モーダル
     */
    genreModal:{
        showModal: false
    }
}))
//#endregion

export default defineComponent({
    components: {
        'vm-modal': VM_Modal,
        'vm-confirm': VM_Confirm,
        'vm-input': VM_Input,
        'vm-checkbox': VM_CheckBox,
        'vm-radiobox': VM_RadioBox,
        'vm-genre': VM_SelGenrePalette,
        'vm-tag': VM_TagRegister
    },
    emits: ['emit-clickCloseBtn'],
    setup(proprs: any, context: SetupContext) {
        const repository = new Repository(useRouter())

        return{
            //Url入力モーダル
            urlModal: state.urlModal.value,
            onInputUrl: (val) => { state.urlModal.value.url = val },
            onSubmit: async () => { await getVideoInfo(state.urlModal.value.url, repository) },
            clickCloseBtn: () => { context.emit('emit-clickCloseBtn') },
            urlRule,
            //結果モーダル
            confirmModal: state.confirmModal.value,
            //アップロード確認モーダル
            upVideoModal: state.uploadVideoModal.value,
            //Url入力モーダルに戻る
            backUrlInputModal: () => { backUrlInputModal() },
            //ジャンル選択モーダル
            genreModal: state.genreModal.value,
            showGenreModal: () => { showGenreModal() },
            closeGenreModal: () => { closeGenreModal() },
            selectedGenre,
            //タグの選択
            addTag: (tag: string) => { addTag(tag) },
            deleteTag: (tag: string) => { deleteTag(tag) },
            //言語の選択
            onChangeLang: (list) => { onChangeLang(list) },
            //翻訳の有無
            onChangeTransition: (val) =>{ onChangeTransition(val) },
            showTransitionLang: computed(() => { return state.uploadVideoModal.value.isTransition }),
            //翻訳の言語選択
            onChangeTransitionLang: (list) => { onChangeTransitionLang(list) },
            //動画のアップロードリクエスト
            uploadRequest: () => { uploadRequest(repository, context) }
        }
    },
})

//動画情報取得
async function getVideoInfo(url: string, repository: Repository){
    if(url == '' || url == null){
        return;
    }

    //既に設定されているカレントURLと、入力されたURLが同じなら、元動画情報はAPIから取得せずそのままモーダルを切り替えるだけにする ※既に元動画が設定されているはずなので
    if(url == state.uploadVideoModal.value.currentVideoUrl){
        state.urlModal.value.showModal = false
        state.uploadVideoModal.value.showModal = true
        return
    }

    //元動画情報の取得
    const res = await repository.get<GetUploadVideoRes>('uploadvideo/GetUploadVideoInfo?url=' + url)

    state.urlModal.value.showModal = false
    if(res.isOk() && res.data.success){
        //元動画情報の設定
        state.uploadVideoModal.value.currentVideoUrl = url
        state.uploadVideoModal.value.platFormKinds = res.data.platFormKinds
        state.uploadVideoModal.value.videoTitle = res.data.videoTitle
        state.uploadVideoModal.value.chanelTitle = res.data.chanelTitle
        state.uploadVideoModal.value.thumbnailLink = res.data.thumbnailLink
        state.uploadVideoModal.value.description = res.data.description
        state.uploadVideoModal.value.upReqOutsourceVideoToken = res.data.upReqOutsourceVideoToken

        //動画設定モーダルの表示
        state.uploadVideoModal.value.showModal = true
    }else{
        //元動画の取得に失敗したら失敗の旨のダイアログを表示
        state.confirmModal.value.click = () => { 
            state.confirmModal.value.showModal = false,
            state.urlModal.value.showModal = true 
        }

        state.confirmModal.value.msg = GetRegistVideoErrMsg(res.data.errKinds)
        state.confirmModal.value.title = "動画アップロードの失敗"
        state.confirmModal.value.kinds = ConfirmKinds.Error
        state.confirmModal.value.showModal = true
    }
}

//Url入力モーダルに戻る
function backUrlInputModal(){
    state.uploadVideoModal.value.showModal = false
    state.confirmModal.value.showModal = false
    state.urlModal.value.showModal = true
}

//ジャンル選択モーダルの表示
function showGenreModal(){
    state.genreModal.value.showModal = true
    state.uploadVideoModal.value.showModal = false
}

function closeGenreModal(){
    state.genreModal.value.showModal = false
    state.uploadVideoModal.value.showModal = true
}

//ジャンルの選択
function selectedGenre(kinds: VideoGenreKinds){
    closeGenreModal()
    state.uploadVideoModal.value.genre = kinds
}

//タグの追加
function addTag(tag: string){
    if(tag == '' || tag.length > 20){
        return;
    }
    var tags = state.uploadVideoModal.value.tags.slice();
    tags.push(tag)
    state.uploadVideoModal.value.tags = tags
}

//タグの削除
function deleteTag(tag: string){
    const index = state.uploadVideoModal.value.tags.indexOf(tag)
    const tags = state.uploadVideoModal.value.tags.slice()
    tags.splice(index, 1)
    state.uploadVideoModal.value.tags = tags
}

//言語の選択
function onChangeLang(selectedList: string[]){
    state.uploadVideoModal.value.langes = new Array() as VideoLanguageKinds[]
    selectedList.forEach(item => {
        state.uploadVideoModal.value.langes.push(Number(item))
    });
}

//翻訳の有無を選択
function onChangeTransition(val: string){
    if(val == '1'){
        state.uploadVideoModal.value.isTransition = true
    }else{
        state.uploadVideoModal.value.isTransition = false
    }
}

//翻訳した言葉を選択
function onChangeTransitionLang(selectedList: string[]){
    state.uploadVideoModal.value.langForTransition = new Array() as VideoLanguageKinds[]
    selectedList.forEach(item => {
        state.uploadVideoModal.value.langForTransition.push(Number(item))
    })
}

//動画のアップロード
async function uploadRequest(repository: Repository, context:SetupContext){
    /** 入力検査  */
    let isOk = true
    const stateByUpLoadModal = state.uploadVideoModal.value
    //ジャンルは選択されているか
    if(stateByUpLoadModal.genre == null || stateByUpLoadModal.genre == VideoGenreKinds.All){
        isOk = false
        state.uploadVideoModal.value.showRequiredByGenre = true
    }else{
        state.uploadVideoModal.value.showRequiredByGenre = false
    }

    //話している言語は設定されているか
    if(stateByUpLoadModal.langes == null || stateByUpLoadModal.langes.length == 0){
        isOk = false
        state.uploadVideoModal.value.showRequiredByLang = true
    }else{
        state.uploadVideoModal.value.showRequiredByLang = false
    }

    //翻訳が設定されている場合、翻訳した言葉が選択されているか
    if(stateByUpLoadModal.isTransition && (stateByUpLoadModal.langForTransition == null || stateByUpLoadModal.langForTransition.length == 0)){
        isOk = false
        state.uploadVideoModal.value.showRequiredByTransitionLang = true
    }else{
        state.uploadVideoModal.value.showRequiredByTransitionLang = false
    }

    //タグの数チェック
    if(stateByUpLoadModal.tags != null && stateByUpLoadModal.tags.length > 5){
        isOk = false
    }
    //タグの文字数チェック
    if(stateByUpLoadModal.tags != null && stateByUpLoadModal.tags.length > 0){
        stateByUpLoadModal.tags.forEach(tag => {
            if(tag.length > 20){
                isOk = false
            }
        })
    }

    //データの送信
    if(isOk){
        var result = await repository.post<RegistUploadVideoRes>('uploadvideo/registvideo',{
            UpReqVideoId: stateByUpLoadModal.upReqOutsourceVideoToken,
            Genre: stateByUpLoadModal.genre,
            Tags: stateByUpLoadModal.tags,
            Langes: stateByUpLoadModal.langes,
            IsTranslation: stateByUpLoadModal.isTransition,
            LangForTranslation: stateByUpLoadModal.langForTransition,
            PlatFormKinds: stateByUpLoadModal.platFormKinds
        })
        state.uploadVideoModal.value.showModal = false
        if(result.isOk() && result.data.success){
            //成功ダイアログの表示
            state.confirmModal.value.showModal = true
            state.confirmModal.value.title = "動画のアップロード完了"
            state.confirmModal.value.msg = "動画のアップロードが完了しました！"
            state.confirmModal.value.kinds = ConfirmKinds.Normal
            state.confirmModal.value.click = () => {
                state.urlModal.value.showModal = true
                state.uploadVideoModal.value.showModal = false
                state.confirmModal.value.showModal = false
                //モーダルを閉じる
                context.emit('emit-clickCloseBtn')
            }
        }else{
            state.confirmModal.value.kinds = ConfirmKinds.Error
            state.confirmModal.value.title = '動画のアップロード失敗'
            if(result.data != null && result.data.errKinds != null){
                state.confirmModal.value.msg = GetRegistVideoErrMsg(result.data.errKinds)
            }else{
                state.confirmModal.value.msg = '原因不明のエラーです\r\nお手数ですが時間を空けてもう一度お試しください'
            }

            state.confirmModal.value.click = () => { 
                state.confirmModal.value.showModal = false
                state.uploadVideoModal.value.showModal = false
                state.urlModal.value.showModal = true
            }
            state.confirmModal.value.showModal = true
        }

        InitUploadModalData()
        state.uploadVideoModal.value.currentVideoUrl = ''
    }
}

//動画設定表示データの初期化
function InitUploadModalData(){
    /*元動画の情報リセット*/
    state.uploadVideoModal.value.currentVideoUrl = ''
    state.uploadVideoModal.value.platFormKinds = VideoPlatFormKinds.UnKnown
    state.uploadVideoModal.value.videoTitle = ''
    state.uploadVideoModal.value.chanelTitle = ''
    state.uploadVideoModal.value.thumbnailLink = ''
    state.uploadVideoModal.value.description = ''

    /** 設定情報リセット */
    state.uploadVideoModal.value.upReqOutsourceVideoToken = ''
    state.uploadVideoModal.value.genre = VideoGenreKinds.All
    arrayReset(state.uploadVideoModal.value.tags)
    arrayReset(state.uploadVideoModal.value.langes)
    state.uploadVideoModal.value.isTransition = false
    arrayReset(state.uploadVideoModal.value.langForTransition)
}

function arrayReset<T>(target: Array<T>){
    if(target != null && target.length > 0){
        target.splice(0, target.length)
    }
}

//エラーメッセージの取得
function GetRegistVideoErrMsg(errKinds: UploadVideoErrKinds){
    switch(errKinds){
        case UploadVideoErrKinds.None:
            return "原因不明のエラーです、お手数ですが再度お試しください。"
        case UploadVideoErrKinds.UrlFormat:
            return "読み取れない形式のUrlです。"
        case UploadVideoErrKinds.UnSupportPlatform:
            return "対応してないサイトのURLです。"
        case UploadVideoErrKinds.IsExits:
            return "こちらは既に登録されている動画の為アップロードできません \r\n\r\n" +
                    "元動画の所有者の許可を得てない動画の場合、お手数ですがこちらまで削除したい旨のメールをお願いします\r\n" +
                    process.env.Support_Mail + "\r\n\r\n" +
                    "ご本人様の確認をさせて頂いた後、削除させて頂きます。"
        case UploadVideoErrKinds.NoIdByYoutube:
            return "動画IDを検出できませんでした。『https://www.youtube.com/watch?v=xxxxxxxx』の形式にしてください"
        case UploadVideoErrKinds.NotFoundByNikoNiko:
            return "動画を見つけることができませんでした。 \r\n\r\n"  +
                    "ニコニコ動画の場合、アップロードされたばかりの動画が検出されません。 \r\n\r\n" +
                    "大変申し訳ございませんが、アップロードされてから一日程空けてお試しください。"
        case UploadVideoErrKinds.NotFoundByYoutube:
            return "動画を見つけることができませんでした。 \r\n\r\n" +
                    "リンクの形式は正しいでしょうか？  \r\n" +
                    "https://www.youtube.com/watch?v=xxxxxxxx』の形式にしてください"
        default:
            return "原因不明のエラーです、お手数ですが再度お試しください。"
    }
}
</script>
