export class BaseApiRes<T>  {
    status: number
    data: T
    isOk(){
        return this.status == 200
    }
}