
export const INITIALIZE_RECOMMEND_VIDEOS = "INITIALIZZE_RECOMMEND_VIDEOS"

export namespace AppStateModule{
    //ローディング中かどうか更新
    export const UPDATE_LOADING = "APPSTATE_UPDATE_LOADING"
    //現在のページの更新
    export const UPDATE_PAGE = "APPSTATE_UPDATE_PAGE"
}

//アカウント情報
export namespace AccountModule {
    //アカウント情報の初期化
    export const INITIALIZE_ACCOUNT = "INITIALIZE_ACCOUNT"
}

//最新動画情報
export namespace LatestVideoModule{
    //動画リストの更新
    export const UPDATE_VIDEO_ITEMS = "UPDATE_VIDEO_ITEMS"
    //検索テキストの更新
    export const UPDATE_SEARCH_TEXT = "UPDATE_SEARCH_TEXT"
    //ジャンルの更新
    export const UPDATE_GENRE = "UPDATE_GENRE"
    //詳細検索の有効の有無
    export const UPDATE_DETAIL_AVAILABLE = "UPDATE_DATAIL_AVAILABLE"
    //詳細検索の更新
    export const UPDATE_DETAIL = "UPDATE_DETAIL"
    // //話している言語の更新
    // export const UPDATE_DETAIL_LANG = "UPDATE_DETAIL_LANG"
    // //翻訳の有無の更新
    // export const UPDATE_DETAIL_TRANSLATION = "UPDATE_DETAIL_TRANSLATION"
    // //翻訳している言語の更新
    // export const UPDATE_DETAIL_TRANSLATIONLANG = "UPDATE_DETAIL_TRANSLATIONLANG"
    
}

//動画情報
export namespace VideoModule{
    //動画の選択中IDの更新
    export const UPDATE_SELECTED_VIDEOID = "UPDATE_SELECTED_VIDEOID"
    //Youtube動画プレイヤーの読み込み状態の更新
    export const UPDATE_YOUTUBEPLAYER_ISLOADED = "UPDATE_YOUTUBEPLAYER_ISLOADED"
    //フルスクリーンモードかどうか更新
    export const UPDATE_FULLSCREENMODE = "UPDATE_FULLSCREENMODE"
}