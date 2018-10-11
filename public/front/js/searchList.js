$(function(){
    //获得URL参数对象的函数
    function getSearch(){
        var search = decodeURI(location.search).slice(1);
        var arr = search.split('&');
        var obj = {};
        for(var i=0; i<arr.length; i++){
            var key = arr[i].split('=')[0];
            var value = arr[i].split('=')[1];
            obj[key] = value;
        }
        return obj;
    }
    //获取搜索栏的key
    var key = getSearch().key;
    $('.search input').val(key);
    //渲染函数
    function render(){
        var obj = {};
        obj.page = 1;
        obj.proName = key;
        obj.pageSize = 100;
        $current = $('.orderList a[data-type].current');
        if( $current.length > 0 ){
            var param = $current.data('type');
            var num = $current.find('i').hasClass('fa-angle-down') ? 2 : 1;
            obj[param] = num;
        }
        $.ajax({
            url: '/product/queryProduct',
            data: obj,
            dataType: 'json',
            success: function(info){
                var str = template('tmp' , info);
                $('.product').html(str);
            }
        });
    }
    //初始化区域滚动
    mui('.mui-scroll-wrapper').scroll({
        scrollY: true, //是否竖向滚动
        scrollX: false, //是否横向滚动
        startX: 0, //初始化时滚动至x
        startY: 0, //初始化时滚动至y
        indicators: true, //是否显示滚动条
        deceleration:0.0006, //阻尼系数,系数越小滑动越灵敏
        bounce: true //是否启用回弹
    });
    //一进页面就渲染
    setTimeout(render , 500);
    //点击搜索栏的a标签切换页面
    $('.orderList a[data-type]').on('click' , function(){        
        $(this).addClass('current').siblings().removeClass('current');
        $(this).find('i').toggleClass('fa-angle-down').toggleClass('fa-angle-up');
        $('.product').html('<div class="load"></div>');
        setTimeout(render , 500);
    });
    //点击搜索按钮
    $('.btn-search').on('click' , function(){
        key = $('.search input').val();
        $('.product').html('<div class="load"></div>');
        setTimeout(render , 500);
    });
});