//初始化所有信息
function initInfo(result){
    var name          = result.data.name;
    var roleName      = result.data.roleName;
    var logName       = result.data.logName;
    var workNo       = result.data.workNo;
    var email         = result.data.email;
    var address       = result.data.address;
    var birthday      = result.data.birthday;
    var sex           = result.data.sex;
    var buName        = result.data.buName;
    var idnum         = result.data.idnum;
    var phoneNum      = result.data.phoneNum;
    var registerTime  = result.data.registerTime;
    var image         = result.data.image;
    var password      = result.data.password;

    $('.name').val(name);
    $('.roleName').val(roleName);
    $('.logName').val(logName);
    $('.workNo').val(workNo);
    $('.email').val(email);
    $('.address').val(address);
    $('.birthday').val(birthday);
    $('.buName').val(buName);
    $('.idnum').val(idnum);
    $('.phoneNum').val(phoneNum);
    $('.registerTime').val(registerTime);
    $('.password').val(password);
    $('.image').attr({'src':image});
    //性别初始化
    if(sex =='男')
        $('input[type=radio]').eq(0).prop({'checked':'checked'});
    else if(sex =='女')
        $('input[type=radio]').eq(1).prop({'checked':'checked'});

}
    

    //初始化所有权限
    function initPermissionMap(result){
        // var image0         = result.data.permissionMap.image;
        // var name0          = result.data.permissionMap.name;
        // var logName0       = result.data.permissionMap.logName;
        // var email0         = result.data.permissionMap.email;
        // var sex0           = result.data.permissionMap.sex;
        // var birthday0      = result.data.permissionMap.birthday;
        // var address0       = result.data.permissionMap.address;
        // var idnum0         = result.data.permissionMap.idnum;
        // var workNo0        = result.data.permissionMap.workNo;
        // var roleName0      = result.data.permissionMap.roleName;
        // var buName0        = result.data.permissionMap.buName;
        // var phoneNum0      = result.data.permissionMap.phoneNum;
        // var registerTime0  = result.data.permissionMap.registerTime;
        // var password0      = result.data.permissionMap.password;



        // var arr0 =['image0','name0','0logName','email','sex','birthday','address','idnum','workNo', 'roleName','buName','phoneNum',
        //  'registerTime0','password'];

        var arr =['image','name','logName','email','sex','birthday','address','idnum','workNo', 'roleName','buName','phoneNum',
         'registerTime','password'];

        
        var arr1 =[1, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1];
        console.log(arr1);

            for(var i =0;i<arr1.length; i++)
               {
                    if(arr1[i] ==0)
                     $('.'+arr[i]).attr({'disabled':'disabled'});
                    
                }

        
    
    }

    //图片上传
    function inserImage(fileBase64,userId){
        $.ajax({
            type:'GET',
            url:'/api/user/uploadHeadImage',
            dataType:'json',
            data:{'userId':userId,
                   'fileBase64':fileBase64
               },
            success:function(result){
                if(result.status == 0)
                    alert('保存图片成功');
                else
                    alert('保存失败');
            },
            err:function(){
                alert('保存失败');
            }

        })
        console.log(fileBase64+'<br>'+userId);
    }


    //图片加载
    var fileBase64 ='';
     function imgChange(e) {
        console.info(e.target.files[0]);//图片文件
        var dom =$("input[id^='imgTest']")[0];
        console.info(dom.value);//这个是文件的路径 C:\fakepath\icon (5).png
        console.log(e.target.value);//这个也是文件的路径和上面的dom.value是一样的
        var reader = new FileReader();
        reader.onload = (function (file) {
            return function (e) {
              // console.info(this.result); //这个就是base64的数据了
               fileBase64 = this.result;
                var sss=$("#showImage");
                $("#showImage")[0].src=this.result;
            };
        })(e.target.files[0]);
        reader.readAsDataURL(e.target.files[0]);
       }
       

$(function(){

    var userId = localStorage.getItem("userId");
    console.log(userId);

    $.ajax({
        type:'GET',
        url:'./api/user',
        dataType:'json',
        data:{'userId':userId},
        success:function (result) {
            if(result.status ==0)
            {
                console.log(result);
                initInfo(result);
            }
            else
            {
                console.log('error');
            }
        },
        err:function(){
            console.log('error');
        }
    })


    initPermissionMap();
    //  $.ajax({
    //     type:'GET',
    //     url:'/api/user/checkPermission',
    //     dataType:'json',
    //     data:{userId:userId},
    //     success:function (result) {
    //         if(result)
    //         {
    //             console.log(result);
    //             initPermissionMap(result);
    //         }
    //         else
    //         {
    //             console.log('error');
    //         }
    //     },
    //     err:function(){
    //         console.log('error');
    //     }
    // })



    //上传图片
    $('.image').click(function(){

        inserImage(fileBase64,userId);
            
    })
      
     // 修改结束后提交信息
      $('.submiit').click(function(){
            var sex ='';
            $('input[type=radio]').each(function(index){
                if(index ==0)
                    sex ='男';
                else
                    sex = '女';
            }) 
            
            $.ajax({
                type:'GET',
                url:'/api/user/update',
                dataType:'json',
                data:{
                    'userId':'userId',
                    'image':fileBase64,
                    'name':$('.name').val(),
                    'logName':$('.logName').val(),
                    'email':$('.email').val(),
                    'sex':sex,
                    'birthday':$('.birthday').val(),
                    'address':$('.address').val(),
                    'idnum':$('.idnum').val(),
                    'workNo':$('.workNo').val(),
                    'roleName':$('.roleName').val(),
                    'buName':$('.buName').val(),
                    'phoneNum':$('.phoneNum').val(),
                    'registerTime':$('.registerTime').val(),
                    'password':$('.password').val()

                },
                success:function(result){
                    if(result.status ==0)
                        alert(result.msg);
                    else if(result.status ==-202)
                         alert(result.msg);
                     else
                        alert('修改失败');
                },
                err:function(){
                    console.log('error');
                }
            })


      })

 }) 

