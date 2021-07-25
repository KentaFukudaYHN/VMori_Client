<style lang="scss" scoped>
.account-title{
    @include sp{
        display: none;
    }
}
/* #region scss */
.account-container{
    margin: 0 50px 0 50px;
    @include tab{
        margin: 0 10px 0 10px;
    }
}
.setting{
    &-list{
        margin: 0;
        padding: 0;
        @include sp{
            padding-top:10px;
        }
        &-item{
            display: flex;
            align-items: middle;
            margin:10px 0;

            & .user-icon{
                width:100px;
            }

            @include tab{
                flex-direction: column;
            }
        }
        &-content{
            width:360px;
            display: flex;
            align-items: middle;
            margin:10px 0;

            @include tab{
                //モバイル表示の場合は順番を変更 
                width: 100%;
                max-width: 360px;
                margin: auto;
                order:3;
            }

        }
        &-label{
            display: flex;
            align-items: center;
            margin: 0 10px 0 0px;
            width:150px;

            @include tab{
                width: 100%;
                justify-content: space-between;
            }
        }
        &-change-iconbtn{
            margin-left: 20px;
            display: flex;
            align-items: flex-end;
            margin-bottom: 10px;

            @include tab{
                display: none;
            }
        }
        &-change-btn{
            display: flex;
            margin-left: 20px;
            align-items: center;
            // & button{
            //     width: 60px;
            // }

            @include tab{
                display: none;
            }
        }

        //モバイル用のボタン
        &-change-btn-sp{
            display: none;
            @include tab{
                display: inline-block;
            }
        }
    }
    &-name{
        width : 322px;
    }
    &-birthday{
        width: 350px;
        @include tab{
            width: 100%;
        }
    }
    &-mail{
        width: 322px;
    }
    &-password{
        width: 322px;
    }
}

.setting-mail-certification{
    @include tab{
        margin-left: 10px;
    }
}

.changemodal{
    min-width: 400px;
    padding: 0px 0px;
    @include tab{
        min-width: 230px;
    }
    &-title{
        margin: 0;
    }
    &-content{
        margin: 20px 0 0 0;
    }
    &-btn-update{
        margin-bottom: 0;
        & button{
            width:100%;
            max-width: 100%;
        }
    }
}
.cropper-area{
    & img{
        display: block;
    }

}

    //cropperを円形にする
    .cropper-area ::v-deep .cropper-view-box,
    .cropper-face {
        border-radius: 50% !important;
    } 

#cropperImg{
    width:80%;
    @include tab{
        width:250px;
    }
}
/* #endregion */
</style>

