const getUserInfo = () => {
    $.ajax({
        type: 'GET',
        url: '/my/userinfo',
        data: null,
        // headers :{
        //     Authorization: localStorage.getItem("token"),
        // },
        success: res => {
            // console.log(res)
            const {status,message} =res
            if(status !== 0) return layui.layer.msg("数据请求失败！")
            renderAvatar(res.data)
        }
    })
}

const renderAvatar = data => {
    let name = data.nickname || data.username
    $('#welcome').html('欢迎' + name)
    if (data.user_pic !== null) {
        $('.layui-nav-img').attr('src', data.user_pic)
        $('.text-avatar').hide()
    } else {
        $('.layui-nav-img').hide()
        let firstName =name[0].toUpperCase()
        $('.text-avatar').html(firstName)
    }
}

getUserInfo()

$("#exidBtn").click(() => {
    layui.layer.confirm(
        "确定退出？",
        { icon: 3, title: "提示" },
        function (index) {
            localStorage.removeItem("token");
            location.href = "/login.html";
        }
    );
});