let layer = layui.layer
// 3. 将裁剪后的图片，输出为 base64 格式的字符串
// 1.1 获取裁剪区域的 DOM 元素
var $image = $('#image')
// 1.2 配置选项
const options = {
    // 纵横比
    aspectRatio: 1,
    // 指定预览区域
    preview: '.img-preview'
}
// 1.3 创建裁剪区域
$image.cropper(options)


// 为上传按钮绑定事件：点击上传，相当于点击file框
$('#upload').click(function () {
    $('[type=file]').click()
})

// 为文件选择框绑定change事件：可以拿到事件对象e，
$('[type=file]').on('change', function (e) {
    let fileList = e.target.files
    if (fileList.length === 0) {
        return layer.msg('请选择图片')
    }

    // 用户上传了图片
    let file = e.target.files[0]

    // 将文件转化为路径
    let imgURL = URL.createObjectURL(file)

    // 初始化裁剪区域
    $image.cropper('destroy').attr('src', imgURL).cropper(options)

})


// 将选中的头像区域上传服务器
$('#ensure').click(function () {
    let dataURL = $image
        .cropper('getCroppedCanvas', { // 创建一个 Canvas 画布
            width: 100,
            height: 100
        })
        .toDataURL('image/png') // 将 Canvas 画布上的内容，转化为 base64 格式的字符串

    $.ajax({
        method: 'POST',
        url: '/my/update/avatar',
        data: {
            avatar: dataURL
        },
        success: function(res) {
            if (res.status !== 0) {
                return layer.msg('上传头像失败')
            }

            layer.msg('上传头像成功')
            // 调用父页面的方法
            window.parent.getUserInfo()
        }
    })
})