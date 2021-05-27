<style lang="scss" scoped>
.resetps{
    margin:0 20px 0 20px;
    &-mail{
        width:380px;
    }
    & .btn-submit-container{
        margin: 30px 0 5px 0;
    }
    & .btn-primary{
        width: 100%;
    }
}
.resetconfirm{
    min-width: 500px;
    & .resetps-mail{
        width: 80%;
        margin: 0 auto;
    }

    &-msg{
        white-space: pre-wrap;
    }

    & .btn-primary{
        width: 100%;
    }
}
.resetps{
    margin:0 20px 0 20px;
    &-newpassword{
        width:350px;
    }
    &-confirmpassword{
        @extend .resetps-newpassword;
    }
    & .btn-primary{
        width: 100%;
    }
}
</style>

<template>
    <!-- メールアドレス入力フォーム -->
    <vm-modal v-if="mailForm.showModal">
        <template v-slot:content>
            <div class="resetps">
                <span class="title-success">パスワードのリセット</span>
                <div class="form-item">
                    <label>メールアドレスを入力してください</label>
                    <vm-input class="resetps-mail" :name="mailForm.mailName" type="text" :rule="mailRule" @emit-input="onInputMail"></vm-input>
                </div>
                <div>
                    <label>もう一度メールアドレスを入力してください</label>
                    <vm-input class="resetps-mail-confirm" :name="mailForm.confirmMailName" :rule="confirmMailRule" type="text" @emit-input="onInputConfirmMail"></vm-input>
                </div>
                <div class="form-item btn-submit-container">
                    <button class="btn-primary" @click="onSubmit">送信</button>
                </div>
            </div>
        </template>
    </vm-modal>

    <!-- 認証コードモーダル -->
    <vm-modal v-if="codeModal.showModal">
        <template v-slot:content>
            <div class="resetconfirm">
                <span class="title-success">{{codeModal.title}}</span>
                <span class="resetconfirm-msg">{{codeModal.msg}}</span>
                <div class="form-item">
                    <vm-input :name="codeModal.codeName" type="text" :rule="isRequired" @emit-input="onInputCode"></vm-input>
                </div>
                <div class="form-item btn-submit-container">
                    <button class="btn-primary" @click="onSubmitCode">送信</button>
                </div>
            </div>
        </template>
    </vm-modal>

    <!-- パスワード入力モーダル -->
    <vm-modal v-if="passwordModal.showModal">
        <template v-slot:content>
            <div class="resetps">
                <span class="title-success">パスワードのリセット</span>
                <div class="from-item">
                    <label>新しいパスワードを入力してください</label>
                    <vm-input class="resetps-newpassword" :name="passwordModal.passwordName" type="password" :rule="passwordRule" @emit-input="onInputPassword" ></vm-input>
                </div>
                <div class="form-item">
                    <label>もう一度パスワードを入力してください</label>
                    <vm-input class="restps-confirmpassword" :name="passwordModal.confirmPasswordName" type="password" :rule="confirmPasswordRule" @emit-input="onInputConfirmPassword"></vm-input>
                </div>
                <div class="form-item">
                    <button class="btn-primary" @click="submitPassword" >送信</button>
                </div>
            </div>
        </template>
    </vm-modal>

    <!-- 実行結果モーダル -->
    <vm-confrim v-if="confirmModal.showModal"
                :title="confirmModal.title"
                :msg="confirmModal.msg"
                :kinds="confirmModal.kinds"
                @emit-clickBtn="confirmModal.click"/>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, toRefs } from 'vue'
import VM_Modal from '@/components/VM_Modal.vue'
import VM_Confirm from '@/components/VM_ConfirmModal.vue'
import VM_Input from '@/components/VM_Input.vue'
import { mailRule, isRequired, passwordRule } from '@/commons/valid/valid-rules'
import { PublicFormContext, useForm } from 'vee-validate'
import Repository from '@/repository/VMoriRepository'
import { router } from '@/router/router'
import { ConfirmKinds } from '@/commons/enum'
import LetterAndSuccessRes from '@/apiReqRes/LetterAndSuccessRes'
import { Router } from 'node_modules/vue-router/dist/vue-router'

//初期データを生成
function createInitState(){
    return{
        //パスワード再設定の認証コードを送るメールアドレスForm
        mailForm:{
            mail: '',
            mailName: 'mail',
            confirmMail: '',
            confirmMailName: 'confirmname',
            showModal: true
        },
        //認証コード入力モーダル
        codeModal:{
            showModal: false,
            msg: '',
            title: '',
            code: '',
            codeName: 'codeName',
        },
        //パスワード入力モーダル
        passwordModal:{
            showModal: false,
            password: '',
            passwordName: 'passwordnew',
            confirmPassword: '',
            confirmPasswordName: 'passwordconfirm'
        },
        //実行結果通知モーダル
        confirmModal:{
            showModal: false,
            kinds: ConfirmKinds.Normal,
            title: '',
            msg: '',
            click: () => { state.confirmModal.value.showModal = false }
        }
    }
}

let state = toRefs(reactive(createInitState()))

