<style lang="scss">
    .confirm{
        &-container{
            min-width:700px;
        }
        &-header{
            text-align: center;
        }
        &-msg{
            white-space: pre-wrap;
            margin: 30px auto 60px auto;
        }
    }
</style>

<template>
    <VM_Modal>
        <template v-slot:content >
            <div class="confirm-container">
                <h2 class="confirm-header">{{ title }}</h2>
                <div class="confirm-msg">{{ msg }}</div>
                <div class="confirm-footer">
                    <button class="btn-primary" @click="onClickBtn">{{ btnTxt }}</button>
                </div>
            </div>
        </template>
    </VM_Modal>
</template>

<script lang="ts">
import { defineComponent, SetupContext } from 'vue'
import VM_Modal from '@/components/VM_Modal.vue'


type Props = {
  title: string,
  msg: string,
  btnTxt: string
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
        }
    },
    emits: ['emit-clickBtn'],
    setup(props: Props, context: SetupContext) {

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
            onClickBtn
        }
    },
})
</script>
