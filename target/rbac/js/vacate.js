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
								alert(result.msg);
							else
								alert('请求失败');
                        }
					})

            })




	        
})