define("common:widget/ui/historyRecord/historyRecord",function(t){function e(t){this.opts=i.extend({historyKey:"resultPageSugList",wd:"",sugList:[],limit:9},t||{})}var i=t("common:widget/ui/base/base"),s=t("common:widget/ui/base/events");return i.extend(e.prototype,s,{get:function(t){return this.opts[t]},set:function(t,e){return this.opts[t]=e},parseHistory:function(t){for(var e={},i=0,s=t.length;s>i;i++)e[t[i]]=i;return e},isInHistory:function(t,e){var i=!1;return e&&"undefined"!=typeof e[t]&&(i=!0),i},setRecord:function(t){var e=this.getRecord(),s=this.parseHistory(e),o=this.isInHistory(t,s);o&&e.splice(s[t],1),e.unshift(t);var r=this.opts.historyKey,n=this.opts.limit;i.cookie.set(r,i.json.stringify(e.slice(0,n)),{path:"/",expires:7776e3})},getRecord:function(){var t=i.cookie.get(this.opts.historyKey);return t?i.json.parse(t):[]},cleanRecord:function(){return i.cookie.set(this.opts.historyKey,i.json.stringify([]),{path:"/"}),!0}}),e});