let form: PublicFormContext<Record<string, any>> = null
export default defineComponent({
    components:{
        'vm-modal': VM_Modal,
        'vm-confrim': VM_Confirm,
        'vm-input': VM_Input,
    },
    setup() {
        const repository = new Repository(router)
        form = useForm()

        return{
            //mailForm
            mailForm: state.mailForm.value,
            //event
            onInputMail: (val) => { state.mailForm.value.mail = val },
            onInputConfirmMail: (val) => { state.mailForm.value.confirmMail = val },
            onSubmit: () => { _submit(repository) },
            //認証コードモーダル
            codeModal: state.codeModal.value,
            onInputCode: (val) => { state.codeModal.value.code = val },
            onSubmitCode: () => {_submitCode(repository)},
            //実行結果確認モーダル
            confirmModal: state.confirmModal.value,
            //パスワードモーダル
            passwordModal: state.passwordModal.value,
            onInputPassword: (val) => { state.passwordModal.value.password = val },
            onInputConfirmPassword: (val) => { state.passwordModal.value.confirmPassword = val },
            submitPassword: () => { _submitPassword(repository, router) },
            //Validation
            mailRule,
            confirmMailRule,
            isRequired,
            passwordRule,
            confirmPasswordRule
        }
    },
})

async function CheckValidate(name: string){
    return (await form.validateField(name)).valid
}

//パスワード変更要求の送信
async function _submit(repository: Repository){
    if( (await CheckValidate(state.mailForm.value.mailName)) == false || (await CheckValidate(state.mailForm.value.confirmMailName)) == false){
        return;
    }

    var result = await repository.post<boolean>('auth/CreateChangeReqPassword',{
        mail: state.mailForm.value.mail
    })

    if(result.data && result.isOk()){
        state.codeModal.value.title = "パスワードのリセット"
        state.codeModal.value.msg = state.mailForm.value.mail + "宛に認証コードを送信しました。\r\n" +
                                "こちらに認証コードを入力して『送信』ボタンを押してください。"

        state.mailForm.value.showModal = false
        state.codeModal.value.showModal = true
    }else{
        state.confirmModal.value.title = "パスワードのリセット失敗"
        state.confirmModal.value.msg = "原因不明のエラーが発生しました。お手数ですがもう一度パスワードのリセットを行ってください。"
        state.confirmModal.value.kinds = ConfirmKinds.Error
        state.confirmModal.value.click = () => { 
            closeConfirm()
            state.mailForm.value.showModal = true
        }
        state.confirmModal.value.showModal = true
    }}

//認証コードの送信
async function _submitCode(repository: Repository){

    if((await CheckValidate(state.codeModal.value.codeName)) == false){
        return;
    }


    var result = await repository.post<LetterAndSuccessRes>('auth/CheckChangeReqPassword',{
        Mail: state.mailForm.value.mail,
        Token: state.codeModal.value.code,
    });

    state.codeModal.value.showModal = false
    if(result.isOk() && result.data.success){
        //パスワード入力モーダルを表示する
        state.passwordModal.value.showModal = true
    }else{
        state.confirmModal.value.title = "パスワードのリセット"

        if(result.data != null && result.data.success == false){
            state.confirmModal.value.msg = result.data.errMsg
            state.confirmModal.value.click = () => {
                closeConfirm()
                state.codeModal.value.showModal = true
            }
        }else{
            state.confirmModal.value.msg = "原因不明のエラーが発生しました。お手数ですが再度パスワードのリセットを行ってください"
            state.confirmModal.value.click = () => { 
                closeConfirm()
                state.mailForm.value.showModal = true
            }
        }
        state.confirmModal.value.kinds = ConfirmKinds.Error
        state.confirmModal.value.showModal = true
    }
}

//新しいパスワードの送信
async function _submitPassword(repository: Repository, router: Router){
    if((await CheckValidate(state.passwordModal.value.passwordName)) == false || (await CheckValidate(state.passwordModal.value.confirmPasswordName)) == false){
        return;
    }

    debugger

    var result = await repository.post<LetterAndSuccessRes>('auth/ChangeReqPassword',{
        Mail: state.mailForm.value.mail,
        Token: state.codeModal.value.code,
        Password: state.passwordModal.value.password
    });
    state.passwordModal.value.showModal = false
    state.confirmModal.value.title = "パスワードのリセット"
    if(result.isOk() && result.data.success) {
        state.confirmModal.value.msg = "パスワードのリセットが完了しました！"
        state.confirmModal.value.kinds = ConfirmKinds.Normal
        state.confirmModal.value.click = () => { 
            state = toRefs(reactive(createInitState()))
            router.push('Login') 
        }
    }else{
        state.confirmModal.value.msg = "原因不明のエラーが発生しました。お手数ですが再度パスワードのリセットを行ってください"
        state.confirmModal.value.kinds = ConfirmKinds.Error
        state.confirmModal.value.click = () => { 
            closeConfirm()
            state.mailForm.value.showModal = true
        } 
    }
    state.confirmModal.value.showModal = true
}

//実行結果モーダルを閉じる
function closeConfirm(){
    state.confirmModal.value.showModal = false;
}

//確認メールInputのバリデーションルール
const confirmMailRule = (val) => {
    if(val == state.mailForm.value.mail){
        return true;
    }

    return 'メールアドレスが一致しません'
}

//確認パスワードのバリデーションルール
const confirmPasswordRule = (val) => {
    if(val == state.passwordModal.value.password){
        return true
    }else{
        return 'パスワードが一致しません'
    }
}

</script>
