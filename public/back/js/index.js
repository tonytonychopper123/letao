$(function(){
    var $hidebar = $('.hidebar');
    var $leftside = $('.left-side');
    var $rightside = $('.right-side');
    var $bar = $('.logbar');
    $hidebar.on('click' , function(){
        $leftside.toggleClass('hidebar');
        $rightside.toggleClass('active');
        $bar.toggleClass('active');
    });
    
});