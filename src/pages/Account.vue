<style lang="scss" scoped>
.account-container{
    margin: 0 50px 0 50px;
}
.setting{
    &-list{
        margin: 0;
        padding: 0;
        &-item{
            display: flex;
            align-items: middle;
            margin:10px 0;
        }
        &-content{
            width:510px;
            display: flex;
            align-items: middle;
            margin:10px 0;
        }
        &-label{
            display: flex;
            align-items: center;
            margin: 0 10px 0 0px;
            width:150px;
        }
        &-change-iconbtn{
            margin-left: 20px;
            display: flex;
            align-items: flex-end;
            margin-bottom: 10px;
        }
        &-change-btn{
            display: flex;
            margin-left: 20px;
            align-items: center;

        }
    }
    &-name{
        width : 214px;
    }
    &-birthday{
        width: 350px
    }
    &-mail{
        width: 322px;
    }
    &-password{
        width: 322px;
    }
}
.changemodal{
    min-width: 320px;
    &-title{
        text-align: center;
        margin: 0 0 20px 0;
    }
    &-btn-update{
        margin-bottom: 0;
        & button{
            width:100%;
        }
    }
}
</style>

<template>
<div class="account-container">
    <vm-header/>
    <h2>アカウント情報</h2>
    <ul class="setting-list">
        <li class="setting-list-item">
            <div class="setting-list-content">
                <label class="setting-list-label">アイコン</label>
                <img src="assets/noset-icon.png">
            </div>
            <div class="setting-list-change-iconbtn">
                <vm-file accept="image/jpeg, image/png" text="変更"/>
            </div>
        </li>
        <li class="setting-list-item">
            <div class="setting-list-content">
                <label class="setting-list-label">名前</label>
                <div class="form-item setting-name">
                    <vm-input name="name" :value="account.name" type="text" @emit-input="onInputName"/>
                </div>
            </div>
            <div class="setting-list-change-btn .aligin-center">
                <button class="btn-normal-mini">変更</button>
            </div>
        </li>
        <li class="setting-list-item">
            <div class="setting-list-content">
                <label class="setting-list-label">生年月日</label>
                <div class="form-item setting-birthday">
                    <vm-select  :selectedYear="account.year" :selectedMonth="account.month" :selectedDay="account.date" />
                </div>
            </div>
            <div class="setting-list-change-btn .aligin-center">
                <button class="btn-normal-mini">変更</button>
            </div>
        </li>
        <li class="setting-list-item">
            <div class="setting-list-content">
                <label class="setting-list-label">メールアドレス</label>
                <div class="form-item setting-mail">
                    <vm-input name="mail" :value="account.mail" type="text" @emit-input="onInputMail"/>
                </div>
            </div>
            <div class="setting-list-change-btn .aligin-center">
                <button class="btn-primary-mini color-red" @click="showAppReqMail">認証</button>
            </div>
            <div class="setting-list-change-btn .aligin-center">
                <button class="btn-normal-mini" @click="showChangeMailModal">変更</button>
            </div>
        </li>
        <li class="setting-list-item">
            <div class="setting-list-content">
                <label class="setting-list-label">パスワード</label>
                <div class="form-item setting-password">
                    <vm-input name="password" :value="account.password" type="password"/>
                </div>
            </div>
            <div class="setting-list-change-btn .aligin-center">
                <button class="btn-normal-mini" @click="showChangePasswordModal">変更</button>
            </div>
        </li>
    </ul>

    <!-- メールアドレス変更モーダル -->
    <vm-modal v-if="changeMail.showModal" @emit-outsideClick="hideChangeMailModal">
        <template v-slot:content>
            <div class="changemodal">
                <h3 class="changemodal-title">メールアドレスの変更</h3>
                <div class="form-item">
                    <label>新しいメールアドレスを入力してください</label>
                    <vm-input name="newmail" type="text" @emit-input="onInputMail" :overrideErrMsg="changeMail.overrideErrMsg" :rule="mailRule"/>
                </div>
                <div class="form-item changemodal-btn-update">
                    <button class="btn-primary" @click="updateMail">更新</button>
                </div>
            </div>
        </template>
    </vm-modal>

    <!-- パスワード変更モーダル -->
    <vm-modal v-if="changePassword.showModal" @emit-outsideClick="hideChangePasswordModal">
        <template v-slot:content>
            <div class="changemodal">
                <h3 class="changemodal-title">パスワードの変更</h3>
                <div class="form-item">
                    <label>新しいパスワードを入力してください</label>
                    <vm-input name="newpassword" @emit-input="onInputPassword" type="password" :rule="passwordRule"/>
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

