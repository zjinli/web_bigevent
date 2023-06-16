  $(function() {
      // 1.1 获取裁剪区域的 DOM 元素
      var $image = $('#image')
      let layer = layui.layer
          // 1.2 配置选项
      const options = {
          // 纵横比
          //宽高比：16/9
          aspectRatio: 1,
          // 指定预览区域
          preview: '.img-preview'
      }

      // 1.3 创建裁剪区域
      $image.cropper(options)
      $("#btnChooseImage").on("click", function() {
              $("#file").click()
          })
          //位文件选择框绑定change事件
      $("#file").on("change", function(e) {
          let filelist = e.target.files
          console.log(filelist.length);
          if (filelist.length === 0) {
              console.log('111');
              return layer.msg("请选择照片")
          }
          //   1.拿到用户选的文件
          var file = e.target.files[0]
              //   2.将文件转换为路径
          let newImgURL = URL.createObjectURL(file)
              //3.重重初始化裁剪区
          $image
              .cropper('destroy') // 销毁旧的裁剪区域
              .attr('src', newImgURL) // 重新设置图片路径
              .cropper(options) // 重新初始化裁剪区域
      })


      $("#btnUpload").on("click", function() {
          //拿到用户图片
          var dataURL = $image
              .cropper('getCroppedCanvas', { // 创建一个 Canvas 画布
                  width: 100,
                  height: 100
              })
              .toDataURL('image/png') // 将 Canvas 画布上的内容，转化为 base64 格式的字符串

          //上传服务器

          //   $.ajax({
          //       method: "POST",
          //       url: "/my/update/avatar",
          //       data: {
          //           avatar: dataURL
          //       },
          //       success: function(res) {
          //           if (res.status !== 0) {
          //               return layer.msg("更换头像")
          //           }
          //           //   window.parent.getUserInfo()
          //       }
          //   })
      })



  })