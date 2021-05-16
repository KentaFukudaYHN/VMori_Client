<style lang="scss" scoped>
.account-container{
    margin: 0 50px 0 50px;
}
.setting{
    &-list{
        margin: 0;
        padding: 0;
        & li{
            display: flex;
            align-items: middle;
            margin:20px 0;
            label{
                display: flex;
                align-items: center;
                margin: 0 10px 0 0px;
                width:150px;
            }
        }
        &-changebtn{
            margin-left: 30px;
            display: flex;
            align-items: flex-end;
        }
    }
    &-name{
        width : 214px;
    }
    &-birthday{
        width: 350px
    }
    &-mail{
        width: 322px;
    }
    &-password{
        width: 322px;
    }
}
</style>

<template>
<div class="account-container">
    <vm-header/>
    <h2>アカウント情報</h2>
    <ul class="setting-list">
        <li>
            <label>アイコン</label>
            <img src="assets/noset-icon.png">
            <div class="setting-list-changebtn">
                <button>変更</button>
            </div>
        </li>
        <li>
            <label>名前</label>
            <div class="form-item setting-name">
                <vm-input name="name" type="text" @emit-input="inputName" :rule="isRequiredPasswod"/>
            </div>
        </li>
        <li>
            <label>生年月日</label>
            <div class="form-item setting-birthday">
                <vm-select/>
            </div>
        </li>
        <li>
            <label>メールアドレス</label>
            <div class="form-item setting-mail">
                <vm-input name="name" type="text" @emit-input="inputMail" :rule="isRequiredPasswod"/>
            </div>
        </li>
        <li>
            <label>パスワード</label>
            <div class="form-item setting-password">
                <vm-input name="name" type="password" @emit-input="inputPassword" :rule="isRequiredPasswod"/>
            </div>
        </li>
    </ul>
    <div>

    </div>

</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import VM_Header from '@/components/VM_VideoHeader.vue'
import VM_Input from '@/components/VM_Input.vue'
import VM_Birthday from '@/components/VM_Birthday.vue'

export default defineComponent({
    components:{
        'vm-header': VM_Header,
        'vm-input': VM_Input,
        'vm-select': VM_Birthday
    },
    setup() {
        
    },
})
</script>
