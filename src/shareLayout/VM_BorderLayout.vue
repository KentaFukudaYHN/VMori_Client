<style lang="scss">
.header{
    position: relative;
    height:100%;
    &::after{
        content: '';
        box-shadow: 1px 0 0 0 $theme-color;
        width:100%;
        height: 100%;
        border: 15px solid $theme-color;
        position: fixed;
        right: 0;
        left:0;
        box-sizing: border-box;
    }
    &-btn{
        position: fixed;
        width:200px;
        height:80px;
        background-color: $theme-color;
        border: 0;
        border-radius: 50px;
        top: calc(50% - 80px);
        right: -100px;
        z-index: 3;
        cursor: pointer;

        & span{
            position: absolute;
            left: 28px;
            width: 20%;
            height: 5px;
            background-color: #fff;
            border-radius: 4px;
            transition: all .2s;
            box-sizing: border-box;
            display: inline-block;
        }
        & span:nth-of-type(1){
            top:25px;
        }
        & span:nth-of-type(2){
            top:38px;
        }
        & span:nth-of-type(3){
            bottom:25px;
        }

        & span:nth-of-type(3),
        &.header-btn-active span:nth-of-type(3){
            transition: none;
        }

        &.header-btn-active{
            transform: rotateX(720deg);
        }
        &.header-btn-active span:nth-of-type(1){
            transform: translateY(12px) rotate(-45deg);
        }
        &.header-btn-active span:nth-of-type(2){
            transform: translateY(0) rotate(45deg);
          }
        &.header-btn-active span:nth-of-type(3){
            opacity: 0;
        }
    }
    &-menu{
        position: fixed;
        white-space: nowrap;
        top: calc(50% - 270px);
        right: 0;
        height: 500px;
        width: 0px;
        background-color: $theme-color;
        border-radius: 20px;
        font-weight: bold;
        color: #fff;
        z-index: 2;
        & .icon-title{
            cursor: pointer;
            margin: 30px 97px;
            width: calc(300px * 0.35);
        }
        & ul{
            padding: 0 30px;
        }
        & li{
            cursor: pointer;
            list-style: none;
            margin: 1em auto;
        }

        &.header-menu-active{
            transition-property: width;
            transition-duration: 400ms;
            width:300px;
        }
        &.header-menu-leave{
            transition-property: width;
            transition-duration: 400ms;
            width:0px;
        }
    }

    & .border{
        &-upper{
            &-left{
                border-top: 50px solid $theme-color;
                border-right: 50px solid transparent;
                position: fixed;
            }
            &-right{
                border-top: 50px solid $theme-color;
                border-left: 50px solid transparent;
                position: fixed;
                right:0;
            }
        }
        &-lower{
            &-left{
                border-bottom: 50px solid $theme-color;
                border-right: 50px solid transparent;
                position: fixed;
                bottom:0;
            }
            &-right{
                border-bottom: 50px solid $theme-color;
                border-left: 50px solid transparent;
                position: fixed;
                right:0;
                bottom:0;
            }
        }
    }
}
.main{
    padding: 15px;
}

</style>

<template>
    <header class="header">
        <div>
            <span class="border-upper-left"></span>
            <span class="border-upper-right"></span>
            <span class="border-lower-left"></span>
            <span class="border-lower-right"></span>
        </div>
        <button @click="onClickMenuBtn" class="header-btn" :class="{'header-btn-active': showMenu}" aria-label="メニューを開く">
            <span></span>
            <span></span>
            <span></span>
        </button>
        <nav class="header-menu"  :class="{'header-menu-active': showMenu, 'header-menu-leave': showMenu == false}">
            <img class="icon-title" src='assets/title_icon_white.png'>
            <ul>
                <li>ジャンル別Ranking動画</li>
                <li>アカウント情報</li>
                <li>このサイトについて</li>
            </ul>
        </nav>
    </header>

    <div class="main">
        <slot name="content"></slot>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
    setup() {
        /**
         * Property
         */
        let showMenu = ref(false)

        /**
         * OnFunction
         */
        //クリック -> メニュー表示切り替えボタン
        const onClickMenuBtn = () =>{
            showMenu.value = showMenu.value == false
        }

        return {
            //property
            showMenu,
            //OnFunction
            onClickMenuBtn

        }
    },
})
</script>
