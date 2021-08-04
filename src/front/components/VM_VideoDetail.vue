<style lang="scss" scpoed>
    #videoContainer{
        margin:auto;
        font-size:15px;
        @include pc{
            width:80%;
        }

        @include sp{
            font-size: 12px;
        }

        & #player{
            display: block;
            width:100%;
        }

        & #playeroOverlay{
            z-index: 1;
        }

        & #playerComment:active{
            pointer-events:none;
        }

        & #playerComment{
            position: absolute;
            background: transparent;
            pointer-events:none;
            z-index: 2;
            color: #fff;
            font-size: 30px;
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


        & .fullscreen-on.player-playing-no  .fullscreen-item{
            visibility: visible;
        }

        & .fullscreen-item:hover{
            visibility: visible !important;
        }

        & .fullscreen-none.player-playing .fullscreen-item{
            visibility: hidden ;
        }

        & .fullscreen-on.player-playing  .fullscreen-item{
            visibility: hidden ;
        }
        & .fullscreen-none:hover  .fullscreen-item{
            visibility: visible !important;
        }
        & .fullscreen-on:hover  .fullscreen-item{
            animation-name: hiddenAnimation;
            animation-duration: 3s;
        }
        & .player-mousemove .fullscreen-item{
            visibility: visible !important;
        }
        @keyframes hiddenAnimation {
            to{
                visibility: visible;
            }
            from{
                visibility: hidden;
            }
        }
        & .fullscreen-none.player-playing-no .fullscreen-item{
            visibility: hidden;
            //スマホの時はフルスクリーンアイテム表示 ※タブレットも考えるとpc幅にせざるを得ない...?
            @include pc{
                visibility: visible;
            }
        }
        & #fullScreenBtn{
            position: absolute;
            color: #fff;
            font-weight: bold;
            background: transparent;
            padding: 5px 10px;
            cursor: pointer;
              text-shadow    : 
                    1px  1px 0.5px black,
                    -1px  1px 0.5px black,
                    1px -1px 0.5px black,
                    -1px -1px 0.5px black,
                    1px  0px 0.5px black,
                    0px  1px 0.5px black,
                    -1px  0px 0.5px black,
                    0px -1px 0.5px black; 
            & .fulscreenbtn-border{
                &-one{
                    position: absolute;
                    left:0;
                    top:0;
                    width:8px;
                    height:8px;
                    background:transparent;
                    border-top:solid 3px #fff;
                    border-left:solid 3px #fff;
                    z-index:200;
                    &back{
                        @extend .fulscreenbtn-border-one;
                        top: -1px;
                        left: -1px;
                        border-top:solid 5px black;
                        border-left:solid 5px black;
                        z-index:100;
                    }
                }
                &-two{
                    position: absolute;
                    right:0;
                    top:0;
                    width:8px;
                    height:8px;
                    background:transparent;
                    border-top:solid 3px #fff;
                    border-right:solid 3px #fff;
                    z-index:200;
                    &back{
                        @extend .fulscreenbtn-border-two;
                        top: -1px;
                        right: -1px;
                        border-top:solid 5px black;
                        border-right:solid 5px black;
                        z-index:100;
                    }
                }
                &-three{
                    position: absolute;
                    left:0;
                    bottom:0;
                    width:8px;
                    height:8px;
                    background:transparent;
                    border-bottom:solid 3px #fff;
                    border-left:solid 3px #fff;
                    z-index:200;
                    &back{
                        @extend .fulscreenbtn-border-three;
                        bottom: -1px;
                        left: -1px;
                        border-bottom:solid 5px black;
                        border-left:solid 5px black;
                        z-index:100;
                    }
                }
                &-four{
                    position: absolute;
                    right:0;
                    bottom:0;
                    width:8px;
                    height:8px;
                    background:transparent;
                    border-bottom:solid 3px #fff;
                    border-right:solid 3px #fff;
                    z-index:200;
                    &back{
                        @extend .fulscreenbtn-border-four;
                        bottom: -1px;
                        right: -1px;
                        border-bottom:solid 5px black;
                        border-right:solid 5px black;
                        z-index:100;
                    }
                }
            }
        }

        & #fullScreeenLayer{
            position: absolute;
            background: transparent;
            cursor: pointer;
            pointer-events:none;
        }

        & .fullscreen-on #fullScreeenLayer{
            pointer-events:auto;
        }

        & .fullscreen-none #fullScreenCommentContainer{
            display: none;
        }
        & #fullScreenCommentContainer{
            position: absolute;
            background: transparent;
            border-radius: 5px;
            left: 50%;
            transform: translate(-50%, -50%);
            -webkit-transform: translate(-50%, -50%);
            -ms-transform: translate(-50%, -50%);
            & .comment-input{
                opacity: 0.7;

                &:focus{
                    opacity: 1;
                }
            }
            & .comment-btn{
                background-color: rgb(161, 161, 161);
            }
        }

        & .comment-container{
            margin: 20px auto 0 auto;
            display: flex;
            justify-content: center;
        }

        & .comment-input{
            border-top-right-radius: 0px;
            border-bottom-right-radius: 0px;
            height:34px;
            max-width: 700px;
            width:80%;
        }
        & .comment-btn{
            width: 7em;
            min-width: 7em;
            background-color: $theme-color;
            font-size:12px;
            font-weight: bold;
            background-size: 1.2em;
            background-position: left 0.4em center;
            background-repeat:no-repeat;
            color:#fff;
            padding: 5px 5px 5px 1.2em;
            border: solid 1px $form-border-color;
            text-align: center;
            border-top-right-radius: 5px;
            border-bottom-right-radius: 5px;
        }

        & .comment-btn-disable{
            opacity: 0.6;
            pointer-events: none;
        }
        & #fullScreenCommentContainer.comment-container{
            margin:0;
            height:38px;
        }

        & #fullScreenCommentContainer .comment-input{
            width: 100%;
            height: 100%;
            background: #fff;
        }

        & #fullScreenCommentContainer .comment-btn{
            font-size: 1em;
            padding-left: 1.5em;
        }

        & .videoinfo-container{
            @include tab{
                margin: 0 15px;
            }
            @include sp {
                margin: 0 12px;
            }
        }

        & #videoInfo{
            margin-top:0;
        }
        & #videoTitle{
            font-size: 20px;
            @include tab{
                font-size: 18px;
            }
            @include sp{
                font-size: 14px;
            }
        }

        & .icon-edit{
            width:15px;
            height:15px;
            display: inline-block;
            margin-left: 5px;
            cursor: pointer;
        }

        & #videoStatistics{
            margin-top: 10px;
            font-size: 14px;
            color: $gray-font-color;
            font-weight: 300;

            @include sp {
                font-size: 12px;
            }


            & .statistics{
                &-langcontainer{
                    display: flex;
                    align-items: center;
                    margin-top: 10px;
                    &:first-child{
                        margin-top: 3px;
                    }
                }
                &-langlabel{
                    padding: 0 5px;
                    border:solid 1px $gray-font-color;
                    border-radius: 3px;
                }
                &-langitem{
                    margin-left:5px;
                }
            }
        }
        & #tagContainer{
            margin-top: 20px;
            color: $gray-font-color;
            display: flex;
            align-items: center;
            & .tag-item{
                cursor: pointer;
                margin: 0 3px;
                &:first-child{
                    margin: 0 3px 0 0;
                }

                &::before{
                    display: inline;
                    content: '#'
                }
            }
        }
        & .info-container{
            padding-bottom: 50px;
        }
        & .info-border{
                content: '';
                display: block;
                height: 1px;
                width: 100%;
                background: $form-border-color;
                border-radius: 1px;
                margin: 20px auto 40px auto;

        }

        & .info-header{
            display: flex;
            justify-content: space-evenly;
            margin: 20px auto;

            & .info-item-pc{
                display: inline;

                @include sp{
                    display: none;
                }
            }

            & .info-item-sp{
                display: none;

                @include sp{
                    display: inline-block;
                }
            }



            & span{
                display: block;
                width:100%;
                text-align: center;
                cursor: pointer;
                -webkit-user-select: none;
                -moz-user-select: none;
                -ms-user-select: none;
                user-select: none;
            }

            & .info-item-select::after{
                content: '';
                display: block;
                width: 100%;
                margin: 5px auto 0 auto;
                height: 10px;
                background: $theme-color-lightgreen;
                border-radius: 5px;
            }
        }

        & .channel{
            &-header{
                display: flex;
                align-items: center;
                margin-bottom: 20px;
            }
            &-titlecontainer{
                margin-left: 20px;
            }
            &-title{
                display: block;
                font-size:20px;
                @include tab{
                    font-size:15px;
                }
                @include sp{
                    font-size:15px;
                }
            }
            &-subscriver{
                display: block;
                font-weight: 500;
                color: $gray-font-color;
            }
            &-icon{
                width:90px;
                @include tab{
                    width: 60px;
                }
                @include sp{
                    width:45px;
                }
            }
        }

        & #summaryContainer{
            white-space: pre-wrap;
            word-wrap: break-word;
            @include sp{
                color: $gray-font-color;
            }
        }

        & #channelContainer{
            white-space: pre-wrap;
            word-wrap: break-word;
            @include sp{
                color: $gray-font-color;
            }
        }

    }
    .register-btn{
        margin-top: 25px;
        width: 100%;
    }
    .regsit-checkbox{
        @include sp{
            display: block ;
        }
        & .checkbox-item{
            margin: 15px 0;
        }
    }
    .regist-modal{
        min-width: 220px;
    }
    .regist-modal-tag{
        min-width: 300px;
    }
