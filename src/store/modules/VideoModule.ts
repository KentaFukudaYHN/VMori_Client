import { VideoPlatFormKinds } from "@/commons/enum"

//動画モジュール
export type VideoModule = {
    //Youtubeの動画プレイヤーをローディング済みか
    isLoadedYoutubePlayer : boolean,
    //フルスクリーンモードかどうか
    isFullScreenMode: boolean,
    //選択中の動画ID
    selectedVideoId: string
    //動画リスト
    items: Array<VideoItem>
}

//動画情報
export type VideoItem = {
    //id
    id: string,
    //タイトル
    title: string,
    //リンク
    link: string,
    //チャンネル名
    channelTitle: string,
    //サムネイルリンク
    thumbnailLink: string,
    //再生回数
    viewCount: number,
    //説明
    description: string,
    //動画プラットフォーム種類
    platFormKinds : VideoPlatFormKinds
    //投稿日時
    publishDateTime: Date,
    //Vtuerへの森の登録日時
    registDateTime: Date,
}