<template>
<!-- #region template -->
<vm-guide>
    <template v-slot:content>
        <div class="account-container">
            <h2 class="account-title">アカウント情報</h2>
            <ul class="setting-list">
                <li class="setting-list-item">
                    <div class="setting-list-label">
                        <label>アイコン</label>
                        <div class="setting-list-change-btn-sp">
                            <vm-file accept="image/jpeg, image/png" text="変更" @emit-change="showTrimmingModal"/>
                        </div>
                    </div>
                    <div class="setting-list-content">
                        <img class="user-icon" :src="account.icon">
                    </div>
                    <div class="setting-list-change-iconbtn">
                        <vm-file accept="image/jpeg, image/png" text="変更" @emit-change="showTrimmingModal"/>
                    </div>
                </li>
                <li class="setting-list-item">
                    <div class="setting-list-label">
                        <label>名前</label>
                        <div class="setting-list-change-btn-sp">
                            <button class="btn-normal-mini" @click="showChangeNameModal">変更</button>
                        </div>
                    </div>
                    <div class="setting-list-content">
                        <div class="form-item setting-name">
                            <vm-input :disabled="true" name="name" :value="account.name" type="text" @emit-input="onInputName"/>
                        </div>
                    </div>
                    <div class="setting-list-change-btn">
                        <button class="btn-normal-mini" @click="showChangeNameModal">変更</button>
                    </div>
                </li>
                <li class="setting-list-item">
                    <div class="setting-list-label">
                        <label>生年月日</label>
                        <div class="setting-list-change-btn-sp">
                            <button class="btn-normal-mini" @click="showChangeBirthdayModal">変更</button>
                        </div>
                    </div>
                    <div class="setting-list-content">
                        <div class="form-item setting-birthday">
                            <vm-select :disabled="true" :selectedYear="account.year" :selectedMonth="account.month" :selectedDay="account.date" />
                        </div>
                    </div>
                    <div class="setting-list-change-btn">
                        <button class="btn-normal-mini" @click="showChangeBirthdayModal">変更</button>
                    </div>
                </li>
                <li class="setting-list-item">
                    <div class="setting-list-label">
                        <label>メールアドレス</label>
                        <div>
                            <div class="setting-list-change-btn-sp">
                                <button class="btn-normal-mini" @click="showChangeMailModal">変更</button>
                            </div>
                            <div v-if="account.appMail == false"  class="setting-list-change-btn-sp setting-mail-certification">
                                <button class="btn-primary-mini" @click="showAppReqMail">認証</button>
                            </div>
                        </div>
                    </div>
                    <div class="setting-list-content">
                        <div class="form-item setting-mail">
                            <vm-input :disabled="true" name="mail" :value="account.mail" type="text" @emit-input="onInputMail"/>
                        </div>
                    </div>
                    <div class="setting-list-change-btn ">
                        <button class="btn-normal-mini" @click="showChangeMailModal">変更</button>
                    </div>
                    <div class="setting-list-change-btn">
                        <button v-if="account.appMail == false" class="btn-primary-mini" @click="showAppReqMail">認証</button>
                    </div>
                </li>
                <li class="setting-list-item">
                    <div class="setting-list-label">
                        <label>パスワード</label>
                        <div class="setting-list-change-btn-sp">
                            <button class="btn-normal-mini" @click="showChangeMailModal">変更</button>
                        </div>
                    </div>
                    <div class="setting-list-content">
                        <div class="form-item setting-password">
                            <vm-input :disabled="true" name="password" :value="account.password" type="password"/>
                        </div>
                    </div>
                    <div class="setting-list-change-btn ">
                        <button class="btn-normal-mini" @click="showChangePasswordModal">変更</button>
                    </div>
                </li>
            </ul>

            <!-- 画像トリミングモーダル -->
            <vm-modal v-show="cropper.showModal" @emit-outsideClick="hideTrimmingModal">
                <template v-slot:content>
                    <h3 class="title-success">アイコンのトリミング</h3>
                    <div class="changemodal">
                        <div class="changemodal-content">
                            <div class="cropper-area">
                                <img ref="refImage" id="cropperImg" :src="cropper.src"/>
                            </div>
                        </div>
                        <div class="form-item changemodal-btn-update">
                            <button class="btn-primary" @click="updateIcon">OK</button>
                        </div>
                    </div>
                </template>
            </vm-modal>

            <!-- 生年月日変更モーダル -->
            <vm-modal v-show="changeBirthday.showModal" @emit-outsideClick="hideChangeBirthdayModal">
                <template v-slot:content>
                    <div class="changemodal">
                        <h3 class="changemodal-title title-success">生年月日の変更</h3>
                        <div class="changemodal-content">
                            <div class="form-item">
                                <label>生年月日を設定してください</label>
                                <vm-select  @emit-change-year="changeBirthdayYear" @emit-change-month="changeBirthdayMonth" @emit-change-date="changeBirthdayDate" 
                                    :selectedYear="changeBirthday.year" :selectedMonth="changeBirthday.month" :selectedDay="changeBirthday.date" 
                                    :nameYear="changeBirthday.nameYear" :nameMonth="changeBirthday.nameMonth" :nameDate="changeBirthday.nameDate"/>
                                <span v-if="changeBirthday.overrideErrMsg != ''" class="valid-msg">{{ changeBirthday.overrideErrMsg }}</span>
                            </div>
                        </div>
                            <div class="form-item changemodal-btn-update">
                                <button class="btn-primary" @click="updateBirthday">更新</button>
                            </div>
                    </div>
                </template>
            </vm-modal>

            <!-- 名前変更モーダル -->
            <vm-modal v-show="changeName.showModal" @emit-outsideClick="hideChangeNameModal">
                <template v-slot:content>
                    <div class="changemodal">
                        <h3 class="changemodal-title title-success">名前の変更</h3>
                        <div class="changemodal-content">
                            <div class="form-item">
                                <label>新しい名前を入力してください</label>
                                <vm-input id="test" name="newname" type="text" @emit-input="onInputName" :overrideErrMsg="changeName.overrideErrMsg" :rule="isRequired"/>
                            </div>
                        </div>
                        <div class="form-item changemodal-btn-update">
                            <button class="btn-primary" @click="updateName">更新</button>
                        </div>
                    </div>
                </template>
            </vm-modal>

            <!-- メールアドレス変更モーダル -->
            <vm-modal v-show="changeMail.showModal" @emit-outsideClick="hideChangeMailModal">
                <template v-slot:content>
                    <div class="changemodal">
                        <h3 class="changemodal-title title-success">メールアドレスの変更</h3>
                        <div class="changemodal-content">
                            <div class="form-item">
                                <label>新しいメールアドレスを入力してください</label>
                                <vm-input name="newmail" type="text" @emit-input="onInputMail" :overrideErrMsg="changeMail.overrideErrMsg" :rule="mailRule"/>
                            </div>
                        </div>
                        <div class="form-item changemodal-btn-update">
                            <button class="btn-primary" @click="updateMail">更新</button>
                        </div>
                    </div>
                </template>
            </vm-modal>

            <!-- パスワード変更モーダル -->
            <vm-modal v-show="changePassword.showModal" @emit-outsideClick="hideChangePasswordModal">
                <template v-slot:content>
                    <div class="changemodal">
                        <h3 class="changemodal-title title-success">パスワードの変更</h3>
                        <div class="changemodal-content">
                            <div class="form-item">
                                <label>新しいパスワードを入力してください</label>
                                <vm-input name="newpassword" @emit-input="onInputPassword" type="password" :rule="passwordRule"/>
                            </div>
                        </div>
                        <div class="form-item changemodal-btn-update">
                            <button class="btn-primary" @click="updatePassword">更新</button>
                        </div>
                    </div>
                </template>
            </vm-modal>

            <!-- 結果Confirm -->
            <vm-confirm v-if='changeConfirm.showConfirm' :kinds="changeConfirm.kinds" :title="changeConfirm.title" :msg="changeConfirm.msg" @emit-clickBtn="closeResultConfirm"></vm-confirm>

            <!-- メールの本人認証Confirm -->
            <vm-confirm v-if="appReqMail.showModal" :title="appReqMail.title" :msg="appReqMail.msg" :btnTxt="'送信する'" @emit-clickBtn="submitAppReqMail" @emit-outsideClick="closeAppReqMail"></vm-confirm>
        </div>
    </template>
