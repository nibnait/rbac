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
        

      
       


     $('button[type=button]').click(function () {
       
        window.location.href="activateAccount.html";
        
    })


     $('.contactsInfo').click(function () {
       
        window.location.href="contactsInfo.html";
        
        
    })


     $('.vacate').click(function () {
       
        window.location.href="vacate.html";
        
        
    })

     $('.approve').click(function () {
       
        window.location.href="approve.html";
        
        
    })


})