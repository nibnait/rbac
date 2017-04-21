/// <reference path="jquery-1.11.1.min.js" />

var uid = $("#uid").val();
var comid = $("#comid").val();

$(document).ready(function () {

    //在线聊天-加载
    $(".onlineRefer .MessageBox .InfoBox  ul").html("");
    var url = "http://capture.acmcoder.com/exam/getlatestuserquestion.php?comid=" + comid + "&userid=" + uid;

    $.ajax({
        type: "get",
        url: url,
        dataType: "jsonp",
        jsonp: "callback",//传递给请求处理程序或页面的，用以获得jsonp回调函数名的参数名(默认为:callback)
        async: false,
        success: function (json) {
            var chatv = eval(json);
            if (chatv.success) {
                var chats = chatv.content;
                var chattype = getchattype(chatv.type);
                for (var i = 0; i < chats.length; i++) {
                    var chat = chats[i];
                    var userid = chat.userid;
                    var cc = chat.content;
                    get_chat2(userid, htmlEncode(cc), chattype);
                }


            }
        },
        error: function () {
        }
    });
});

function sendQuestion() {
    if ($(".messtype").find("span").html().indexOf("请选择") > -1) {
        $(".modal-dialog").attr("style", "");
        $(".modal-dialog .modal-body").attr("style", "");
        $(".modal-dialog .modal-footer").attr("style", "");
        $(".modal-dialog .modal-content").attr("style", "");
        cxalert('提示',"请先选择问题类型！");
    } else {
        if ($("#inputviewBox").val() == "") {
            cxalert('提示', "请输入要提问的内容！");
        } else {
            var type = $(".messtype").find("span").attr("id");
            get_chat(uid, htmlEncode($("#inputviewBox").val()), getchattype(type));

            var url = "http://capture.acmcoder.com/exam/askquestion.php";
            $.ajax({
                type: "post",
                url: url,
                dataType: "jsonp",
                data: { userid: uid, comid: comid, questiontype: type, questioncontent: $("#inputviewBox").val() },
                jsonp: "callback",//传递给请求处理程序或页面的，用以获得jsonp回调函数名的参数名(默认为:callback)
                async: false,
                success: function (json) {
                    // cxalert('提示','success');
                    var content = jQuery.parseJSON(json);

                    if (content.success == "true") {
                        if (content.message != '') {
                            var showmess = "";
                            if (content.message.indexOf("0") > -1) {
                                showmess = '同学您好，欢迎在这里与我们交流。您的提问已经收到，正排队处理中，为节省您的宝贵时间，建议您先查看<a href="javascript:void(0)" onclick="showqa(' + type + ')" style="color:#fff;">常见问题回答</a>！';
                            } else if (content.message.indexOf("1") > -1) {
                                showmess = '报告同学，提问已收到，建议您先查看<a href="javascript:void(0)" onclick="showqa(' + type + ')" style="color:#fff;">常见问题回答</a>。特殊问题我们会尽快回复您！';
                            } else {
                                showmess = htmlEncode(content.message);
                            }
                            get_chat("", showmess, getchattype(type));
                            $(".onlineRefer .clickarea .tip").html(parseInt($(".noticeTips .onlineRefer .tip").html()) + 1).addClass("animated").show();
                        }
                    } else {
                        console.log(content.message);
                    };
                    $(".onlineRefer .MessageBox .InfoBox").scrollTop($('.onlineRefer .MessageBox .InfoBox')[0].scrollHeight);
                    $(".onlineRefer #inputviewBox").val("");
                },
                error: function (data) {
                    //cxalert('提示','fail');
                }
            });
        }
        
    }

   
}

function htmlDecode(str) {
    var s = "";
    if (str.length == 0) return "";
    s = str.replace(/&amp;/g, "&");
    s = s.replace(/&lt;/g, "<");
    s = s.replace(/&gt;/g, ">");
    s = s.replace(/&nbsp;/g, " ");
    s = s.replace(/&#39;/g, "\'");
    s = s.replace(/&quot;/g, "\"");
    return s;
}

function htmlEncode(str)   
{   
  var s = "";   
  if (str.length == 0) return "";   
  s = str.replace(/&/g, "&amp;");
  s = s.replace(/</g, "&lt;");   
  s = s.replace(/>/g, "&gt;");   
  s = s.replace(/ /g, "&nbsp;");   
  s = s.replace(/\'/g, "&#39;");   
  s = s.replace(/\"/g, "&quot;");   
  s = s.replace(/\n/g, "<br>");   
  return s;
}

function getchattype(obj) {
    //if (parseInt(obj) == 1) { return "系统报错/技术问题"; }
    //else if (parseInt(obj) == 2) { return "试题相关问题"; }
    //else if (parseInt(obj) == 3) { return "编程题相关问题"; }
    //else if (parseInt(obj) == 4) { return "系统使用问题"; }
    //else if (parseInt(obj) == 5) { return "系统登录问题"; }
    //else if (parseInt(obj) == 6) { return "考试结果/后期面试"; }
    //else if (parseInt(obj) == 7) { return "其他问题"; }
    //else return "";
    return "";
}

window.show_chat = function (data){
    var ct = eval(data);
    get_chat("", ct.content, getchattype(parseInt(ct.questiontype)));
    $(".onlineRefer .MessageBox .InfoBox").scrollTop($('.onlineRefer .MessageBox .InfoBox')[0].scrollHeight);
    $(".onlineRefer .clickarea .tip").html(parseInt($(".noticeTips .onlineRefer .tip").html()) + 1).addClass("animated").show();
};


function get_chat(userid, cc, chattype) {
    
    var showhtml = '';
    if (userid == uid) {
        showhtml = '<li class="emp"><i class="dialogueT"></i><span>我：</span>' + cc + '</li>';
    } else {
        showhtml = '<li class="itv"><i class="dialogueT"></i><span>管理员：</span>' + cc + '</li>';
    }
    $(".onlineRefer .MessageBox .InfoBox  ul").append(showhtml);
};



function get_chat2(userid, cc, chattype) {

    var showhtml = '';
    if (userid == uid) {
        showhtml = '<li class="emp"><i class="dialogueT"></i><span>我：</span>' + cc + '</li>';
    } else {
        showhtml = '<li class="itv"><i class="dialogueT"></i><span>管理员：</span>' + cc + '</li>';
    }
    $(".onlineRefer .MessageBox .InfoBox  ul").append(showhtml);
};
