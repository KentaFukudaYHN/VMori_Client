<style lang="scss" scoped>
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
        width:50%;
    }

    &-content {
        padding: 20px 40px;
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
                    モーダル1
                </div>
            </div>
        </div>
    </transition>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    name: 'login',
    setup() {
        
    }
})
</script>