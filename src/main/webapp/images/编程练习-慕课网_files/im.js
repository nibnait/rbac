define(function(require){function a(a){for(var c,h={},g=document.cookie.split(/ *; */),i=0;i<g.length;++i)c=g[i].split("="),h[decodeURIComponent(c[0])]=decodeURIComponent(c[1]);return a?h[a]:h}var c=require("jquery");require("socket.io"),c.chat={},c.chat={iosocket:null,unreadEvent:null,uid:0,port:80,ready:[],analyzeData:null,events:{},ie:navigator.userAgent.match(/(?:\b(MS)?IE\s+|\bTrident\/7\.0;.*\s+rv:)(\d+)/),init:function(){this.iosocket=this.ie&&this.ie[2]<10?io("http://im.mukewang.com",{enablesXDR:!0,upgrade:!1,transports:["polling"],path:"/message",reconnection:!0,reconnectionDelay:1e3,reconnectionDelayMax:5e3,timeout:6e5}):io("http://im.mukewang.com",{transports:["websocket"],path:"/message",reconnection:!0,reconnectionDelay:1e3,reconnectionDelayMax:5e3,timeout:6e5});var h=a(),g=(h.cninfo||"").split("-"),k=h.imooc_uuid,v=h.imooc_isnew;this.analyzeData={marking:g[1]||"",channel:g[0]||"",uuid:k||"",isnew:v||1,url:window.location.href,uid:OP_CONFIG.userInfo&&OP_CONFIG.userInfo.uid||0,isweb:1};for(var w in this.events)this.iosocket.on(w,this.events[w]);this.iosocket.on("connect",function(){var i,a,h=c.chat,g=h.ready||[],k=h.iosocket;for(i=0,a=g.length;a>i;i++)k.emit.apply(k,g[i])}),this.checkUnreads()},login:function(a){a.expand=this.analyzeData,this.iosocket.emit("login",a)},emit:function(a,c){this.ready?this.ready.push(arguments):this.iosocket.emit(a,c)},bandUnreads:function(a,c){a&&c&&(this.uid=a),this.events.unreads=c,this.iosocket&&this.iosocket.on("unreads",c)},checkUnreads:function(){this.analyzeData.uid=this.uid,this.emit("unreads",this.analyzeData),this.uid>0},bindEvent:function(a,c){this.iosocket?this.iosocket.on(a,c):this.events[a]=c},send:function(a,c){this.iosocket.emit(a,c)}},OP_CONFIG.userInfo&&OP_CONFIG.userInfo.uid&&(c.chat.bandUnreads(OP_CONFIG.userInfo.uid,function(a){a>0?(c(".msg_remind").show(),a>99?c("#msg_new").find(".msg-num").html("(99+)").show():c("#msg_new").find(".msg-num").html("("+a+")").show()):(c(".msg_remind").hide(),c("#msg_new").find(".msg-num").hide())}),c.chat.bindEvent("remind",function(a){if(console.log(a.unreads),a.unreads>0){var h=c(".msg_icon").html();if(""==h)c(".msg_icon").show().html("1");else if(99==parseInt(h))c(".msg_icon").show().html("99+");else{var g=parseInt(parseInt(h)+1);c(".msg_icon").show().html(g)}}else c(".msg_icon").html("").hide()}))});