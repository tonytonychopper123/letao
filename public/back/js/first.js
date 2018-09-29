$(function(){
    var currentPage = 1;
    var pageSize = 5;
    render();
    //渲染函数
    function render(){
        $.ajax({
            url: '/category/queryTopCategoryPaging',
            data: {
                page: currentPage,
                pageSize: pageSize
            },
            dataType: 'json',
            success: function(info){
                var str = template('tmp' , info);
                $('tbody').html(str);

                 //分页
                $('#paginator').bootstrapPaginator({
                    bootstrapMajorVersion: 3,
                    currentPage: currentPage,
                    totalPages: Math.ceil(info.total/5),
                    size: 'small',
                    onPageClicked: function(a,b,c,page){
                        console.log(page);
                        
                        currentPage = page;
                        render();
                    }
                });
            }
        });
    }

   //点击添加弹出模态框
    $('.btn-add').on('click' , function(){
        $('#model-box').modal('show');
    });

    //点击添加到数据库,并渲染,先验证表单
    $('#add').on('click' , function(){
        var categoryName = $('#recipient-name').val();
        $('#form').bootstrapValidator({
            feedbackIcons: {
                valid: 'glyphicon glyphicon-ok',
                invalid: 'glyphicon glyphicon-remove',
                validating: 'glyphicon glyphicon-refresh'
            },
            //验证字段
            fields: {
                content: {
                    validators: {
                        notEmpty: {
                            message: '请输入内容'
                        }
                    }
                }
            }
        });

        //表单验证成功后,执行ajax更新数据并渲染
        $('#form').on('success.form.bv' , function(){
            $.ajax({
                type: 'post',
                url: '/category/addTopCategory',
                data: {
                    categoryName: categoryName
                },
                dataType: 'json',
                success: function(info){
                    if(info.success){
                        //隐藏模态框
                        $('#model-box').modal('hide');
                        //重新渲染第一页
                        currentPage = 1;
                        render();
                    }
                }
            });
        });
       
    });




});