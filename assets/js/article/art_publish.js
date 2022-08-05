const form = layui.form;
const layer = layui.layer;

const initCate = () => {
    $.ajax({
        type: 'GET',
        url: "/my/article/cates",
        success: res => {
            const {
                status,
                message,
                data
            } = res
            if (status !== 0) return layer.msg(message)
            let htmlStr = template("tpl-cate", data);
            $("[name=cate_id]").html(htmlStr);
            form.render();
        }
    })
}
initCate()

initEditor()

// 1. 初始化图片裁剪器
var $image = $('#image')

// 2. 裁剪选项
var options = {
    aspectRatio: 400 / 280,
    preview: '.img-preview'
}

// 3. 初始化裁剪区域
$image.cropper(options)

$('#btnChooseImage').on('click', function () {
    $('#coverFile').click()
})

$('#coverFile').on('change', function (e) {
    // 获取到文件的列表数组
    var files = e.target.files
    // 判断用户是否选择了文件
    if (files.length === 0) {
        return
    }
    // 根据文件，创建对应的 URL 地址
    var newImgURL = URL.createObjectURL(files[0])
    // 为裁剪区域重新设置图片
    $image
        .cropper('destroy') // 销毁旧的裁剪区域
        .attr('src', newImgURL) // 重新设置图片路径
        .cropper(options) // 重新初始化裁剪区域
})

let art_state = '已发布'

$('#btnSave2').on('click', function () {
    art_state = '草稿'
    // console.log( art_state);
})

$('.layui-form').submit(function (e) {
    e.preventDefault();
    // console.log(1);
    let fd = new FormData($(this)[0])
    fd.append('state', art_state)
    $image
        .cropper('getCroppedCanvas', {
            // 创建一个 Canvas 画布
            width: 400,
            height: 280
        })
        .toBlob(function (blob) {
            // 将 Canvas 画布上的内容，转化为文件对象
            // 得到文件对象后，进行后续的操作
            // 5. 将文件对象，存储到 fd 中
            fd.append('cover_img', blob)
            publishArticle(fd)
        })
})

const publishArticle = fd => {
    $.ajax({
        type: 'POST',
        url: '/my/article/add',
        data: fd,
        contentType: false,
        processData: false,
        success: res => {
            // console.log(res);
            const {
                status,
                message
            } = res
            layer.msg(message)
            if (status !== 0) return
            // 发布文章成功后，跳转到文章列表页面
            // location.href = '/article/art_list.html'
        }
    })
}