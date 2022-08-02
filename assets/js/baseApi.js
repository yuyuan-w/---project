const baseUrl = 'http://www.liulongbin.top:3007' 
$.ajaxPrefilter(option => {
    option.url = baseUrl + option.url
})