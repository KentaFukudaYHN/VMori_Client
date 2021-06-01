import { VideoPlatFormKinds } from "@/commons/enum";

export type GetUploadVideoRes = {
    success: boolean,
    errMsg: string,
    errKinds: UploadVideoErrKinds,
    platFormKinds: VideoPlatFormKinds,
    videoTitle: string,
    chanelTitle: string,
    videoLink: string,
    thumbnailLink: string,
    description: string,
    unReqYoutubeVideoToken: string,
    publishDateTime: Date
}

export enum UploadVideoErrKinds {
    //エラー情報なし
    None = 0,
    //URLの形式が間違っている
    UrlFormat = 10,
    //対応してないサイト
    UnSupportPlatform = 20,
    //Youtube動画IDが取得できなかった
    NoIdByYoutube = 100
}