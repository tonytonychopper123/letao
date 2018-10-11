$(function(){
    $('#loginBtn').on('click' , function(){
        var username = $('#username').val();
        var password = $('#password').val();
        $.ajax({
            type: 'post',
            url: '/user/login',
            data: {
                username: username,
                password: password
            },
            dataType: 'json',
            success: function(info){
                if(info.error == 403){
                    mui.toast('用户名或密码错误'); 
                }
                var flag = location.href.indexOf('url');
                if(flag != -1){
                    var url = location.search.replace('?url=' , '');
                    location.href = url;
                }else{
                    location.href = 'user.html';
                }
            }
        });
    });
});