<style lang="scss" scoped>
.icon-title{
    display: block;
    margin: 0 auto 50px auto;
}
</style>

<template>
    <VM_Modal>
        <template v-slot:content>
            <img class="icon-title" src='assets/title_icon.png'>
            <div class="form-item">
                <label>メールアドレス</label>
                <VM_Input name="mail" type="text" @emit-input="mailInput" :rule="isRequired"/>
            </div>
            <div class="form-item">
                <label>パスワード</label>
                <VM_Input name="password" type="text" @emit-input="passwordInput" :rule="isRequired"/>
            </div>

            <span class="valid-msg">{{error}}</span>

            <div class="form-item">
                <input @click="submit" class="btn-primary" type="button" value="ログイン">
            </div>
        </template>
    </VM_Modal>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import VM_Modal from '@/components/VM_Modal.vue'
import VM_Input from '@/components/VM_Input.vue'
import VMoriRepository from '@/repository/VMoriRepository';
import { useForm } from 'vee-validate';
import { isRequired } from '../commons/valid-rules';

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
        const submit = async () => {
            if(valid.meta.value.valid == false){ return }

            if(mail != '' || password != ''){
                //ログインリクエスト
                try{
                    let res = await new VMoriRepository().post('auth/login',{
                        Mail:mail,
                        Password:password
                    })
                    error.value = ''
                }catch(e){
                    if(e.response != undefined && e.response.status == 401) {
                        error.value = 'メールアドレスまたはパスワードが間違っています'
                    }else{
                        error.value = '原因不明のエラーが発生しました、時間をおいて試してください'
                    }

                    return;
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