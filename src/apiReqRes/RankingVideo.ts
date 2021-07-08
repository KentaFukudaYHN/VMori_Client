import { VideoGenreKinds } from "@/commons/enum";
import { VideoSummaryItemApiRes } from "./Video";

//ジャンルトップページレスポンス
export type VideoSummaryInfoByGenreApiRes = {
    items: VideoSummaryByGenreApiRes[]
}

//ジャンルごとの動画情報レスポンス
export type VideoSummaryByGenreApiRes = {
    genreKinds: VideoGenreKinds
    items: VideoSummaryItemApiRes[]
}