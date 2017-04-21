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
	user_in.onblur=function(){
		
		if(!(/^1[34578]\d{9}$/.test(user_in.value))){ 
        			alert("手机号码有误，请重填");  
       			return false; 
   		}	
		
	}
	
	var user_pwd=document.getElementById('user_pwd');
	var user_rpwd=document.getElementById('user_rpwd');
	user_pwd.onblur=function(){
		if(user_pwd.value.length<6){
			alert('密码长度需大于6位！');
		}else{
			user_rpwd.onblur=function(){
			if(user_rpwd.value!=user_pwd.value)
				alert("两次输入密码不一致，请重新输入");
			}
		}
	}

	var lg_button=document.getElementById('lg_button');
	lg_button.onclick=function(){
		if(user_in.value&&user_pwd.value&&user_rpwd.value){
			
		$.ajax({
			url: '/api/regist',
			type: 'GET',
			dataType: 'jsonp',
			data: {
				userPhone: user_in.value,
				password:user_pwd.value,
				code:code_input.value,
				role:'1'},
		})
		.done(function() {
			window.location.href="../index.html";
		})
		.fail(function() {
			console.log("error");
		})
		.always(function() {
			console.log("complete");
		});
		}else{
			alert('信息未填完整');
		}
	}	
		
			
	/*增加验证码检测*/

}