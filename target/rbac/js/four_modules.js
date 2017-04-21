/**
 * Created by wufangbing on 17/4/21.
 */
$(function () {




    $('button[type=button]').click(function () {
        var userId = localStorage.getItem("userId");
        $.ajax({
            type:'GET',
            url:'/api/user',
            dataType:'json',
            data:{userId:userId},
            success:function (result) {
                console.log(result);
            },
            err:function () {
                console.log('error');
            }
        })
        console.log(userId);

        window.location.href="./activateAccount.html";
    })


})