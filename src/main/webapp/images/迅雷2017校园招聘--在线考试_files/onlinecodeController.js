/**
 * Created by lifubang on 2015/6/24.
 */
app.register('onlinecodeController', ['$scope', '$http', '$state', '$stateParams', '$location', '$timeout', 'App',
    function ($scope, $http, $state, $stateParams, $location, $timeout, App) {
        var editor;
        selTab('onlinecode');
        $('#navTab').hide();
        $scope.App = App;
        window.scrollTo(0, 0);
        $scope.loading = false;
        $scope.model = {};
        $scope.answer = '';
        $scope.lang = '';
        $scope.langText = '请选择编程语言';

        $scope.paperId = App.paperId = $stateParams.paperId;
        $scope.quesNo = App.quesNo = parseInt($stateParams.quesNo);
        $scope.direction = parseInt($stateParams.direction);
        //alert('{0}-{1}'.Format($stateParams.paperId, $stateParams.quesNo));

        if (window.codeResultTimer)
            clearTimeout(window.codeResultTimer);
        if (window.codeDebugTimer)
            clearTimeout(window.codeDebugTimer);

        $scope.submitPaper = function (rowNumber) {
            $("#txtAnswer").val(editor.getValue());
            var ans = $scope.getAnswer();
            if (Object.isNullString(ans) && $scope.lang!="") {
                cxalert('提示','您还未给出答案！');
                return;
            } else if (Object.isNullString(ans) && $scope.lang == "") {
                App.submitAPaper($http, $state, $scope.paperId, function (r) {
                    if (App.serverTime.usedTime >= 0) {
                        gotoHash('#/main/start');
                    } else {
                        gotoHash('#/main/practise');
                    }
                });
            } else {

                if ($scope.checkBeforSave(rowNumber)) {
                    var checkAnsSave = App.checkQuesSave();
                    if (Object.isNullString(checkAnsSave)) {
                        $scope.saveAnswerAction(ans, $scope.lang, function (succ) {
                            if (succ) {
                                App.submitAPaper($http, $state, $scope.paperId, function (r) {
                                    if (App.serverTime.usedTime >= 0) {
                                        gotoHash('#/main/start');
                                    } else {
                                        gotoHash('#/main/practise');
                                    }
                                });
                            }
                        });
                    } else {
                        //cxalert('提示', '由于网络问题，第{0}题答案尚未保存到数据库，请返回到该题，点击“下一题”或“上一题”按钮后再提交！注意：不要关闭浏览器、不要刷新网页！'.Format(checkAnsSave));
                        cxalert('提示', '您的代码排队提交运行中，请先作答其他试题，稍后返回查看结果！');
                    }
                }

            }
        };
        $scope.$on('main.submitAPaper', function (e, d) {
            //console.log('timeing.usedTime: ' + d.toString());
            //alert(d);
            $scope.submitPaper();
        });
        $scope.$on('main.gotoQuestion', function (e, paperId, rowNumber) {
            //console.log('timeing.usedTime: ' + d.toString());
            $scope.goToQuestion(paperId, rowNumber);
        });
        $scope.$on('timeOver.submitNow', function (e, d) {
            console.log('timeOver.submitNow');
            var ans = $scope.getAnswer();
            $scope.saveAnswerAction(ans, $scope.lang, function () {
                if (d) d();
            });
        });
        $scope.$on('practise.timeOver', function (e, d) {
            console.log('practise.timeOver');
            gotoHash('#/main/rules');
            $(".noticeTips.forall").removeClass("forcode")
            $(".examtitle .titleright").remove();
        });
        $scope.goToQuestion = function (paperId, rowNumber) {
            var ans = $scope.getAnswer();
            $scope.saveAnswerAction(ans, $scope.lang, function () {
                var strTo = 'answer';
                if (App.paper.forCode)
                    strTo = 'onlinecode';
                gotoHash('#/main/{2}/{0}/{1}/0'
                    .Format(App.paper._id, rowNumber, strTo));
            });
        };
        $scope.next = function (rowNumber) {
            $("#txtAnswer").val(editor.getValue());
            var ans = $scope.getAnswer();
            ($scope.checkAnswer(ans));

            if ($scope.checkPrevNext(rowNumber)) {
                $scope.saveAnswerAction(ans, $scope.lang, function () {
                    gotoHash('#/main/onlinecode/{0}/{1}/{2}'
                        .Format($scope.paperId, rowNumber, 1));
                });
            }

        };
        $scope.prev = function (rowNumber) {
            $("#txtAnswer").val(editor.getValue());
            var ans = $scope.getAnswer();
            ($scope.checkAnswer(ans));
            if ($scope.checkPrevNext(rowNumber)) {
                $scope.saveAnswerAction(ans, $scope.lang, function () {
                    gotoHash('#/main/onlinecode/{0}/{1}/{2}'
                        .Format($scope.paperId, rowNumber, -1));
                });
            }

        };
        $scope.checkPrevNext = function (rowNumber) {
            $("#txtAnswer").val(editor.getValue());
            var ans = $scope.getAnswer();
            if (!Object.isNullString(ans)) {
                if (Object.isNullString($scope.lang)) {
                    cxalert('提示','您还未选择编程语言！');
                    return false;
                } else {
                    return true;
                }
            } else
                return true;
        };
        $scope.checkBeforSave = function (rowNumber) {
            $("#txtAnswer").val(editor.getValue());
            var ans = $scope.getAnswer();
            if (Object.isNullString($scope.lang)) {
                cxalert('提示','您还未选择编程语言！');
                return false;
            } else {
                if (Object.isNullString(ans)) {
                    cxalert('提示','您还未给出答案！');
                    return false;
                } else {
                    return true;
                }
            }
        };
        $scope.cbs = 0;
        $scope.reportError = function(title, content) {
            $http.post('/test/reportError', {
                url: title
                , error: content
            }).success(function (data,header,config,status) {

            }).error(function (data,header,config,status) {

            });
        };
        $scope.saveAnswerAction = function (ans, lang, callback) {
            var rnd = $scope.cbs++;
            if (!Object.isNullString(ans) && !Object.isNullString(lang)) {
                
                App.ques.answer = ans;
                App.ques.lang = lang;
                App.saveQues(App.paperId, App.ques, false);
                (function (p, q, r) {
                    $http({
                        url: '/cand/api/saveCodeAnswer'
                        , method: 'post'
                        , data: {
                        paperId: $scope.paperId
                        , quesNo: $scope.model.rowNumber
                        , ans: ans
                        , lang: lang
                    }}).then(function (resp) {
                        var data=resp.data,header=resp.headers,config=resp.config,status=resp.status;
                        var blSucc = false;
                        if (App.checkData(data, $state)) {
                            if (data && data.code == 1) {
                                blSucc = true;
                            }
                        } else {
                        }
                        if (data.e) {
                            $scope.reportError(location.href, JSON.stringify({
                                user: user,
                                data: data
                            }));
                        }
                        if (blSucc == false) {
                            if (data && data.e == -11) {
                                cxalert('提示','您已交卷，无法继续作答！');
                            } else if (data && data.e == -12) {
                                cxalert('提示','您已交卷，无法继续作答！');
                            } else if (data && data.e == -13) {
                                cxalert('提示','考试时间已到，无法继续作答！');
                            } else {
                                //cxalert('提示','由于网络问题，该题答案尚未保存到数据库，请点击“下一题”或“上一题”按钮重新保存，或先作答其他试题，稍后再试！注意：不要关闭浏览器、不要刷新网页！');
                                cxalert('提示', '您的代码排队提交运行中，请先作答其他试题，稍后返回查看结果！');
                                $scope.reportError(location.href, JSON.stringify({
                                    user: user,
                                    resp: resp
                                }));
                            }
                        }
                        if (r == $scope.cbs-1 || blSucc)
                            App.saveQues(p, q, blSucc);
                        $timeout(function () {
                            if (r == $scope.cbs-1) callback(blSucc);
                        });
                        return;
                        //App.updateFromServer($http, $state);
                    }, function (resp) {
                        var data=resp.data,header=resp.headers,config=resp.config,status=resp.status;
                        //console.log('Error: ' + data);
                        if (r == $scope.cbs-1) {
                            cxalert('提示', '您的代码排队提交运行中，请先作答其他试题，稍后返回查看结果！');
                            //cxalert('提示','由于网络问题，该题答案尚未保存到数据库，请点击“下一题”或“上一题”按钮重新保存，或先作答其他试题，稍后再试！注意：不要关闭浏览器、不要刷新网页！');
                            App.saveQues(p, q, false);
                            $timeout(callback);
                        }
                        App.updateFromServer($http, $state);
                        $scope.reportError(location.href, JSON.stringify({
                            type: 'error',
                            user: user,
                            resp: resp
                        }));
                    });
                })(App.paperId, App.ques, rnd);

            } else {
                if (rnd == $scope.cbs - 1) $timeout(callback);
            }
        };
        $scope.getResult = function () {
            $http.post('/cand/api/getCodeRunResult', {
                paperId: $scope.paperId
                , quesNo: $scope.model.rowNumber
            }).success(function (r) {
                if (App.checkData(r, $state)) {
                    var data = r.r;
                    console.log('data: ' + data);
                    var pr = r.r1;
                    if (Object.isNullString(data))
                        data = 0;
                    $timeout(function () {
                        if (data < 4) {//正在编译
                            var strTxt = ARR_RUN_RESULT[(data)];
                            if (data == 3) {
                                if (r.pc != null) {
                                    strTxt += ('(' + r.pc.toFixed(2) + '%)');
                                }
                            }
                            $(".mainbody .innerInfo .right .info .resultInfo .line2 .title > div.alert div.alert-warm")
                                .html(strTxt);
                            if (window.codeResultTimer)
                                clearTimeout(window.codeResultTimer);
                            if (location.hash.startWith('#/main/onlinecode'))
                                window.codeResultTimer = setTimeout($scope.getResult, 2000);
                        } else {
                            if (data == 11) {//编译错误
                                $(".mainbody .innerInfo .right .info .resultInfo .line2 .title > div.alert div.alert-warm").html("编译错误 Compile Error ...");

                                $scope.getDebugInfo(r);
                            } else {
                                var t = '';
                                var inf = '';
                                if (pr == 1) {
                                    t = '恭喜，编译成功并运行通过（Accepted）';
                                    inf = '说明：<br />所有测试数据均已输出正确结果！<br />^_^';
                                } else if (pr == 0 && data==6) {
                                    t = '您的程序输出结果错误 Wrong Answer';
                                    inf = '说明：<br />所有测试数据均未输出正确结果！';
                                } else {
                                    t = ARR_RUN_RESULT[(data)];
                                    inf = '说明：<br />所有测试数据正确率为 {0}%！<br />可以尝试再次完善代码，并调试，争取全部AC通过<br />'.Format((pr * 100).toFixed(0));
                                    if (data == 7) {
                                        inf += '<br />温馨提示：有时候，申请大的全局数组会导致超时，如果有此类情况，请检查您的全局数组是否超过题目要求的内存大小。<br />排除这个错误后，再检查别的情况引起的超时错误：例如死循环、循环结束条件错误等，或者需要更好的算法！';
                                    }
                                }
                                $(".mainbody .innerInfo .right .info .resultInfo .line2 .title > div.alert div.alert-warm")
                                    .html(t);
                                $(".openView .infolist").html(inf);
                                if (pr == 0 && data == 6) { $(".openView .infolist").append('<div style="margin-top:40px;">代码运行没通过？建议您再仔细阅读编程题须知，<a href="http://oj.acmcoder.com/ExamNotice.html" style="color: #2cbfde;" target="_blank">现在查看</a></div>'); }
                            }
                        }
                        if (1 == 0) {
                            var txt = ARR_RUN_RESULT[(data)];
                            if (data == 6)
                                txt = '您的程序输出结果错误 Wrong Answer';
                            if (data == 7) {
                                txt += '<br />温馨提示：有时候，申请大的全局数组会导致超时，如果有此类情况，请检查您的全局数组是否超过题目要求的内存大小。<br />排除这个错误后，再检查别的情况引起的超时错误：例如死循环、循环结束条件错误等，或者需要更好的算法！';
                            }
                            if (data == 10)
                                txt = '您的程序在运行时发生错误  Runtime Error';
                            $(".mainbody .innerInfo .right .info .resultInfo .line2 .title > div.alert div.alert-warm").html(txt);
                            //alert(ARR_RUN_RESULT[(data)]);
                        }
                    });
                    return;
                } else {

                }
            }).error(function (data) {
                console.log('Error: ' + data);
            });
        };
        $scope.getDebugInfo = function (d) {
            var displayD = function (di) {
                $timeout(function () {
                    $(".openView .infolist").html(Object.isNullString(di)
                        ? '调试信息为空' : di.HTMLEncode().TextToHtml()
                    ).append('<div style="margin-top:40px;">代码运行没通过？建议您再仔细阅读编程题须知，<a href="http://oj.acmcoder.com/ExamNotice.html" style="color: #2cbfde;" target="_blank">现在查看</a></div>');
                });
            };
            var getD = function () {
                $http.post('/cand/api/getCodeDebugInfo', {
                    paperId: $scope.paperId
                    , quesNo: $scope.model.rowNumber
                    , r: Math.random()
                }).success(function (data) {
                    if (App.checkData(data, $state)) {
                        if (data) {
                            if (data.h == true) {
                                displayD(data.d);
                            } else {
                                if (window.codeDebugTimer)
                                    clearTimeout(window.codeDebugTimer);
                                window.codeDebugTimer = setTimeout(function () {
                                    $scope.getDebugInfo({});
                                }, 2000);
                            }
                        }
                    } else {
                    }
                }).error(function (data) {
                    console.log('Error: ' + data);
                });
            }
            if (d) {
                if (d.h == true) {
                    displayD(d.d);
                } else {
                    getD();
                }
            }
        };
        //二十秒之内不能提交
        $scope.debugTimeCheck = function() {
            if (typeof (ACMGlobal) != "undefined") {
                if (ACMGlobal.debugLimitTime == 15) {
                    var debugTimer = window.setInterval(function () {
                        if (ACMGlobal.debugLimitTime > 0) {
                            $(".debugbuttom").html("调试（" + ACMGlobal.debugLimitTime + "秒）").addClass("limited");
                            $(".mainbody .innerInfo .right .info .resultInfo .line2 .title .buttom").html('<i class="fa fa-play-circle-o"></i>  运行（' + ACMGlobal.debugLimitTime + '秒）').addClass("limited");
                            ACMGlobal.debugLimitTime--;
                        } else {
                            $(".debugbuttom").html("调试").removeClass("limited");
                            $(".mainbody .innerInfo .right .info .resultInfo .line2 .title .buttom").html('<i class="fa fa-play-circle-o"></i>  运行').removeClass("limited");
                            window.clearInterval(debugTimer);
                            ACMGlobal.debugLimitTime = 15;
                        }
                    }, 1000);
                    return 1;
                }
                else if (ACMGlobal.debugLimitTime > 0 && ACMGlobal.debugLimitTime < 15) {
                    return 0;
                }
                else {
                    ACMGlobal.debugLimitTime = 15;
                    return 1;
                }
            }
        }
        $scope.saveAnswer = function (rowNumber) {
            if ($scope.checkBeforSave(rowNumber)) {
                if ($scope.debugTimeCheck() == 0) { return; }
                $scope.saveAnswerAction($scope.getAnswer(), $scope.lang, function () {
                    //cxalert('提示','答案代码成功！，正在获取编译结果......');
                    $(".mainbody .innerInfo .right .info .resultInfo .line2 .title > div.alert div.alert-warm").html("正在编译 Compiling");
                    $(".openView .infolist").html("");

                    setTimeout(function () {
                        $scope.getResult();
                    }, 2000);
                });
            }
        };
        $scope.saveAnswerExt = function (rowNumber) {
            if ($scope.checkBeforSave(rowNumber)) {
                $scope.saveAnswerAction($scope.getAnswer(), $scope.lang, function (succ) {
                    if (succ)
                        cxalert('提示','程序代码已经成功保存至数据库中，请放心！');
                });
            }
        };
        $scope.checkAnswer = function (ans) {
            if (Object.isNullString(ans))
                cxalert('提示','上一题您还未作答！');
            else
                return true;
        };
        $scope.getAnswer = function () {
            $("#txtAnswer").val(editor.getValue());
            var ans = '';
            if ($scope.model.ques) {
                switch ($scope.model.ques.questype) {
                    case 6:
                        ans = $('#txtAnswer').val();
                        break;
                }
            }
            if ($scope.model.ques.usetemp == true)
                $scope.model['ans_' + $scope.model.ques._id + '_' + $scope.lang] = ans;
            return ans;
        };
        $scope.getLang = function () {
            var ans = '';
            if ($scope.lang = '') {
                return '请选择编程语言';
            } else {
                return $scope.lang;
            }
            //return ans;
        };
        $scope.displayLang = function () {
            var ans = '';
            if ($scope.model.ques) {
                switch ($scope.model.ques.questype) {
                    case 6:
                        ans = $('#lang').val();
                        break;
                }
            }
            return ans;
        };
        var refreshFunc = function () {
            /*$scope.loading = true;
             $http.post('/cand/api/fetchNextQuestion', {
             paperId: $scope.paperId
             , quesNo: $scope.quesNo
             , direction: $scope.direction
             }).success(function (data) */ {
                /*if (App.checkData(data, $state)) {
                 if (data.code != '0') {
                 $timeout(function(){
                 gotoHash('#/main/rules');});
                 return;
                 }
                 $scope.model = data;
                 App.rowNumber = data.rowNumber;
                 } else {
                 $scope.model = null;
                 }*/
                App.paper = App.getPaper($scope.paperId);
                App.Papers = [App.paper];
                if (App.paper == null) {
                    cxalert('提示','你的试卷还在发送中，请稍侯。。。。。');
                    $timeout(function () {
                        gotoHash('#/main/rules');
                    });
                    return;
                }

                var idx = 0;
                if ($scope.quesNo > -1) {
                    if ($scope.direction > 0)
                        idx = App.quesNo / 100 + 1;
                    else if ($scope.direction < 0)
                        idx = App.quesNo / 100 - 1;
                    else
                        idx = App.quesNo / 100;
                }
                var data = App.getQues($scope.paperId, idx * 100);
                if (data == null) {
                    cxalert('提示','这道试题可能还在路上，请稍侯。。。。。');
                    $timeout(function () {
                        gotoHash('#/main/rules');
                    });
                    return;
                }

                data.code = 0;
                data.paper = App.paper;
                App.ques = data;
                App.paperAns = App.getPapersAllAns(App.paperId);
                for (var i = 0; i < App.paperAns.length; i++) { delete App.paperAns[i].$$hashKey }
                $scope.model = data;
                App.rowNumber = data.rowNumber;

                $scope.loading = false;
                $timeout(function () {
                    $(".codeshow").show();
                    $(".loadshow").hide();

                    //重新加载title
                    if ($scope.model.ques) {
                        if (!Object.isNullString($scope.model.answer)) {
                            switch ($scope.model.ques.questype) {
                                case 6:
                                    $('#txtAnswer').val($scope.model.answer);
                                    $scope.lang = ($scope.model.lang);
                                    if ($scope.lang > -1)
                                        $scope.langText = CODE_LANG[$scope.lang];
                                    $scope.model['ans_' + $scope.model.ques._id + '_' + $scope.lang] = $scope.model.answer;
                                    break;
                            }
                            $scope.getResult();
                        }
                    }

                    if ($scope.model.paper.allQuesPanel != 0) {
                        $(".nav .examlist")
                            .attr('data-step', '4')
                            .attr('data-intro', $('.nav .examlist').attr('data-intro1'))
                            .show();
                    } else {
                        $(".nav .examlist").removeAttr('data-step').removeAttr('data-intro');
                    }

                    $("li.onlineRefer").attr("data-position", "top");
                    //$(".header .examlist").show();
                    if ($.cookie('introJsforcode') == null && isMobile == false) {
                        $.cookie('introJsforcode', '1');
                        if ($scope.model.forPractise == $scope.model.forPractise && $scope.model.rowNumber == 0) {
                            var introMask = function () {
                                if (!$(".mianall").hasClass("forcode")) { $(".mianall").addClass("forcode"); }
                                console.log('introJs');
                                introJs().setOptions({ 'doneLabel': '我知道了', 'nextLabel': '我知道了', 'showBullets': false, 'showStepNumbers': false, "tooltipPosition": "auto", exitOnOverlayClick: false }).start().oncomplete(function () {
                                    $.cxDialog.defaults.background = '#000';
                                    $.cxDialog({
                                        title: '提示',
                                        info: '<div class="showtip"><div class="codeIntroJsTip"><div class="line-title">温馨提示：</div><div class="line">在主场才能出好成绩：你可以在<span class="yellow">本地编译器中编写</span>，然后复制到考试页面运行</div><div class="line">在线编程题<span class="yellow">跳出</span>考试页面<span class="yellow">不算违规</span></div><div class="line"> 阿尔法狗将<span class="yellow">比对</span>所有考生<span class="yellow">代码的相似度</span>，让侥幸无所遁形</div></div></div>',
                                        ok: function () {

                                        },
                                        okText: '我知道了'
                                    });
                                });
                            };
                            if (typeof introJs == "undefined")
                                bundles.push(introMask);
                            else
                                introMask();
                        }
                    }


                    var initEditor = function () {
                        //init for codemirror
                        editor = CodeMirror.fromTextArea(document.getElementById("txtAnswer"), {
                            mode: "scheme",
                            styleActiveLine: true,
                            lineNumbers: true,
                            matchBrackets: true,
                            highlightSelectionMatches: {showToken: /\w/},
                            indentUnit: 6,
                            extraKeys: { "Ctrl-0": "autocomplete" },
                            mode: { name: "javascript", globalVars: true }
                        });
                        //editor.on('inputRead', function () {
                        //    editor.showHint();  
                        //});

                        var pending;
                        editor.on("change", function () {
                            clearTimeout(pending);
                            pending = setTimeout(update, 400);
                        });
                        function looksLikeScheme(code) {
                            return !/^\s*\(\s*function\b/.test(code) && /^\s*[;\(]/.test(code);
                        }

                        function update() {
                            editor.setOption("mode", looksLikeScheme(editor.getValue()) ? "scheme" : "javascript");
                        }


                        $(".mianall .mainbody .innerInfo .stepinfo .left .info .webtitle").html($(".mianall .mainbody .innerInfo .examtitle .titleleft .title").html()).find(".examtype").addClass("small").removeClass("examtype");
                        //$(".mianall .mainbody .innerInfo .examtitle").hide();

                        //init main
                        var wHeight = 0;
                        wHeight = $(window).height();
                        //初始化code编辑器的高度
                        $(".CodeMirror").css("height", wHeight - 195);
                        update();


                        $(".myCalculator").hide();
                        //关闭调试
                        $(".mainbody .innerInfo .right .info .resultInfo .btn-hide-run-pane").click(function () {
                            $(".mainbody .innerInfo .right .info .resultInfo .line2 .title > div.alert div.alert-warm").html("");
                            $(".openView .infolist").html("");
                            $(".mainbody .innerInfo .right .info .resultInfo").removeClass("openView").animate({ right: -505 }, 500, function () {
                                $(".mainbody .innerInfo .right .info .resultInfo").hide();
                            });
                        });
                        //打开调试
                        $(".editorbanner a.debugbuttom").click(function () {
                            if (typeof (ACMGlobal) != "undefined") {
                                if (ACMGlobal.debugLimitTime > 0 && ACMGlobal.debugLimitTime < 15) { return; }
                            }
                            $(".mainbody .innerInfo .right .info .resultInfo").show().animate({ right: 0 }, 500, function () {});
                            $(".mainbody .innerInfo .right .info .resultInfo .line2 .title > div.alert div.alert-warm").html("");
                            $(".resultInfo .infolist").html("");
                           
                            if (!$(".mainbody .innerInfo .right .info .resultInfo").hasClass("openView")) {
                                $(".mainbody .innerInfo .right .info .resultInfo").addClass("openView");
                            }
                        });
                        //打开调试
                        $(".resultInfo .line2 .title .buttom").click(function () {
                            if (typeof (ACMGlobal) != "undefined") {
                                if (ACMGlobal.debugLimitTime > 0 && ACMGlobal.debugLimitTime < 15) { return; }
                            }
                        });

                        //点击保存
                        //$(".savebuttom").click(function () {
                        //    alert(editor.getValue());
                        //});

                        //四个图标事件
                        //全屏
                        $(".toollist .fullscreen").click(function () {
                            if (!$(".CodeMirror").hasClass("CodeMirror-fullscreen")) {
                                $(".mainbody .innerInfo .right").css("width", "100%").css("position", "absolute").css("left", "0%");
                                $(".mainbody .innerInfo .left").css("width", "0%");
                                $(".mainbody .innerInfo .left .info").hide();
                                //全屏
                                $(".CodeMirror").addClass("CodeMirror-fullscreen");
                                $(".toollist .fullscreen").removeClass("fa-arrows-alt").addClass("fa-arrows");
                                update();
                            }
                            else {
                                $(".mainbody .innerInfo .right").css("width", "60%").css("position", "relative").css("left", "40%");
                                $(".mainbody .innerInfo .left").css("width", "40%");
                                $(".mainbody .innerInfo .left .info").show();
                                //推出全屏
                                $(".CodeMirror").removeClass("CodeMirror-fullscreen");
                                $(".toollist .fullscreen").removeClass("fa-arrows").addClass("fa-arrows-alt");
                                update();
                            }
                        });
                        //格式化
                        $(".toollist .indent").click(function () {
                            indentLine();
                        });
                        function indentLine() {
                            var doc = editor.getDoc();
                            editor.operation(function () {
                                for (var i = 0; i < doc.lineCount() ; i++) {
                                    editor.indentLine(i);
                                }
                            });
                        }

                        //窗口大小改变适应
                        $(window).resize(function () {
                            $(".CodeMirror").css("height", $(".innerInfo .right .info").height() - 115);
                            $(".codeInfo").css("height", $(".innerInfo .right .info").height() - 115);
                            update();
                        });


                        //选择考试样式
                        $(".mainbody .innerInfo .right .info .title .titlename ul li").bind("click", function () {
                            var gettyle = $(this).html();
                            $(".mainbody .innerInfo .right .info .title .titlename span").html(gettyle);
                            var newLang = $(this).attr('value');
                            if ($scope.lang != newLang) {
                                if ($scope.model.ques.usetemp == true) {
                                    var ans = $scope.getAnswer();
                                    if (!Object.isNullString(ans))
                                        $scope.model['ans_' + $scope.model.ques._id + '_' + $scope.lang] = ans;
                                    var ma = $scope.model['ans_' + $scope.model.ques._id + '_' + newLang];
                                    if (!Object.isNullString(ma)) {
                                        $scope.model.answer = ma;
                                    } else {
                                        $scope.model.answer = $scope.model.ques.temps['l' + newLang];
                                    }
                                    $('#txtAnswer').val($scope.model.answer);
                                    editor.setValue($('#txtAnswer').val());
                                }
                                $scope.lang = newLang;
                                $scope.langText = gettyle;
                                $scope.$apply();
                            }
                        });

                        $(".examtitle").hide();
                        $(".titlename ul").hide();
                        $(".titlename").bind("click", function () {
                            $(".titlename ul").toggle(200);
                        });
                        //    });
                        //});
                        if (App.myInfo && !Object.isNullString(App.myInfo.codeComment))
                            $('#codeComment').html(App.myInfo.codeComment).fadeIn('slow');
                        else
                            $('#codeComment').html('').hide();

                    }
                    if (typeof CodeMirror == 'undefined') {
                        forCode.push(initEditor);
                    } else {
                        initEditor();
                    }

                });
                App.updateFromServer($http, $state);
                $timeout(function () {
                    //App.refreshPapers($http, $state, $stateParams, function () {
                    $(".wave .first").html(parseInt($scope.model.rowNumber / 100) + 1);
                    $(".wave .total").html(App.paper.quesNum);
                });

                //});
            }/*).error(function (data) {
             console.log('Error: ' + data);
             $scope.loading = false;
             App.updateFromServer($http, $state);
             App.refreshPapers($http, $state, $stateParams);
             });*/
        };
        $scope.refreshFunc = refreshFunc;

        refreshFunc();

        window.onblur = myblur;
        function myblur(e) {
            var bl = true;
            e = e || window.event;
            //判断是否为IE，若是IE则判断MOUSE是否在窗口内
            if (window.ActiveXObject && /MSIE/.test(navigator.userAgent)) {  //IE
                //如果 blur 事件是窗口内部的点击所产生，返回 false, 也就是说这是一个假的 blur
                var x = e.clientX;
                var y = e.clientY;
                var w = document.body.clientWidth;
                var h = document.body.clientHeight;
                if (x >= 0 && x <= w && y >= 0 && y <= h) {
                    bl = false;
                }
            }
            if (bl) {
                $http.post('/cand/api/focusLog', {
                    paperId: $scope.paperId
                    , quesNo: $scope.model.rowNumber
                    , focus: 'CODE_BLUR'
                }).success(function (data) {
                    //alert('您已经跳出界面{0}次了！'.Format(data));
                }).error(function (data) {
                    console.log(data);
                });
            }
        }
        window.onfocus = function () {
            $http.post('/cand/api/focusLog', {
                paperId: $scope.paperId
                , quesNo: $scope.model.rowNumber
                , focus: 'CODE_FOCUS'
            }).success(function (data) {
                //alert('您已经跳出界面{0}次了！'.Format(data));
            }).error(function (data) {
                console.log(data);
            });
        }
    }
]);