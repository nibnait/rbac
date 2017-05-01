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
        var image0         = result.data.permissionMap.image;
        var name0          = result.data.permissionMap.name;
        var logName0       = result.data.permissionMap.logName;
        var email0         = result.data.permissionMap.email;
        var sex0           = result.data.permissionMap.sex;
        var birthday0      = result.data.permissionMap.birthday;
        var address0       = result.data.permissionMap.address;
        var idnum0         = result.data.permissionMap.idnum;
        var workNo0        = result.data.permissionMap.workNo;
        var roleName0      = result.data.permissionMap.roleName;
        var buName0        = result.data.permissionMap.buName;
        var phoneNum0      = result.data.permissionMap.phoneNum;
        var registerTime0  = result.data.permissionMap.registerTime;
        var password0      = result.data.permissionMap.password;



        var arr0 =[image0,name0,logName0,email0,sex0,birthday0,address0,idnum0,workNo0, roleName0,buName0,phoneNum0,
         registerTime0,password0];

        var arr =['image','name','logName','email','sex','birthday','address','idnum','workNo', 'roleName','buName','phoneNum',
         'registerTime','password'];


            for(var i =0;i<arr0.length; i++)
               {
                    if(arr0[i] ==0)
                    {
                        $('.'+arr[i]).attr({'disabled':'disabled'});
                        $('.'+arr[i]).css({'background':'#DDDDDD'});
                    }


                    
                }

        
    
    }

    //图片上传
    var imgSrc='';
    function inserImage(fileBase64,userId){
        $.ajax({
            type:'POST',
            url:'/api/user/uploadHeadImage',
            dataType:'json',
            data:{'userId':userId,
                   'fileBase64':fileBase64
               },
            success:function(result){
                if(result.status == 0){
                    imgSrc = result.data.url;
                    alert('保存图片成功');
                }

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

    function run(input_file,get_data){
        /*input_file：文件按钮对象*/
        /*get_data: 转换成功后执行的方法*/
        if ( typeof(FileReader) === 'undefined' ){
            alert("抱歉，你的浏览器不支持 FileReader，不能将图片转换为Base64，请使用现代浏览器操作！");
        } else {
            try{
                /*图片转Base64 核心代码*/
                var file = input_file.files[0];
                //这里我们判断下类型如果不是图片就返回 去掉就可以上传任意文件
                if(!/image\/\w+/.test(file.type)){
                    alert("请确保文件为图像类型");
                    return false;
                }
                var reader = new FileReader();
                reader.onload = function(){
                    get_data(this.result);
                }
                reader.readAsDataURL(file);
            }catch (e){
                alert('图片转Base64出错啦！'+ e.toString())
            }
        }
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


     $.ajax({
        type:'GET',
        url:'/api/user/checkPermission',
        dataType:'json',
        data:{userId:userId},
        success:function (result) {
            if(result)
            {
                console.log(result);
                initPermissionMap(result);
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


    var fileBase64 ='';
    $("input[type=file]").change(function () {
        run(this, function (data) {
            $('img').attr('src',data);
            fileBase64 =data.substr(data.indexOf('base64,')+7);
            console.log(fileBase64);
        });
    });

    //上传图片
    $('.image').click(function(){

        inserImage(fileBase64,userId);

    })
      
     // 修改结束后提交信息
      $('.submit').click(function(){
            var sex ='';
            $('input[type=radio]').each(function(index){
                if(index ==0)
                    sex ='男';
                else
                    sex = '女';
            });
            
            $.ajax({
                type:'GET',
                url:'/api/user/updateInfo',
                dataType:'json',
                data:{
                    'userId':userId,
                    'image':imgSrc,
                    'name':$('.name').val(),
                    'sex':sex,
                    'birthday':$('.birthday').val(),
                    'address':$('.address').val(),
                    'idnum':$('.idnum').val(),
                    'roleName':$('.roleName').val(),
                    'buName':$('.buName').val(),
                    'phoneNum':$('.phoneNum').val(),
                    'password':$('.password').val()

                },
                success:function(result){
                    if(result.status ==0)
                    {
                        alert(result.msg);
                        window.location.href='four_modules.html';

                    }

                     else
                        alert('修改失败');
                },
                err:function(){
                    alert('修改失败');
                }
            })


      })

 }) 

