$(function () {
    var currentPage = 1;
    function render() {
        $.ajax({
            url: '/product/queryProductDetailList',
            data: {
                page: currentPage,
                pageSize: 2
            },
            dataType: 'json',
            success: function (info) {                
                var str = template('tmp', info);
                $('tbody').html(str);
                $('#paginator').bootstrapPaginator({
                    bootstrapMajorVersion: 3,
                    currentPage: currentPage,
                    totalPages: Math.ceil(info.total / info.size),
                    size: 'small',
                    onPageClicked: function (a, b, c, page) {
                        currentPage = page;
                        render();
                    }
                });
            }
        });
    }
    render();
    //弹出模态框
    $('.btn-add').on('click', function () {
        $('#model-box').modal('show');
        $.ajax({
            url: '/category/querySecondCategoryPaging',
            data: {
                page: 1,
                pageSize: 100
            },
            dataType: 'json',
            success: function (info) {
                console.log(info);
                
                var str = template('category', info);
                $('.dropdown-menu').html(str);
            }
        });
    });

    //点击下拉菜单里的li选中
    $('.dropdown-menu').on('click', 'li', function () {
        var value = $(this).text();
        $('.modal-body .list span').text(value);
        $('input[name=brandId]').val($(this).data('id'));
        
        // $('#form').data('bootstrapValidator').updateStatus('brandId' , 'VALID');

    });
    //表单验证
    $('#form').bootstrapValidator({
        excluded: [],
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        //验证字段
        fields: {
            proName: {
                validators: {
                    notEmpty: {
                        message: '不能为空'
                    }
                }
            },
            proDesc: {
                validators: {
                    notEmpty: {
                        message: '不能为空'
                    }
                }
            },
            num: {
                validators: {
                    notEmpty: {
                        message: '不能为空'
                    },
                    regexp: {
                        regexp: /^\d*$/,
                        message: '只能是数字'
                    }
                }
            },
            size: {
                validators: {
                    notEmpty: {
                        message: '不能为空'
                    },
                    regexp: {
                        regexp: /^[34]\d{1}-[34]\d{1}$/,
                        message: '只能是30-50'
                    }
                }
            },
            oldPrice: {
                validators: {
                    notEmpty: {
                        message: '不能为空'
                    },
                    regexp: {
                        regexp: /^\d*$/,
                    }
                }
            },
            price: {
                validators: {
                    notEmpty: {
                        message: '不能为空'
                    },
                    regexp: {
                        regexp: /^\d*$/,
                    }
                }
            }
        }
    });
    //获得图片
    var arr = [];
    $("#fileupload").fileupload({
        dataType: "json",
        //e：事件对象
        //data：图片上传后的对象，通过data.result.picAddr可以获取上传后的图片地址
        done: function (e, data) {     
            arr.unshift({picAddr:data.result.picAddr , picName:data.result.picName});
            if(arr.length > 3){
                arr.pop();
            }
            for(var i=0; i<arr.length; i++){
                $('form img').eq(i).attr('src' , arr[i].picAddr);
                $('input[name=picName'+ (i+1) +']').val(arr[i].picName);
                $('input[name=picAddr'+ (i+1) +']').val(arr[i].picAddr);
            }
        }
    });
    //表单验证成功  
    $('#form').on('success.form.bv' , function(e){
        //阻止默认提交事件
        e.preventDefault();
        var data = $('#form').serialize();
        $.ajax({
            type: 'post',
            url: '/product/addProduct',
            data: data,
            dataType: 'json',
            success: function(info){
                if(info.success){
                    //隐藏模态框
                    $('#model-box').modal('hide');
                    //重置表单
                    $("#form").data('bootstrapValidator').resetForm(true);
                    $('.modal-body .list span').text('请选择二级分类');
                    for(var i=0; i<$('form img').length; i++){
                        $('form img').eq(i).attr('src' , '');
                    }
                    render();
                }                
            }
        });
    });








});