</style>

<template>
    <vm-guide>
        <template v-slot:content>
            <div id="videoContainer">
                <div ref="fullScreenContainer"  :class="{'fullscreen-none': !isFullScreenMode, 'fullscreen-on': isFullScreenMode, 'player-playing': isPlaying, 'player-playing-no': !isPlaying, 'player-mousemove': isMouseMove}">
                    <div  id="playeroOverlay" ref="playerOverlayRef">
                        <div ref="playerRef" id="player" ></div>
                        <!-- <iframe id="player" width="560" height="315" :src="youtubeVideoSrc" frameborder="0" allow="accelerometer; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe> -->
                    </div>
                    <div id="playerComment" ref="playerCommentRef" @mousemove="() => {console.log('move!!') }">
                        <!-- このspanがないとなぜかiframeの下に動的に追加したspanが隠れる -->
                        <span></span>
                        <span v-for="item in playerCommentItems" :key="item.id" :id="item.id" class="player-comment"> {{ item.text}}</span>
                    </div>
                    <div ref="fullScreenBtnRef" id="fullScreenBtn" class="fullscreen-item" @click="onClickFullScreen">
                        <span class="fulscreenbtn-border-one"></span>
                        <span class="fulscreenbtn-border-two"></span>
                        <span class="fulscreenbtn-border-three"></span>
                        <span class="fulscreenbtn-border-four"></span>
                    <span class="fulscreenbtn-border-oneback"></span>
                        <span class="fulscreenbtn-border-twoback"></span>
                        <span class="fulscreenbtn-border-threeback"></span>
                        <span class="fulscreenbtn-border-fourback"></span>

                        フルスクリーン
                    </div>
                    <!-- 1.フルスクリーン時に透明状態で表示してmouseoverイベントを検知してフルスクリーンを表示 -->
                    <!-- 2.クリックによるYoutubeの再生の切り替えを制御 -->
                    <div id="fullScreeenLayer" ref="fullScreenLayerRef" @mousemove="onMouseMoveFullScreenLayer" @click="playVideo"></div>

                    <!-- コメント -->
                    <div ref="fullScreenCommentRef" id="fullScreenCommentContainer" class="comment-container fullscreen-item">
                        <input class="input-normal comment-input" v-model="commentInputVal">
                        <button @click="registComment" class="comment-btn icon-comment-send" :class="{'comment-btn-disable': isOkComment == false}">コメント</button>
                    </div>                    
                </div>
                <div class="videoinfo-container">
                    <div class="comment-container">
                        <input class="input-normal comment-input" v-model="commentInputVal" placeholder="コメント入力/75文字以内">
                        <button @click="registComment" class="comment-btn icon-comment-send" :class="{'comment-btn-disable': isOkComment == false}">コメント</button>
                    </div>
                    <div id="tagContainer">
                        タグ:
                        <span v-for="tag in video.tags.value" :key="tag" class="tag-item">
                            {{tag}}
                        </span>
                        <span class="icon-edit" @click="openTagRegister"></span>
                    </div>
                    <div id="videoInfo">
                        <h1 id="videoTitle">
                            {{video.title.value}}
                        </h1>
                        <div id="videoStatistics">
                            {{ video.statistics.value }}
                            <div class="statistics-langcontainer">
                                <span class="statistics-langlabel">speak</span>
                                <span v-for="lang in video.speakLangs.value" :key="lang" class="statistics-langitem" >{{ lang }}</span>
                                <span class="icon-edit" @click="openLangRegister"></span>
                            </div>
                            <div class="statistics-langcontainer">
                                <span class="statistics-langlabel">translation</span>
                                <span v-for="lang in video.translationLangs.value" :key="lang" class="statistics-langitem" >{{ lang }}</span>
                                <span class="icon-edit" @click="openTranslationRegister"></span>
                            </div>
                        </div>
                    </div>

                    <div class="info-border">

                    </div>

                    <div class="info-container" >
                        <div class="info-header">
                            <span v-for="item in infoList" :key="item.kinds"
                                class="info-item-pc"
                                :class="{'info-item-select': item.selected}"
                                @click="changeInfo(item.kinds)">
                                {{ item.text }}
                            </span>
                            <span v-for="item in infoSpList" :key="item.kinds"
                                class="info-item-sp"
                                :class="{'info-item-select': item.selected}"
                                @click="changeInfo(item.kinds)">
                                {{ item.text }}
                            </span>                        </div>
                        <div v-if="channel.title.value != null" class="channel-header">
                            <img class="channel-icon" :src="channel.thumbnailUrl.value"/>
                            <div class="channel-titlecontainer">
                                <span class="channel-title">{{ channel.title.value }}</span>
                                <span class="channel-subscriver">{{displaySubscriverCount()}}</span>
                            </div>
                        </div>

                        <div v-if="showSummaryInfo" id="summaryContainer">
                            {{ video.description.value }}
                        </div>

                        <div v-if="showChannelInfo" id="channelContainer">
                            <div>
                                {{ channel.description.value }}
                            </div>
                        </div>

                        <div v-if="showChannelVideos">
                            <vm-videolist :videos="channelVideos" @emit-selectedVideo="selectedVideo"></vm-videolist>
                        </div>

                        <div v-if="showGraph">
                            <vm-chart :list="channelTransitions"></vm-chart>
                        </div>
                    </div>
                </div>

            </div>
            <vm-modal v-if="showTagRegister" :windowClass="'regist-modal-tag'" :showCloseBtn="true" @emit-clickCloseBtn="closeTagRegister">
                <template v-slot:content >
                    <div class="tagregist-container">
                        <span class="title-success">タグの設定</span>
                        <vm-tag :list="tagsByRegister" @emit-add="addTag" @emit-delete="deleteTag">
                        </vm-tag>
                        <button class="btn-primary register-btn" @click="updateTags">登録</button>
                    </div>
                </template>
            </vm-modal>
            <vm-modal v-if="showLangRegister" :windowClass="'regist-modal'" :showCloseBtn="true" @emit-clickCloseBtn="closeLangRegister">
                <template v-slot:content>
                    <div class="langregist-container">
                        <span class="title-success">話している言語の設定</span>
                        <vm-checkbox class="regsit-checkbox" :list="langsByRegister" @emit-change="onChangeLang"></vm-checkbox>
                        <button class="btn-primary register-btn" @click="updateLangs">登録</button>
                    </div>
                </template>
            </vm-modal>
            <vm-modal v-if="showTranslationRegister" :windowClass="'regist-modal'" :showCloseBtn="true" @emit-clickCloseBtn="closeTranslationRegister">
                <template v-slot:content>
                    <div class="translation-container">
                        <span class="title-success">翻訳している言葉の設定</span>
                        <vm-checkbox class="regsit-checkbox" :list="translationLangsByRegister" @emit-change="onChangeTranslationLangs"></vm-checkbox>
                        <button class="btn-primary register-btn" @click="updateTranslationLangs">登録</button>
                    </div>
                </template>            
            </vm-modal>
        </template>
    </vm-guide>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, ref, SetupContext} from 'vue'
