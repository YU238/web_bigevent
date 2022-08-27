$(function () {
    let layer = layui.layer
    let form = layui.form
    var laypage = layui.laypage;
    // 定义一个查询参数对象，用于请求数据的时候
    // 将需要请求的参数对象，提交到服务器
    let q = {
        pagenum: 1,//页码值，默认请求第一页的
        pagesize: 2,//每页显示几条数据，默认每页显示2条
        cate_id: '',//文章分类的Id，默认为空
        state: '',//文章的发布状态
    }

    initTable()
    initCate()

    // 定义获取文章列表的方法
    function initTable() {
        $.ajax({
            method: 'GET',
            url: '/my/article/list',
            data: q,
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('获取文章列表失败')
                }
                layer.msg('获取文章列表成功')
                // console.log(res)
                // 使用模板字符串将获取的数据渲染到页面上
                let htmlStr = template('tpl_table', res)
                $('tbody').html(htmlStr)

                // 调用渲染分页的函数
                renderPage(res.total)
            }
        })
    }

    // 用模板引擎定义时间过滤器
    template.defaults.imports.timefilter = function timefilter(str) {
        // 实例化对象，并且传入需要过滤的时间
        let time = new Data(str)

        // 调用实例化对象的方法
        let y = padZero(time.getFullYear())
        let m = padZero(time.getMonth + 1)
        let d = padZero(time.getDate())

        let hh = padZero(time.getHours())
        let mm = padZero(time.getMinutes())
        let ss = padZero(time.getSeconds())

        return y + '-' + m + '-' + d + '' + hh + ':' + mm + ':' + ss
    }

    // 定义补零函数
    function padZero(data) {
        let str = data > 9 ? data : '0' + data
        return str
    }


    // 定义获取文章分类的方法
    function initCate() {
        $.ajax({
            method: 'GET',
            url: '/my/article/cates',
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('获取分类信息失败')
                }

                // layer.msg(1)
                // 调用模板字符串，渲染页面
                let htmlStr = template('tpl_cate', res)
                // console.log(htmlStr)
                $('[name=cate_id]').html(htmlStr)
                // 因为这样是layui没有监听到，有新的结构进去了，所以会导致页面没有选择项
                // 重新调用layui方法，重新渲染一下区域即可
                form.render()
            }
        })
    }





    // 实现筛选功能
    // 为筛选的表单绑定提交事件
    $('#form_search').on('submit', function (e) {
        e.preventdefault()

        // 获取两个下拉框的value值，并赋值给q中对应属性
        let cate_id = $('[name="cate_id"]').value()
        let state = $('[name="state"]').value()
        q.cate_id = cate_id
        q.state = state

        // 调用获取文章列表函数
        initTable()
    })



    // 定义渲染分页的方法
    // 利用layui渲染分页结构
    function renderPage(total) {
        laypage.render({
            elem: 'pageBox', //放置分页结构的地方
            count: total, //获取数据的总条数
            limit: q.pagesize, //每页显示的条数
            curr: q.pagenum, //初始页是第几页
            limits: [2,4,6,8,10],
            layout: ['count', 'limit', 'prev', 'page', 'next', 'skip'],

            // 通过jump回调函数，获取最新页码
            // 触发jump回调的方法有两个：
            // 1、点击页码时会触发 first=undefined
            // 2、只要调用了laypage.render方法，就会触发 first=ture
            jump: function(obj, first) {//first是布尔值，如果first是ture，就是通过第二种方式触发的回调，不应该调用列表渲染函数
                //console.log(obj.curr)// 打印页码，会发现一开始就会执行一次1。再点其他页码时还会打印其他页码
                q.pagenum = obj.curr

                // 切换limits时，将条目数赋值给q.pagesize,并触发回调
                q.pagesize = obj.limit

                //first是布尔值，如果first是true，就是通过第二种方式触发的回调，不应该调用列表渲染函数
                if (!first) {
                    initTable()
                }
            }
        })

    }






})