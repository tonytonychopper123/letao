$(function(){
    function render(){
        $.ajax({
            url: '/cart/queryCart',
            dataType: 'json',
            success: function(info){
                if(info.error == 400){
                    location.href = 'login.html';
                }
                var str = template('tmp' , {list: info});
                $('.main .mui-scroll').html(str);
                //初始化区域滚动
                mui('.mui-scroll-wrapper').scroll({
                    deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
                });
            }
        });
    }
    render();
});