
//画面の幅設定
class MediaInfo {
    pc: number
    tab: number
    sp: number

    constructor(){
        this.pc = 1024
        this.tab = 748
        this.sp = 480
    }
}

class AppSettingInfo {
    media: MediaInfo

    constructor(){
        this.media = new MediaInfo()
    }
}

export const appSetting = new AppSettingInfo()