</vm-guide>
<!-- #endregion -->
</template>

<script lang="ts">
//#region import
import { defineComponent, toRefs, reactive, ref, Ref } from 'vue'
import VM_Header from '@/front/components/VM_VideoHeader.vue'
import VM_Input from '@/front/components/VM_Input.vue'
import VM_Birthday from '@/front/components/VM_Birthday.vue'
import VM_File from '@/front/components/VM_File.vue'
import VM_Modal from '@/front/components/VM_Modal.vue'
import VM_Confirm from '@/front/components/VM_ConfirmModal.vue'
import c from '@/front/components/VM_GuideMenu.vue'
import { ConfirmKinds }  from '@/core/enum'
import Repository from '@/dataAccess/repository/VMoriRepository'
import { AccountApiRes } from '@/core/apiReqRes/Account'
import { AccountStoreReq } from '@/dataAccess/storeReqRes/Account'
import { useStore, State } from '@/dataAccess/store/store'
import { AccountModule } from '@/dataAccess/store/actionTypes'
import { Store } from 'vuex'
import { useRouter } from '@/router/router'
import { PublicFormContext, useForm } from 'vee-validate'
import { passwordRule, mailRule, isRequired } from '@/front/valid/valid-rules'
import { AuthService } from '@/core/services/AuthServices'
import Cropper from 'cropperjs'
import VM_GuideMenuVue from '@/front/components/VM_GuideMenu.vue'
//#endregion