import VM_Guide from '@/front/components/VM_GuideMenu.vue'
import VM_Modal from '@/front/components/VM_Modal.vue'
import VM_TagRegister from '@/front/components/VM_TabRegister.vue'
import VM_VideoList from '@/front/components/VM_VideoList.vue'
import VM_Chart from '@/front/components/VM_ChannelTransitionChart.vue'
import VM_CheckBox from '@/front/components/VM_CheckBox.vue'
import { infoKinds, VideoPageService } from '@/front/pageServices/VideoPageService'
import { useStore } from '@/dataAccess/store/store'
import { useRouter } from '@/router/router'
import CheckBoxItem from '../form/CheckBoxItem'

type Props = {
    id: string
}

export default defineComponent({
    components:{
        'vm-guide': VM_Guide,
        'vm-videolist': VM_VideoList,
        'vm-chart': VM_Chart,
        'vm-modal': VM_Modal,
        'vm-tag': VM_TagRegister,
        'vm-checkbox': VM_CheckBox,
    },
    props:{
        id: {
            type: String,
            default: ''
        }
    },
    emits:['emit-changeVideo'],
    setup(props: Props, context: SetupContext) {

        const pageService = new VideoPageService(useStore(), useRouter())

        let playerRef = ref(null)
        let playerOverlayRef = ref(null)
        let playerCommentRef = ref(null)
        let fullScreenBtnRef = ref(null)
        let fullScreenLayerRef = ref(null)
        let fullScreenContainer = ref(null)
        let fullScreenCommentRef = ref(null)

        onMounted(async () => {
            await pageService.init(playerOverlayRef.value, playerCommentRef.value, fullScreenLayerRef.value, fullScreenBtnRef.value, fullScreenCommentRef.value)
        
        })

        const state = pageService.getState()


        return {
            playerRef,
            playerOverlayRef,
            playerCommentRef,
            playerCommentItems: state.comment.comments,
            fullScreenBtnRef,
            fullScreenLayerRef,
            fullScreenContainer,
            fullScreenCommentRef,
            video: state.video,
            youtubeVideoSrc: pageService.getYoutubeVideoSrc(),
            //コメント
            commentInputVal: state.comment.inputText,
            //コメントが送信可能かどうか
            isOkComment: computed(() => { return pageService.getIsOkComment() }),
            // //説明
            // description: state.video.value.description,
            //メニュー情報
            infoList: state.info.list,
            infoSpList: state.info.spList,
            //メニュー変更
            changeInfo : (kinds: number) => { pageService.changeInfo(kinds) },
            //概要を表示するか
            showSummaryInfo: computed(() => { return pageService.isSelectedInfo(infoKinds.summary) }),
            //チャンネルを表示するか
            showChannelInfo: computed(() => { return pageService.isSelectedInfo(infoKinds.channel) }),
            //チャンネル情報
            channel: state.channel,
            //チャンネル登録者数
            displaySubscriverCount: () => { return pageService.createDisplaySubscriverCount(state.channel.subscriverCount.value) },
            //チャンネルに紐づく動画情報
            channelVideos: state.channel.videos,
            showChannelVideos: computed(() => { return pageService.isSelectedInfo(infoKinds.videolist) }),
            selectedVideo: async (id: string) => { await pageService.selectedVideo(id, context) },
            //チャンネル推移情報
            channelTransitions: state.channel.transitions,
            showGraph: computed(() => { return pageService.isSelectedInfo(infoKinds.graph) }),
            //フルスクリーン
            onClickFullScreen: () => { 
                if(document.fullscreenElement){
                    document.exitFullscreen()
                }else{
                    fullScreenContainer.value.requestFullscreen()
                }
            },
            //フルスクリーンモードか
            isFullScreenMode: computed(() => pageService.getIsFullScreenMode()),
            //動画再生中か
            isPlaying: state.video.isPlaying,
            onMouseMoveFullScreenLayer: (event) => { pageService.onMouseMoveFullScreenLayer(event) },
            isMouseMove: state.video.isMouseMoveOnFullScreenLayer,
            playVideo: () => { pageService.playVideo() },
            registComment: async () => { await pageService.registComment(playerOverlayRef.value) },
            //タグ
            tagsByRegister: state.tagRegister.taglist,
            //タグ編集モーダルの表示
            showTagRegister: state.tagRegister.showModal,
            //タグ編集モーダルの表示
            openTagRegister: () => { pageService.openTagRegister() },
            //タグ編集モーダルを閉じる
            closeTagRegister: () => { pageService.closeTagRegister() },
            //タグの追加
            addTag: (tag: string) => pageService.addTag(tag),
            //タグの削除
            deleteTag: (tag: string) => pageService.deleteTag(tag),
            //タグの更新
            updateTags: () => pageService.updateTags(),
            //言語編集モーダルのリスト
            langsByRegister: state.langRegister.langlist,
            //言語編集モーダルで言語の選択
            onChangeLang: (values: string[]) => pageService.onChangeLang(values),
            //言語編集モーダルの表示有無
            showLangRegister: state.langRegister.showModal,
            //言語編集モーダルの表示
            openLangRegister: () => { pageService.openLangRegister() },
            //言語編集モーダルを閉じる
            closeLangRegister: () => { pageService.closeLangRegister() },
            //言語の更新
            updateLangs: async () => await pageService.updateLangs(),
            //翻訳言語モーダルのリスト
            translationLangsByRegister: state.taranslationLangRegister.langlist,
            //翻訳言語の選択
            onChangeTranslationLangs: (values: string[]) => pageService.onChangeTranslationLang(values),
            //翻訳言語モールの表示有無
            showTranslationRegister: state.taranslationLangRegister.showModal,
            //翻訳言語モーダルの表示
            openTranslationRegister: () => pageService.openTranslationLangRegister(),
            //翻訳言語モーダルを閉じる
            closeTranslationRegister: () => pageService.closeTranslationLangRegister(),
            //翻訳言語の更新 
            updateTranslationLangs: () => pageService.updateTranslationLangs()

        }
    },
})
</script>
