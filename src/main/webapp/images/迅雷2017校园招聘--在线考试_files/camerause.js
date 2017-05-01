/// <reference path="jquery-1.11.1.min.js" />

function userBrowser() {
    var browserName = navigator.userAgent.toLowerCase();
    if (/msie/i.test(browserName) && !/opera/.test(browserName)) {
        return "IE";
    } else if (/firefox/i.test(browserName)) {
        return "Firefox";
    } else if (/chrome/i.test(browserName) && /webkit/i.test(browserName) && /mozilla/i.test(browserName)) {
        return "Chrome";
    } else if (/opera/i.test(browserName)) {
        return "Opera";
    } else if (/webkit/i.test(browserName) && !(/chrome/i.test(browserName) && /webkit/i.test(browserName) && /mozilla/i.test(browserName))) {
        return "Safari";
    } else {
        if (browserName.indexOf(".net clr") > -1) {
            return "IE";
        } else {
            return browserName;
        }
    }
    
    
}

function BrowserVersion(){
		var Sys = {};
		var ua = navigator.userAgent.toLowerCase();
		var s;
		(s = ua.match(/chrome\/([\d.]+)/)) ? Sys.chrome = s[1] : 0;

		//以下进行测试
		if (Sys.chrome) { Sys.chrome = Sys.chrome.substring(0, Sys.chrome.indexOf(".")); return Sys.chrome; }else{
			return 0;	
		}
}
