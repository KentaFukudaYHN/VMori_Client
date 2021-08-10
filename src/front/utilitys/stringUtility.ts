class StringUtility{
    /**
     * ユニークな文字列を生成
     * @param myStrong 
     * @returns 
     */
    getUniqueStr(myStrong: number){
        var strong = 1000;
        if (myStrong) strong = myStrong;
        return 'a' +( new Date().getTime().toString(16)  + Math.floor(strong*Math.random()).toString(16))
    }
}

export const stringUtility = new StringUtility()