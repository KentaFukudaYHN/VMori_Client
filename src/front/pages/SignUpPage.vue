<style lang="scss" scoped>
.signup-container{
    margin: 0 auto 0 auto;
    min-width: 320px;
    @include sp{
        min-width: 0;
        margin: 10px;
    }
    .link-font{
        font-size: 14px;
    }

    .btn-primary{
        width:100%;
    }
}
.siginup-modal-window{
    @include sp{
        width: 90%;
    }
}
.icon-title{
    display: block;
    margin: 0 auto 30px auto;
    width: 250px;
    @include tab{
        width: 170px;
        margin: 10px auto 10px auto;
    }
}

::v-deep .singup-confirm-window{
    @include sp{
        width:90% !important;
    }

    & .confirm-container{
        min-width: auto !important;
    }
}
</style>

<template>
    <VM_Modal v-if="showSignUpModal"  id="signUpModal" :windowClass="'siginup-modal-window'">
        <template v-slot:content>
            <div class="signup-container">
                <img class="icon-title" src='assets/title_icon.png'>
                <div class="form-item">
                    <label>メールアドレス</label>
                    <VM_Input name="mail" type="text" @emit-input="inputMail" @emit-blur="onBlurInputMail" :overrideErrMsg="overrideErrMsgMail" :rule="isRequiredEmail"/>
                </div>
                <div class="form-item">
                    <label>ユーザー名</label>
                    <VM_Input name="name" type="text" @emit-input="inputName" @emit-blur="onBlurInputName" :overrideErrMsg="overrideErrMsgName" :rule="isRequired"/>
                </div>
                <div class="form-item">
                    <label>パスワード</label>
                    <VM_Input name="password" type="password" @emit-input="inputPassword" :rule="isRequiredPasswod"/>
                </div>
                <div class="form-item">
                    <label>生年月日</label>
                    <div class="form-item setting-birthday">
                        <VM_Birthday @emit-change-year="changeYear" @emit-change-month="changeMonth" @emit-change-date="changeDay"/>
                        <span class="valid-msg" >{{birthdayErrorMessage}}</span>
                    </div>
                    <!-- <label>生年月日</label>
                    <div class="birthday-container">
                        <VM_Select class="birthday-year" name="year" @emit-change="changeYear" :items="yearsItems" :rule="isRequiredNoMsg"/>
                        <span>年</span>
                        <VM_Select class="birthday-month" name="month" @emit-change="changeMonth" :items="monthItems" :rule="isRequiredNoMsg"/>
                        月
                        <VM_Select class="birthday-day" name="day" @emit-change="changeDay" :items="dayItems" :rule="isRequiredNoMsg"/>
                        日
                    </div>
                    <span class="valid-msg" >{{birthdayErrorMessage}}</span> -->
                </div>
                <div class="form-item">
                    <input @click="submit" class="btn-primary" type="button" value="アカウント作成">
                </div>
                <p class="link-font"><router-link to="/Login">既にアカウントをお持ちですか？</router-link></p>
                <p class="small-font">登録を行うことで、Vtuberの森の<router-link to="/Login">利用規約</router-link>に同意したものとみなされます</p>
            </div>
        </template>
    </VM_Modal>
    <VM_Confirm  v-if="showConfirmModal" windowClass="singup-confirm-window" :title="confirmTitle" :msg="confirmMsg" @emit-clickBtn="onClickConfirmBtn" :minWidth="'700px'"/>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue'
import VM_Modal from '@/front/components/VM_Modal.vue'
import VM_Confirm from '@/front/components/VM_ConfirmModal.vue'
import VM_Input from '@/front/components/VM_Input.vue'
import VM_Select from '@/front/components/VM_Select.vue'
import VM_Birthday from '@/front/components/VM_Birthday.vue'
import SelectListItem from '@/front/form/SelectListItem'
import { useRouter } from '@/router/router'
import { useForm,useValidateForm } from 'vee-validate';
import { isRequired, isRequiredNoMsg } from '@/front/valid/valid-rules';
import * as yup from 'yup'
import repository from '@/dataAccess/repository/VMoriRepository'
import { AuthService }  from '@/core/services/AuthServices'
import { useStore } from '@/dataAccess/store/store'
import VMoriRepository from '@/dataAccess/repository/VMoriRepository'

