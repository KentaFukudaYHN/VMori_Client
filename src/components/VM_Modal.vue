<style lang="scss" scoped>
.modal {
    &-backlayer{
        display: flex;
        position: fixed;
        z-index: 20;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.5)
    }

    &-window {
        display: flex;
        align-items: center;
        justify-content: center;
        position: fixed;
        z-index: 30;
        top: 50%;
        left: 50%;
        margin: auto;
        transform: translateX(-50%) translateY(-50%);
        background: #fff;
        border-radius: 4px;
        // min-width: 400px;
        max-height: 100%;
        overflow-y:auto;

        & .modal-closebtn {
            display: block;
            cursor: pointer;
            z-index: 999;
            position: absolute;
            padding: 5px 5px;
            width: 15px;
            height: 15px;
            line-height: 15px;
            border-radius: 3px;
            text-align: center;
            top: 12px;
            right: 18px;
            background-color: transparent;
            color: #b2b2b2;
            font-weight: bold;
            font-size: 30px;
        }
    }

    &-content {
        padding: 40px 40px;
        z-index: 40;
        max-height: 95vh;
        @include tab{
            // max-height: 80vh;
            padding: 15px 15px;
        }
    }

    &-content::-webkit-scrollbar {
        display:none;
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
    <div class="modal">
        <div class="modal-backlayer" @click="outsideClick"></div>
        <transition name="modal" appear>
            <div class="modal-overlay">
                <div class="modal-window" :class="windowClass" :style="windowStyle">
                    <span v-if="showCloseBtn" class="modal-closebtn" @click="cliclCloseBtn">×</span>
                    <div class="modal-content">
                        <slot name="content"></slot>
                    </div>
                </div>
            </div>
        </transition>
    </div>
</template>

<script lang="ts">
import { boolean } from 'node_modules/yup/lib/locale'
import { defineComponent, SetupContext } from 'vue'

type Props = {
    showCloseBtn: boolean,
    windowClass: string,
    width: string,
}
export default defineComponent({
    emits: ['emit-outsideClick', 'emit-clickCloseBtn'],
    props:{
        showCloseBtn: {
            type: Boolean,
            default: false
        },
        windowClass: {
            type: String,
            default: null
        },
        width: {
            type: String
        }
    },
    setup(props: Props, context: SetupContext) {

        //windowDivのclassを生成
        let windowClass = {}
        windowClass['modal-closebtn'] = props.showCloseBtn
        if(props.windowClass != null && props.windowClass != ''){
            windowClass[props.windowClass] = true
        }
        return {
            outsideClick: () => { context.emit('emit-outsideClick') },
            cliclCloseBtn: () => { context.emit('emit-clickCloseBtn') },
            showCloseBtn: props.showCloseBtn,
            windowClass: windowClass,
            windowStyle: () => {
                const result = {}
                if(props.width != '' && props.width != null){
                    result['--width'] = props.width
                }

                return result
            }
        }
    },
})
</script>
