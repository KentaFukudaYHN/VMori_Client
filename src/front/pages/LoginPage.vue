<style lang="scss" scoped>
.login-container{
    & .icon-title{
        display: block;
        margin: 0 auto 30px auto;
    }
    & .btn-login{
        width:100%;
    }

    & .from-item-password{
        margin-bottom: 0;
    }
}

::v-deep{
    .login-window{
        @include sp{
            // width: 80%;
        }
    }
}
</style>

<template>
    <VM_Modal :windowClass="'login-window'">
        <template v-slot:content>
            <div class="login-container">
                <img class="icon-title" src='assets/title_icon.png'>
                <div class="form-item">
                    <label>メールアドレス</label>
                    <VM_Input name="mail" type="text" @emit-input="mailInput" :rule="isRequired"/>
                </div>
                <div class="form-item from-item-password">
                    <label>パスワード</label>
                    <VM_Input name="password" type="password" @emit-input="passwordInput" :rule="isRequired"/>
                </div>
                <span class="valid-msg">{{error}}</span>
                <p class="small-font"><router-link to="/ResetReqPassword">パスワードをお忘れですか？</router-link></p>
                <div class="form-item">
                    <input @click="submit" class="btn-primary btn-login" type="button" value="ログイン">
                </div>
                <p class="small-font">アカウントを作りますか？  <router-link to="/SignUp">登録</router-link></p>
            </div>
        </template>
    </VM_Modal>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import VM_Modal from '@/front/components/VM_Modal.vue';
import VM_Input from '@/front/components/VM_Input.vue'
import VMoriRepository from '@/dataAccess/repository/VMoriRepository';
import { useForm } from 'vee-validate';
import { isRequired } from '@/front/valid/valid-rules';
import { useRouter } from "@/router/router";
import { useStore } from '@/dataAccess/store/store'

export default defineComponent({
    name: 'login',
    components:{
        VM_Modal,
        VM_Input
    },
    setup() {
        let error = ref('');
        let mail = '';
        let password = '';

        const mailInput = (value: string) => {
            mail = value;
        }

        const passwordInput = (value: string) =>{
            password = value;
        }

        const valid = useForm();
        const store = useStore();
        const router = useRouter();
        const submit = async () => {
            if(valid.meta.value.valid == false){ return }
            if(mail != '' || password != ''){
                //ログインリクエスト
                const repository = new VMoriRepository(router);
                try{
                    //ログイン
                    let res = await repository.post('auth/login',{
                        Mail:mail,
                        Password:password
                    })
                    if(res.status == 200){
                        //アカウント情報画面に遷移 @ToDo
                        error.value = ''
                        router.push('Account')
                    }else if(res.status == 401){
                        error.value = 'メールアドレスまたはパスワードが間違っています'
                    }else{
                        error.value = '原因不明のエラーが発生しました、時間をおいて試してください'
                    }

                }catch(e){
                    console.log(e)
                    error.value = '原因不明のエラーが発生しました、時間をおいて試してください'
                }
            }
        }

        return {
            mail,
            password,
            mailInput,
            passwordInput,
            submit,
            isRequired,
            error,
        }
    }
})
</script>