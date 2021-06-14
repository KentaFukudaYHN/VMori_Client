import { VideoPlatFormKinds } from "@/commons/enum"

export type VideoSummaryInfoApiRes = {
    items: VideoSummaryItemApiRes
}

//動画情報
export type VideoSummaryItemApiRes = {
    //ID
    id: string,
    //タイトル
    title: string,
    //チャンネル名
    channelTitle: string,
    //サムネイルリンク
    thmbnailLink: string,
    //再生回数
    viewCount: string,
    //動画プラットフォーム種類
    platFormKinds : VideoPlatFormKinds
    //投稿日時 iso8061形式
    publishDateTime: string
    //Vtuberの森の投稿日時 iso8061形式
    registDateTime: string
}