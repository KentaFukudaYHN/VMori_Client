import { VideoHistoryInfo } from "@/dataAccess/entities/VideoHistoryInfo"
import { VideoHistoryItem } from "@/dataAccess/entities/VideoHistoryItem"
import VMoriRepository from "@/dataAccess/repository/VMoriRepository"
import { Router } from "vue-router"

/**
 * 動画視聴履歴サービス
 */
export class HistoryVideoService{
    private LOCALSTORAGE_HISTORY_KEY = "LOCALSTORAGE_HISTORY_KEY"
    private _repository: VMoriRepository
    //履歴データ最大量
    private _maxLength = 100
    /**
     * 履歴の登録
     * @param videoId 
     */
    async registHistory(videoId){
        debugger
        //履歴情報の存在チェック
        const videoHistoryJson = localStorage.getItem(this.LOCALSTORAGE_HISTORY_KEY)

        //履歴データの生成
        const history = { 
            videoId: videoId,
            date: new Date().getTime()
        } as VideoHistoryItem

        if(videoHistoryJson == null){
            //履歴情報と履歴データの生成・登録
            const historyInfo = { 
                items: [history]
            } as VideoHistoryInfo
            const json = JSON.stringify(historyInfo)
            localStorage.setItem(this.LOCALSTORAGE_HISTORY_KEY,json)

            //再生回数のアップデートをAPIにリクエスト
            this._repository.post('video/countUpViewCount', {
                videoId: videoId
            })

        }else{
            //履歴情報の取得
            const videoHistory = JSON.parse(videoHistoryJson) as VideoHistoryInfo
            const targetIndex = videoHistory.items.findIndex(x => x.videoId == videoId)

            //直前の履歴と同じ動画なら、Dateだけ更新
            let targetHistory: VideoHistoryItem
            let isExis = true
            let isUpCount = false

            if(targetIndex != -1 && targetIndex == (videoHistory.items.length -1)){
                targetHistory = videoHistory.items[targetIndex]
                const nowTime = new Date().getTime()
                targetHistory.date = nowTime

                const calcDate = (nowTime - targetHistory.lastCountUpDateTime) / (24 * 60 * 60 * 10000)
                if(calcDate > 1){
                    targetHistory.lastCountUpDateTime = nowTime 
                    isUpCount = true
                }

                videoHistory.items.splice(targetIndex, 1, targetHistory)
            }else if(targetIndex != -1){
                targetHistory = videoHistory.items[targetIndex]
                history.lastCountUpDateTime = targetHistory.lastCountUpDateTime
                const nowTime = new Date().getTime()
                history.date = nowTime
                
                const calcDate = (nowTime - targetHistory.lastCountUpDateTime) / (24 * 60 * 60 * 10000)
                if(calcDate > 1){
                    history.lastCountUpDateTime = nowTime 
                    isUpCount = true
                }
                videoHistory.items.push(history)
            }else{
                isExis = false
                isUpCount = true
                const nowTime = new Date().getTime()
                targetHistory = {
                    videoId: videoId,
                    date: nowTime,
                    lastCountUpDateTime: nowTime
                }
                videoHistory.items.push(targetHistory)
            }

            //履歴データ最大量を超えていたら、一番古い履歴を削除
            if(videoHistory.items.length > this._maxLength){
                videoHistory.items.shift()
            }

            if(isUpCount){
                this._repository.post('video/countUpViewCount', {
                    videoId: videoId
                })
            }

            //シリアライズして保存
            const json = JSON.stringify(videoHistory)
            localStorage.setItem(this.LOCALSTORAGE_HISTORY_KEY, json)
            
        }
    }

    constructor(repository: VMoriRepository){
        this._repository = repository
    }
}