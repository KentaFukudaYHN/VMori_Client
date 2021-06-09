import { VideoGenreKinds, VideoLanguageKinds, VideoPlatFormKinds } from "@/commons/enum";

export type GetUploadVideoRes = {
    //成功の有無
    success: boolean,
    //エラーメッセージ
    errMsg: string,
    //エラー種類
    errKinds: UploadVideoErrKinds,
    //動画プラットフォーム種類
    platFormKinds: VideoPlatFormKinds,
    //動画タイトル
    videoTitle: string,
    //チャンネルタイトル
    chanelTitle: string,
    //動画リンク
    videoLink: string,
    //サムネイルリンク
    thumbnailLink: string,
    //動画説明
    description: string,
    //動画アップロードリクエストToken
    upReqOutsourceVideoToken: string,
    //元動画投稿日時
    publishDateTime: Date,
}

export type RegistUploadVideoReq = {
    //動画アップロードリクエストToken
    upReqOutsourceVideoToken: string,
    //genre
    genre: VideoGenreKinds
    //タグ
    tags: string[],
    //言語種類
    langes: VideoLanguageKinds[],
    //翻訳の有無
    isTranslation: boolean
    //翻訳の言語
    langForTranslation: VideoLanguageKinds[]
}

//動画登録レスポンス
export type RegistUploadVideoRes = {
    success: boolean
    errKinds: UploadVideoErrKinds
}

export enum UploadVideoErrKinds {
    //エラー情報なし
    None = 0,
    //URLの形式が間違っている
    UrlFormat = 10,
    //対応してないサイト
    UnSupportPlatform = 20,
    //既に登録されている動画
    IsExits = 30,
    //Youtube動画IDが取得できなかった
    NoIdByYoutube = 100
}