//#region state
const state = toRefs(reactive({
    account: {
        name: '',
        year: '',
        month: '',
        date: '',
        mail: '',
        icon: '',
        password: '',
        appMail: false
    },
    cropper: {
        cropper: null as Cropper,
        src: '',
        fileName: '',
        showModal: false,
    },
    changeName: {
        name: '',
        showModal: false,
        overrideErrMsg: '',
    },
    changeBirthday: {
        year: '',
        month: '',
        date: '',
        showModal: false,
        overrideErrMsg: '',
        nameYear: 'new-birthday-year',
        nameMonth: 'new-birthday-month',
        nameDate: 'new-birthday-date'
    },
    changeMail:{
        mail: '',
        showModal: false,
        overrideErrMsg: '',
    },
    changePassword:{
        password: '',
        showModal: false,
        overrideErrMsg: '',
    },
    appReqMail:{
        title: '',
        msg: '',
        showModal: false,
        overrideErrMsg: ''
    },
    changeResult:{
        title: '',
        msg: '',
        showConfirm: false,
        kinds: ConfirmKinds.Normal,
        minWidth: '',
        padding: ''
    }
}))
//#endregion

let authService: AuthService
//#region component
export default defineComponent({
    components:{
        'vm-header': VM_Header,
        'vm-input': VM_Input,
        'vm-select': VM_Birthday,
        'vm-file': VM_File,
        'vm-modal': VM_Modal,
        'vm-confirm': VM_Confirm,
        'vm-guide': VM_GuideMenuVue
    },
    async setup() {
        //初期化処理
        const store = useStore()
        const router = useRouter()
        const form = useForm()
        const repository = new Repository(router)
        authService = new AuthService(store, repository)

        const refImage = ref(null)

        await getAccount(repository, store)

        //パスワード変更モーダル
        state.changePassword.value.password = ''
        state.changePassword.value.showModal = false
        state.changePassword.value.overrideErrMsg = ''

        //変更結果モーダル
        state.changeResult.value.msg = ''
        state.changeResult.value.showConfirm = false

        return {
            //アカウント表示情報
            account: state.account.value,
            //アイコンの変更
            cropper: state.cropper.value,
            refImage,
            updateIcon: () => { _updateIcon(repository, store) },
            showTrimmingModal: (e) => { _showTrimmingModal(e, refImage.value) },
            hideTrimmingModal: () =>  { state.cropper.value.showModal = false },
            //名前変更モーダル
            changeName: state.changeName.value,
            showChangeNameModal: () => { _showChangeNameModal() },
            hideChangeNameModal: () => { state.changeName.value.showModal = false },
            onInputName: (val) => { state.changeName.value.name = val },
            updateName: async () => { await _updateName(repository, store, form) },
            //生年月日変更モーダル
            changeBirthday: state.changeBirthday.value,
            showChangeBirthdayModal: () => { _showChangeBirthdayModal() },
            updateBirthday: async () => { await _updateBirthday(repository, store, form) },
            changeBirthdayYear: (val) => { state.changeBirthday.value.year = val },
            changeBirthdayMonth: (val) => { state.changeBirthday.value.month = val },
            changeBirthdayDate: (val) => { state.changeBirthday.value.date = val },
            hideChangeBirthdayModal: () => { state.changeBirthday.value.showModal = false },
            //メール変更モダール
            changeMail: state.changeMail.value,
            onInputMail: (val) => { state.changeMail.value.mail = val },
            updateMail: async ()  => { await _updateMail(form, repository) },
            showChangeMailModal: () => { _showChangeMailModal() },
            hideChangeMailModal: () => { state.changeMail.value.showModal = false },
            //パスワード変更モーダル,
            changePassword: state.changePassword.value,
            onInputPassword: (val) => {  state.changePassword.value.password = val },
            updatePassword: async () => { await _updatePassword(form, repository) },
            showChangePasswordModal: () => {  _showChangePasswordModal() },
            hideChangePasswordModal: () => { state.changePassword.value.showModal = false },
            //メールアドレスの本人認証
            appReqMail: state.appReqMail.value,
            showAppReqMail: () => { _showAppReqMail() },
            closeAppReqMail: () => { _closeAppReqMail() },
            submitAppReqMail: () => { _appReqMail(repository) },
            //変更結果モーダル
            changeConfirm: state.changeResult.value,
            closeResultConfirm: () => { closeResultConfirm() },
            //validation
            passwordRule,
            mailRule,
            isRequired
        }
    },
})

