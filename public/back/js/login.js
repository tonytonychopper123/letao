$(function(){

    //表单验证
    $('#form').bootstrapValidator({
        //校验时的图标显示
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        //验证字段
        fields: {
            //用户名字段
            username: {
                //验证规则
                validators: {
                    //用户名不能为空
                    notEmpty: {
                        message: '用户名不能为空'
                    },
                    //长度检测
                    stringLength: {
                        min: 2,
                        max: 6,
                        message: '长度必须在2-6位'
                    },
                    callback: {
                        message: '用户名不存在'
                    }
                }

            },
            //密码字段
            password: {
                //验证规则
                validators: {
                    //密码不能为空
                    notEmpty: {
                        message: '密码不能为空'
                    },
                    //长度限制
                    stringLength: {
                        min: 6,
                        max: 10,
                        message: '密码在6-10位'
                    },
                    callback: {
                        message: '密码错误'
                    }
                }
            }
        }
    });
    //校验成功后,发送ajax
    $('#form').on('success.form.bv' , function(e){
        var data = $('#form').serialize();
        //阻止默认提交事件
        e.preventDefault();
        
        $.ajax({
            type: 'post',
            url: '/employee/employeeLogin',
            data: data,
            dataType: 'json',
            success: function(info){
                //如果返回是true,登陆跳转
                if(info.success){
                    location.href = './index.html';
                }else if(info.error == 1001){
                    $('#form').data('bootstrapValidator').updateStatus('password' , 'INVALID' , 'callback');
                }else{
                    $('#form').data('bootstrapValidator').updateStatus('username' , 'INVALID' , 'callback');
                }
            }
        });
    });

    //重置功能
    $('button[type=reset]').on('click' , function(){
        //获取validator对象
        var validator = $('#form').data('bootstrapValidator');
        validator.resetForm();
    });

    
}); 