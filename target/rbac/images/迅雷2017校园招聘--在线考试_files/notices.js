/// <reference path="jquery-1.11.1.min.js" />

$(document).ready(function () {

    //即时消息-加载
    $(".immMessage .MessageBox ul").html("");
    var url = "http://capture.acmcoder.com/getnotices.php?comid=" + $("#comid").val();
    $.ajax({
        type: "get",
        url: url,
        dataType: "jsonp",
        jsonp: "callback",//传递给请求处理程序或页面的，用以获得jsonp回调函数名的参数名(默认为:callback)
        async: false,
        success: function (json) {
            var jjs = eval(json);
            if (jjs != 'No Found CompanyID') {
                var curhtml = "";
                for (var i = 0; i < jjs.length; i++) {
                    var myCuter = jjs[i].time;
                    //2015-07-03 19:19:38
                    $(".immMessage .MessageBox ul").append('<li> ' + jjs[i].content + '</li>');
                    if (i == 0) { curhtml = jjs[i].content;}
                }
                if (!$.cookie("acm-notice")) {
                    $.cookie("acm-notice", "true", { path: '/' });
                    //下面消息提示
                    if (curhtml != "") {
                        $(".infoview").html('<div style="width:90%; float:left;padding-left:5%;"><i class="fa fa-lightbulb-o circle"></i>  最新消息: ' + curhtml + '</div><div style="width:10%; float:right;"><i class="fa fa-close fr"></i></div>').show().removeClass("animated flash").addClass("animated flash");
                        
                        $(".infoview .fr").bind("click", function () {
                            $(".infoview").hide();
                        });
                    }                    
                }
            };
        },
        error: function () {
            
        }
    });
});


window.show_notice = function (data) {


    if ($("#comid").val() == data['comid']) {
        if (data['positions'] == null && data['positions'] != "") {
            //右边新闻列表
            var myDate = new Date();
            //$(".immMessage .MessageBox ul").append('<li><span class="time">' + myDate.getMonth() + "-" + myDate.getDate() + " " + myDate.getHours() + ":" + myDate.getMinutes() + '</span> ' + data['content'] + '</li>');
            $(".immMessage .MessageBox ul").append('<li>' + data['content'] + '</li>');


            //下面消息提示
            $(".infoview").html('<div style="width:90%; float:left;padding-left:5%;"><i class="fa fa-lightbulb-o circle"></i>  最新消息: ' + data['content'] + '</div><div style="width:10%; float:right;"><i class="fa fa-close fr"></i></div>').show().removeClass("animated flash").addClass("animated flash");
            $(".noticeTips .immMessage .tip").html(parseInt($(".noticeTips .immMessage .tip").html()) + 1).addClass("animated").show();

            $(".infoview .fr").bind("click", function () {
                $(".infoview").hide();
            });
        } else {
            var positionid = data['positions'];
            if (positionid.indexOf(user.positionId) > -1) {
                //右边新闻列表
                var myDate = new Date();
                //$(".immMessage .MessageBox ul").append('<li><span class="time">' + myDate.getMonth() + "-" + myDate.getDate() + " " + myDate.getHours() + ":" + myDate.getMinutes() + '</span> ' + data['content'] + '</li>');
                $(".immMessage .MessageBox ul").append('<li> ' + data['content'] + '</li>');


                //下面消息提示
                $(".infoview").html('<div style="width:90%; float:left;padding-left:5%;"><i class="fa fa-lightbulb-o circle"></i>  最新消息: ' + data['content'] + '</div><div style="width:10%; float:right;"><i class="fa fa-close fr"></i></div>').show().removeClass("animated flash").addClass("animated flash");
                $(".noticeTips .immMessage .tip").html(parseInt($(".noticeTips .immMessage .tip").html()) + 1).addClass("animated").show();

                $(".infoview .fr").bind("click", function () {
                    $(".infoview").hide();
                });
            }
        }

    };

};