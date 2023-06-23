//注意：每次调用$.fet()或者$.post()会调用ajaxPrefilter这个函数
// 在这个函数中，可以拿到我们给ajax配置的对象
$.ajaxPrefilter(function(options) {

    options.url = "https://ajax-base-api-t.itheima.net" + options.url

    // console.log(options.url);
    //统一为有请求权限的加请求头
    if (options.url.indexOf('/my/') !== -1) {
        options.headers = {
            Authorization: localStorage.getItem("token") || ''
        }
    }


    //控制不经过登录直接跳转首页
    // options.complete = function(res) {
    //     location.href = "./login.html"
    //     if (res.responseJSON.status === 1 && res.responseJSON.message === "身份认证失败") {
    //         localStorage.removeItem("token")
    //         location.href = "./login.html"
    //     }

    // }
})