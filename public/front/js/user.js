$(function(){
    function render(){
        $.ajax({
            url: '/user/queryUserMessage',
            dataType: 'json',
            success: function(info){
                if(info.error == 400){
                    location.href = 'login.html';
                }
                var str = template('tmp' , info);
                $('.mui-table-view').html(str);
            }
        });
    }
    render();
    //点击退出返回到登录页
    $('#logout').on('click' , function(){
        $.ajax({
            url: '/user/logout',
            dataType: 'json',
            success: function(info){
                if(info.success){
                    location.href = 'login.html';
                }
            }
        });
    });
});