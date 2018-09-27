//在发送第一个请求时触发
$(document).ajaxStart(function(){
    NProgress.start();
});
//所有请求发送完成后触发
$(document).ajaxStop(function(){
    NProgress.done();
});

//验证是否是登陆状态
$.ajax({
    type: 'get',
    url: '/employee/checkRootLogin',
    dataType: 'json',
    success: function(info){
        if(info.error === 400){
            location.href = './login.html';
        }    
    }
});

//退出用户
var $logout = $('#logout');
var $model = $('#model-box');
var $exit = $('#exit');
$logout.on('click' , function(){
    //显示模态框
    $model.modal('show');
});
//点击退出,登出用户
$exit.on('click' , function(){
    $.ajax({
        type: 'get',
        url: '/employee/employeeLogout',
        dataType: 'json',
        success: function(info){
            if(info.success){
                location.href = './login.html';
            }
        }
    });
});

//点击分类管理,弹出下拉菜单
var $category = $('.category');
$category.on('click' , function(){
    $category.next().slideToggle();
});
