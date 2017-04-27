define("common:widget/ui/dropdownlist/dropdownlist",function(t,s,e){var i=t("common:widget/ui/base/base"),n=function(t){var s={themeIdPrefix:"dropdownThemeFor",themeId:"dropdownThemeFor#{id}",listId:"dropdownOptionsFor#{id}",classDropdownlsit:"mod-dropdownlist",classFormitem:"dropdown-select",classInput:"dropdown-input",classIcon:"dropdown-icon",classOptions:"dropdown-options",classFocusLi:"dropdown-options-focus",classList:"dropdown-list",classCustomScrollbar:"custom-scroll-bar",classCustomBox:"dropdown-custombox",attrOptionValue:"data-value",attrStylesCols:"data-cols",attrStylesWidth:"data-width"},e=[],i=function(){for(;;){var t=((new Date).getTime()+"Select"+Math.floor(1e5*Math.random())).toString();if(!e[t])return e[t]=!0,t}},n=function(t,s){source=t;var e=Array.prototype.slice.call(arguments,1),i=Object.prototype.toString;return e.length?(e=1==e.length&&null!==s&&/\[object Array\]|\[object Object\]/.test(i.call(s))?s:e,source.replace(/#\{(.+?)\}/g,function(t,s){var n=e[s];return"[object Function]"==i.call(n)&&(n=n(s)),"undefined"==typeof n?"":n})):source},o=function(){};o.prototype={constructor:o,_addListItem:function(e){var i=this,n=t("<a></a>");n.attr(s.attrOptionValue,e.value),n.html(e.text),n.attr("href","javascript:;");var o=t("<li></li>");return n.click(function(){var e=t(this).attr(s.attrOptionValue);i.select.val(e),i.select.trigger("change"),i.hide().listEle.trigger("hide-list")}),o.append(n),i.listUL.append(o),i},_list:function(){var e=this;this.listId=n(s.listId,{id:this.select.attr("id")||i()}),this.listEle=t("<div></div>").attr("id",this.listId).addClass(s.classList).addClass(s.classCustomScrollbar).hide(),this.listUL=t("<ul></ul>").appendTo(this.listEle),this.listBox=t("<div></div>").appendTo(this.listEle).addClass(s.classCustomBox),this.configs.box&&this.listBox.append(this.configs.box);var o=function(s){t.contains(e.listEle[0],s.target)||e.hide()};this.listEle.bind("show-list",function(){t(document).bind("click",o)}),this.listEle.bind("hide-list",function(){t(document).unbind("click",o)});var a=this.select[0].options;t.each(a,function(t,s){e._addListItem(s)}),this.listUL.addClass(s.classOptions);var l=function(){t(window).unbind("resize",l),setTimeout(function(){var s=e.element.position();e.listEle.css({left:s.left-1,top:s.top+e.element[0].offsetHeight}),t(window).resize(l)},10)};t(window).resize(l),e.listEle.appendTo(e.dropdownEle)},_createFromSelect:function(){this.select=t(this.configs.select);var e=n(s.themeId,{id:this.select.attr("id")}),i=t("<a></a>").attr({id:e,href:"javascript:;","class":s.classFormitem}),o=t("<span></span>").attr({"class":s.classInput}),a=t("<span></span>").attr({"class":s.classIcon}),l=this.select.attr("class");this.select[0].selectedIndex>=0&&o.html("<nobr>"+this.select[0].options[this.select[0].selectedIndex].text+"</nobr>"),a.html("&#160"),i.append(o).append(a),l&&t.each(l.split(/\s+/),function(t,s){i.addClass(s)}),this.select.hide(),this.dropdownEle=t("<div></div>").append(i).insertAfter(this.select).addClass(s.classDropdownlsit).addClass(this.configs.className||"");var r=this.select.attr(s.attrStylesWidth)||"";if(r){var c=parseInt(o.css("padding-left"),10)||0,d=parseInt(o.css("padding-right"),10)||0,h=a[0].offsetWidth||t(a).width()+1;o.css("width",parseInt(r,10)-c-d-h-3)}o.parent().click(function(s){1==t(this).attr("data-showwing")?(t(this).attr("data-showwing",0),p.hide()):(t(this).attr("data-showwing",1),p.show()),s.preventDefault(),s.stopPropagation()});var p=this;return this.select.change(function(){p.select[0].selectedIndex>=0&&o.html("<nobr>"+p.select[0].options[p.select[0].selectedIndex].text+"</nobr>")}),this.input=o,this.icon=a,this.element=o.parent(),this._list(),i},_init:function(e){this.configs=t.extend({container:"body"},e||{});var o,a={};if(a.id=this.configs.attrs.id||i(),a["data-cols"]=this.configs.attrs.column||8,this.configs.attrs.width&&(a["data-width"]=this.configs.attrs.width),this.configs.options){this.configs.attrs.id&&(a.id=this.configs.attrs.id),a["data-cols"]=this.configs.attrs.column||8,this.configs.attrs.width&&(a["data-width"]=this.configs.attrs.width),o=t("<select></select>").attr(a).hide().appendTo(t(this.configs.container));var l,r;t.each(this.configs.options,function(t,s){r=new Option(s[0]||s,s[1]||s[0]||s),s[2]&&(r.selected=!0,r.setAttribute("selected","selected"),l=t),o[0].options.add(r)}),this.configs.select=o}else if(o=this.configs.select.attr(a).hide(),!o.is("select"))return;return t("#"+n(s.themeId,{id:o[0].id})).remove(),this._createFromSelect(o).show(),this},val:function(t){if((t||"").length){this.select.val(t).trigger("change");var e=this.listUL.find('[data-value="'+t+'"]').parent();return e&&e.length&&(e.siblings("li").removeClass(s.classFocusLi).end().addClass(s.classFocusLi),e[0].parentNode.scrollTop=e[0].offsetTop),this}return this.select.val()},change:function(){return arguments.length?this.select.change.apply(this.select,arguments):(this.select.trigger("change"),this)},show:function(){var e=this;e.element.attr("data-showwing",1);var i=parseInt(e.configs.attrs.height,10)||30;t("li a",e.listUL).css({height:i+"px","line-height":i+"px"});var o=e.select.attr(s.attrStylesCols)||"10",a=t("li",e.listUL),l=i*Math.min(parseInt(o,10),a.length),r=t("#"+n(s.themeId,{id:e.select.attr("id")})),c=r.position(),d={position:"absolute",left:c.left,top:c.top+r[0].offsetHeight,width:r.width(),"z-index":(parseInt(e.select.parent().css("z-index"),10)||0)+10};e.listUL.css({height:l}),e.listEle.css(d).show().trigger("show-list");var h;return t.each(a,function(i,n){return e.select.val()==t("a",n).attr(s.attrOptionValue)?(h=n,!1):void 0}),h&&setTimeout(function(){t(h).siblings("li").removeClass(s.classFocusLi).end().addClass(s.classFocusLi),h.parentNode.scrollTop=h.offsetTop},10),e},hide:function(){return this.element.attr("data-showwing",0),this.listEle.hide().trigger("hide-list"),this},add:function(t){var s=new Option(t.text,t.value);return this.select[0].options.add(s),this._addListItem(s),this}};var a=function(t){return(new o)._init(t)};return{create:a}}(i);e.exports=n});