//#endregion

//#region function
//アカウント情報を取得
async function getAccount (repository: Repository, store:Store<State>){
        //アカウント情報取得
        let accountApiRes = await repository.get<AccountApiRes>("account/get")

        //storeにアカウント情報を保存
        const accountStoreRes: AccountStoreReq = {
            displayID: accountApiRes.data.displayID,
            name: accountApiRes.data.name,
            mail: accountApiRes.data.mail,
            icon: accountApiRes.data.icon,
            birthdayYear: accountApiRes.data.birthdayYear,
            birthdayMonth: accountApiRes.data.birthdayMonth,
            birthdayDate: accountApiRes.data.birthdayDate,
            appMail: accountApiRes.data.appMail,
            isLogin: true,
        }
        store.dispatch(AccountModule.INITIALIZE_ACCOUNT, accountStoreRes)

        //formデータ
        state.account.value.name = store.state.account.name
        state.account.value.year = store.state.account.birthdayYear
        state.account.value.month = store.state.account.birthdayMonth
        state.account.value.date = store.state.account.birthdayDate
        state.account.value.mail = store.state.account.mail
        state.account.value.icon = store.state.account.icon
        state.account.value.appMail = store.state.account.appMail
        state.account.value.password = '**********'
}

//画像のトリミング
function _showTrimmingModal(fileInput: HTMLInputElement, refImage: HTMLImageElement){
    const target =  fileInput.files[0]
    if(!target.type.match('image/jp.*') &&!target.type.match('image/png')) {
        return;
    }
    state.cropper.value.fileName = target.name
    const fileReader = new FileReader()
    fileReader.onload = () => {
        const dataUrl = fileReader.result
        state.cropper.value.src = dataUrl as string
        refImage.src =  dataUrl as string
    }

    refImage.onload = () =>{
        let width = refImage.width
        let height = refImage.height

        //横300px以上の画像はリサイズ
        console.log("画像の幅 " + width)
        if(width > 300){
            height = Math.round(height * 300 / width)
            width = 300

            let canvas = document.createElement('canvas')
            canvas.width = width
            canvas.height = height
            let ctx = canvas.getContext('2d')
            ctx.drawImage(refImage, 0, 0, width, height)
            ctx.canvas.toBlob((blob) => {
                const imageFile = new File([blob], target.name,{
                    type: target.type,
                    lastModified: Date.now()
                })
                fileReader.readAsDataURL(imageFile)
            }, target.type, 1)
        }else{
            state.cropper.value.showModal = true

            //前のくろっぱーの情報が残るので、既にくろっぱーの情報あればデストロイ
            if(state.cropper.value.cropper != null){
                state.cropper.value.cropper.destroy()
            }
            state.cropper.value.cropper = new Cropper(refImage, {
                viewMode: 2,
                aspectRatio: 1,
                dragMode: 'none',
            })
            fileInput.value = ''
        }


    }
    fileReader.readAsDataURL(target)
}

