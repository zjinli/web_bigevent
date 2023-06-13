//注意：每次调用$.fet()或者$.post()会调用ajaxPrefilter这个函数
// 在这个函数中，可以拿到我们给ajax配置的对象
$.ajaxPrefilter(function(options) {

    options.url = "http://ajax-api.itheima.net" + options.url
    console.log(options.url);
})