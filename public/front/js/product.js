$(function () {

    //获得URL参数对象的函数
    function getSearch() {
        var search = decodeURI(location.search).slice(1);
        var arr = search.split('&');
        var obj = {};
        for (var i = 0; i < arr.length; i++) {
            var key = arr[i].split('=')[0];
            var value = arr[i].split('=')[1];
            obj[key] = value;
        }
        return obj;
    }
    //获取地址栏id
    var id = getSearch().id;
    //渲染函数
    function render() {
        $.ajax({
            url: '/product/queryProductDetail',
            data: {
                id: id
            },
            dataType: 'json',
            success: function (info) {
                var str = template('tmp', info);
                $('.main').html(str);
                //图片轮播
                var gallery = mui('.mui-slider');
                gallery.slider({
                    interval: 5000//自动轮播周期，若为0则不自动播放，默认为0；
                });
                //初始化数字组件
                mui('.mui-numbox').numbox();
            }
        });
    }
    render();
    //选择尺码
    var size;
    $('.main').on('click' , '.size span' , function(){
        size = $(this).text();
        $(this).addClass('current').siblings().removeClass('current');
    });
    //点击加入购物车
    $('.btn-cart').on('click' , function(){
        var num = $('.mui-numbox input').val();
        if(!size){
            mui.toast('请选择尺码');
            return;
        }
        mui.confirm('添加成功','温馨提示',['去购物车','继续浏览'], function(e){
            if(e.index == 0){
                $.ajax({
                    type: 'post',
                    url: '/cart/addCart',
                    data: {
                        productId: id,
                        num: num,
                        size: size
                    },
                    dataType: 'json',
                    success: function(info){
                        if(info.error == 400){
                            location.href = 'login.html?url=' + location.href;
                        }
                        if(info.success){
                            location.href = 'cart.html';
                        }
                    }
                });                
            }
        }) ;
    });





});