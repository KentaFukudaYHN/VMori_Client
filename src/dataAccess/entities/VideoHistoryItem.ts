/**
 * 動画履歴情報 データ
 */
export type VideoHistoryItem = {
    //動画ID
    videoId: string
    //視聴日時
    date: number,
    //カウントアップを更新した日時
    lastCountUpDateTime,
}

