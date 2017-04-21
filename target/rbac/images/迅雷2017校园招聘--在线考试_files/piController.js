/**
 * Created by lifubang on 2015/6/24.
 */
$(".nav .examlist").hide();
app.register('piController', ['$scope', '$http', '$state', '$location', '$timeout', 'App',
    function ($scope, $http, $state, $location, $timeout, App) {
        //$scope.model = $.parseJSON('<%-Object.toJSON(user)%>');
        selTab('personalInfo');
        $scope.App = App;

        var refreshFuncs = function() {
            $http.post('/cand/MyInfo', {r: Math.random()}).success(function (data) {
                $scope.model = data;

                $("#faceRecognition").val(data.faceRecognition);
                ACMGlobal.faceRecognition = data.faceRecognition;
                if ($.cookie('faceRecognitionLimited') == null && ACMGlobal.faceRecognition) {
                    $.cookie('faceRecognitionLimited', '1');
                }
                ACMGlobal.idcard = data.idcard;
                if (data.idcard != null && data.idcard != "") {
                    ACMGlobal.idcard = data.idcard.replace("'", "");
                }
                ACMGlobal.realName = data.realName;
                ACMGlobal.candId = data._id;
                //修改次数
                //if ($.cookie('faceRecognitionLimited') != null && ACMGlobal.faceRecognition) {
                //    if (parseInt($.cookie('faceRecognitionLimited')) <= 0) {
                //        $(".toolguider .edit").hide();
                //    }
                //}
            }).error(function (data) {
                console.log('Error: ' + data);
            });
        };
        $scope.refreshFuncs = refreshFuncs;
        refreshFuncs();

        if(isMobile){
            $timeout(function () {
                $(".toolguider .next").attr("onclick", "javascript: gotoHash('#/main/rules');return false;");
            });
        }
        


        $scope.save = function () {

            //验证
            $(".modal-dialog").attr("style", "");
            $(".modal-dialog .modal-body").attr("style", "");
            $(".modal-dialog .modal-footer").attr("style", "");
            $(".modal-dialog .modal-content").attr("style", "");
            var inputemail = $("#email").val(); if (inputemail == "") { cxalert('提示',"请填写Email"); return false;}
            var inputmobile = $("#mobile").val(); if (inputmobile == "") { cxalert('提示',"请填写手机号"); return false; }
            var realName = $("#realName").val();
            if (realName == "") { cxalert('提示', "请填写姓名"); return false; }            
            if (!isEng(realName)) { if (realName.length > 6) { cxalert('提示', "您的名字太长啦！请填写简称！"); return false; } }

            if (ACMGlobal.faceRecognition) {
                var idcard = $("#idcard").val(); if (idcard == "") { cxalert('提示', "请填写身份证"); return false; }
                idcard = idcard.replace("'", "");
                if (!isCardNo(idcard)) {
                    cxalert('提示', '身份证号码格式不正确！'); return false;
                }
            }

            //var university = $("#university").val(); if (university == "") { cxalert('提示',"请填写学校"); return false; }
            //var major = $("#major").val(); if (major == "") { cxalert('提示',"请填写专业"); return false; }
            //var degree = $("#degree").val(); if (degree == "") { cxalert('提示',"请选择学历"); return false; }
            var GraduateDate = $("#GraduateDate").val(); //if (GraduateDate == "") { cxalert('提示',"请填写毕业时间"); return false; }
            //var city = $("#city").val(); if (city == "") { cxalert('提示',"请填写目前所在城市"); return false; }
            $scope.model.GraduateDate = GraduateDate;

            var emailReg = /^[_\.a-zA-Z0-9-]+@([_a-zA-Z0-9-]+\.)+[a-zA-Z0-9]{2,3}$/;
            if (emailReg.test(inputemail) == false) {
                cxalert('提示',"邮箱格式不正确"); return false;
            }
            var mobieReg = /^0?1[0-9][0-9]\d{8}$/;
            if (mobieReg.test(inputmobile) == false) {
                cxalert('提示',"请填写11位手机号"); return false;
            }

            var alertHtml = ''
            if (parseInt($.cookie('faceRecognitionLimited')) <= 0) {
                alertHtml = '<div class="showtip"><table align="center"><tbody><tr><td><i class="fa fa-exclamation-circle"></i></td><td><span class="fbig fb"></span>如果身份证号码填写有误，会影响作答成绩 <br> 你确认提交吗？</td></tr></tbody></table></div>';
            } else {
                alertHtml = '<div class="showtip"><table align="center"><tbody><tr><td><i class="fa fa-exclamation-circle"></i></td><td><span class="fbig fb"></span>身份证号提交后不能再修改，如果身份证号码填写有误，会影响作答成绩 <br> 你确认提交吗？</td></tr></tbody></table></div>';
            }

            if (ACMGlobal.faceRecognition) {
                $.cxDialog.defaults.background = '#000';
                $.cxDialog({
                    title: '提示',
                    info: alertHtml,
                    ok: function () {

                        $http.post('/cand/api/EditPersonalInfo', $scope.model).success(function (data) {
                            App.checkData(data, $state);
                            if (data == '1') {
                                App.refreshMyInfo($http);
                                //gotoHash('#/main/myPhoto');
                                $(".stepform").find(".form-group input").each(function () {
                                    $(this).attr("disabled", "disabled");
                                });
                                $(".stepform").find(".form-group select").each(function () {
                                    $(this).attr("disabled", "disabled");
                                });
                                $(".toolguider button.edit").hide();
                                $(".toolguider .next").show();
                                $(".toolguider .cancel").hide();

                                if ($.cookie('faceRecognitionLimited') != null && ACMGlobal.faceRecognition) {
                                    $.cookie('faceRecognitionLimited', parseInt($.cookie('faceRecognitionLimited')) - 1);
                                    //$(".toolguider .edit").hide();
                                } else {
                                    $(".toolguider .edit").show();
                                }
                                $(".toolguider .edit").show();
                                $(".toolguider .editComplete").hide();

                            } else {
                                cxalert('提示', '修改失败，请稍后再试！');
                            }
                        }).error(function (data) {
                            console.log('Error: ' + data);
                        });

                    },
                    okText: '我知道了'
                });
            } else {
                $http.post('/cand/api/EditPersonalInfo', $scope.model).success(function (data) {
                    App.checkData(data, $state);
                    if (data == '1') {
                        $.cxDialog.defaults.background = '#000';
                        $.cxDialog({
                            title: '提示',
                            info: '<div class="showtip"><table align="center"><tbody><tr><td><i class="fa fa-exclamation-circle"></i></td><td><span class="fbig fb"></span>修改成功！</td></tr></tbody></table></div>',

                            ok: function () {
                                App.refreshMyInfo($http);
                                //gotoHash('#/main/myPhoto');
                                $(".stepform").find(".form-group input").each(function () {
                                    $(this).attr("disabled", "disabled");
                                });
                                $(".stepform").find(".form-group select").each(function () {
                                    $(this).attr("disabled", "disabled");
                                });
                                $(".toolguider a.edit").show();
                                $(".toolguider button.edit").hide();
                                $(".toolguider .next").show();
                                $(".toolguider .cancel").hide();
                                
                            },
                            okText: '我知道了'
                        });


                    } else {
                        cxalert('提示', '修改失败，请稍后再试！');
                    }
                }).error(function (data) {
                    console.log('Error: ' + data);
                });
            }
           

           
        }
    }
]);

//判断字母(英文)   
function isEng(param) {
    var regExp = /[^A-Za-z]/;
    if (regExp.test(param))
        return false;
    return true;
}