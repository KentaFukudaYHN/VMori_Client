class VideoUtility {
    //表示用の統計情報を生成
    createDisplayStatistics(viewCount: number, publishDate: Date, detail = false){
        /*再生回数のテキスト生成*/
        let viewCountText = String(viewCount)
        const billion = 100000000
        if(viewCount >= 10000){
            viewCountText = String(Math.floor(viewCount/ 10000)) + '万'
        }else if(viewCount >= billion){
            viewCountText = String(Math.floor(viewCount / billion)) + '億'
        }
        viewCountText += ' 回視聴'

        /*投稿日時のテキスト生成*/
        //投稿日時と現在の差分を求める //1カ月は30日とする
        let dateText = ''
        const now = new Date()
        const nowByUtc = new Date(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(), now.getUTCHours(), now.getUTCMinutes(), now.getUTCSeconds(), now.getUTCMilliseconds())
        const diffByMm = (nowByUtc.getTime() - new Date(publishDate).getTime())
    
        //1以内かどうか
        let whithInOneDat = false;
        if(diffByMm < (1000 * 60)){
            //1分以内なら秒を表示
            dateText = String(Math.floor(diffByMm / 1000)) + '秒'
            whithInOneDat = true
        } else if(diffByMm < (1000 * 60 * 60)){
            //1時間以内なら分を表示
            dateText = String(Math.floor(diffByMm / 1000 / 60)) + '分'
            whithInOneDat = true
        }else if(diffByMm < (1000 * 60 * 60 * 24)){
            //1日以内なら時間を表示
            dateText = String(Math.floor(diffByMm / 1000 / 60 / 60)) + '時間'
            whithInOneDat = true
        }else if(detail == true){
            //詳細モードなら詳細なyyyy/MM/ddの形で表示
            dateText = publishDate.getFullYear() + '/' + (publishDate.getMonth() + 1)+ '/' + publishDate.getDate()
        }else if(diffByMm < (1000 * 60 * 60 * 24 * 30)){
            //1カ月以内なら日にちを表示
            dateText = String(Math.floor(diffByMm / 1000 / 60 / 60 / 24)) + '日'
        }else if(diffByMm < (1000 * 60 * 60 * 24 * 30 * 12)){
            //一年以内なら月を表示
            dateText = String(Math.floor(diffByMm / 1000 / 60 / 60 / 24 / 30)) + '月'
        }else{
            //それ以上は年で計算
            dateText = String(Math.floor(diffByMm / 1000 / 60 / 60 / 24 / 30 / 12)) + '年'
        }
    
        if(detail == true){
            if(whithInOneDat == true){
                dateText += ' 前に'
            }else{
                dateText += ' '
            }
            dateText += '公開'
        }else{
            dateText += '前'
        }
        return viewCountText + '・' + dateText
    }
}

export const videoUtility = new VideoUtility()