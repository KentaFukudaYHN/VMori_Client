export const INIT_RECOMMEND_VIDEO_HEADER = 'INIT_RECOMMEND_VIDEO_HEADER'

//アカウント情報
export namespace AccountModule {
    //アカウント情報の初期化
    export const INIT_ACCOUNT = "INIT_ACCOUNT"
}

//動画情報
export namespace VideoModule{
    //動画リストの更新
    export const UPDATE_VIDEO_ITEMS = "UPDATE_VIDEO_ITEMS"
}

//動画検索情報
export namespace SearchCriteriaVideoModule{
    //ジャンルの更新
    export const UPDATE_GENRE = "UPDATE_GENRE"
    //話している言語の更新
    export const UPDATE_DETAIL_LANG = "UPDATE_DETAIL_LANG"
    //翻訳の有無更新
    export const UPDATE_DETAIL_TLAMSLATION = "UPDATE_DETAIL_TLAMSLATION"
    //翻訳している言葉の更新
    export const UPDATE_DETAIL_TRASLAIONLANG = "UPDATE_DETAILTRANSLATIONLANG"
}
