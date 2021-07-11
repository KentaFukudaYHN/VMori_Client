//動画コメント情報
export type VideoComment = {
    //ID
    id: string,
    //テキスト
    text: string,
    //動画開始からの秒数
    time: number,
    //表示位置
    top: number
}