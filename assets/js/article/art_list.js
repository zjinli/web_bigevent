$(function() {

    const layer = layui.layer
    const form = layui.form
    const laypage = layui.laypage

    //定义梅花时间的过滤器
    template.defaults.imports.dataFormat = function(date) {
            const dt = new Date(date)
            const y = dt.getFullYear()
            const m = padZero(dt.getMonth() + 1)
            const d = padZero(dt.getDate())
            const hh = padZero(dt.getHours())
            const mm = padZero(dt.getMinutes())
            const ss = padZero(dt.getSeconds())
            return y + "-" + m + "-" + d + ' ' + hh + ":" + mm + ":" + ss


        }
        //定义补零函数
    function padZero(n) {
        return n > 9 ? n : '0' + n
    }

    //定义一个查询对象，将来请求数据的时候
    //需要将请求参数对象提交到服务器
    let q = {
        pagenum: 1, //页码值，默认请求第一页的数据
        pagesize: 2, //每页显示几条数据
        cate_id: "", //文章分类的ID
        state: "" //文章的发布状态
    }
    let res = {
        "status": 0,
        "message": "获取文章列表成功！",
        "data": [{
                "Id": 1,
                "title": "abab",
                "pub_date": "2020-01-03 12:19:57.690",
                "state": "已发布",
                "cate_name": "最新"
            },
            {
                "Id": 2,
                "title": "666",
                "pub_date": "2020-01-03 12:20:19.817",
                "state": "已发布",
                "cate_name": "股市"
            },

        ],
        "total": 5
    }


    initTable()

    //获取文章列表数据的方法
    function initTable() {
        // $.ajax({
        //     method: "GET",
        //     url: "/my/article/list",
        //     data: q,
        //     success: function(res) {
        //         if (res.status !== 0) {
        //             return layer.msg("获取文章列表失败")
        //         }

        //         //使用模板引擎渲染页面数据
        //         const htmlStr = template("tpl-table", res)
        //         $("tbody").html(htmlStr)
        //     }
        // })

        const htmlStr = template("tpl-table", res)
        $("tbody").html(htmlStr)
        renderPage(res.total)
    }
    initCate()

    //初始化文章分类的方法
    function initCate() {
        // $.ajax({
        //     method: "GET",
        //     url: "/my/article/cates",
        //     success: function(res) {
        //         if (res.status !== 0) {
        //             return layer.msg("获取分类数据失败")
        //         }

        //         //调用模板引擎渲染分类的可选项
        //         let htmlStr = template("tpl-cate", res)
        //         $("[name=cate_id]").html(htmlStr)
        //     }
        // })
        const res = {
            "status": 0,
            "message": "获取文章分类列表成功！",
            "data": [{
                    "Id": 1,
                    "name": "最新",
                    "alias": "ZuiXin",
                    "is_delete": 0
                },
                {
                    "Id": 2,
                    "name": "科技",
                    "alias": "KeJi",
                    "is_delete": 0
                },
                {
                    "Id": 3,
                    "name": "股市",
                    "alias": "GuShi",
                    "is_delete": 0
                },
                {
                    "Id": 4,
                    "name": "历史",
                    "alias": "LiShi",
                    "is_delete": 0
                },
                {
                    "Id": 5,
                    "name": "情感",
                    "alias": "QingGan",
                    "is_delete": 0
                }
            ]
        }
        let htmlStr = template("tpl-cate", res)
        $("[name=cate_id]").html(htmlStr)

        // 通知layui重重渲染表单区域的结构
        form.render()

    }

    //为筛选表单绑定submit事件
    $("#form-seach").on("submit", function(e) {
        e.preventDefault()

        // 获取表单中选中项的值
        let cate_id = $("[name=cate_id]").val()
        let state = $("[name=state]").val()

        //为查询参数对象q对应中的属性赋值
        q.cate_id = cate_id
        q.state = state

        // 根据筛选条件重新渲染表格
        initTable()
    })

    // 定义渲染分页的方法
    function renderPage(total) {
        laypage.render({
            elem: 'pageBox',
            count: total, // 数据总数
            limit: q.pagesize, //每一页显示几条数据
            curr: q.pagenum, //设置默认被选中的分页
            layout: ['count', 'limit', 'prev', 'page', 'next', 'skip'],
            limits: [2, 3, 10],
            //触发jump回调的方式有两种
            //1.点击页码时，会触发jump回调
            //2.只要调用了laypage.render()就会触发
            jump: function(obj, first) {
                //可以通过first值可以判断通过哪种方式触发jump
                // console.log(obj.curr); // 得到当前页，以便向服务端请求对应页的数据。
                // console.log(obj.limit); // 得到每页显示的条数
                q.pagenum = obj.curr
                    //吧最新的条目数，赋值到q这个查询参数的pagesize属性中
                q.pagesize = obj.limit
                if (!first) {

                    initTable()
                }
            }

        })

    }

    //删除文章
    $("tbody").on("click", ".btn-delete", function() {
        // 获取按钮个数
        let len = $('.btn-delete').length
            // 获取到当前列的id值
        let id = $(this).attr('data-id')
        layer.confirm('确认删除？', { icon: 3, title: "提示" },
            function(index) {
                // $.ajax({
                //     method: "GET",
                //     url: "/my/article/delete/" + id,
                //     success: function(res) {
                //         if (res.status !== 0) {
                //             return layer.msg("删除文章失败")
                //         }
                //         layer.msg("删除文章成功")

                //         // 当数据删除完成后，需要判断当前页是否还有数据
                //         //如果没有数据，则让页码值-1再重新调用initTable()
                //         if (len <= 1) {
                //             // 如果len值为1，证明删除完毕后页面上没有任何数据
                //             //页码值最小必须为1
                //             q.pagenum = q.pagenum === 1 ? 1 : q.pagenum - 1
                //         }
                //         initTable()
                //     }
                // })
                layer.msg("删除文章成功")
                layer.close(index)

            })
    })


})