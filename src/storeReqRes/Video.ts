import { VideoPlatFormKinds } from "@/commons/enum";

//動画情報StoreReq
export type VideoImtesStoreReq = {
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
    //説明
    description: string,
    //再生回数
    viewCount: number,
    //動画プラットフォーム種類
    platFormKinds: VideoPlatFormKinds
    //投稿日時
    publishDateTime: string,
    //Vtuerへの森の登録日時
    registDateTime: string
}