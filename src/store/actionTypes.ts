
export const INITIALIZE_RECOMMEND_VIDEOS = "INITIALIZZE_RECOMMEND_VIDEOS"

//アカウント情報
export namespace Account {
    //アカウント情報の初期化
    export const INITIALIZE_ACCOUNT = "INITIALIZE_ACCOUNT"
}

//動画情報
export namespace Video{
    //動画リストの更新
    export const UPDATE_VIDEO_ITEMS = "UPDATE_VIDEO_ITEMS"
}

//動画検索情報
export namespace SearchCriteriaVideoModule {
    //検索テキストの更新
    export const UPDATE_SEARCH_TEXT = "UPDATE_SEARCH_TEXT"
    //ジャンルの更新
    export const UPDATE_GENRE = "UPDATE_GENRE"
    //詳細検索の有効の有無
    export const UPDATE_DETAIL_AVAILABLE = "UPDATE_DATAIL_AVAILABLE"
    //話している言語の更新
    export const UPDATE_DETAIL_LANG = "UPDATE_DETAIL_LANG"
    //翻訳の有無の更新
    export const UPDATE_DETAIL_TRANSLATION = "UPDATE_DETAIL_TRANSLATION"
    //翻訳している言語の更新
    export const UPDATE_DETAIL_TRANSLATIONLANG = "UPDATE_DETAIL_TRANSLATIONLANG"
}