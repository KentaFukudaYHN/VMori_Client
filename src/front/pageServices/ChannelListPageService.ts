import { ChannelRes } from "@/core/apiReqRes/Channel";
import { ChannelSortKinds } from "@/core/enum";
import { AppStateService } from "@/core/services/AppStateService";
import { ChannelService } from "@/core/services/ChannelService";
import { appSetting } from "@/dataAccess/entities/AppSetting";
import VMoriRepository from "@/dataAccess/repository/VMoriRepository";
import { State } from "@/dataAccess/store/store";
import { onBeforeMount, onMounted, Ref, ref } from "vue";
import { Router } from "vue-router";
import { Store } from "vuex";
import { vueUtility } from "../utilitys/vueUtility";

/**
 * チャンネルPageService
 */
export class ChannelListPageService{
    _channelService: ChannelService
    _appStateService: AppStateService

    private state = {
        channels: ref([] as ChannelRes[]),
        totalCount: ref(0),
        currentPage: ref(1),
        displayNum: ref(30),
        sortKinds: ref(ChannelSortKinds.GetRegistDateTime),
        sortIsDesc: ref(true),
    }

    /**
     * 初期化処理
     */
    async init(){
        onMounted(() => {
            //動的にチャンネル情報の幅を帰るためにrisizeイベントを監視
            window.addEventListener('resize', this.onResize.bind(this))
            //チャンネル情報の幅調整
            this.onResize()
        })
        
         onBeforeMount(() => {
             window.removeEventListener('resize', this.onResize.bind(this))
         })

        //チャンネル情報を更新
        try{
            this._appStateService.updateIsLoadin(true)
            await this._getChannels()
        }finally{
            this._appStateService.updateIsLoadin(false)

        }
    }

    /**
     * 状態情報取得
     * @returns 
     */
    getState() {
        return this.state
    }

    /**
     * チャンネル情報取得
     */
    private async _getChannels(){
        const channels = await this._channelService.getChannels(this.state.currentPage.value, this.state.displayNum.value,
            this.state.sortKinds.value, this.state.sortIsDesc.value)
        vueUtility.updateArray(channels.items as [], this.state.channels as Ref<[]>)
        this.state.totalCount.value = channels.totalCount
    }

    /**
     * リサイズ時に実行
     */
    private onResize(){
        const channelContainer = document.getElementById('channelContainer')

        //現在のChannelContainerのWidthでサイズ調整
        const containerWidth = channelContainer.clientWidth

        let colum = 4
        if(containerWidth > 1500){
            colum = 5
        }else if(containerWidth > appSetting.media.pc){
            colum = 4
        }else if(containerWidth > appSetting.media.tab){
            colum = 3
        }else {
            colum = 2
        }

        let margin = 60

        //スマホ表示はmarginが30になる ※cssで設定
        if(window.innerWidth < appSetting.media.sp){
            margin = 30
        }

        //margin分をのぞいた表示領域
        const canDisplayWidth = containerWidth - (margin * colum)

        //1コンテンツのwidthを計算
        let calcWidth = Math.floor(canDisplayWidth / colum) - 1

        //計算したwidthを各コンテンツに設定
        const targetContents = document.getElementsByClassName('channel-item')
        for(let i=0; i<targetContents.length; i++){
            const targetItem = targetContents[i] as HTMLElement
            if(targetItem == null) { continue }
            targetItem.style.width = String(calcWidth) + 'px'
        }
    }

    /**
     * コンストラクタ
     * @param store 
     * @param router 
     */
    constructor(store: Store<State>, router: Router){
        const repository = new VMoriRepository(router)
        this._channelService = new ChannelService(store, repository)
        this._appStateService = new AppStateService(store)
    }
}