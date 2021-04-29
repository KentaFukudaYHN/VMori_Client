//おすすめ動画情報
export type RecommendVideo = {
    id: string
    title: string
}

//おすすめ動画ヘッダー情報
export type RecommendVideoHeader = {
    //おすすめ動画情報
    videos: [RecommendVideo]
}