//画像のアップロード
async function _updateIcon(repository: Repository, store: Store<any>) {
    const base64 = state.cropper.value.cropper.getCroppedCanvas()
                    .toDataURL()
                    .split(',')[1]
    //アイコンのアップロード
    var result = await repository.post<boolean>('account/registicon',{
        base64: base64,
        name: state.cropper.value.fileName
    })

    state.cropper.value.cropper.destroy()
    state.cropper.value.showModal = false

    if(result.isOk()){
        getAccount(repository, store)
        showResultConfirm('ユーザーアイコンの更新', 'ユーザーアイコンを更新しました！', ConfirmKinds.Normal)
    }else{
        showResultConfirm('ユーザーアイコンの更新', '申し訳ございません、原因不明のエラーが発生しました。\r\n再度ユーザーアイコンの変更をおこなってください', ConfirmKinds.Error)
    }

}

//名前変更モーダル表示
function _showChangeNameModal(){
    state.changeName.value.showModal = true;

    setTimeout(() =>{
        document.getElementsByName('newname')[0].focus()
    }, 0)
}

//名前変更
async function _updateName(repository: Repository, store: Store<any>, form:PublicFormContext<Record<string, any>>){
    if((await form.validateField('newname')).valid == false){
        return;
    }

    const result = await repository.post<boolean>('account/updatename',{
        Name: state.changeName.value.name
    })

    //名前変更モーダルを閉じる
    state.changeName.value.showModal = false

    if(result.data && result.isOk()){
        showResultConfirm('名前の変更', '名前を変更しました！', ConfirmKinds.Normal)
        getAccount(repository, store)
    }else{
        showResultConfirm('名前の変更', "申し訳ございません、原因不明のエラーが発生しました。\r\n再度名前の変更をおこなってください", ConfirmKinds.Error)
    }
}

//生年月日変更モーダル表示
function _showChangeBirthdayModal(){
    state.changeBirthday.value.year = state.account.value.year
    state.changeBirthday.value.month = state.account.value.month
    state.changeBirthday.value.date = state.account.value.date
    state.changeBirthday.value.showModal = true
}

//生年月日変更
async function _updateBirthday(repository: Repository, store: Store<any>, form:PublicFormContext<Record<string, any>>,){

    const valid = !(await form.validateField(state.changeBirthday.value.nameYear)).valid ||
                    !(await form.validateField(state.changeBirthday.value.nameMonth)).valid ||
                    !(await form.validateField(state.changeBirthday.value.nameDate)).valid
    if(valid){
        state.changeBirthday.value.overrideErrMsg='入力必須です'
        return;
    }else{
        state.changeBirthday.value.overrideErrMsg = ''
    }

    const result = await repository.post<boolean>('account/updatebirthday', {
        Year: state.changeBirthday.value.year,
        Month: state.changeBirthday.value.month,
        Date: state.changeBirthday.value.date
    })

    //生年月日変更モーダルを閉じる
    state.changeBirthday.value.showModal = false;

    if(result.data && result.status == 200){
        showResultConfirm('生年月日の変更', '生年月日を変更しました！', ConfirmKinds.Normal)
        //アカウント情報再取得
        getAccount(repository, store)
    }else{
        showResultConfirm('生年月日の変更', "申し訳ございません、原因不明のエラーが発生しました。\r\n再度生年月日の変更をおこなってください", ConfirmKinds.Error)
    }
}

