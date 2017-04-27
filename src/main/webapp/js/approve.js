$(function(){
	var userId = localStorage.getItem("userId");
	    console.log(userId);
	    
	        $.ajax({
	            type:'GET',
	            url:'/api/user',
	            dataType:'json',
	            data:{userId:userId},
	            success:function (result) {

	                if(result.status ==0){

	                console.log(result);
	                var name = result.data.name;
	                $('.page-header').find('span').eq(0).html(name);
	                }
	                else
	                {
	                    alert('获取失败');
	                }
	            },
	            err:function () {
	                console.log('获取失败');
	            }
	        });

			$.ajax({
				type:'GET',
				url:'/api/vacate/allApproval',
				dataType:'json',
				data:{'userId':userId},
				success:function (result) {
					if(result.status ==0){
						var length = result.data.length;
						var info = result.data;
						var html ='';
						for(var i =0;i<length;i++){
							html+=
                        '<tr>'+
                            '<th>'+info[i].name+'</th>'+
                            '<th>'+info[i].buName+'</th>'+
                            '<th>'+info[i].workNo+'</th>'+
                            '<th>'+info[i].type+'</th>'+
                            '<th>'+info[i].beginDate+'</th>'+
                            '<th>'+info[i].days+'</th>'+
                            '<th>'+info[i].phoneNum+'</th>'+
                            '<th>'+info[i].descrition+'</th>'+
                            '<th>'+
									'<button type="button" class="btn btn-info btn-xs">'+'同意</button>' +
							'</th>'+
							'<th>'+
									'<button type="button" class="btn btn-info btn-xs">'+'反驳</button>'+
							'</th>'+
						'</tr>';

						}
						$('table').append(html);
					}
                },
				err:function () {
					alert('获取失败');
                }
			})
	        
})