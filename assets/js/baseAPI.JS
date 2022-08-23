// 每次发起ajax请求之前，都会先调用ajaxPrefilter函数
// 在这个函数中可以拿到接口，从而拼接根目录,然后请求这个拼接好的url
$.ajaxPrefilter(function(option) {
    option.url = 'http://api-breakingnews-web.itheima.net' + option.url
})