// $(function(){
// 	var i=0;
// 	var ip='http://192.168.1.4:8080/';
// 	$('.down_up').click(function(){
//
// 		if(i==0)
// 			{
// 				$('.down_up span').eq(0).addClass('show_hidden');
// 				$('.down_up span').eq(1).removeClass('show_hidden');
// 				i=1;
// 				$('.add').css({display:'none'});
// 			}
//
// 		else{
// 				$('.down_up span').eq(1).addClass('show_hidden');
// 				$('.down_up span').eq(0).removeClass('show_hidden');
// 				$('.add').css({display:'block'});
// 				i=0;
// 			}
// 	})
//
//
//
//
// 	var judge=function(){
//
// 		$('.junge input').each(function(){
//
// 			if($('.junge input').eq(0).prop('checked'))
// 			{
// 				return '男';
//
// 			}
// 			if($('.junge input').eq(1).prop('checked'))
// 			{
// 				return '女';
//
// 			}
// 		})
//
// 	}
//
//
// 		var getjob=function(){
// 				var varity;
//
// 			$('.row:eq(6)').find('option').each(function(i){
// 				if($('.row:eq(6)').find('option').eq(i).prop('selected'))
// 						varity=i;
//
//
// 			})
//
// 			return varity;
//
// 		}
//
//
// 	$.ajax({
// 		type:'POST',
// 		url:ip+'getProvince',
// 		dataType:'jsonp',
// 		success:function(detail){
// 				if(detail.data){
//
//
//
// 					for(var i=0;i<detail.data.length;i++)
// 					{
// 						var op=$('<option>'+detail.data[i].name+'</option>');
// 						op.attr('value',detail.data[i].code);
// 						op.appendTo($('.provice'));
//
//
// 						$('.provice').find('option').each(function(i){
//
// 							$(this).click(function(){
// 								findcounty('.provice');
// 							})
//
// 						})
//
//
// 					}
//
// 					//
// 					// alert(sign.attr('value'));
// 				}
//
// 		}
//
// 	})
//
//
//
//
// 	var findcounty=function(parent){
//
// 		var sign=$(parent).find('option:selected');
// 		var codeValue = sign.attr('value');
//
// 		$.ajax({
//
// 		type:'POST',
// 		url:ip+'getCity',
// 		dataType:'jsonp',
// 		data:{code:codeValue,jsonp:'callback'},
// 		success:function(change){
//
// 				if(change.data){
//
//
// 				for(var i=0;i<change.data.length;i++)
// 				{
// 					var op=$('<option>'+change.data[i].name+'</option>');
// 					op.attr('value',change.data[i].code);
// 					op.appendTo($('.county'));
//
// 				}
//
// 			}
//
// 			//alert(change.data.length)
//
// 		}
//
// 	})
//
//
// }
//
//
//
//
//
// 	$('input[type=button]').click(function(){
// 		$.ajax({
// 			type:'POST',
// 			url:ip+'user/activateAccount',
// 			dataType:'jsonp',
// 			data:{
// 				userId:'',
// 				realname:$('.row:eq(2)').find('input').val(),
// 				idnum:$('.row:eq(3)').find('input').val(),
// 				sex:judge(),
// 				birthday:$('input[type=date]').val(),
// 				job:getjob(),
// 				addr:'',
// 				transpwd:$('.row:eq(9)').find('input').val(),
// 			},
//
// 			success:function(detail){
//
// 				alert('补全成功');
//
// 			}
//
// 		})
// 	})
//

//
// });
//


$(function(){
    var userId = localStorage.getItem("userId");
    console.log(userId);
    $.ajax({
        type:'GET',
        url:'./api/user',
        dataType:'json',
        data:{userId:userId},
        success:function (result) {
            console.log(result);
        }
    })
})
