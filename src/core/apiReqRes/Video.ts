import { VideoGenreKinds, VideoPlatFormKinds } from "@/core/enum"

export type VideoSummaryInfoApiRes = {
    items: VideoSummaryItemApiRes[],
    totalCount: number
}

//動画サマリー情報
export type VideoSummaryItemApiRes = {
    //ID
    id: string
    //タイトル
    title: string
    //チャンネル名
    channelTitle: string
    //サムネイルリンク
    thumbnailLink: string
    //再生回数
    viewCount: number
    //VMori再生回数
    vMoriViewCount: number
    //動画プラットフォーム種類
    platFormKinds : VideoPlatFormKinds
    //投稿日時 iso8061形式
    publishDateTime: string
    //Vtuberの森の投稿日時 iso8061形式
    registDateTime: string
}

//動画情報
export type VideoItemApitRes = {
    //id
    id: string,
    //動画ID
    videoId : string,
    //動画プラットご
    platFormKinds: VideoPlatFormKinds,
    //動画タイトル
    videoTitle: string,
    //チャンネルID
    channelId: string,
    //チャンネルタイトル
    channelTitle: string,
    //動画説明
    description: string,
    //サムネイルリンク
    thembnailLink: string,
    //ジャンル       
    genre: VideoGenreKinds;  
    //タグ     
    tags: Array<string>,
    //日本語を話しているか　       
    speakJP: boolean,
    //英語を話しているか      
    speakEnglish: boolean,        
    //その他の言語を話しているか     
    speakOther: boolean      
    //翻訳の有無
    isTranslation: boolean,
    //日本語の翻訳がされているか
    translationJp: boolean,    
    //英語の翻訳がされているか
    translationEnglish: boolean       
    //その他の言語で翻訳されているか
    translationOther: boolean       
    //投稿日時
    publishDateTime: string   
    //V森への登録日時
    registDateTime: string
    //再生回数
    viewCount: number,
    //VMori再生回数
    vMoriViewCount: number,
    //いいね回数
    LikeCount: number,
    //コメント回数
    commentCount: number,

}

// //動画統計情報
// export type VideoStatisticsApiRes = {
//     //再生回数
//     viewCount: number,
//     //いいね回数
//     LikeCount: number,
//     //コメント回数
//     commentCount: number,
//     //取得日時
//     getDateTime: string,
// }

export type VideoCommentApiRes = {
    //テキスト
    text: string,
    //開始時間 ※動画の開始からの秒数
    time: number
}

//チャンネル情報
export type ChannelApiRes = {
    // チャンネルID
    channelId: string
    // チェンネルタイトル
    title: string
    // チャンネル説明
    description: string
    // チャンネル作成日
    publishAt: string
    // チャンネルサムネイルURL
    thumbnailUrl: string
    // チャンネルの再生回数
    viewCount: number
    // チャンネルのコメント
    commentCount: number
    // チャンネル登録者数
    subscriverCount: number
    // チャンネルにアップロードされた動画数
    videoCount: number
    // V森登録日時
    getRegistDateTime: string
}

//チャンネル推移情報
export type ChannelTransitionApiRes = {
    //再生回数
    viewCount: number
    //チャンネル登録者数
    subscriverCount: number
    //取得日時
    getDateTime: string
}