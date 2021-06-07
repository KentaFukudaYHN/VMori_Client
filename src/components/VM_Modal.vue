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
    }

    &-content {
        padding: 40px 40px;
        z-index: 40;
        max-height: 95vh;
        @include tab{
            max-height: 80vh;
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
                <div class="modal-window">
                    <div class="modal-content">
                        <slot name="content"></slot>
                    </div>
                </div>
            </div>
        </transition>
    </div>
</template>

<script lang="ts">
import { defineComponent, SetupContext } from 'vue'

export default defineComponent({
    emits: ['emit-outsideClick'],
    setup(proprs: any, context: SetupContext) {
        return {
            outsideClick: () => { context.emit('emit-outsideClick') }
        }
    },
})
</script>
