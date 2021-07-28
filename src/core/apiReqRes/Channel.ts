export type ChannelListRes = {
    items: Array<ChannelRes>
    totalCount: number
} 

export type ChannelRes = {
    /**
     * ID
     */
    id: string
    /**
     * タイトル
     */
    title: string
    /**
     * 説明
     */
    description: string
    /**
     * 登録日時
     */
    publishAt: string
    /**
     * サムネイルURL
     */
    thmbnailUrl: string
    /**
     * 再生回数
     */
    viewCount: number
    /**
     * コメント数
     */
    commentCount: number
    /**
     * 登録者数
     */
    subscriverCount: number
    /**
     * 動画数
     */
    videoCount: number
    /**
     * V森登録日時
     */
    getRegistDateTime: string
}