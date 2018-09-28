$(function () {
    //一进页面就渲染
    var currentPage = 1;
    render();

    function render() {
        $.ajax({
            type: 'get',
            url: '/user/queryUser',
            data: {
                page: currentPage,
                pageSize: 5
            },
            dataType: 'json',
            success: function (info) {
                var str = template('tmp', info);
                $('tbody').html(str);
                // currentPage = info.page;
                //分页
                $("#pagintor").bootstrapPaginator({
                    bootstrapMajorVersion: 3,//默认是2，如果是bootstrap3版本，这个参数必填
                    currentPage: info.page,//当前页
                    totalPages: Math.ceil(info.total / 5) ,//总页数
                    size: "small",//设置控件的大小，mini, small, normal,large
                    onPageClicked: function (event, originalEvent, type, page) {
                        //为按钮绑定点击事件 page:当前点击的按钮值
                        currentPage = page;
                        render();
                    }
                });
            }
        });
    }

    $('tbody').on('click' , '.btn' , function(){
        //点击禁用启用按钮,弹出模态框
        $('#model-box').modal('show');
        var id = $(this).parent().data('id');
        var isDelete = $(this).hasClass("btn-success") ? 1 : 0;
        // var isDelete = $(this).parent().data('isDelete');
        //点击确认
        $('#confirm').off('click').on('click' , function(){
           
            $.ajax({
                type: 'post',
                url: '/user/updateUser',
                data: { 
                    id: id,
                    isDelete: isDelete
                },
                dataType: 'json',
                success: function(info){
                    if(info.success){
                        //关闭模态框
                        $('#model-box').modal('hide');
                        render();
                    }                
                }
            });
        });
    });

});