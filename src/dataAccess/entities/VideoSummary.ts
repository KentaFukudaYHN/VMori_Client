import { VideoPlatFormKinds } from "@/core/enum";

export type VideoSummary = {
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
    //Vtuberの森の再生回数
    vMoriViewCount: number,
    //説明
    description: string,
    //動画プラットフォーム種類
    platFormKinds : VideoPlatFormKinds
    //投稿日時
    publishDateTime: Date,
    //Vtuerへの森の登録日時
    registDateTime: Date,
}