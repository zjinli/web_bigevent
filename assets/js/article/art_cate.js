$(function() {
    const layer = layui.layer
    const form = layui.form
    let res = {
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


    initArtCateList()



    // 获取文章列表分类
    function initArtCateList() {
        // $.ajax({
        //     method: "GET",
        //     url: "/my/article/cates",
        //     success: function(res) {
        //         if (res.status !== 0) {
        //             return layer.msg("获取文章列表分类失败")
        //         }
        //         template("tpl-table", res)
        //     }
        // })

        let htmlStr = template('tpl-table', res)
        $("tbody").html(htmlStr)

    }
    let indexAdd = null
        // 为添加类别按钮绑定点击事件
    $("#btnAddCate").on("click", function() {
        indexAdd = layer.open({
            type: 1,
            area: ['500px', '250px'],
            title: '添加文章分类',
            content: $("#dialog-add").html()
        })
    })

    // 通过代理为form-add表单绑定submit 事件
    $("body").on("submit", "#form-add", function(e) {
        e.preventDefault()

        // $.ajax({
        //     method: "GET",
        //     url: "/my/article/addcates",
        //     success: function(res) {
        //         if (res.status != 0) {
        //             return layer.msg("新增分类失败！")
        //         }

        //         initArtCateList()
        //         layer.msg("新增分类成功")
        //     }
        // })

        res.data.push({
            "Id": res.data.length + 1,
            "name": $(this).find("[name=name]").val(),
            "alias": $(this).find("[name=alias]").val(),
            "is_delete": 0
        })
        initArtCateList()
        layer.msg("新增分类成功")

        layer.close(indexAdd)
    })
    let indexEdit = null
    let id
        // 通过代理为btn-edit绑定事件
    $("tbody").on("click", ".btn-edit", function() {
            indexEdit = layer.open({
                type: 1,
                area: ['500px', '250px'],
                title: '修改文章分类',
                content: $("#dialog-edit").html()
            })
            id = $(this).attr("data-id")

            form.val("form-edit", res.data[id - 1])

            // 获取文章列表数据
            // $.ajax({
            //     method: "GET",
            //     url: "/my/article/cates/:id",
            //     success: function(res) {

            //         form.val("form.edit", res.data)
            //     }
            // })
        }

    )
    $("body").on("submit", "#form-edit", function(e) {
        e.preventDefault()
            // $.ajax({
            //     method: "POST",
            //     url: "/my/article/updatecate",
            //     success: function(res) {
            //         if (res.status != 0) {
            //             return layer.msg("修改分类失败！")
            //         }

        //         initArtCateList()
        //         layer.msg("修改分类成功")
        //  layer.close(indexEdit)
        //     }
        // })
        res.data[id - 1] = {
                "Id": id,
                "name": $(this).find("[name=name]").val(),
                "alias": $(this).find("[name=alias]").val(),
                "is_delete": 0
            }
            // console.log(res);
        initArtCateList()
        layer.msg("修改分类成功")

        layer.close(indexEdit)
    })

    // 删除文章分类
    $("tbody").on("click", ".btn-delete", function(index) {
        let did = $(this).attr("data-index")
        layer.confirm('确认删除？', {
            icon: 3,
            title: "提示"
        }, function(index) {
            // $.ajax({
            //     method: "GET",
            //     url: "/my/article/deletecate/:id" + did,
            //     success: function(res) {
            //         if (res.status != 0) {
            //             return layer.msg("删除文章分类失败")
            //         }
            //         layer.msg("删除文章分类成功")
            //         layer.close(index)
            //         initArtCateList()
            //     }
            // })

            //模拟
            res.data.splice(did, 1)
            layer.close(index)
            initArtCateList()
        })
    })

})