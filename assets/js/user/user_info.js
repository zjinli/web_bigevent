$(function() {
    let form = layui.form
    let layer = layui.layer
    form.verify({
        nickname: function(value) {
            if (value.length > 6) {
                return '昵称长度必须在1-6个字符之间！'
            }
        }
    })
    initUserInfo()

    function initUserInfo() {
        // $.ajax({
        //     method: "GET",
        //     url: "/my/userinfo",
        //     success: function(res) {
        //         if (res.status !== 0) {
        //             return layer.msg("获取用户信息失败")
        //         }

        //         form.value('formUserInfo', res.data)
        //     }
        // })

        let res = {
            "status": 0,
            "message": "获取用户基本信息成功！",
            "data": {
                "id": 1,
                "username": "amina",
                "nickname": "a1",
                "email": "admin@itcast.cn",
                "user_pic": "/assets/images/sample.jpg"
            }
        }
        form.val('formUserInfo', res.data)
        console.log($("[type=hidden]").val());
    }

    // 重置表单
    $("#btnReset").on("click", function(e) {
        e.preventDefault()
        initUserInfo()
    })

    // 监听表单提交
    $(".layui-form").on("submit", function(e) {
        e.preventDefault()
            // $.ajax({
            //     method: "POST",
            //     url: "/my/userinfo",
            //     data: $(this).serialize(),
            //     success: function(res) {
            //         if (res.status !== 0) {
            //             return layer.msg("更新用户失败")
            //         }
            //         layer.msg("更新用户信息成功")

        //         //调用父页面的方法，重新渲染页面
        //         window.parent.getUserInfo()
        //     }
        // })
        layer.msg("更新用户信息成功")
    })


})