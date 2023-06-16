$(function() {
    getUserInfo()
    let layer = layui.layer
    $("#btnLogout").on("click", function() {
        //提示用户是否退出
        layer.confirm('确定退出登录?', { icon: 3, title: '提示' },
            function(index) {

                // 清空本地存储的token
                localStorage.removeItem("token")

                //重新跳转到登录页
                location.href = '/login.html'

                //关闭layer.confirm询问框
                layer.close(index);
            })


    })

    function getUserInfo() {
        // //链接失效，模拟数据
        // $.ajax({
        //     method: "GET",
        //     url: "/my/userinfo",
        //     //此接口有权限需要加token
        //     header: {
        //         //登录操作存入本地的token数据
        //         Authorization: localStorage.getItem("token") || ''
        //     },
        //     success: function(res) {
        //         if (res.status != 0) {
        //             return layer.msg("获取用户信息失败")
        //         }
        //         //渲染函数头像
        //         renderAvatar(res.data)
        //     },
        // complete: function(res) {
        //     location.href = "./login.html"
        //     if (res.responseJSON.status === 1 && res.responseJSON.message === "身份认证失败") {
        //         localStorage.removeItem("token")
        //         location.href = "./login.html"
        //     }

        // }
        // })

        // 模拟数据
        let res = {
            "status": 0,
            "message": "获取用户基本信息成功！",
            "data": {
                "id": 1,
                "username": "admin",
                "nickname": "a1",
                "email": "admin@itcast.cn",
                "user_pic": "./assets/images/sample.jpg"
            }
        }
        renderAvatar(res.data)

    }

    function renderAvatar(user) {
        let name = user.nickname || user.username
        $("#welcome").html("欢迎&nbsp;&nbsp;" + name)
        if (user.user_pic) {
            $(".layui-nav-img").prop('src', user.username).show()

            $(".text-avatar").hide()
        } else {
            $(".layui-nav-img").hide()
            let first = name[0].toUpperCase()
            $(".text-avatar").html(first).show()

        }
    }



})