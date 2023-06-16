$(function() {
    let form = layui.form
    form.verify({
        pwd: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
        rePwd: function(value) {
            if (value !== $(".layui-form [name=newPwd]").val()) {
                return `两次密码输入不一致`
            }
        },
        samePwd: function(value) {
            if (value === $(".layui-form [name=oldPwd]").val()) {
                return `新密码不得与原密码一致`
            }
        }
    })

    $(".layui-form").on("submit", function(e) {
        e.preventDefault()
            // $.ajax({
            //     method: "POST",
            //     url: "/my/updatepwd",
            //     data: $(this).serialize(),
            //     success: function(res) {
            //         if (res.status !== 0) {
            //             return layui.layer.msg("更新密码失败")
            //         }
            //         layui.layer.msg("更新密码成功")
            //         $(".layui-form")[0].reset()
            //     }
            // })
            // $(".layui-form")[0].reset()
    })



})