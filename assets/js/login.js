$(function() {
    // 点击去注册账号
    $("#link_reg").on("click", function() {
            $(".login-box").hide()
            $(".reg-box").show()


        })
        //点击去登录账号
    $("#link_login").on("click", function() {
        $(".reg-box").hide()
        $(".login-box").show()


    })

    // 从layui中获取form对象
    let form = layui.form
    let layer = layui.layer
    form.verify({
        pwd: [/^[\S]{6,12}$/, '密码必须为6到12位的非空字符'],
        // 校验两次密码是否一致
        repwd: function(value) {
            const pwd = $(".reg-box [name=password]").val()
                // 通过形参拿到确认密码框的内容
            if (pwd != value) {
                return "两次密码不一致"
            }
        }
    })


    // 监听注册表单事件
    $("#form_reg").on("submit", function(e) {
        e.preventDefault()
            // $.ajax({
            //         type: "POST",
            //         url: "http://www.liulongbin.top:3007/api/reguser",
            //         data: {
            //             username: $("#form_reg [name=username]").val(),
            //             password: $("#form_reg [name=password]").val()
            //         },
            //         success: function(res) {
            //             console.log(res);
            //         }
            //     })
        $.post('/ajax/reguser', { username: $("#form_reg [name=username]").val(), password: $("#form_reg [name=password]").val() }, function(res) {
            // console.log(res);
            // if (res.status != 0) {
            //     return layer.msg(res.message)
            // }
            layer.msg('注册成功，请登录！')
            $("#link_login").click()
        })
    })

    // 监听登录表单的监听事件
    $("#form_login").submit(function(e) {
        e.preventDefault()
        $.ajax({
            url: '/api/login',
            method: "POST",
            data: $(this).serialize(),
            success: function(res) {
                // if (res != 0) {
                //     return layer.msg(res.message)
                // }
                layer.msg("登陆成功")
                localStorage.setItem("token", res.token)
                    // console.log(res.token);
                    // console.log(res);
                location.href = '/index.html'
            }
        })
    })
})