$('#link_reg').on('click', function () {
    $('.login-box').hide()
    $('.reg-box').show()
})

$('#link_login').on('click', function () {
    $('.login-box').show()
    $('.reg-box').hide()
})

const form = layui.form
// const baseUrl = 'http://www.liulongbin.top:3007'
const layer = layui.layer


form.verify({
    repass: value => { //value：表单的值
        const pwd = $('.reg-box [name=password]').val()
        if (pwd !== value) return '两次密码不一致'
    },
    pass: [
        /^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'
    ]
});

// 注册请求
$('#form_reg').on('submit', function (e) {
    // 阻止默认提交行为
    e.preventDefault()

    const data = $(this).serialize()
    $.ajax({
        type: 'POST',
        url:  '/api/reguser',
        data,
        success: res => {
            const {
                message,
                status
            } = res
            if (status !== 0) return layer.msg(message)
            $('#link_login').click()
        }
    })
})

$('#form_login').on('submit', function (e) {
    e.preventDefault()

    const data = $(this).serialize()
    $.ajax({
        type: 'POST',
        url: '/api/login',
        data,
        success: res => {
            const {
                status,
                message,
                token
            } = res
            if (status !== 0) return layer.msg(message)
            localStorage.setItem('token', token)
            location.href = '/index.html'
        }
    })
})