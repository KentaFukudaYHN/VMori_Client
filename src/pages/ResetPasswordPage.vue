<style lang="scss" scoped>
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
    <vm-modal>
        <template v-slot:content>
            <div class="resetps">
                <span class="title-success">パスワードのリセット</span>
                <div class="from-item">
                    <label>新しいパスワードを入力してください</label>
                    <vm-input class="resetps-newpassword" name="newpassword" type="password" :rule="passwordRule" @emit-input="onInputNew"></vm-input>
                </div>
                <div class="form-item">
                    <label>もう一度パスワードを入力してください</label>
                    <vm-input class="restps-confirmpassword" name="confirmpassword" type="password" :rule="confirmPasswordRule" @emit-input="onInputConfirm"></vm-input>
                </div>
                <div class="form-item">
                    <button class="btn-primary">送信</button>
                </div>
            </div>
        </template>
    </vm-modal>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from 'vue'
import VM_Modal from '@/components/VM_Modal.vue'
import VM_Input from '@/components/VM_Input.vue'
import { passwordRule} from '@/commons/valid/valid-rules'
import Repository from '@/repository/VMoriRepository'
const state = reactive({
    newPassword: '',
    confirmPassword: ''
})
export default defineComponent({
    components:{
        'vm-modal': VM_Modal,
        'vm-input': VM_Input
    },
    setup() {


        return{
            //event
            onInputNew: (val) => { state.newPassword = val },
            onInputConfirm: (val) => { state.confirmPassword = val },
            //validation
            passwordRule,
            confirmPasswordRule
        }

    },
})

//確認パスワードのバリデーションルール
const confirmPasswordRule = (val) => {
    if(val == state.newPassword){
        return true
    }else{
        return 'パスワードが一致しません'
    }
}

//パスワードを送信
async function submit(repository: Repository){
    if(state.newPassword != state.confirmPassword)
        return;
}
</script>
