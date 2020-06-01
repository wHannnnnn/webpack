class getData {
    constructor(page=1,pageSize=10,api,params,callback){
        this.page = page
        this.pageSize = pageSize
        this.api = api
        this.params = params
        this.callback = callback
    }
    async httpRequet(){
        return await this.callback(this.params)
    }
    async formChange(params,callback){
        this.params = params
        this.callback = callback
        return await this.httpRequet()
    }
    async pageChange(page){
        this.page= page
        return await this.httpRequet()
    }
}
export {getData}