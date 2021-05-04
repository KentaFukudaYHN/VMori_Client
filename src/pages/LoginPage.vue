<style lang="scss" scoped>
.icon-title{
    display: block;
    margin: 0 auto 50px auto;
}
.modal {
    &-overlay {
        display: flex;
        align-items: center;
        justify-content: center;
        position: fixed;
        z-index: 30;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.5)
    }

    &-window {
        background: #fff;
        border-radius: 4px;
        overflow: hidden;
        min-width: 400px;
    }

    &-content {
        padding: 40px 40px;
    }
}

//オーバーレイのトランジション
.modal-enter-active, .modal-leave-active {
    transition: opacity 0.4s;

    .modal-window {
        transition: opacity 0.4s, transform 0.4s;
    }
}
</style>

<template>
    <transition name="modal" appear>
        <div class="modal-overlay">
            <div class="modal-window">
                <div class="modal-content">
                    <img class="icon-title" src='assets/title_icon.png'>
                        <div class="form-item">
                            <label>メールアドレス</label>
                            <VM_input name="mail" type="text" @emit-input="mailInput" :rule="isRequired"/>
                        </div>
                        <div class="form-item">
                            <label>パスワード</label>
                            <VM_input name="password" type="text" @emit-input="passwordInput" :rule="isRequired"/>
                        </div>

                        <!-- <p v-if="error != ''" class="validation-msg"> -->
                            <span class="valid-msg">{{error}}</span>
                        <!-- </p> -->

                        <div class="form-item">
                            <input @click="submit" class="btn-primary" type="button" value="ログイン">
                        </div>
                </div>
            </div>
        </div>
    </transition>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { Field, Form, ErrorMessage } from 'vee-validate'
import VM_input from '../components/VM_input.vue'
import { useForm } from 'vee-validate';
import VMoriRepository from 'repository/VMoriRepository';
import {AxiosError} from 'axios'

export default defineComponent({
    name: 'login',
    components:{
        Form,
        Field,
        ErrorMessage,
        VM_input
    },
    setup() {
        let error = ref('');
        let mail = '';
        let password = '';


        const isRequired = (value) => {
            if(value)
                return true;

            return '入力必須です'
        }

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
                    if(e.response.status == 401) {
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