<script lang="ts">
import { defineComponent, computed, ref, Ref, toRefs, onMounted, reactive } from 'vue'
import VM_Header from '@/components/VM_VideoHeader.vue'
import VM_Input from '@/components/VM_Input.vue'
import VM_Birthday from '@/components/VM_Birthday.vue'
import VM_File from '@/components/VM_File.vue'
import VM_Modal from '@/components/VM_Modal.vue'
import VM_Confirm from '@/components/VM_ConfirmModal.vue'
import { ConfirmKinds }  from '@/commons/enum'
import Repository from '@/repository/VMoriRepository'
import { AccountApiRes } from '@/apiReqRes/Account'
import { AccountStoreReq } from '@/storeReqRes/Account'
import { useStore } from '@/store/store'
import { Account } from '@/store/actionTypes'
import { Store } from 'node_modules/vuex/types'
import { useRouter } from '@/router/router'
import { PublicFormContext, useForm } from 'vee-validate'
import { passwordRule, mailRule } from '@/commons/valid/valid-rules'
import { AuthService } from '@/services/AuthServices'

const state = toRefs(reactive({
    account: {
        name: '',
        year: '',
        month: '',
        date: '',
        mail: '',
        password: ''
    },
    changePassword:{
        password: '',
        showModal: false,
        overrideErrMsg: '',
    },
    changeMail:{
        mail: '',
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

export default defineComponent({
    components:{
        'vm-header': VM_Header,
        'vm-input': VM_Input,
        'vm-select': VM_Birthday,
        'vm-file': VM_File,
        'vm-modal': VM_Modal,
        'vm-confirm': VM_Confirm
    },
    async setup() {
        //初期化処理
        const store = useStore()
        const router = useRouter()
        const form = useForm()
        const repository = new Repository(router)

        //アカウント情報取得
        let accountApiRes = await repository.get<AccountApiRes>("account/get")

        //storeにアカウント情報を保存
        setAccount(store, accountApiRes.data)
        //formデータ
        state.account.value.name = accountApiRes.data.name
        state.account.value.year = accountApiRes.data.birthdayYear
        state.account.value.month = accountApiRes.data.birthdayMonth
        state.account.value.date = accountApiRes.data.birthdayDate
        state.account.value.mail = accountApiRes.data.mail
        state.account.value.password = '**********'

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
            //パスワード変更モーダル,
            changePassword: state.changePassword.value,
            onInputPassword: (val) => {  state.changePassword.value.password = val },
            updatePassword: async () => { await _updatePassword(form, repository) },
            showChangePasswordModal: () => {  state.changePassword.value.showModal = true },
            hideChangePasswordModal: () => { state.changePassword.value.showModal = false },
            //メール変更モダール
            changeMail: state.changeMail.value,
            onInputMail: (val) => { state.changeMail.value.mail = val },
            updateMail: async ()  => { await _updateMail(form, repository) },
            showChangeMailModal: () => { state.changeMail.value.showModal = true },
            hideChangeMailModal: () => { state.changeMail.value.showModal = false },
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
            mailRule
        }
    },
})

//Storeにアカウント情報を登録
async function setAccount(store: Store<any>, accountApiRes: AccountApiRes) {    
    //アカウント情報登録
    let accountStoreRes: AccountStoreReq = {
        displayID: accountApiRes.displayID,
        name: accountApiRes.name,
        mail: accountApiRes.mail,
        icon: accountApiRes.icon,
        birthdayYear: accountApiRes.birthdayYear,
        birthdayMonth: accountApiRes.birthdayMonth,
        birthdayDate: accountApiRes.birthdayDate,
        isLogin: true
    }

    store.dispatch(Account.INITIALIZE_ACCOUNT, accountStoreRes)
}

//アカウント情報をAPIに送信

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

    if(result.data){
        showResultConfirm('メールアドレスの本人認証', new AuthService().CreateAppReqMsg(state.account.value.mail), ConfirmKinds.Normal)
    }else{
        showResultConfirm('メールアドレスの本人認証', "申し訳ございません、原因不明のエラーが発生しました。\r\n再度メールアドレスの本人認証をおこなってください", ConfirmKinds.Error)
    }
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
            showResultConfirm('まだメールアドレス変更は完了していません', new AuthService().CreateAppReqMsg(state.changeMail.value.mail), ConfirmKinds.Normal)
            //メール変更モーダルを閉じる
            state.changeMail.value.mail = ""
            state.changeMail.value.showModal = false
        }else{

        }
    }
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
</script>
