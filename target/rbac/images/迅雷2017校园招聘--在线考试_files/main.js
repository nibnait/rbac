/// <reference path="jquery-1.11.1.min.js" />
var wHeight = 0;
$(document).ready(function () {
    //

    //即时消息
    $(".noticeTips .immMessage .clickarea").bind("click", function () {
        $(".noticeTips .onlineRefer .MessageBox").hide();
        $(this).parent().find(".MessageBox").toggle();
        $(".noticeTips .immMessage .tip").html(0).removeClass("animated").hide();

        $(".immMessage .MessageBox ul").scrollTop($('.immMessage .MessageBox ul')[0].scrollHeight);
    });

    $(".noticeTips .immMessage .MessageBox .toolguider i").bind("click", function () {
        $(this).parent().parent().toggle();
    });

    //在线咨询
    $(".noticeTips .onlineRefer .clickarea").bind("click", function () {
        $(".noticeTips .immMessage .MessageBox").hide();

        $(this).parent().find(".MessageBox").toggle();

        $(".onlineRefer .MessageBox .InfoBox").scrollTop($('.onlineRefer .MessageBox .InfoBox')[0].scrollHeight);
        $(".noticeTips .onlineRefer .tip").html(0).removeClass("animated").hide();
    });

    $(".noticeTips .onlineRefer .MessageBox .toolguider i").bind("click", function () {
        $(this).parent().parent().toggle();
    });

    //在线咨询-选择问题类型
    $(".messtype ul li").bind("click", function () {
        $(this).parent().parent().find("span").html($(this).html());
        $(this).parent().parent().find("span").attr("id", $(this).attr("xtvalue"));
    });
   
    //全部考题
    $(".header .examlist").bind("click", function () {
        $("#exam-part-progress .questionModal").toggle();
        $("#exam-part-progress .questionProgress").slideToggle(200);
        $("#exam-question-panel").toggle();
        if ($(".header .examlist .jt").hasClass("fa-chevron-down")) {
            $(".header .examlist .jt").addClass("fa-chevron-up").removeClass("fa-chevron-down");
        }
        else if ($(".header .examlist .jt").hasClass("fa-chevron-up")) {
            $(".header .examlist .jt").addClass("fa-chevron-down").removeClass("fa-chevron-up");
        }
    });

    //页脚始终在最下
    if ($(".footer").offset().top < $(window).height()) {
        $(".footer").css("position", "fixed");
    }

    //窗口大小改变适应
    $(window).resize(function () {
        $(".footer").css("position", "");
        if ($(".footer").offset().top < $(window).height()) {
            $(".footer").css("position", "fixed");
        }
    });

    $("body").scroll(function () {
        if ($(".questionProgress").css("display") != "none") {  
            $(".questionModal").hide();
            $(".questionProgress").hide();
        }
    });

    
});