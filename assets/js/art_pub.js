$(function () {
    let layer = layui.layer
    let form = layui.form
    // 定义加载文章分了的函数
    $.ajax({
        method: 'GET',
        url: '/my/article/cates',
        success: function (res) {
            if (res.status !== 0) {
                return layer.msg('初始化分类失败')
            }

            // 调用模板引擎渲染分类选项
            let htmlStr = template('tpl_cate', res)
            $('[name="cate_id"]').html(htmlStr)

            // 用layui重新渲染页面,form.render()
            form.render()
        },
    })

    // 初始化富文本编辑器
    initEditor()


    // 初始化封面裁切
    // 1. 初始化图片裁剪器
    var $image = $('#image')
    // 2. 裁剪选项
    var options = {
        aspectRatio: 400 / 280,
        preview: '.img-preview'
    }
    // 3. 初始化裁剪区域
    $image.cropper(options)


    // 为选择封面的按钮，绑定点击事件：点这个按钮就相当点文件选择框
    $('#btnChoosImage').click(function () {
        $('#coverFile').click()
    })

    // 为文件选择框绑定change事件：
    $('#coverFile').on('change', function (e) {
        let files = e.target.files
        // 判断用户是否选择了文件
        if (files === 0) {
            return
        }
        // 如果上传了图，则开始更换
        var file = e.target.files[0]
        var newImgURL = URL.createObjectURL(file)
        $image
            .cropper('destroy') // 销毁旧的裁剪区域
            .attr('src', newImgURL) // 重新设置图片路径
            .cropper(options) // 重新初始化裁剪区域
    })


    // 发布文章
    // 将文章状态设置为‘已发布’，给存草稿绑定事件：将文章状态改为‘草稿’
    let art_state = '已发布'
    $('#btnSave2').click(function () {
        art_state = '草稿'
    })

    // 给按钮添加submit事件：获取所有输入框的值，动态创建data
    $('form').on('submit', function (e) {
        e.preventDefault()

        // 基于form表单，快熟创建FormData对象
        let fd = new FormData($(this)[0])
        // 将state追加进去
        fd.append('state', art_state)

        // 将封面裁剪后的图片，转化为文件
        $image
            .cropper('getCroppedCanvas', { // 创建一个 Canvas 画布
                width: 400,
                height: 280
            })
            .toBlob(function (blob) {
                // 将 Canvas 画布上的内容，转化为文件对象
                // 得到文件对象后，进行后续的操作
                // 将文件对象存到FormData，fd中
                fd.append('cover_img', blob)


                // 发起ajax请求，发送数据，发布文章
                publishArticle(fd)
            })

    })

    function publishArticle(fd) {
        $.ajax({
            method: 'POST',
            url: '/my/article/add',
            data: fd,
            // 如果向服务器提交的是FormData格式的数据，需要额外配置项
            processData: false,
            contentType: false, 
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('发表文章失败')
                }

                layer.msg('发表文章成功')
                // 跳转到文章列表页面
                location.href = '/home/article/art_list.html'
            }
        })
    }




})