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

			//提交请假申请
	        $('button').click(function () {

					$.ajax({
						type:'GET',
						url:'/api/vacate/apply',
						dataType:'json',
						data:{
							'userId'	:userId,
							'phoneNum'	:$('.phoneNum').val(),
								'type'	:$('.type').val(),
							'descrition':$('.descrition').val(),
							'beginDate'	:$('.beginDate').val(),
							'endDate'	:$('.endDate').val()
						},
						success:function (result) {
							if(result.status ==0)

							{
                                alert(result.msg);
                                location.reload();
							}
							else
								alert('请求失败');
                        }
					})

            })

			//获取我的请假审批信息
			$.ajax({
				type:'GET',
				url:'/api/vacate/myVacates',
				dataType:'json',
				data:{userId:userId},
				success:function (result) {
					if(result.status ==0){
						var html=''
						for(var i=0;i<result.data.length;i++){
							html+=
								'<tr class="text-center">'+
										'<td>'+result.data[i].userName+'</td>'+
										'<td>'+result.data[i].type+'</td>'+
										'<td>'+result.data[i].createAt+'</td>'+
										'<td>'+result.data[i].beginDate+'</td>'+
										'<td>'+result.data[i].endDate+'</td>'+
										'<td>'+result.data[i].days+'</td>'+
										'<td class="danger">'+result.data[i].status+'</td>'+
										'</tr>';
								}
							$('.manpower').append(html);
					}
					else{
						alert('获取失败');
					}
                },
				err:function () {
					alert('获取失败');
                }
			})




	        
})