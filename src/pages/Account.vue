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
            margin:20px 0;
        }
        &-label{
            display: flex;
            align-items: center;
            margin: 0 10px 0 0px;
            width:150px;
        }
        &-change-iconbtn{
            margin-left: 30px;
            display: flex;
            align-items: flex-end;
        }
        &-change-passwordbtn{
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
    }
}
</style>

<template>
<div class="account-container">
    <vm-header/>
    <h2>アカウント情報</h2>
    <ul class="setting-list">
        <li class="setting-list-item">
            <label class="setting-list-label">アイコン</label>
            <img src="assets/noset-icon.png">
            <div class="setting-list-change-iconbtn">
                <vm-file accept="image/jpeg, image/png"/>
            </div>
        </li>
        <li class="setting-list-item">
            <label class="setting-list-label">名前</label>
            <div class="form-item setting-name">
                <vm-input name="name" :value="name" type="text" @emit-input="onInputName"/>
            </div>
        </li>
        <li class="setting-list-item">
            <label class="setting-list-label">生年月日</label>
            <div class="form-item setting-birthday">
                <vm-select @emit-change-year="onChangeYear" @emit-change-month="onChangeMonth" @emit-change-date="onChangeDate" :selectedYear="year" :selectedMonth="month" :selectedDay="date" />
            </div>
        </li>
        <li class="setting-list-item">
            <label class="setting-list-label">メールアドレス</label>
            <div class="form-item setting-mail">
                <vm-input name="mail" :value="mail" type="text" @emit-input="onInputMail"/>
            </div>
        </li>
        <li class="setting-list-item">
            <label class="setting-list-label">パスワード</label>
            <div class="form-item setting-password">
                <vm-input name="password" :value="password" type="password" :overrideErrMsg="overrideErrMsgByPassword"/>
            </div>
            <div class="setting-list-change-passwordbtn .aligin-center">
                <button class="btn-normal" @click="onClickChangePassword">変更</button>
            </div>
        </li>
    </ul>
    <vm-modal v-if="showChangePasswordModal" @emit-outsideClick="hideChangePasswordModal">
        <template v-slot:content>
            <div class="changemodal">
                <h3 class="changemodal-title">パスワードの変更</h3>
                <div class="form-item">
                    <label>新しいパスワードを入力してください</label>
                    <vm-input name="newpassword" type="password" :rule="passwordRule"/>
                </div>
                <div class="form-item changemodal-btn-update">
                    <button class="btn-primary" @click="updatePassword">更新</button>
                </div>
            </div>
        </template>
    </vm-modal>
</div>
</template>

<script lang="ts">
import { defineComponent, computed, ref, Ref, onMounted } from 'vue'
import VM_Header from '@/components/VM_VideoHeader.vue'
import VM_Input from '@/components/VM_Input.vue'
import VM_Birthday from '@/components/VM_Birthday.vue'
import VM_File from '@/components/VM_File.vue'
import VM_Modal from '@/components/VM_Modal.vue'
import repository from '@/repository/VMoriRepository'
import { AccountApiRes } from '@/apiReqRes/Account'
import { AccountStoreReq } from '@/storeReqRes/Account'
import { useStore } from '@/store/store'
import { Account } from '@/store/actionTypes'
import { Store } from 'node_modules/vuex/types'
import { useRouter } from '@/router/router'
import { Router } from 'node_modules/vue-router/dist/vue-router'
import { PublicFormContext, useForm, validate, useResetForm } from 'vee-validate'
import { passwordRule } from '@/commons/valid/valid-rules'

export default defineComponent({
    components:{
        'vm-header': VM_Header,
        'vm-input': VM_Input,
        'vm-select': VM_Birthday,
        'vm-file': VM_File,
        'vm-modal': VM_Modal
    },
    async setup() {
        //初期化処理
        const store = useStore()
        const router = useRouter()
        const form = useForm()

        // onMounted(() =>
        // {
        //     useResetForm()
        // })

        //アカウント情報取得
        let accountApiRes = await new repository(router).get<AccountApiRes>("account/get")

        //storeにアカウント情報を保存
        setAccount(store, accountApiRes)
        //formデータ
        const name = ref(accountApiRes.name)
        const year = ref(accountApiRes.birthdayYear)
        const month = ref(accountApiRes.birthdayMonth)
        const date = ref(accountApiRes.birthdayDate)
        const mail = ref(accountApiRes.mail)
        const password = '**********'

        //パスワード変更モーダル
        const showChangePasswordModal = ref(false)
        const overrideErrMsgByPassword = ref('')

        return {
            //formdata
            name,
            mail,
            year,
            month,
            date,
            password,
            //eventFunction
            onInputName: (val) => { name.value = val },
            onInputMail: (val) => { mail.value = val },
            onChangeYear: (val) => { year.value = val },
            onChangeMonth: (val) => { month.value = val },
            onChangeDate: (val) => { date.value = val },
            onClickChangePassword: () => { showChangePasswordModal.value = true },
            // updatePassword,
            //パスワード変更モーダルdata,
            showChangePasswordModal,
            hideChangePasswordModal: () => { showChangePasswordModal.value = false },
            //validation
            passwordRule,
            overrideErrMsgByPassword
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

//パスワードの更新
async function updatePassword(password:string, repository: repository, form: PublicFormContext<Record<string, any>>, errMsgRef: Ref<string>, showModal: Ref<boolean>){
    //バリデーションチェック
    if(form.validate()){
        //パスワード変更のリクエスト送信

        var result = await repository.post('account/updatepassword',{
            passwrod: password
        })

        if(result){
            errMsgRef.value = ""
            showModal.value = false
        }else{
            errMsgRef.value = "原因不明のエラーが発生しました。時間を空けて再度やり直してください。"
        }
    }
}

</script>
