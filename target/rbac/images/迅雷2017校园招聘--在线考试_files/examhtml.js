/// <reference path="jquery-1.11.1.min.js" />

$(document).ready(function () {
    //重新加载title
    //$(".header .examlist").show();

    //重新加载body
    
    //$(".examtitle").html('<div class="titleleft"><div class="title">' + $(".examtitle .title").html() + '</div><div class="examtype">在线考试</div></div><div class="titleright"><span class="type"></span> <span class="Num">1</span>/<span class="total"></span></div>');
    

    //正在摄像头监控
    if ($("#myphoto").attr("src").indexOf("photo") > -1) {
        if ($(".header .monitor").length = 0) {
            var cameraHtml = '<li class="monitor"><i class="camera fa fa-circle red animated flash infinite m3 delay"></i> 正在监控</li>';
            $(".header .nav").append(cameraHtml);
        }
    }
});