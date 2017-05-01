/**
 * Created by lifubang on 2015/6/24.
 */
var limitedThree = true;
var examNotStart = true;
var routeConfig = (function () {

    var $controllerProvider;

    function setControllerProvider(value) {
        $controllerProvider = value;
    }

    function register(n, c) {
        if (!$controllerProvider) {
            throw new Error("$controllerProvider is not set!");
        }
        $controllerProvider.register(n, c);
    }

    function config(url, templateUrl, controllerName, js) {
        if (!$controllerProvider) {
            throw new Error("$controllerProvider is not set!");
        }

        var defer,
            routeDefinition = {};

        routeDefinition.url = url;
        routeDefinition.templateUrl = templateUrl;
        routeDefinition.controller = controllerName;
        routeDefinition.resolve = {
            delay: function ($q, $rootScope) {
                defer = $q.defer();
                var dependencies = js;

                if (Array.isArray(dependencies)) {
                    for (var i = 0; i < dependencies.length; i++) {
                        //dependencies[i] = dependencies[i].replace(':plugin', $route.current.params.plugin);
                    }
                } else {
                    //dependencies = dependencies.replace(':plugin', $route.current.params.plugin);
                }
                $script(dependencies, function () {
                    defer.resolve();
                    $rootScope.$apply();
                });
                return defer.promise;
            }
        };
        return routeDefinition;
    }

    return {
        setControllerProvider: setControllerProvider,
        config: config,
        register: register
    }
})();

var app = angular.module('app', ['ngAnimate', 'ui.router',
    function ($controllerProvider) {
        routeConfig.setControllerProvider($controllerProvider);
    }
]);
if (Object.isNullString(cdn))
    cdn = '';
app.register = routeConfig.register;
app.config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider.state('login', routeConfig.config(
        '/login'
        , '/assets/plugin/login/index.html?v=' + 2
        , 'LoginController'
        , cdn + '/v3.0/assets/plugin/login/controller.js?v=' + 2
    )).state('main', routeConfig.config(
        '/main'
        , '/cand/main?v=' + 2
        , 'MainController'
        , cdn + '/v3.0/assets/plugin/main/controller.js?v=' + 9
    )).state('main.personalInfo', routeConfig.config(
        '/personalInfo'
        , '/cand/personalInfo?v=' + 2
        , 'piController'
        , cdn + '/v3.0/assets/plugin/personalInfo/piController.js?v=' + 1
    )).state('main.rules', routeConfig.config(
        '/rules'
        , '/cand/rules?v=' + 2
        , 'rulesController'
        , cdn + '/v3.0/assets/plugin/rules/rulesController.js?v=' + 1
    )).state('main.myPhoto', routeConfig.config(
        '/myPhoto'
        , '/cand/myPhoto?v=' + 2
        , 'myPhotoController'
        , cdn + '/v3.0/assets/plugin/myPhoto/myPhotoController.js?v=' + 1
    )).state('main.practise', routeConfig.config(
        '/practise'
        , '/cand/practise?v=' + 2
        , 'practiseController'
        , cdn + '/v3.0/assets/plugin/practise/practiseController.js?v=' + 1
    )).state('main.start', routeConfig.config(
        '/start'
        , '/cand/start?v=' + 2
        , 'startController'
        , cdn + '/v3.0/assets/plugin/start/startController.js?v=' + 3
    )).state('main.answer', routeConfig.config(
        '/answer/:paperId/:quesNo/:direction'
        , '/cand/answerAquestion?v=' + 2
        , 'answerController'
        , cdn + '/v3.0/assets/plugin/answer/answerController.js'
    )).state('main.onlinecode', routeConfig.config(
        '/onlinecode/:paperId/:quesNo/:direction'
        , '/cand/onlinecode?v=' + 3
        , 'onlinecodeController'
        , cdn + '/v3.0/assets/plugin/onlinecode/onlinecodeController.js?v=' + 3
    ));
    $urlRouterProvider.otherwise('/main/personalInfo');
});