let authService: AuthService
export default defineComponent({
    components: {
        VM_Modal,
        VM_Input,
        VM_Select,
        VM_Confirm,
        VM_Birthday
    },
    setup() {
        const form = useForm()
        const router = useRouter()
        authService = new AuthService(useStore(), new VMoriRepository(router))
        onMounted(() =>{
            setTimeout(() => form.resetForm())
        })

        /*
            初期データの生成
        */
        //年のselect用データの生成
        const yearsItems = Array<SelectListItem>();
        const currentyYear = new Date().getFullYear()
        yearsItems.push({ Value: '', Text: '', Selected: false })
        for(let i=0;i<130;i++){
            yearsItems.push({
                Value: currentyYear - i,
                Text: String(currentyYear -i)
                , Selected: false
            })
        }

        //月のselect用データの生成
        const monthItems = Array<SelectListItem>();
        monthItems.push({ Value: '', Text: '', Selected: false  })
        for(let i=1;i<=12;i++){
            let val = ''
            if(i<10){
                val = '0' + String(i)
            }else{
                val = String(i)
            }
            monthItems.push({Value: i, Text: val, Selected: false })
        }

        //日にちのselect用データの生成
        const dayItems = Array<SelectListItem>();
        dayItems.push({ Value: '', Text: '', Selected: false  });
        for(let i=1;i<=31;i++){
            let val = ''
            if(i<10){
                val = '0' + String(i)
            }else{
                val = String(i)
            }
            dayItems.push({Value: i, Text: val, Selected: false })
        }

        const showSignUpModal = ref(true);
        const showConfirmModal = ref(false);
        const confirmMsg = ref('');
        const confirmTitle = "メールアドレスの本人確認"

        /*
            Function
        */

       //メールアドレス本人確認モーダルでOKをクリック
       const onClickConfirmBtn = () =>{
           //Home画面にリダイレクト @ToDo
            router.push('account')
       }

        //Formデータ
        let mail = ref('')
        let name = ref('')
        let password = ref('')
        let year = ''
        let month = ''
        let day = '';
        const inputMail = (val) => { mail.value = val }
        const inputName = (val) => { name = val }
        const inputPassword = (val) => { password = val }
        const changeYear = (val) => { year = val }
        const changeMonth = (val) => { month = val }
        const changeDay = (val) => { day = val }

        //バリデーションチェック
        let birthdayErrorMessage = ref('')
        const valid = async () => {
            const isSuccess = (await (form.validate())).valid

            //誕生日の入力チェック
            let birthdaySuccess = false;
            if(year == '' || month == '' || day == ''){
                birthdayErrorMessage.value = '入力必須です'
                birthdaySuccess = false;
            }else{
                birthdayErrorMessage.value = ''
                birthdaySuccess = true;
            }

            return isSuccess && birthdaySuccess;
        }

        let overrideErrMsgMail = ref("")
        let overrideErrMsgName = ref("")

        //メールInputのBlurで、独自のエラーメッセージを消す
        const onBlurInputMail = (val) =>{
            overrideErrMsgMail.value = ""
        }

        //名前InputのBlurで、独自のエラーメッセージを消す
        const onBlurInputName = (val) =>{
            overrideErrMsgName.value = "";
        }

        //アカウント作成データ送信
        const submit = async (val) => { 
            if(await valid() == true){

                //登録可能なメールアドレスかチェック
                var resMailOk = await new repository(router).get<boolean>('account/CanRegistMail?mail=' + mail.value);
                if(resMailOk.data == false){
                    overrideErrMsgMail.value = "既に使用されているメールアドレスです"
                }else{
                    overrideErrMsgMail.value = ""
                }

                //登録可能な名前かチェック
                var resNameOk = await new repository(router).get<boolean>('account/CanRegistName?nail=' + name); 
                if(resNameOk.data == false){
                    overrideErrMsgName.value = "この名前は使われすぎています"
                }else{
                    overrideErrMsgName.value = ""
                }

                if(!resMailOk.data || !resNameOk.data){
                    return;
                }

                //Postデータの生成・送信
                const data ={
                    Mail:mail.value,
                    Password:password,
                    Name:name,
                    Year:String(year),
                    Month:String(month),
                    Day:String(day)
                }

                await new repository(router).post('account/regist',data)
                
                //メールアドレス本人確認メッセージダイアログの表示 @ToDo エラー処理を追加
                confirmMsg.value = authService.createAppReqMsg(mail.value)

                showSignUpModal.value = false;
                showConfirmModal.value = true;
                return;
            }
        }

        return{
            showSignUpModal,
            showConfirmModal,
            confirmMsg,
            confirmTitle,
            onClickConfirmBtn,
            yearsItems,
            monthItems,
            dayItems,
            inputMail,
            inputName,
            inputPassword,
            changeYear,
            changeMonth,
            changeDay,
            birthdayErrorMessage,
            onBlurInputMail,
            onBlurInputName,
            submit,
            isRequired,
            isRequiredNoMsg,
            isRequiredEmail: yup.string().email('メールアドレスの形式にしてください').required('入力必須です'),
            isRequiredPasswod: yup.string().matches(/^(?=.*?[a-z])(?=.*?[A-Z])(?=.*?\d)[a-zA-Z\d]{8,100}$/,{ message: '8文字以上で半角英数字大文字を含む必要があります' }).required('入力必須です'),
            overrideErrMsgMail,
            overrideErrMsgName
        }
    },
})
</script>
