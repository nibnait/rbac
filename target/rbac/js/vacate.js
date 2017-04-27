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


	        
})