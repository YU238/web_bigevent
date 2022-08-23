;(function() {
    let username = getUserInfo()
    $('.username').html(username)
}) ()

function getUserInfo() {
    // 携带请求头才能访问
    $.ajax({
        URL: '/my/userinfo',
        method: 'GET',
        headers: {
            Authorization: localStorage.getItem('token') || ''
        },
        success: function(res) {
            console.log(res)
            return res.data.username
        }
    })
}