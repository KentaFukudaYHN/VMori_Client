<style lang="scss" scoped>
    .home-topcontainer{
        position: relative;
        border: solid 18px #00e58d;
        width: 100%;
        height: 980px;
        box-sizing:border-box;
        overflow: hidden;

        & .topcontainer{
            &-topleft::after{
                content: '';
                position: absolute;
                top:-10px;
                left:-10px;
                display: block;
                background: #00e58d;
                width:20px;
                height:20px;
                transform: rotate(45deg);
            }
            &-topright::after{
                content: '';
                position: absolute;
                top:-10px;
                right:-10px;
                display: block;
                background: #00e58d;
                width:20px;
                height:20px;
                transform: rotate(135deg);
            }
            &-bottomleft::after{
                content: '';
                position: absolute;
                bottom:-10px;
                left:-10px;
                display: block;
                background: #00e58d;
                width:20px;
                height:20px;
                transform: rotate(135deg);
            }
            &-bottomright::after{
                content: '';
                position: absolute;
                bottom:-10px;
                right:-10px;
                display: block;
                background: #00e58d;
                width:20px;
                height:20px;
                transform: rotate(45deg);
            }

            &-menubtn{
                display: flex;
                align-items: center;
                position: absolute;
                top: 40%;
                right: -18px;
                width:250px;
                background: #00e58d;
                width:100px;
                height:70px;
                border-top-left-radius: 20px;
                border-bottom-left-radius: 20px;
                & button{
                    border:none;
                    width:50px;
                    height: 50px;
                    margin-left: 18px;
                }
            }

            &-itemcontainer{
                &-1{
                    position: absolute;
                    bottom: 40%;
                    left: 20%;
                    width: 150px;
                }
                &-2{
                    position: absolute;
                    top: 30%;
                    right: 30%;
                    width: 150px;
                }
            }
            &-item{
                &-1{
                    width:45px;
                    height:45px;
                    transform: rotate(45deg);
                    border: solid 10px #2effdc;
                    position: absolute;
                    left: 0;
                }
                &-2{
                    width:45px;
                    height:45px;
                    transform: rotate(45deg);
                    border: solid 10px #1adfff;
                    position: absolute;
                    left: 40px;

                }
                &-3{
                    width:40px;
                    height:40px;
                    transform: rotate(45deg);
                    background: #e3ffec;
                    position: absolute;
                    left: 0;
                }
                &-4{
                    width:40px;
                    height:40px;
                    transform: rotate(45deg);
                    background: #fffdbe;
                    position: absolute;
                    left: 70px;
                    top: 50px;
                }
                &-5{
                    width: 70px;
                    height: 2000px;
                    transform: rotate(131deg);
                    background: #defff9;
                    position: absolute;
                    left: 66%;
                    top: -50%;
                }
            }
        }


        & .kinoko{
            position: absolute;
            right: 100px;
            bottom: 0;
            width: 300px;
        }
        & .icon-title{
            position: absolute;
            top: 10%;
            left: 50%;
            transform: translate(-50%, -50%);
            -webkit-transform: translate(-50%, -50%);
            -ms-transform: translate(-50%, -50%);
            width:300px;
        }
    }
    #playerOverLay{
        position: absolute;
        display: flex;
        background: #fff;
        box-shadow: 0px 0px 5px 1px #d8d8d8;
        z-index: 10;
        top: 40%;
        left: 50%;
        transform: translate(-50%, -40%);
        -webkit-transform: translate(-50%, -40%);
        -ms-transform: translate(-50%, -40%);
    }
    #player{
        // width: 500px !important;
        // height: 281px !important;
    }
    #commentOverLay{
        position: absolute;
        pointer-events:none;
        z-index: 2;
        color: #fff;
        font-size: 20px;
        @include sp{
            font-size:15px;
        }
        font-weight: bold;
        -webkit-text-stroke: 1px $gray-font-color;
        overflow: hidden;        

        & span.player-comment{
            display: inline-block;
            position: absolute;
            right:0;
            visibility: hidden;
        }
    }
    #playerDescribe{
        vertical-align: middle;
        display: flex;
        justify-content: center;
        align-items: center;
        & .plyaer-describe{
            margin: 0 5px;
        }
        & .plyaer-title{
            display: block;
            font-size: 15px;
            margin-bottom: 20%;
            height: 45px;
            overflow: hidden;
        }

        & .plyaer-channelname{
            display: block;
            font-size: 15px;
            text-align: center;
            height: 45px;
            overflow: hidden;
        }
    }
</style>

<template>
    <div>
        <div class="home-topcontainer">
            <span class="topcontainer-topleft"></span>
            <span class="topcontainer-topright"></span>
            <span class="topcontainer-bottomleft"></span>
            <span class="topcontainer-bottomright"></span>
            <div class="topcontainer-menubtn">
                <button class=" icon-btnmenu"></button>
            </div>

            <div class="topcontainer-itemcontainer-1">
                <span class="topcontainer-item-1"></span>
                <span class="topcontainer-item-2"></span>
            </div>

            <div class="topcontainer-itemcontainer-2">
                <span class="topcontainer-item-3"></span>
                <span class="topcontainer-item-4"></span>
            </div>

            <div id="playerOverLay" class="video-container">
                <div id="player"></div>
                <div id="commentOverLay">
                    <span></span>
                    <span v-for="item in topViewVideoComments" :key="item.id" :id="item.id" class="player-comment"> {{ item.text}}</span>
                </div>
                <div id="playerDescribe">
                    <div class="plyaer-describe">
                        <span class="plyaer-title"> {{ topViewVideoTitle }} </span>
                        <span class="plyaer-channelname"> {{ topViewVideoChannelName }} </span>
                    </div>
                </div>
            </div>

            <span class="topcontainer-item-5"></span>

            <img class="kinoko" src="assets/kinoko.png">
            <img class="icon-title" src='assets/title_icon.png' @click="openTop">
        </div>
    </div>
</template>

<script lang="ts">
import { useStore } from '@/dataAccess/store/store'
import { useRouter } from '@/router/router'
import { defineComponent } from 'vue'
import { HomePageService } from '../pageServices/HomePageService'

export default defineComponent({
    async setup() {
        const pageService = new HomePageService(useStore(), useRouter())
        await pageService.init()
        const state = pageService.getState()

        return {
            //トップ表示動画のタイトル
            topViewVideoTitle: state.topViewVideo.title,
            //トップ表示動画のチャンネル名
            topViewVideoChannelName: state.topViewVideo.channelTitle,
            topViewVideoComments: state.topViewVideo.comments

        }
    },
})
</script>
