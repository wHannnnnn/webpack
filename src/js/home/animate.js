$(function () {
    $('.address .area_value').on('click', function (e) {
        search.areaSearch($(this).html())
    })
    $('.logo').on('click', function (e) {
        if ($('#header_right').hasClass('fadeOutLeft')) {
            $('.layui-tab-content.left-nav').animate({ 'padding-top': '72px' })
            setTimeout(function () {
                $('#header_right').removeClass('fadeOutLeft').addClass('fadeInLeft')
            }, 300);
        } else {
            $('#header_right').addClass('animated fadeOutLeft')
            setTimeout(function () {
                $('.layui-tab-content.left-nav').animate({ 'padding-top': '0' })
            }, 300);
        }
    })
    $('.close').on('click', function (e) {
        if ($('.layui-tab-content.left-nav').hasClass('slideOutLeft')) {
            $('.layui-tab-content.left-nav').removeClass('slideOutLeft').addClass('fadeInLeft')
        } else {
            $('.layui-tab-content.left-nav').addClass('animated slideOutLeft')
        }
    })
    $('.changeArea').on('click', function (e) {
        $('.detail-list').toggle()
    })
    $('.clickMore').on('click', function (e) {
        if ($('.address').hasClass('addresshide')) {
            $('.addresshide').removeClass('addresshide').addClass('addressshow')
            $('.more').html('收起更多')
        } else if ($('.address').hasClass('addressshow')) {
            $('.addressshow').removeClass('addressshow').addClass('addresshide')
            $('.more').html('收起更多')
        }
    })
    var oDiv = document.getElementById('right');
    oDiv.onmousedown = function (ev) {
        var oEvent = ev || window.event;
        var disX = oEvent.clientX - oDiv.offsetLeft;

        document.onmousemove = function (ev) {
            var oEvent = ev || window.event;
            $('.layui-tab-content.left-nav').css({ width: oEvent.clientX - disX + oDiv.offsetWidth + 'px' })
        };

        document.onmouseup = function () {
            document.onmousemove = null;
            document.onmouseup = null;
        };
        return false
    };
})