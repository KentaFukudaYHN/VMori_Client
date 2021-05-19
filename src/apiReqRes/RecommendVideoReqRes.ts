
//おすすめ動画ヘッダー情報
export type RecommendVideoHeaderRes = {
    videos: [RecoomendVideoRes]
}

//おすすめ動画情報
export type RecoomendVideoRes = {
    //動画ID
    id: string
    //動画タイトル
    title: string
}