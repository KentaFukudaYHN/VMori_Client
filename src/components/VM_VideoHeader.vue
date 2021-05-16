<style lang="scss">
    .video-header{
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin: 30px 0;
        & .icon-title{
            width: 200px;
            margin: 0;
        }

        & .video-search{
            display: flex;
            width:50%;
            &-input{
                width:100%;
                max-width: 800px;
                border:solid 1px $form-border-color;
                box-sizing: border-box;
                padding: 7px;
                &:focus {
                    outline: 0;
                    border-color: transparent;
                    box-shadow: 0 0 0 1px $form-border-sel-color;
                }
            }
            &-btn{
                button{
                    margin: 0;
                    height: 100%;
                    width: 50px;
                    border: solid 1px $form-border-color;
                }
            }
        }
    }
</style>
<template>
    <header class="video-header">
        <div>
            <img class="icon-title" src='assets/title_icon.png'>
        </div>
        <div class="video-search">
            <input class="video-search-input"/>
            <div class="video-search-btn">
                <button aria-label="検索を実行"></button>
            </div>
        </div>
        <div>
            <button aria-label="アカウント情報を開く"></button>
        </div>
    </header>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import VM_Input from '@/components/VM_Input.vue'

export default defineComponent({
    components:{
        'vm-input': VM_Input
    },
    setup() {
        
    },
})
</script>
