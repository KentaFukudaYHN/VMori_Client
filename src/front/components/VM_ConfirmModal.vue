<style lang="scss" scoped>
    .confirm{
        &-container{
            // min-width:700px;
            padding: 0 50px;
            min-width: 700px;
            @include pc{
                min-width: 500px;
            }
            @include tab{
                min-width: 300px;
            }
            @include sp{
                width: auto;
                padding: 0;
            }
        }
        &-title{
            display: block;
            margin-bottom: 50px;
            @include sp {
                margin-bottom: 20px;
            }
            color: #12a5ff;
            font-weight: bold;
            width: 100%;
            &::after{
                content: '';
                display: block;
                height: 2px;
                background-color: #12a5ff;
                border-radius: 10px;
            }

            &-error{
                color:red;
                &::after{
                    content: '';
                    display: block;
                    height: 2px;
                    background-color: red;
                    border-radius: 10px;
                }
            }
            &-success{
                color: $theme-color;
            }
        }
        &-btn-ok{
            text-align: center;
        }
        &-msg{
            white-space: pre-wrap;
            // margin: 30px auto 30px auto;
        }
        &-footer{
            margin-top: 50px;
            @include sp {
                margin-top: 20px;
            }
            width:100%;
            display: flex;
            justify-content:flex-end;
        }
        &-msg{
            &-error{
                color: red;
            }
            &-success{
                color:$theme-color
            }
        }
    }
</style>

<template>
    <VM_Modal @emit-outsideClick="outsideClick" :windowClass="windowClass">
        <template v-slot:content >
            <div class="confirm-container" :style="styles"> 
                <span v-if="title != ''" class="confirm-title" :class="{'confirm-title-error': isErrorKinds, 'confirm-title-success': isSuccess}">{{ title }}</span>
                <div class="confirm-msg" :class="{'confirm-msg-error': isErrorKinds,  'confirm-msg-success': isSuccess }">{{ msg }}</div>
                <div v-if="hideBtn == false" class="confirm-footer">
                    <button class="btn-primary confirm-btn-ok" @click="onClickBtn">{{ btnTxt }}</button>
                </div>
            </div>
        </template>
    </VM_Modal>
</template>

<script lang="ts">
import { defineComponent, SetupContext, ref, PropType } from 'vue'
import VM_Modal from '@/front/components/VM_Modal.vue'
import { ConfirmKinds } from '@/core/enum'


type Props = {
  title: string,
  msg: string,
  btnTxt: string,
  hideBtn: boolean,
  kinds: ConfirmKinds,
  minWidth: string,
  padding: string,
  windowClass: string
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
        },
        minWidth:{
            type: String
        },
        padding:{
            type: String,
        },
        windowClass:{
            type:String
        }
    },
    emits: ['emit-clickBtn', 'emit-outsideClick'],
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

        const outsideClick = () =>{
            context.emit('emit-outsideClick')
        }

        return{
            title: props.title,
            msg: props.msg,
            btnTxt: props.btnTxt,
            isErrorKinds: props.kinds == ConfirmKinds.Error,
            isSuccess: props.kinds == ConfirmKinds.Success,
            hideBtn: props.hideBtn,
            windowClass: props.windowClass,
            onClickBtn,
            styles: {
                'min-width': props.minWidth,
                'padding': props.padding
            }
        }
    },
})
</script>
