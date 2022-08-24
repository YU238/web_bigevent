// 每次发起ajax请求之前，都会先调用ajaxPrefilter函数
// 在这个函数中可以拿到接口，从而拼接根目录,然后请求这个拼接好的url
$.ajaxPrefilter(function(option) {
    option.url = 'http://api-breakingnews-web.itheima.net' + option.url

    // 同一为需要权限的接口，设置headers请求头
    if (/my/.test(option.url)) {
        option.headers = {
            Authorization: localStorage.getItem('token') || ''
        }
    }
    
    // 如果跳过登录，直接打开首页，就要强制清空本地token并且跳转回登录页
    option.complete = function(res) {
        console.log(res)
        if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
            // 强制清除本地token
            localStorage.removeItem('token')
            // 强制跳转回登录页
            location.href = '/login.html'
        }
    }
})