app.factory('App', function () {
    return new (function () {
        var zis = this;
        this.CompInfo = CompInfo;
        this.myInfo = {};
        this.Papers = null;
        this.cs = {};
        this.answering = false;
        this.paperAns = [];
        this.login = function ($state) {
            location.href = ('/cand/login');
        };
        this.checkData = function (data, $state) {
            if (data == Object.someStr) {
                zis.login();
                return false;
            } else
                return true;
        };
        this.serverTime = {
            allTime: 0
            , usedTime: 0
        };
        if (user && Object.isNullString(user.vipCode))
            user.vipCode = parseInt(3 + Math.random() * 297);
        this.time1 = Date.now().toString();
        this.time2 = Date.now().toString();
        this.time3 = Date.now().toString();
        this.e = function (t) {
            return aen(t, user._id, user.id, user.vipCode);
        }
        this.d = function (t) {
            return ade(t, user._id, user.id, user.vipCode);
        }

        this.formatTime = function (s) {
            var lefttime = s;
            var iHour = parseInt(lefttime / 3600);
            lefttime -= iHour * 3600;
            var iMinute = parseInt(lefttime / 60);
            var iSec = lefttime - iMinute * 60;

            return {
                hours: iHour.twoNum()
                , mins: iMinute.twoNum()
                , secs: iSec.twoNum()
            };
        };
        this.timer = null;

        this.savePaper = function (paper) {
            sessionStorage[this.e(paper._id)]
                = this.e(JSON.stringify(paper));
            this[paper._id] = paper;
            this.savePapersAllAns(paper._id, []);
        };
        this.getPaper = function (_id) {
            if (!Object.isNull(this[_id]))
                return this[_id];
            var key = this.e(_id);
            if (!Object.isNullString(sessionStorage[key]))
                this[_id] = JSON.parse(this.d(sessionStorage[key]));
            return this[_id];
        };
        this.savePapersAllAns = function (paperId, objAns) {
            sessionStorage[this.e(paperId + 'Ans')]
                = this.e(JSON.stringify(objAns));
            this[paperId + 'Ans'] = objAns;
        };
        this.getPapersAllAns = function (paperId) {
            var key = paperId + 'Ans';
            if (!Object.isNull(this[key]))
                return this[key];
            var key1 = this.e(key);
            if (!Object.isNullString(sessionStorage[key1]))
                this[key] = JSON.parse(this.d(sessionStorage[key1]));
            /*this.paperAns.splice(0, this.paperAns.length);
            for (var i=0; i<this[key].length; i++) {
                this.paperAns.push(this[key][i]);
            }*/
            return this[key];
        };
        this.updatePapersAns = function (paperId, rowNumber, ans, lang, saveStatus) {
            var objAll = this.getPapersAllAns(paperId);
            objAll[rowNumber / 100] = {
                ans: Object.isNullString(ans) ? '' : ans
                , lang: lang
                , ss: saveStatus
            };
            this.savePapersAllAns(paperId, objAll);
        };
        this.saveQues = function (paperId, ques, saveStatus) {
            sessionStorage[this.e(paperId + '_' + ques.rowNumber)]
                = this.e(JSON.stringify(ques));
            this[paperId + '_' + ques.rowNumber] = ques;
            this.updatePapersAns(paperId, ques.rowNumber, ques.answer, ques.lang, saveStatus);
        };
        this.getQues = function (paperId, rowNumber) {
            var key = paperId + '_' + rowNumber;
            if (!Object.isNull(this[key]))
                return this[key];
            var key1 = this.e(key);
            if (!Object.isNullString(sessionStorage[key1]))
                this[paperId + '_' + rowNumber]
                    = JSON.parse(this.d(sessionStorage[key1]));
            return this[paperId + '_' + rowNumber];
        };
        this.checkQuesSave = function () {
            var bl = false;
            if (this.paper) {
                var noSave = [];
                var allAns = this.getPapersAllAns(this.paper._id);
                for (var i = 0; i < this.paper.quesNum; i++) {
                    var ques = allAns[i];
                    if (ques) {
                        if (ques.ss == false)
                            noSave.push(i + 1);
                    }
                }
                if (noSave.length > 1) {
                    bl = true;
                    return noSave.join(', ');
                }
            }
            return '';
        };

        this.updateStepMenuUI = function () {
            if (this.serverTime.usedTime >= 0) {
                if (isMobile) {
                    $('div.list > ul > li:eq(3)').html('<span>03</span> <div>开始作答</div>');
                } else {
                    $('div.list > ul > li:eq(3)').html('<span>04</span> <div>开始作答</div>');
                }
            } else {
                if (isMobile) {
                    $('div.list > ul > li:eq(3)').html('<span>03</span> <div>考前练习</div>');
                } else {
                    $('div.list > ul > li:eq(3)').html('<span>04</span> <div>考前练习</div>');
                }
            }
        };
        this.rendTime = function ($rootScope) {
            this.serverTime.mayStarted++;
            if (this.serverTime.usedTime >= 0) { examNotStart = false; } 
            if ((this.serverTime.timeType == 3 && this.serverTime.notStart == true)
                ) {
                $('.nav #leftTime').html('稍后开始计时<br /><span class="time">00:00:00' + "</span>");//'为方便您测试({0}分钟)<br />开始答题后再计时！'
                //.Format(this.serverTime.allTime/60));
                return;
            }
            if (nowView == "myPhoto") { $(".lowtime").hide(); }
            $rootScope.$broadcast('timeing.usedTime', this.serverTime.usedTime);
            if (this.serverTime.allTime > 0) {
                if (this.serverTime.usedTime <= 0) {
                    if (this.serverTime.usedTime < 0)
                        this.serverTime.usedTime++;
                    var ft = this.formatTime(-this.serverTime.usedTime);
                    $('.nav #leftTime').html('开考倒计时<br /><span class="time">{0}:{1}:{2}'.Format(ft.hours, ft.mins, ft.secs) + "</span>");
                    if (this.serverTime.usedTime > -15) {
                        $rootScope.$broadcast('practise.timeOver', autoSubmitFun);
                    }
                    if (this.serverTime.usedTime == 0) {
                        //clearInterval(this.timer);
                        //return;
                    }
                    if (ft.hours == 0 && ft.mins < 15) {
                        //开考倒计时，最后5分钟，拍照禁止
                        //if (nowView == "myPhoto") {
                        //    //
                        //    if (top.ACMGlobal.faceRecognition) {
                        //        top.ACMGlobal.kaoQian = false;
                        //        $("#showc").unbind("click").bind("click", function () {
                        //            cxalert('提示', '开考前15分钟停止使用活体验证，请点击允许访问摄像头！');
                        //            top.window.initPhotoShow();
                        //            $(".monitorBox").addClass("heightLimited");
                        //        });
                        //    }

                        //    $("#showc").attr("href", "javascript:void(0)");
                        //    $("#showc").unbind("click");
                        //    //
                        //    $("#showc").unbind("click").bind("click", function () {
                        //        cxalert('提示', '开考前15分钟禁止使用拍照功能');
                        //        top.window.initPhotoShow();
                        //        $(".monitorBox").addClass("heightLimited");
                        //    });
                        //    surenext3();

                        //    $(".lowtime").show();
                        //}
                    }
                } else {
                    this.serverTime.usedTime++;
                    if (this.serverTime.usedTime >= 0) {
                        if (this.serverTime.usedTime <= this.serverTime.allTime) {
                            var ft = this.formatTime(this.serverTime.allTime - this.serverTime.usedTime);
                            $('.nav #leftTime').html('整场考试计时<br /><span class="time">{0}:{1}:{2}'.Format(ft.hours, ft.mins, ft.secs) + "</span>");

                            if (ft.hours == 0 && ft.mins < 5) {
                                if (limitedThree) {
                                    $(".header ul li.textName").css("background", "#ff0000");
                                    $(".modal-dialog").attr("style", "");
                                    $(".modal-dialog .modal-body").attr("style", "");
                                    $(".modal-dialog .modal-footer").attr("style", "");
                                    $(".modal-dialog .modal-content").attr("style", "");
                                    cxalert('温馨提示', "<div>离考试结束还有 <span style='font-size:22px;color:red;'>5</span> 分钟，请掌握答题进度，及时交卷！</div>");
                                    limitedThree = false;
                                }
                            }
                        } else {
                            var ft = this.formatTime(this.serverTime.usedTime - this.serverTime.allTime);

                            var autoSubmitFun = function () {
                                if (CompInfo.unionExam) {
                                    if (isMobile) { location.href = "/m/v1.0/exam/uniteautosubmit.html"; }
                                    else { location.href = "http://image.acmcoder.com/assets/public/v1.0/exam/uniteautosubmit.html"; }
                                } else {
                                    if (isMobile) { location.href = "/m/v1.0/exam/autosubmit.html"; }
                                    else { location.href = "http://image.acmcoder.com/assets/public/v1.0/exam/autosubmit.html"; }
                                }
                            };
                            if (zis.answering) {
                                $rootScope.$broadcast('timeOver.submitNow', autoSubmitFun);
                            } else {
                                autoSubmitFun();
                            }
                            //$('.nav #leftTime').html('考试已结束：<br />谢谢您的参与！'.Format(ft.hours, ft.mins, ft.secs));
                        }
                    } else {
                    }
                }
                this.updateStepMenuUI();

            }

        };
        this.submitAPaper = function ($http, $state, paperId, callback) {
            var strPrompt = "您确认要提交该部分试卷吗？<br>提交后仍可以修改此试卷！"
            if (zis.paper && !Object.isNullString(zis.paper.submitPrompt)) {
                strPrompt = zis.paper.submitPrompt;
            } else {

            }
            $("#cxdialog").attr("style", "");
            $.cxDialog.defaults.baseClass = '';
            $.cxDialog.defaults.width = 0;
            $.cxDialog.defaults.height = 0;
            $.cxDialog({
                title: '提示',
                info: '<div class="showtip"><table align="center"><tbody><tr><td><i class="fa fa-exclamation-triangle"></i></td><td><span class="fbig fb"></span>' + strPrompt + '</td></tr></tbody></table></div>',
                
                ok: function () {
                    $http.post('/cand/api/submitAPaper', { paperId: paperId }).success(function (data) {
                        if (zis.checkData(data, $state)) {
                            $("#lean_overlay,#submitmodal").css({ "display": "none" });
                            setTimeout(callback, 100);
                        } else {

                        }
                    }).error(function (data) {
                        console.log(data);
                    });
                },
                okText: '确认',
                no: function () {

                },
                noText: '取消'
            });

        };
        this.updateFromServer = function ($http, $state) {
            $http.post('/cand/api/echoTimetoClient', {
                r: Math.random()
            }).success(function (data) {
                if (zis.checkData(data, $state)) {
                    zis.serverTime = data[1];
                    zis.cs = data[0];
                    if (zis.cs && zis.cs.submit == true) {
                        if (CompInfo.unionExam) {
                            location.href = "http://image.acmcoder.com/assets/public/v1.0/exam/uniteendexam.html";
                        } else {
                            location.href = "http://image.acmcoder.com/assets/public/v1.0/exam/endexam.html";
                        }
                    }
                } else {
                    if (Object.isNull(zis.serverTime))
                        zis.serverTime = {};
                }
            }).error(function (data) {
                console.log(data);
            });
        };
        this.refreshPapers = function ($http, $state, $stateParams, callback) {
            $http.post('/cand/api/fetchPapersAndQuesForCand', {
                paperId: $stateParams.paperId
            }).success(function (data) {
                if (zis.checkData(data, $state)) {
                    zis.Papers = data.papers;
                    zis.Answers = data.answers;
                    if (zis.Papers && zis.Papers.length) {
                        for (var i = 0; i < zis.Papers.length; i++) {
                            if (zis.Papers[i]._id == zis.paperId) {
                                zis.paper = zis.Papers[i];

                                break;
                            }
                        }
                    } else {
                        zis.paper = null;
                        zis.ques = [];
                    }
                    if (callback) callback();
                } else {
                    zis.Papers = [];
                }
            }).error(function (data) {
                console.log(data);
            });
        };
        this.refreshMyInfo = function ($http) {
            $http.post('/cand/refreshMyInfo', { r: Math.random() }).success(function (data) {
                zis.myInfo = data ? data : {};
                
                $("#faceRecognition").val(data.faceRecognition);
                ACMGlobal.faceRecognition = data.faceRecognition;
                ACMGlobal.mobile = data.mobile;

                ACMGlobal.idcard = data.idcard;
                if (data.idcard != null && data.idcard != "") {
                    ACMGlobal.idcard = data.idcard.replace("'", "");
                }
                ACMGlobal.realName = data.realName;
                ACMGlobal.candId = data._id;

                if (ACMGlobal.faceRecognition) {
                    if (location.hash.indexOf("myPhoto") > -1) {
                        $(".innerInfo .stepinfo .tip .title").html('系统通过人脸识别技术，结合考试全程监拍，验证考生身份，确保考试的公平、公正');
                    }
                    $(".ifh5").html('<span style="font-weight:bold;">提示：</span><br />1、请注意系统文字和声音的指令，缓慢做相应动作，进行人脸识别图像采集；<br />2、脸部光线不要太暗。<span style="color: #ff0000;font-weight:bold;font-size: 15px;">【秘技】背后如有高亮的光源，<span style="text-decoration: underline;">可将摄像头抬高，仰角45度，从上往下拍照；</span></span> <br />3、整场答题时，确保脸部在摄像头监拍范围，清晰可见。');
                    $("#showc a").html('进入身份验证');
                } else {
                    $("#showc a").attr("style", "left: 335px;");
                }
            }).error(function (data) {
                console.log('Error: ' + data);
            });
        };
        this.enterPaperNow = function ($http, paperId, rowNumber) {
            $http.post('/cand/api/enterPaperNow', {
                r: Math.random(), paperId: paperId, rowNumber: rowNumber
            }).success(function (data) {

            }).error(function (data) {

            });
        };
    })();
});

