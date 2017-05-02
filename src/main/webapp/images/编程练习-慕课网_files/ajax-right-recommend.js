define(function(require,exports){

    var getlength = function (str) {
        var realLength = 0, len = str.length, charCode = -1;
        for (var i = 0; i < len; i++) {
            charCode = str.charCodeAt(i);
            if (charCode >= 0 && charCode <= 128) realLength += 1;
            else realLength += 2;
        }
        return realLength;
    };


    function cutstr(str, len) {
        var str_length = 0;
        var str_len = 0;
        str_cut = new String();
        str_len = str.length;
        for (var i = 0; i < str_len; i++) {
            a = str.charAt(i);
            str_length++;
            if (escape(a).length > 4) {
                str_length++;
            }
            str_cut = str_cut.concat(a);
            if (str_length >= len) {
                str_cut = str_cut.concat("...");
                return str_cut;
            }
        }
        if (str_length < len) {
            return str;
        }
    }

	var bindData = function(data,type){
		if(type){
			var str=""
			for(var i=0;i<data.length;i++){
				str+='<li><a href="/article/'+data[i].id+'?block_id=tuijian_wz" target="_blank">'
				var title=data[i].title;

				if(data[i].pic!=""){
					// if (getlength(title) > 45) { 
	    //    				title=cutstr(title, 43); 
	    //    			}
	       			str+='<img src="http://img.mukewang.com/'+data[i].pic+'-40-40.jpg" width="40" height="40"><div>'+title+'</div>'
				}else{
					// if (getlength(title) > 58) { 
	    //    				title=cutstr(title, 56); 
	    //    			}
	       			str+=title
				}
				str+='</a></li>'
			}
			$(".js-right-article").show().find('ul').html(str)
		}else{
			var str=""
			for(var i=0;i<data.length;i++){
				var title=data[i].title
				// if (getlength(title) > 49) { 
    //    				title=cutstr(title, 47); 
    //    			}
				str+='<li><a href="/wenda/detail/'+data[i].id+'?block_id=tuijian_yw" target="_blank">'+title+'</a><i>'+data[i].answers+' 回答</i></li>'
			}
			$(".js-right-wenda").show().find('ul').html(str)
		}
	}
	var getData = function(){
		$.ajax({
			url:"/wenda/ajaxcourserecommends",
			dataType:"json",
			data:{
				id:course_id
			},
			success:function(data){
				if(data.result===0){
					if(data.data.length){
						bindData(data.data,0);
					}	
				}
			}
		})
		$.ajax({
			url:"/article/ajaxcourserecommends",
			dataType:"json",
			data:{
				id:course_id
			},
			success:function(data){
				if(data.result===0){
					if(data.data.length){
						bindData(data.data,1);
					}
				}
			}
		})
	}

	getData();
});
