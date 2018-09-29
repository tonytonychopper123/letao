$(function () {
    var currentPage = 1;
    var pageSize = 5;
    render();
    function render() {
        $.ajax({
            url: '/category/querySecondCategoryPaging',
            data: {
                page: currentPage,
                pageSize: pageSize
            },
            dataType: 'json',
            success: function (info) {
                var str = template('tmp', info);
                $('tbody').html(str);
                //页码
                $('#paginator').bootstrapPaginator({
                    bootstrapMajorVersion: 3,
                    currentPage: info.page,
                    size: 'small',
                    totalPages: Math.ceil(info.total / info.size),
                    onPageClicked: function (a, b, c, page) {
                        currentPage = page;
                        render();
                    }
                });
            }
        });
    }

    //点击添加弹出模态框,发送ajax请求下拉列表数据
    $('.btn-add').on('click', function () {
        $('#model-box').modal('show');
        $.ajax({
            url: '/category/queryTopCategoryPaging',
            data: {
                page: 1,
                pageSize: 100
            },
            dataType: 'json',
            success: function (info) {
                console.log(info);

                var str = template('uTmp', info);
                $('.dropdown-menu').html(str);
            }
        });
    });

    var categoryId;
    //点击li将内容显示到页面
    $('.dropdown-menu').on('click', 'li a', function () {
        var txt = $(this).text();
        $('form .choose').text(txt);
        categoryId = $(this).data('id');
        // 手动重置验证状态
        $('#form').data('bootstrapValidator').updateStatus('categoryId' , 'VALID');
    });

    //表单验证
    $('#form').bootstrapValidator({
        // 是否验证隐藏的input
        excluded: [],
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        fields: {
            //验证是否选择一级分类
            categoryId: {
                validators: {
                    notEmpty: {
                        message: '请选择一级分类'
                    }
                }
            },
            //验证是否填写第二分类
            brandName: {
                validators: {
                    notEmpty: {
                        message: '请填写第二分类'
                    }
                }
            },
            //验证图片地址是否有
            brandLogo: {
                validators: {
                    notEmpty: {
                        message: '填写图片地址'
                    }
                }
            }
        }
    });

    var src;
    //文件上传
    $("#fileupload").fileupload({
        dataType: "json",
        //e：事件对象
        //data：图片上传后的对象，通过data.result.picAddr可以获取上传后的图片地址
        done: function (e, data) {
            console.log(data);
            src = data.result.picAddr;
            $('form img').attr('src', src);
            $('input[name=brandLogo]').val(src);
            //手动验证该字段
            $('#form').data('bootstrapValidator').updateStatus('brandLogo' , 'VALID');
        }
    });
    
    //点击添加,发送ajax,加入数据库并渲染
    $('#form').on('success.form.bv', function (e) {
        //阻止表单默认提交事件
        e.preventDefault();
        var hot = $('input[name=hot]').val();
        var brandName = $('input[name=brandName]').val();
        $.ajax({
            type: 'post',
            url: '/category/addSecondCategory',
            data: {
                brandName: brandName,
                categoryId: categoryId,
                brandLogo: src,
                hot: hot
            },
            dataType: 'json',
            success: function (info) {
                console.log(info);
                //去掉模态框
                $('#model-box').modal('hide');
                // 重置表单
                $('#form').data('bootstrapValidator').resetForm(true);
                // 将下拉菜单标题恢复默认
                $('.choose').val('请选择一级分类');
                // 将图片变成默认样式
                $('form img').attr('src' , '../manage/images/none.png');
                // 重新渲染第一页
                currentPage = 1;
                render();
            }
        });
    });











});