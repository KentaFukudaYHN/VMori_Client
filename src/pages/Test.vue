<template>
    <button @click="onClickShowConfirmBtn">確認</button>
    <VM_Confirm v-if="showConfirm" @emit-clickBtn="onClickConfirmBtn" :msg="msg" :title="title"/>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import VM_Confirm from '@/components/VM_ConfirmModal.vue'

export default defineComponent({
    components:{
        VM_Confirm
    },
    setup() {
        let showConfirm = ref(false);
        const onClickShowConfirmBtn = () =>{
            debugger
            showConfirm.value = true;
        }
        const onClickConfirmBtn = () =>{
            showConfirm.value = false;
        }

        const msg = "メールアドレスがご本人のものであることを確認するために、yhn18782@gmail.comに確認のメールを送信しました。 \r\n" +
                    "2021年5月10日7時17分までに添付されているurlにアクセスして確認をお願いします。 \r\n\r\n" +
                    "※いつでもアカウント情報画面で認証メールを送ることができます。";

        const title = "メールアドレスの本人確認"

        return {
            onClickShowConfirmBtn,
            onClickConfirmBtn,
            msg,
            title,
            showConfirm
        }
    },
})
</script>
