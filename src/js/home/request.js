const request = {
    host: 'https://api.it120.cc/',
    // token: localStorage.getItem('token') ? localStorage.getItem('token'): '',
    http: function(type,url,params) {
        return new Promise((resolve,reject)=>{
            $.ajax({
                type: type,
                url: this.host + url,
                data: params,
                dataType: "json",
                header: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                success: function (data) {
                    resolve(data)
                },
                error: function () {
                    alert("数据没有成功返回!")
                }
            });
        })
    }
}
export { request }