$.ajax({
	url: '/api/login/getCaptcha',
	type: 'GET',
	dataType: 'json',
})
.done(function(result) {
	console.log("success");
	console.log(result.data);
	var img=document.getElementById('self_info_box');
	img.innerHTML='<img src="'+result.data.captchaData+'">';
})
.fail(function() {
	console.log("error");
})
.always(function() {
	console.log("complete");
});
