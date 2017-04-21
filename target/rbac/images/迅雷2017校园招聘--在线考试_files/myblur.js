
var blurTime = null;
var detectTimer = null;
var nowactiveelement = null;
var recBlur = function () { }



var detectIframe = function () {
    var ifm = $('iframe').is(':focus');
    console.log('ifm: ' + ifm);
    if (ifm != true) {
        if (detectTimer) clearInterval(detectTimer);
        recBlur();
    }
}
window.onblur = myblur;
try {
    Object.defineProperty(window, "onblur", entno);
} catch (E) {
}

function myblur(e) {
    var bl = true;
    e = e || window.event;
    if (e) {
        var x = e.clientX;
        var y = e.clientY;
        var w = document.body.clientWidth;
        var h = document.body.clientHeight;
        //alert('鼠标x' + x + '鼠标y' + y + '屏幕w' + w + '屏幕h' + h);
        if (x >= 0 && x <= w && y >= 0 && y <= h) {
            bl = false;
        }
    }
    //判断是否为iframe聚焦 或 输入框聚焦
    if ($('iframe').is(':focus') || $(".cke_dialog_ui_input_textarea ").is(':focus')) {
        bl = false;

        if (detectTimer) clearInterval(detectTimer);
        detectTimer = setInterval(detectIframe, 3000);
    }

    if (examNotStart) { bl = false; }

    //if (document.activeElement.className.indexOf("ui-") > -1) {
    //    bl = false;
    //}

    //if (document.activeElement.className.indexOf("cke-") > -1) {
    //    bl = false;
    //}

    if (e.type == "focusout") {
        bl = false;
    }
    if (bl) {
        console.log('BLUR');
        if (blurTime) clearTimeout(blurTime);
        blurTime = setTimeout(recBlur, 3000);
    }
}

var entno = {
    get: function () {
        return {};
    },
    set: function ($v) {
        //alert('set');
    }
};