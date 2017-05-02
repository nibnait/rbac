/// <reference path="jquery-1.11.1.min.js" />

$(document).ready(function () {
    if (location.hash != '#/main/personalInfo' && location.hash != '#/main/myPhoto') {
        //selTab("");
        //如果是swf的话
        if (cameratype == "swf") {
            //
            //initLoadMyPhoto()
        } else {
            initLoadMyPhoto();
        }
    }


    //启动定时器
    var cameraT = window.setInterval("InitMyCamera()", 5000);

});
function InitMyCamera() {
        if($.cookie("hasCarema")){
            if($(".monitor").css("display")=="none"){
                if(location.hash != '#/main/myPhoto' && location.hash != '#/main/personalInfo'){
                    initLoadMyPhoto();
                }
            }
        }
    }

function initLoadMyPhoto() {

    $(".monitorLayout,.monitorBox .close").unbind("click").click(function () {
        closeMonitorDialog();
    });

    $("#freshphoto").unbind("click").bind("click", function () {
        if (!$(".monitorBox").hasClass("showInDialog")) { $(".monitorBox").addClass("showInDialog"); }
    });    
    
    $(".monitorBox").removeClass("heightLimited");
    
    //
    openMonitorDialog();

}

function closeMonitorDialog() {
    
    
    $(".monitorBox").removeClass("showInDialog");
    $(".monitorLayout").addClass("hide");

    if (top.cameratype == "h5") {
        $("#myphoto").attr("width", "65px").attr("height", "65px").attr("style", "");
        $(top.window.frames["myphoto"].document).find("#video").attr("width", "87").attr("height", "65").attr("style", "position: absolute;left: 0px;top: 0px;");

    } else {
        $("#myphoto").attr("width", "65px").attr("height", "65px").attr("style", "");
        $(top.window.frames["myphoto"].document).find("#ziliao embed").attr("width", "65").attr("height", "65");
    }
    

    $(".monitorBox .open").removeClass("hide");

    try {
        $("#myphoto")[0].contentWindow.againsnap();
    }
    catch (e) { }

    if (ACMGlobal.camera == false) {
        $(".monitor").hide();
    }

}

function openMonitorDialog() {
    $(".monitor").show();
    $(".monitorBox").addClass("showInDialog");
    $(".monitorLayout").removeClass("hide");

    $("#myphoto").attr("width", "332px").attr("height", "382px").attr("style", "");
    $(top.window.frames["myphoto"].document).find("#ziliao embed").attr("width", "332").attr("height", "332");
    $(top.window.frames["myphoto"].document).find("#video").attr("width", "440").attr("height", "332").attr("style", "");
    $(".monitorBox .open").addClass("hide");

    
    if (location.hash.indexOf("myPhoto") < 0) {
        if (!$(".monitorBox").hasClass("heightLimited")) { 
            $(".monitorBox").addClass("heightLimited");
        }
    }
}