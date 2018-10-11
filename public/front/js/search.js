//获取localstorage储存的数组函数
function getItem() {
    var arr = JSON.parse(localStorage.getItem('search-list')) || [];//如果本地存储没数据,就赋值位空数组,避免结果为null
    return arr;
}
//渲染函数
function render() {
    var arr = getItem();
    var str = template('tmp', { arr: arr });
    $('.container .content').html(str);
}
// 进入页面就渲染
render();
//清空记录
$('.container .content').on('click', '.clearinfo', function () {
    mui.confirm('确定要清空吗?', '温馨提示', ['取消', '确定'], function (e) {
        if (e.index == 1) {
            localStorage.removeItem('search-list');
            render();
        }
    });
});
//添加记录
$('.btn-search').on('click', function () {
    //获取input内容
    var key = $('input').val().trim();
    //点击搜索跳转
    location.href = 'searchList.html?key=' + key;
    //清空input输入值
    $('input').val('');
    if (key == '') {
        mui.toast('请输入内容');
    } else {
        var arr = getItem();
        //如果key已经存在,则删掉该项
        if (arr.indexOf(key) != -1) {
            arr.splice(arr.indexOf(key), 1);
        }
        //将key加入数组第一项
        arr.unshift(key);
        //如果数组长度超过10个,就删掉最后的数组
        if (arr.length > 10) {
            arr.pop();
        }
        var str = JSON.stringify(arr);
        localStorage.setItem('search-list', str);
        render();
    }
});
//删除记录
$('.container .content').on('click', '.delete', function () {
    var index = $(this).parent().data('id');
    var arr = getItem();
    arr.splice(index, 1);
    var str = JSON.stringify(arr);
    localStorage.setItem('search-list', str);
    render();
});
