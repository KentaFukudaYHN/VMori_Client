/**
 * 日付操作Utility
 */
class DateUtility{
    getUtc(date: Date){
        return new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours(), date.getMinutes(), date.getSeconds(), date.getMilliseconds()))
    }
}

export const dateUtility = new DateUtility()