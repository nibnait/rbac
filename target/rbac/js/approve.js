function approval(vacateId,operate) {
	$.ajax({
		type:'GET',
		url:'/api/vacate/approval',
		dataType:'json',
		data:{
			'userId':userId,
			'operate':operate,
			'idea':'',
			'vacateId':vacateId
		},
		success:function (result) {
			if(result.status ==0){
				alert(result.msg);
			}
			else{
				alert(result.msg)
			}
        },
		err:function(){
			alert('请求失败');
		}
	})
}


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
                    alert('错误信息');
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
                            '<td>'+info[i].userName+'</td>'+
                            '<td>'+info[i].buName+'</td>'+
                            '<td>'+info[i].workNo+'</td>'+
                            '<td>'+info[i].type+'</td>'+
                            '<td>'+info[i].beginDate+'</td>'+
                            '<td>'+info[i].days+'</td>'+
                            '<td>'+info[i].phoneNum+'</td>'+
                            '<td>'+info[i].descrition+'</td>'+
                            '<td>'+info[i].status+'</td>'+
                            '<td>'+
                        		'<input type="radio" name='+info[i].vacateId+' onclick=approval('+info[i].vacateId+',1)>'+
							'</td>'+
							'<td>'+
                       			 '<input type="radio" name='+info[i].vacateId+' onclick=approval('+info[i].vacateId+',2)>'+
							'</td>'+
						'</tr>';

						}
						$('table').append(html);

						}
						else
							alert('获取失败');
					},
				err:function () {
						alert('错误信息');
                }

			})
	        
})