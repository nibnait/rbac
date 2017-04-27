function lookInfo(workNo){
	window.location.href = 'activateAccount.html';
}



$(function(){

	$('.sale').find('button').click(function(){
	window.location.href = 'activateAccount.html';
	})
	
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
            url:'/api/user/getAllContact',
            dataType:'json',
            success:function (result) {

                if(result.status ==0){
                	var counts = result.data[0].userInfoList.length;
                	var allInfo1 = result.data[0].userInfoList;
                	var html1 =''
                	for(var i =0;i<counts;i++)
                	{
                			html+='<tr>'+
									'<td>'+allInfo1[i].buName+'</td>'+
									'<td>'+allInfo1[i].name+'</td>'+
									'<td>'+allInfo1[i].workNo+'</td>'+
									'<td>'+allInfo1[i].roleName+'</td>'+
									'<td>'+'<button type="button" class="btn btn-info btn-xs" onclick="lookInfo('+allInfo1[i].workNo+')">'+'详细信息</button></td>'+
								'</tr>';
                	}
					$('.manpower').append(html);

					var allInfo2 = result.data[0].userInfoList;
                	var html2 =''
                	for(var i =0;i<counts;i++)
                	{
                			html+='<tr>'+
									'<td>'+allInfo2[i].buName+'</td>'+
									'<td>'+allInfo2[i].name+'</td>'+
									'<td>'+allInfo2[i].workNo+'</td>'+
									'<td>'+allInfo2[i].roleName+'</td>'+
									'<td>'+'<button type="button" class="btn btn-info btn-xs" onclick="lookInfo('+allInfo2[i].workNo+')">'+'详细信息</button></td>'+
								'</tr>';
                	}
					$('.technology').append(html2);

					var allInfo3 = result.data[0].userInfoList;
                	var html3 =''
                	for(var i =0;i<counts;i++)
                	{
                			html+='<tr>'+
									'<td>'+allInfo3[i].buName+'</td>'+
									'<td>'+allInfo3[i].name+'</td>'+
									'<td>'+allInfo3[i].workNo+'</td>'+
									'<td>'+allInfo3[i].roleName+'</td>'+
									'<td>'+'<button type="button" class="btn btn-info btn-xs" onclick="lookInfo('+allInfo3[i].workNo+')">'+'详细信息</button></td>'+
								'</tr>';
                	}
					$('.operation').append(html3);

					var allInfo4 = result.data[0].userInfoList;
                	var html4 =''
                	for(var i =0;i<counts;i++)
                	{
                			html+='<tr>'+
									'<td>'+allInfo4[i].buName+'</td>'+
									'<td>'+allInfo4[i].name+'</td>'+
									'<td>'+allInfo4[i].workNo+'</td>'+
									'<td>'+allInfo4[i].roleName+'</td>'+
									'<td>'+'<button type="button" class="btn btn-info btn-xs" onclick="lookInfo('+allInfo4[i].workNo+')">'+'详细信息</button></td>'+
								'</tr>';
                	}
					$('.sale').append(html4);

                
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