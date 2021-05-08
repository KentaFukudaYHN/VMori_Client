<style lang="scss">
.signup-container{
    width: 400px;
    padding: 0 50px;
    margin: 0 auto 0 auto;
    @media(max-width:780px){
    }

    .link-font{
        font-size: 14px;
    }
    .small-font{
        font-size: 14px;
    }
}
.icon-title{
    display: block;
    margin: 0 auto 50px auto;
}
.birthday 
{
    margin: 0;
    &-container{
        display: flex;
        justify-content: space-between;
        align-items: center;

    }
    &-year {
        @extend .birthday;
        width: 30%;
        select{
            width: 100%;
        }
    }
    &-month{
        @extend .birthday;
    }
    &-day{
        @extend .birthday;
    }
}
</style>

<template>
    <VM_Modal>
        <template v-slot:content>
            <div class="signup-container">
                <img class="icon-title" src='assets/title_icon.png'>
                <div class="form-item">
                    <label>メールアドレス</label>
                    <VM_Input name="mail" type="text" @emit-input="inputMail" @emit-blur="onBlurMail" :overrideErrMsg="overrideErrMsgMail" :rule="isRequiredEmail"/>
                </div>
                <div class="form-item">
                    <label>ユーザー名</label>
                    <VM_Input name="name" type="text" @emit-input="inputName" :rule="isRequired"/>
                </div>
                <div class="form-item">
                    <label>パスワード</label>
                    <VM_Input name="password" type="password" @emit-input="inputPassword" :rule="isRequiredPasswod"/>
                </div>
                <div class="form-item">
                    <label>生年月日</label>
                    <div class="birthday-container">
                        <VM_Select class="birthday-year" name="year" @emit-change="changeYear" :items="yearsItems" :rule="isRequiredNoMsg"/>
                        <span>年</span>
                        <VM_Select class="birthday-month" name="month" @emit-change="changeMonth" :items="monthItems" :rule="isRequiredNoMsg"/>
                        月
                        <VM_Select class="birthday-day" name="day" @emit-change="changeDay" :items="dayItems" :rule="isRequiredNoMsg"/>
                        日
                    </div>
                    <span class="valid-msg" >{{birthdayErrorMessage}}</span>
                </div>
                <div class="form-item">
                    <input @click="submit" class="btn-primary" type="button" value="アカウント作成">
                </div>
                <p class="link-font"><router-link to="/Login">既にアカウントをお持ちですか？</router-link></p>
                <p class="small-font">登録を行うことで、Vtuberの森の<router-link to="/Login">利用規約</router-link>に同意したものとみなされます</p>
            </div>
        </template>
    </VM_Modal>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import VM_Modal from '@/components/VM_Modal.vue'
import VM_Input from '@/components/VM_Input.vue'
import VM_Select from '@/components/VM_Select.vue'
import SelectListItem from '@/commons/form/SelectListItem'
import { useForm,useValidateForm } from 'vee-validate';
import { isRequired, isRequiredNoMsg } from '@/commons/valid/valid-rules';
import * as yup from 'yup'
import repository from '@/repository/VMoriRepository'

export default defineComponent({
    components: {
        VM_Modal,
        VM_Input,
        VM_Select
    },
    setup() {

        /*
            初期データの生成
        */

        //年のselect用データの生成
        const yearsItems = Array<SelectListItem>();
        const currentyYear = new Date().getFullYear()
        yearsItems.push({ Value: '', Text: '' })
        for(let i=0;i<130;i++){
            yearsItems.push({
                Value: currentyYear - i,
                Text: String(currentyYear -i)
            })
        }

        //月のselect用データの生成
        const monthItems = Array<SelectListItem>();
        monthItems.push({ Value: '', Text: '' })
        for(let i=1;i<=12;i++){
            let val = ''
            if(i<10){
                val = '0' + String(i)
            }else{
                val = String(i)
            }
            monthItems.push({Value: i, Text: val})
        }

        //日にちのselect用データの生成
        const dayItems = Array<SelectListItem>();
        dayItems.push({ Value: '', Text: '' });
        for(let i=1;i<=31;i++){
            let val = ''
            if(i<10){
                val = '0' + String(i)
            }else{
                val = String(i)
            }
            dayItems.push({Value: i, Text: val})
        }

        /*
            Function
        */

        //Formデータ
        let mail = ref('')
        let name = ref('')
        let password = ref('')
        let year = ''
        let month = ''
        let day = '';
        const inputMail = (val) => { mail = val }
        const inputName = (val) => { name = val }
        const inputPassword = (val) => { password = val }
        const changeYear = (val) => { year = val }
        const changeMonth = (val) => { month = val }
        const changeDay = (val) => { day = val }

        //バリデーションチェック
        let birthdayErrorMessage = ref('')
        const form = useForm();
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

            //メールアドレスの重複チェック
            if(overrideErrMsgMail.value != ""){
                return false
             }

            return isSuccess && birthdaySuccess;
        }

        //アカウント作成データ送信
        const submit = async (val) => { 
            if(await valid() == true){
                const data ={
                    Mail:mail,
                    Password:password,
                    Name:name,
                    Year:String(year),
                    Month:String(month),
                    Day:String(day)
                }

                await new repository().post('account/regist',data)
                return;
            }
        }

        let overrideErrMsgMail = ref("")
        const onBlurMail = async (val) =>{
            var result = await new repository().get<boolean>('account/NotExitsMail?mail=' + mail)
            if(result != true){
                overrideErrMsgMail.value = "既に使用されているメールアドレスです"
            }else{
                overrideErrMsgMail.value = "";
            }
        }
        
        return{
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
            submit,
            isRequired,
            isRequiredNoMsg,
            isRequiredEmail: yup.string().email('メールアドレスの形式にしてください').required('入力必須です'),
            isRequiredPasswod: yup.string().matches(/^(?=.*?[a-z])(?=.*?[A-Z])(?=.*?\d)[a-zA-Z\d]{8,100}$/,{ message: '8文字以上で半角英数字大文字を含む必要があります' }).required('入力必須です'),
            overrideErrMsgMail,
            onBlurMail
        }
    },
})
</script>
