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
    }
    &-form{
        margin: 40px auto 0 auto;
        .btn-submit{
            margin-bottom: 0;
        }
    }
}

</style>

<template>
    <vm-modal v-if="showModal">
        <template v-slot:content>
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
    <vm-confirm v-if="showConfirm" @emit-clickBtn="onClickConfirmOkBtn" :title="エラー" :msg="errorMsg"/>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import VM_Modal from '@/components/VM_Modal.vue'
import VM_Confirm from '@/components/VM_ConfirmModal.vue'
import VM_Input from '@/components/VM_Input.vue'
import * as yup from 'yup'

export default defineComponent({
    components:{
        'vm-modal': VM_Modal,
        'vm-confirm': VM_Confirm,
        'vm-input': VM_Input
    },
    setup() {
        /**
         *　バインドプロパティ
         */
        let showModal = ref(true);
        let showConfirm = ref(false);
        let password = ref('')

        /**
         * Functions
         */
        //メールアドレスの本人確認ボタンをクリック
        const onClickSubmitBtn = () =>{
            showModal.value = false;
            showConfirm.value = true
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

        //確認モーダルでOKボタンクリック
        const onClickConfirmOkBtn = () =>{
            showConfirm.value = false;
        }

        return {
            //バインドプロパティ
            showModal,
            showConfirm,
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