//メールの本人認証モーダル表示
async function _showAppReqMail(){
    state.appReqMail.value.title = "メールアドレスの本人認証"

    state.appReqMail.value.msg = "メールアドレスが本人のものであることを確認する必要があります" +
        state.account.value.mail + "に確認メールを送信してもよろしいでしょうか？"+
        "メールに記載されているリンクから本人認証を行ってください。"

    state.appReqMail.value.showModal = true
}

//メールの本人認証モーダルを閉じる
async function _closeAppReqMail(){
    state.appReqMail.value.title = ""
    state.appReqMail.value.msg = ""
    state.appReqMail.value.showModal = false
}

//メールの本人認証
async function _appReqMail(repository: Repository){
    _closeAppReqMail()
    //メールアドレスの本人認証リクエスト
    var result = await repository.get<boolean>("auth/createappreqmail")

    if(result.data && result.isOk()){
        showResultConfirm('メールアドレスの本人認証', authService.createAppReqMsg(state.account.value.mail), ConfirmKinds.Normal)
    }else{
        showResultConfirm('メールアドレスの本人認証', "申し訳ございません、原因不明のエラーが発生しました。\r\n再度メールアドレスの本人認証をおこなってください", ConfirmKinds.Error)
    }
}

//メールアドレス変更モーダルの表示
function _showChangeMailModal(){
    state.changeMail.value.showModal = true
    setTimeout(() =>{
        document.getElementsByName('newmail')[0].focus()
    }, 0)

}

//メールアドレスの更新
async function _updateMail(from:PublicFormContext<Record<string, any>>, repository: Repository){
    //バリデーションチェック
    if(await (await from.validateField('newmail')).valid){

        //登録可能なメールアドレスかチェック
        var resMailOk = await repository.get<boolean>('account/CanRegistMail?mail=' + state.changeMail.value.mail);
        if(resMailOk.data == false){
            state.changeMail.value.overrideErrMsg = '既に使用されているメールアドレスです'
            return;
        }else{
            state.changeMail.value.overrideErrMsg = ''
        }

        //メールアドレス変更のリクエスト送信
        var result = await repository.post('account/updatemail',{
            Mail: state.changeMail.value.mail
        });

        if(result.data){
            showResultConfirm('まだメールアドレス変更は完了していません', authService.createAppReqMsg(state.changeMail.value.mail), ConfirmKinds.Normal)
            //メール変更モーダルを閉じる
            state.changeMail.value.mail = ""
            state.changeMail.value.showModal = false
        }else{

        }
    }
}

function _showChangePasswordModal(){
    state.changePassword.value.showModal = true
    setTimeout(() =>{
        document.getElementsByName('newpassword')[0].focus()
    }, 0)
}

//パスワードの更新
async function _updatePassword(form:PublicFormContext<Record<string, any>>, repository: Repository){
    //バリデーションチェック
    if(await (await form.validateField('newpassword')).valid){
        //パスワード変更のリクエスト送信
        var result = await repository.post('account/updatepassword',{
            Password: state.changePassword.value.password
        })

        if(result.data){
            state.changePassword.value.password = ""
            state.changePassword.value.showModal = false

            //結果モーダルを表示する
            showResultConfirm('パスワードの変更', 'パスワードを変更しました！', ConfirmKinds.Normal)
        }else{
            state.changePassword.value.overrideErrMsg = "原因不明のエラーが発生しました。時間を空けて再度やり直してください。"
        }
    }
}

//結果モーダルを表示する
function showResultConfirm(title: string, msg: string, kinds: ConfirmKinds)
{
    state.changeResult.value.kinds = ConfirmKinds.Success
    state.changeResult.value.title = title
    state.changeResult.value.msg = msg
    state.changeResult.value.showConfirm = true
    state.changeResult.value.kinds = kinds
}
//結果モーダルを閉じる
function closeResultConfirm()
{
    state.changeResult.value.showConfirm = false
    state.changeResult.value.title = ''
    state.changeResult.value.msg = ''
}
//#endregion
</script>
