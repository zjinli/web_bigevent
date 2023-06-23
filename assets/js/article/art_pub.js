$(function() {
    const layer = layui.layer

    const form = layui.form
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
    initCate()

    // 初始化富文本编辑器
    initEditor()
        // 定义加载文章分类的方法
    function initCate() {
        // $.ajax({
        //     method: 'GET',
        //     url: '/my/article/cates',
        //     success: function(res) {
        //         if (res.status !== 0) {
        //             return layui.msg("初始化文章分类失败")
        //         }

        //         // 调用模板引擎，渲染分类的下拉菜单
        //         const htmlStr = template("tpl-cate", res)
        //         $("[name=cate_id]").html(htmlStr)
        //         form.render()

        //     }
        // })

        // 模拟

        const htmlStr = template("tpl-cate", res)
        $("[name=cate_id]").html(htmlStr)
        form.render()

    }
    // 3. 初始化裁剪区域

    var $image = $('#image')

    // 2. 裁剪选项
    var options = {
        aspectRatio: 400 / 280,
        preview: '.img-preview'
    }

    // 3. 初始化裁剪区域
    $image.cropper(options)

    //为选择封面的按钮绑定点击事件处理桉树
    $("#btnChooseImage").on("click", function() {
        $("#coverFile").click()
    })

    //监听coverFilechange事件，获取用户选择文件列表
    $("#coverFile").on("change", function(e) {
        let files = e.target.files
        if (files.length === 0) {
            return layer.msg("所选图片不能为空")
        }
        // 根据文件，创建对应的url地址
        let newImgURL = URL.createObjectURL(files[0])
        $image
            .cropper('destroy') // 销毁旧的裁剪区域
            .attr('src', newImgURL) // 重新设置图片路径
            .cropper(options) // 重新初始化裁剪区域
    })

    let art_state = "已发布"
    $('#btn-Save2').on("click", function() {
        art_state = '草稿'
    })

    $("#form-pub").on('submit', function(e) {
        e.preventDefault()
        let fd = new FormData($(this)[0])
        fd.append('state', art_state)


        //4.将封面裁剪过后的图片输出为一个文件对象
        $image
            .cropper('getCroppedCanvas', { // 创建一个 Canvas 画布
                width: 400,
                height: 280
            })
            .toBlob(function(blob) { // 将 Canvas 画布上的内容，转化为文件对象
                // 得到文件对象后，进行后续的操作
                //5.将文件对象存入到fd中
                fd.append('cover_img', blob)
                publishArticle(fd)
            })
    })

    //定义发表文章的方法
    function publishArticle(fd) {
        // $.ajax({
        //     method: "POST",
        //     url: "/my/article/add",
        //     data: fd,
        //     contentType: false,
        //     processData: false,
        //     success: function(res) {
        //         if (res.status !== 0) {
        //             return layer.msg("发布文章失败")
        //         }
        //         layer.msg("发布文章成功")
        //         location.href = '/article/art_list.html'
        //     }
        // })

        location.href = '/article/art_list.html'
    }

})