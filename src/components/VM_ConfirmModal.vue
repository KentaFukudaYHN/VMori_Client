<style lang="scss">
    .confirm{
        &-container{
            min-width:700px;
        }
        &-header{
            text-align: center;
            font-size: 1em;
            font-weight: 100;
        }
        &-msg{
            white-space: pre-wrap;
            margin: 30px auto 30px auto;
        }
        &-footer{
            margin-top: 30px;
        }
        &-title-error{
            color:red;
        }
        &-msg-error{
            color: red;
        }
    }
</style>

<template>
    <VM_Modal>
        <template v-slot:content >
            <div class="confirm-container">
                <h2 class="confirm-header" :class="{'confirm-title-error': isErrorKinds}">{{ title }}</h2>
                <div class="confirm-msg" :class="{'confirm-msg-error': isErrorKinds}">{{ msg }}</div>
                <div v-if="hideBtn == false" class="confirm-footer">
                    <button class="btn-primary" @click="onClickBtn">{{ btnTxt }}</button>
                </div>
            </div>
        </template>
    </VM_Modal>
</template>

<script lang="ts">
import { defineComponent, SetupContext, ref, PropType } from 'vue'
import VM_Modal from '@/components/VM_Modal.vue'
import { boolean } from 'node_modules/yup/lib/locale';
import { ConfirmKinds } from '@/commons/enum'


type Props = {
  title: string,
  msg: string,
  btnTxt: string,
  hideBtn: boolean,
  kinds: ConfirmKinds
};
export default defineComponent({
    components:{
        VM_Modal
    },
    props:{
        title: {
            type: String
        },
        msg: {
            type: String
        },
        btnTxt: {
            type: String,
            default: 'OK'
        },
        hideBtn:{
            type: Boolean,
            default: false
        },
        kinds: {
            type: Object as PropType<ConfirmKinds>,
            default: ConfirmKinds.Normal
        }
    },
    emits: ['emit-clickBtn'],
    setup(props: Props, context: SetupContext) {

        /**
         * 初期化処理
         */


        /**
         *  イベントFunction
         */
        const onClickBtn = ()=>{
            context.emit('emit-clickBtn')
        }

        return{
            title: props.title,
            msg: props.msg,
            btnTxt: props.btnTxt,
            isErrorKinds: props.kinds == ConfirmKinds.Error,
            hideBtn: props.hideBtn,
            onClickBtn
        }
    },
})
</script>
