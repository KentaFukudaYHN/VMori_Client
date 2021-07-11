<style lang="scss" scoped>
.appreqmail{
    &-title{ 
        text-align: center;
        font-size:20px;
        font-weight:100;
        margin: 0;
        margin-bottom: 40px;
    }
    
    &-content{
        margin: 0 50px;
        & .btn-primary{
            width: 100%;
        }
    }
    &-form{
        margin: 40px auto 0 auto;
        .btn-submit{
            margin-bottom: 0;
        }
    }

    &-err{
        color: red;
    }
}

</style>

<template>
    <vm-modal >
        <template v-if="showModal" v-slot:content>
            <h2 class="appreqmail-title">メールアドレスの本人確認</h2>
            <div class="appreqmail-content">
                ログイン時に使用するパスワードを入力して確認ボタンを押してください！
                <div class="appreqmail-form">
                    <div class="form-item">
                        <vm-input name="password" type="password" @emit-input="onInputByPassword" :rule="isRequired" placeholder='パスワード'/>
                    </div>
                    <div class="form-item btn-submit">
                        <button class="btn-primary" @click="onClickSubmitBtn">確認</button>
                    </div>
                </div>
            </div>
        </template>
    </vm-modal>
    <div>
        <vm-confirm v-if="showSubmitErrConfirm" @emit-clickBtn="onClickConfirmOkBtn" title="メールアドレスの本人確認"  :msg="errorMsg" :kinds="confirmKinds"/>
        <vm-confirm v-if="showTokenErrConfirm" :hideBtn="true" title="メールアドレスの本人確認"  msg="メールアドレス本人認証の有効期限が切れています。アカウント設定画面から、再度メールアドレスの認証を行ってください。" :kinds="confirmKinds"/>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import VM_Modal from '@/front/components/VM_Modal.vue'
import VM_Confirm from '@/front/components/VM_ConfirmModal.vue'
import { ConfirmKinds } from '@/core/enum'
import VM_Input from '@/front/components/VM_Input.vue'
import { useForm } from 'vee-validate'
import { useRoute, useRouter  } from 'vue-router'
import repository from '@/dataAccess/repository/VMoriRepository'
import { AppReqMailApiRes } from '@/core/apiReqRes/Account'
import * as yup from 'yup'

export default defineComponent({
    components:{
        'vm-modal': VM_Modal,
        'vm-confirm': VM_Confirm,
        'vm-input': VM_Input
    },
    async setup() {

        /**
         *　バインドプロパティ
         */
        let showModal = ref(true)
        let showSubmitErrConfirm = ref(false)
        let showTokenErrConfirm = ref(false)
        let password = ref('')
        let errorMsg = ref('')

        /**
         * 初期化処理
         */
        //Tokenが有効かどうか確認
        var router = useRouter()
        var token = useRoute().query.token
        var result = await new repository(router).get<boolean>('auth/checkappreqmail?token=' + token)
        if(!result){
            showModal.value = false
            showTokenErrConfirm.value = true
        }

        /**
         * Functions
         */
        //メールアドレスの本人確認ボタンをクリック
        const onClickSubmitBtn = async () =>{
            
            if(useForm().validate()){
                const result = await new repository(router).post<AppReqMailApiRes>('auth/AppReqMail',{
                    Password: password.value,
                    Token: token
                })
                
                if(result.data.success == false){
                    errorMsg.value = result.data.errMsg;
                    showModal.value = false;
                    showSubmitErrConfirm.value = true
                }else{
                    router.push('Home')
                }
            }

        }

        //SubmitエラーモーダルのOKボタンをクリック
        const onClickConfirmOkBtn = () =>{
            showSubmitErrConfirm.value = false;
            showModal.value = true;
        }

        /**
         * Formの入力値受け取り
         */
        const onInputByPassword = (val) =>{
            password.value = val;
        }


        /**
         * バリデーション
         */
        const isRequired = yup.string().required('入力必須です');

        console.log(showModal.value)
        return {
            //バインドプロパティ
            showModal,
            showSubmitErrConfirm,
            showTokenErrConfirm,
            errorMsg,
            //プロパティ
            confirmKinds: ConfirmKinds.Error,
            //Functiuons
            onClickSubmitBtn,
            onClickConfirmOkBtn,
            //formで値の受け取り
            onInputByPassword,
            //バリデーション
            isRequired
        }
    },
})
</script>
