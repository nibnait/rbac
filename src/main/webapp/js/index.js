

	$(function(){


    		$('.ul_style li').each(function() {
    			$(this).mouseover(function(){
    				$('.ul_style li').removeAttr('class','border_top');
    				$(this).addClass('border_top');
    			});

    		});

    		$('.ul_style li').mouseout(function(){
    			$('.ul_style li').removeAttr('class','border_top');
    		})


    		var timer=null;
    		var i=1;

    		function move(){

    			if(i>3){
    				i=0;
    				$('ol').css({left:0});
    				}

    				$('ol').animate({left:-i*1008+'px'},'linear');

    				$('.shuffling ul li').removeClass();

    				$('.shuffling ul li').eq(i).attr('class','color');

    				i++;

    		}


    		timer=setInterval(move,2000);

    		$('ol li').each(function(item){        //滑过图片停止

                $(this).mouseover(function()
                {

                    clearInterval(timer);


                })

            })

            $('ol li').each(function(jtem){        //远离图片继续

                $(this).mouseout(function()
                {
                    timer=setInterval(move,2000);

                })

            })


            $('.shuffling ul li').each(function(index){
            	$(this).mouseover(function(){
            		clearInterval(timer);
            		$('.shuffling ul li').removeClass();
            		$(this).attr('class','color');
            		$('ol').animate({left:-index*1008+'px'},'linear');
            		i=index;
            	})
            });


            $('.shuffling ul li').each(function(){

            	 $(this).mouseout(function(){
            	 	timer=setInterval(move,2000);
            	 })

            })

           $('.login_register div').eq(1).hover(
           		function(){$(this).css({background:'rgba(255,0,0,0.7)'})},
           		function(){$(this).css({background:'rgba(255,0,0,0.5)'})}

           	)



           $('.login_register div').eq(1).click(function(){

			 $('#show_dailog1').dialog({
			                    title:'xx公司',
			                    width:'420px',
			                    height:'409px',

			                })
           })


        $('.list_product table span:eq(0)').hover(

            function(){$('#show1').removeClass()},
            function(){$('#show1').attr('class','showDiv')}

        )


        $('.list_product table span:eq(1)').hover(

            function(){$('#show2').removeClass()},
            function(){$('#show2').attr('class','showDiv')}

        )


        $('.list_product table span:eq(2)').hover(

            function(){$('#show3').removeClass()},
            function(){$('#show3').attr('class','showDiv')}

        )



        var allkey='';
            //验证码初次显示
                $.ajax({
                  type:'GET',
                  url:'/api/login/getCaptcha',
                  dataType:'json'
                })
                    .done(function (result) {

                        $('#refresh1').attr("src",result.data.captchaData);

                        console.log(result);

                        console.log(result.data.codeKey);

                        allkey = result.data.codeKey;
                        console.log(allkey);
                    })






           //验证码刷新
           $('#refresh1').click(function(){

               $.ajax({
                   type:'GET',
                   url:'/api/login/getCaptcha',
                   dataType:'json'
               })
                   .done(function (result) {
                       allkey = result.data.codeKey;
                       $('#refresh1').attr("src",result.data.captchaData);
                       console.log(allkey);
                   })


           })


       // 用户登录
         $('#login').click(function(){



           if($('#placeholder1').find('input').eq(0).val()!=allkey) {
               alert('验证码输入错误');
           }
           else {
               $.ajax({
                   type: 'GET',
                   url: '/api/login',
                   dataType: 'json',
                   data: {
                       logName: $('#show_dailog1 input').eq(0).val(),
                       password: $('#show_dailog1 input').eq(1).val(),
                       code: $('#placeholder1').find('input').eq(0).val()
                   },

                   success: function (result) {
                       if (result.status == 0) {
                           console.log(result);
                           localStorage.setItem("userId", result.data.userId);
                           console.log('登录成功');
                           console.log(localStorage.getItem("userId"));
                           window.location.href='four_modules.html';

                       }
                       else {
                           console.log('登录失败');
                       }
                   },
                   err: function () {
                       console.log('登录失败');
                   }
               })

           }

        })





         






    	})//over



