window.onload=function(){
/*显示验证码*/
	var img=document.createElement('img');
	var code_input=document.getElementById('code');

	$.ajax({
	url: '/api/login/getCaptcha',
	type: 'GET',
	dataType: 'json',
	})
	.done(function(result) {
		
		console.log(result.data);
		var img_box=document.getElementById('behind');
		
		img.src=result.data.captchaData;
		img.id='codeimg';
		img_box.appendChild(img);
		
		code_input.onchange=function(){
			if(code_input.value!=result.data.codeKey){
				alert('验证码输入错误');
				
			}
		}

		
		
	})

	/*看不清换一张*/
	img.onclick=function(){
		$.ajax({
			url: '/api/login/getCaptcha',
			type: 'GET',
			dataType: 'json',
		})
		.done(function(result) {
			img.src=result.data.captchaData;
		
			var code_input=document.getElementById('code');
			code_input.onchange=function(){
				if(code_input.value!==result.data.codeKey){
					alert('验证码输入错误');
				}
			}
		})
	}
	var user_in=document.getElementById('user_in');
	user_in.value='手机号码';
	user_in.onfocus=function(){
		if(user_in.value=='手机号码')
		user_in.value='';
	}
	user_in.onchange=function(){
		
	}
	
	var user_pwd=document.getElementById('user_pwd');
	user_pwd.onchange=function(){
		if(user_pwd.value.length<1){
			alert('密码长度需大于6位！');
		}
	}

	var lg_button=document.getElementById('lg_button');
	var usenm=document.getElementById('user_in');
	lg_button.onclick=function(){	
		if(usenm.value&&user_pwd.value){
			$.ajax({
				url: '/api/login',
				type: 'GET',
				dataType: 'jsonp',
				data: {
					logName: usenm.value,
					password:user_pwd.value,
					code:code_input.value,
					role:1,
                    jsonp:'callback'
				},
			})
			.done(function(str) {
				if(str.msg=='登录成功'){
					window.location.href='../index.html';
				}else{
					alert('登录失败，请重新登录');
				}
			})
			.fail(function() {
				console.log("error");
			})
			
		}else{
			alert('信息未填完整');
		}
	}		
}