app.filter('trustHtml', function ($sce) {

    return function (input) {

        return $sce.trustAsHtml(input);

    }

});
app.filter('quesType', function ($sce) {

    return function (input) {
        var match = ['单选题', '多选题', '判断题', '填空题', '问答题', '编程题'];
        var ret = '';
        var i = (input);
        if (i > 0 && i <= match.length) {
            ret = match[i - 1];
        }
        return ret;

    }

});
var CODE_LANG_HD = [
    'G++',
    'GCC',
    'C++',
    'C',
    'Pascal',
    'Java',
    'C#',
    'Javascript'
];
var ARR_RUN_RESULT_HD = [
    '编译中 ( Compiling )',
    '编译中 ( Compiling )',                            //1
    '编译中 ( Compiling )',                          //2
    '运行中 ( Running )',                            //3
    '评判中 ( Judging )',                            //4
    '编译通过，运行结果正确 ( Accepted(AC) )',                    //5
    '错误 ( Wrong Answer(WA) )',                      //6
    '运行时错误 ( Runtime Error(RE) )',              //7
    '编译通过，运行结果正确 ( Accepted(AC) )',                    //8
    //'格式错误 ( Presentation Error (PE) )',                  //8
    '超出时间限制 ( Time Limit Exceeded (TLE) )',         //9
    '超出内存限制 ( Memory Limit Exceeded (MLE) )',       //10
    '超出输出限制 ( Output Limit Exceeded (OLE) )',       //11
    '编译错误 ( Compilation Error (CE) )',              //12
    '系统错误 ( System Error (SE) )',                   //13
    '考试已结束 ( Out Of Contest Time )',                //14
    '没有这道题目 ( Data Missed )'                        //15
];
var CODE_LANG = [
    'C',
    'C++',
    'Pascal',       //0
    'Java',
    'Ruby',
    'Bash',
    'Python',
    'PHP',
    'Perl',         //0
    'C#',
    'Obj-C',
    'FreeBasic',    //0
    'Schema',       //0
    'Clang',
    'Clang++',
    'Lua',          //
    'Swift',        //0
    'Go',           //
    'javascript',
    'nodejs'
];
var ARR_RUN_RESULT = [
    '您的程序正在排队提交，并运行中，请稍等 ( Waiting ) ',           //0
    '等待重判 ( Waiting )',         //1
    '编译中 ( Compiling )',          //2
    '运行并评判 ( Running & Judging )',        //3
    '编译通过，运行结果正确 ( Accepted(AC) )',               //4
    '格式错误 ( Presentation Error (PE) )',             //5
    '答案错误 ( Wrong Answer(WA) )',             //6
    '时间超限 ( Time Limit Exceeded (TLE) )',             //7
    '内存超限 ( Memory Limit Exceeded (MLE) )',             //8
    '输出超限 ( Output Limit Exceeded (OLE) )',             //9
    '运行错误 ( Runtime Error(RE) )',             //10
    '编译错误 ( Compilation Error (CE) )',             //11
    '编译成功 ( Compiles Successfully )',             //12
    '运行完成 ( Run Complete )',             //13
    ''

];
app.filter('runResult', function ($sce) {

    return function (input) {
        var match = ARR_RUN_RESULT;
        var ret = '';
        var i = (input);
        if (i > 0 && i <= match.length) {
            ret = match[i - 1];
        }
        return ret;

    }

});
app.filter('ExcelDate', function () {
    return function (input) {
        if (!Object.isNullString(input)) {
            if (!Object.isNullString(input)) {
                if (input.toString().indexOf('-') > -1)
                    return input;
                else if (input > 0)
                    return new Date(parseInt(input) * (24 * 60 * 60 * 1000) + Date.UTC(1899, 11, 30))
                ;//.toString('yyyy-MM-dd');
            }
        }
    }
});
app.directive('dateFormat', ['$filter', function ($filter) {
    var dateFilter = $filter('date');
    return {
        require: '?ngModel',
        link: function (scope, elm, attrs, ctrl) {

            function formatter(value) {
                if (!Object.isNullString(value)) {
                    if (value.toString().indexOf('-') > -1)
                        return value;
                    else if (value > 0) {
                        var rv = new Date(value * (24 * 60 * 60 * 1000) + Date.UTC(1899, 11, 30));
                        return dateFilter(rv, 'yyyy-MM-dd'); //format
                    }
                }
            }

            function parser() {
                return ctrl.$modelValue;
            }

            if (ctrl && ctrl.$formatters) {
                ctrl.$formatters.push(formatter);
                ctrl.$parsers.unshift(parser);
            }
        }
    };
}]);

var entno = {
    get: function () {
        return {};
    },
    set: function ($v) {
        //alert('set');
    }
};
var entyes = {
    get: function () {
        //return {};
        if (typeof (myblur) != "undefined") {
            return myblur;
        } else {
            return null;
        }
    },
    set: function ($v) {

    }
};



//ng_aefs.ckeditorInline.apply(app);