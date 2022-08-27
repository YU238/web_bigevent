let layer = layui.layer
let form = layui.form
// 活获取文章列表
$.ajax({
    url: '/my/article/cates',
    method: 'GET',
    success: function (res) {
        if (res.status !== 0) {
            return layer.msg('获取文章列表失败')
        }

        layer.msg('获取文章列表成功')
        // 使用模板字符串，渲染页面
        // 调用模板字符串函数
        let str = template('tpl_table', res)
        // 渲染html
        $('tbody').html(str)
    },
})

let addIndex = 0
$('#addCate').click(function () {

    addIndex = layer.open({
        type: 1,
        title: '添加文章分类'
        , content: $('#dialog_add').html()
        , area: ['500px', '250px']
    })



})

// 事件委托，提交信息
$('body').on('submit', '#form_add', function (e) {
    e.preventDefault()

    $.ajax({
        method: 'POST',
        url: '/my/article/addcates',
        data: $(this).serialize(),
        success: function (res) {
            if (res.status !== 0) {
                return layer.msg('添加失败')
            }
            console.log(res)
            layer.msg('添加成功')

            $.ajax({
                url: '/my/article/cates',
                method: 'GET',
                success: function (res) {
                    if (res.status !== 0) {
                        return layer.msg('获取文章列表失败')
                    }

                    layer.msg('获取文章列表成功')
                    // 使用模板字符串，渲染页面
                    // 调用模板字符串函数
                    let str = template('tpl_table', res)
                    // 渲染html
                    $('tbody').html(str)
                },
            })

            layer.close(addIndex)
        }
    })
})


//因为是通过模板引擎渲染进去的，所以需要事件委托： 
// 给编辑按钮绑定事件：
let editIndex = 0
$('tbody').on('click', '#btn_edit', function () {
    editIndex = layer.open({
        type: 1,
        title: '添加文章分类'
        , content: $('#dialog_edit').html()
        , area: ['500px', '250px']
    })

    let id = $(this).attr('data-id')
    console.log(id)
    // console.log(id)
    // 发起请求获取数据，并填充到页面
    $.ajax({
        method: 'GET',
        url: '/my/article/cates/' + id,
        success: function (res) {

            if (res.status !== 0) {
                return layer.msg('获取信息失败')
            }

            form.val("form_edit", res.data)
        }

    })
})

// 提交修改结果
// 效果出不来
$('body').on('submit', '#form_edit', function (e) {
    e.preventDefault()

    $.ajax({
        method: 'POST',
        url: '/my/article/updatecate',
        data: $(this).serialize(),
        success: function (res) {
            if (res.status !== 0) {
                return layer.msg('更新分类数据失败！')
            }
            layer.msg('更新分类数据成功！')
            layer.close(editIndex)
        }
    })

    // $.ajax({
    //     medthod: 'POST',
    //     url: '/my/article/updatecate',
    //     data: $(this).serialize(),
    //     success: function (res) {
    //         if(res.status !== 0) {
    //             return layer.msg('更新失败')

    //         }

    //         layer.msg('更新成功')
    //         layer.close(editIndex)

    //         $.ajax({
    //             url: '/my/article/cates',
    //             method: 'GET',
    //             success: function (res) {
    //                 if (res.status !== 0) {
    //                     return layer.msg('获取文章列表失败')
    //                 }

    //                 layer.msg('获取文章列表成功')
    //                 // 使用模板字符串，渲染页面
    //                 // 调用模板字符串函数
    //                 let str = template('tpl_table', res)
    //                 // 渲染html
    //                 $('tbody').html(str)
    //             },
    //         })
    //     }
    // })

    // $.ajax({
    //     method: 'POST',
    //     url: '/my/article/updatecate',
    //     data: $(this).serialize(),
    //     success: function (res) {
    //         if (res.status !== 0) {
    //             return console.log(res)
    //         }

    //         layer.msg('修改成功')

    //         $.ajax({
    //             url: '/my/article/cates',
    //             method: 'GET',
    //             success: function (res) {
    //                 if (res.status !== 0) {
    //                     return layer.msg('获取文章列表失败')
    //                 }

    //                 layer.msg('获取文章列表成功')
    //                 // 使用模板字符串，渲染页面
    //                 // 调用模板字符串函数
    //                 let str = template('tpl_table', res)
    //                 // 渲染html
    //                 $('tbody').html(str)
    //             },
    //         })

    //         layer.close(editIndex)
    //     }
    // })
})



