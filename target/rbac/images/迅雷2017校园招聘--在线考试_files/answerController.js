/**
 * Created by lifubang on 2015/6/24.
 */
var editor;
app.register('answerController', ['$scope', '$http', '$state', '$stateParams', '$location', '$timeout', 'App',
    function ($scope, $http, $state, $stateParams, $location, $timeout, App) {
        selTab('answer');
        $('#navTab').hide();
        $scope.App = App;
        window.scrollTo(0, 0);
        $scope.loading = false;
        $scope.model = {};
        $scope.answer = '';

        $scope.paperId = App.paperId = $stateParams.paperId;
        $scope.quesNo = App.quesNo = parseInt($stateParams.quesNo);
        $scope.direction = parseInt($stateParams.direction);
        //alert('{0}-{1}'.Format($stateParams.paperId, $stateParams.quesNo));

        $scope.$on('timeing.usedTime', function (e, d) {
            //console.log('timeing.usedTime: ' + d.toString());
        });
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
            $scope.saveAnswerAction(ans, function () {
                if (d) d();
            });
        });
        $scope.$on('practise.timeOver', function (e, d) {
            console.log('practise.timeOver');
            gotoHash('#/main/rules');
            $(".examtitle .titleright").remove();
        });
        $scope.goToQuestion = function (paperId, rowNumber) {
            var ans = $scope.getAnswer();
            $scope.saveAnswerAction(ans, function () {
                var strTo = 'answer';
                if (App.paper.forCode)
                    strTo = 'onlinecode';
                gotoHash('#/main/{2}/{0}/{1}/0'
                    .Format(App.paper._id, rowNumber, strTo));
            });
        };

        $scope.submitPaper = function () {
            var ans = $scope.getAnswer();
            $scope.saveAnswerAction(ans, function () {
                var checkAnsSave = App.checkQuesSave();
                if (Object.isNullString(checkAnsSave)) {
                    App.submitAPaper($http, $state, $scope.paperId, function (r) {
                        if (App.serverTime.usedTime >= 0) {
                            gotoHash('#/main/start');
                        } else {
                            gotoHash('#/main/practise');
                        }
                    });
                } else {
                    cxalert('提示', '由于网络问题，第{0}题答案尚未保存到数据库，请返回到该题，点击“下一题”或“上一题”按钮后再提交！注意：不要关闭浏览器、不要刷新网页！'.Format(checkAnsSave));
                }
            });

        };
        $scope.next = function (rowNumber) {
            var ans = $scope.getAnswer();
            if ($scope.checkAnswer(ans) == false) {
                if ($scope.model.paper.quesPrev == false) {
                    return false;
                }
            }

            if ($scope.checkAnswer(ans) != "limited500") {
                $scope.saveAnswerAction(ans, function () {
                    gotoHash('#/main/answer/{0}/{1}/{2}'
                        .Format($scope.paperId, rowNumber, 1));
                });
            }
        };
        $scope.prev = function (rowNumber) {
            var ans = $scope.getAnswer();
            if ($scope.checkAnswer(ans) != "limited500") {
                $scope.saveAnswerAction(ans, function () {
                    gotoHash('#/main/answer/{0}/{1}/{2}'
	                    .Format($scope.paperId, rowNumber, -1));
                });
            }
        };
        $scope.cb = {};
        $scope.cbs = 0;
        $scope.reportError = function(title, content) {
            $http.post('/test/reportError', {
                url: title
                , error: content
            }).success(function (data,header,config,status) {

            }).error(function (data,header,config,status) {

            });
        };
        $scope.saveAnswerAction = function (ans, callback) {
            var rnd = $scope.cbs++;
            //$scope.cb[rnd] = callback;
            if (!Object.isNullString(ans)) {
                App.ques.answer = ans;
                App.saveQues(App.paperId, App.ques, false);
                (function (p, q, r) {
                    $http({
                        url: '/cand/api/saveAnswer'
                        , method: 'post'
                        , data: {
                        paperId: $scope.paperId
                        , quesNo: $scope.model.rowNumber
                        , ans: q.answer
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
                                resp: resp
                            }));
                        }
                        if (blSucc == false) {
                            if (data && data.e == -11) {
                                cxalert('提示', '您已交卷，无法继续作答！');
                            } else if (data && data.e == -12) {
                                cxalert('提示', '您已交卷，无法继续作答！');
                            } else if (data && data.e == -13) {
                                cxalert('提示', '考试时间已到，无法继续作答！');
                            } else {
                                cxalertWarn('提示', '由于网络问题，该题答案尚未保存到数据库，请点击“下一题”或“上一题”按钮重新保存，或先作答其他试题，稍后再试！注意：不要关闭浏览器、不要刷新网页！');
                                $scope.reportError(location.href, JSON.stringify({
                                    user: user,
                                    data: data,
                                    header: header,
                                    config: config,
                                    status: status
                                }));
                            }
                        }
                        if (r == $scope.cbs-1 || blSucc)
                            App.saveQues(p, q, blSucc);
                        if (r == $scope.cbs-1)
                            $timeout(callback);
                        return;
                        //App.updateFromServer($http, $state);
                    }, function (resp) {
                        var data=resp.data,header=resp.headers,config=resp.config,status=resp.status;

                        //console.log('Error: ' + data);
                        if (r == $scope.cbs-1) {
                            cxalertWarn('提示', '由于网络问题，该题答案尚未保存到数据库，请点击“下一题”或“上一题”按钮重新保存，或先作答其他试题，稍后再试！注意：不要关闭浏览器、不要刷新网页！');
                            App.saveQues(p, q, false);
                            $timeout(callback);
                            App.updateFromServer($http, $state);
                        }
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
        $scope.saveAnswer = function (rowNumber) {
            var ans = $scope.getAnswer();
            if (Object.isNullString(ans)) {
                cxalert('提示', '您还未给出答案！');
                return;
            } else {
                $scope.saveAnswerAction(ans, function () { cxalert('提示', '答案保存成功！'); });
            }
        };
        $scope.checkAnswer = function (ans) {
            
            if ($scope.model.ques.questype == 4) {
                var countNum = ans;
                if (countNum.length > 5000) {
                    cxalertWarn('提示', "答案不能超过5000字符！"); return "limited500";
                }
            } else if ($scope.model.ques.questype == 5) {
                var ans1 = editor.getData();//$('#txtAnswer').html();
                var countNum = ans1.replace($(ans1).find("img").attr("src"), "");
                if (countNum.length > 5000) {
                    cxalertWarn('提示', "答案不能超过5000字符！"); return "limited500";
                }
            }
            {
                if (Object.isNullString(ans)) {
                    if ($scope.model.paper.quesPrev == false)
                        cxalertWarn('提示', '作答后不能返回修改答案，请给出答案后进入下一题。');
                    else
                        cxalert('提示', '上一题您还未作答！');
                    return false;
                } else
                    return true;
            }
        };
        $scope.getAnswer = function () {
            var ans = '';
            if ($scope.model.ques) {
                switch ($scope.model.ques.questype) {
                    case 4:
                        ans = $('#txtAnswer').val()

                        break;
                    case 5:
                        /*if ($(".fulltexteditor").hasClass("sel")) {
                            $('#txtAnswer').html(editor.getData());
                        }*/
                        ans = editor.getData();//$('#txtAnswer').html();
                        //alert(ans);
                        break;
                    case 1:
                    case 3:
                        ans = $('input[type="radio"][name="rdo"]:checked').val();
                        break;
                    case 2:
                        var cbs = $('input[type="checkbox"][name="cb"]:checked');
                        var arr = [];
                        for (var i = 0; i < cbs.length; i++)
                            arr.push(cbs[i].value);
                        ans = arr.join(',');
                        break;
                }
            }
            return ans;
        };
        var refreshFunc = function () {
            $scope.loading = true;
            /*$http.post('/cand/api/fetchNextQuestion', {
                paperId: $scope.paperId
                , quesNo: $scope.quesNo
                , direction: $scope.direction
            }).success(function (data) {*/
            //if (App.checkData(data, $state)) {
            /*if (data.code != '0') {
                $timeout(function () {
                    gotoHash('#/main/rules');
                });
                return;
            }*/
            App.paper = App.getPaper($scope.paperId);
            App.Papers = [App.paper];
            if (App.paper == null) {
                cxalert('提示', '你的试卷还在发送中，请稍侯。。。。。');
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
                cxalert('提示', '这道试题可能还在路上，请稍侯。。。。。');
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
            App.rowNumber = rowNumber = data.rowNumber;
            /*} else {
                $scope.model = null;
            }*/
            $scope.loading = false;
            $timeout(function () {

                if ($scope.model.paper.allQuesPanel != 0) {
                    $(".nav .examlist")
                        .attr('data-step', '2')
                        .attr('data-intro', $('.nav .examlist').attr('data-intro1'))
                        .show();
                } else {
                    $(".nav .examlist").removeAttr('data-step').removeAttr('data-intro');
                }
                //alert($scope.model.rowNumber + ' ' + ($scope.model.paper.quesNum-1) * 100);
                if ($.cookie('introJsforanswer') == null && isMobile == false) {
                    $.cookie('introJsforanswer', '1');
                    if ($scope.model.forPractise == $scope.model.forPractise && $scope.model.rowNumber == 0) {
                        introJs().setOptions({ 'doneLabel': '我知道了', 'nextLabel': '我知道了', 'showBullets': false, 'showStepNumbers': false, "tooltipPosition": "auto" }).start();
                    }
                }
                if ($scope.model.ques) {
                    //if (!Object.isNullString($scope.model.answer)) {
                    switch ($scope.model.ques.questype) {
                        case 4:
                            $('#txtAnswer').val($scope.model.answer);
                            break;
                        case 5:
                            $('#txtAnswer').val($scope.model.answer);
                            //$('#txtAnswer span.math-tex').wrap('<script type="math/tex"></script>');
                            /*$script(['/assets/ckeditor/plugins/mathjax/MathJax.js?config=TeX-AMS_HTML'], function(){
                                $('#txtAnswer').attr('contenteditable', 'true');
                            });*/
                            editor = CKEDITOR.replace('txtAnswer');
                            CKEDITOR.on('instanceReady', function (e) {
                                $('iframe.cke_wysiwyg_frame')[0].contentDocument.onblur = function () {
                                    $('#txtAnswer').focus();
                                };
                            });
                            $(".saveAnswerBtn").show();
                            break;
                        case 1:
                        case 3:
                            if (!Object.isNullString($scope.model.answer)) {
                                ans = $('input[type="radio"][name="rdo"][value="{0}"]'
                                    .Format($scope.model.answer)).attr('checked', 'checked');
                            }
                            break;
                        case 2:
                            if (!Object.isNullString($scope.model.answer)) {
                                var arr = $scope.model.answer.split(',');
                                for (var i = 0; i < arr.length; i++) {
                                    $('input[type="checkbox"][name="cb"][value="{0}"]'
                                        .Format(arr[i])).attr('checked', 'checked');
                                }
                            }
                            break;
                    }
                    //}
                }
                $(".onlinetest").hide();

                $(".mianall").addClass("foranswer").removeClass("forcode");
                //沉底
                if (parseInt($(".mainbody .innerInfo").css("height")) < 540) {
                    $(".footer").css("position", "fixed");
                } else { $(".footer").css("position", ""); }

                //单选题选项点击样式
                $(".mainbody.forall .innerInfo .examInfo .exammiddle .simpleoptionlist ul li").bind("click", function () {
                    $(this).siblings().removeClass("selected").find("i.choose").removeClass("fa fa-check");
                    $(this).addClass("selected").find("i.choose").addClass("fa fa-check");

                    $(this).siblings().find("input").removeAttr("checked");
                    $(this).find("input").prop("checked", true);
                });
                //手机端试题图片的样式
                if (isMobile) {
                    $(".questionIntro").find("img").each(function () {
                        if (parseInt($(this).css("width")) >= parseInt($(".answerBody").width())) {
                            $(this).css("width", "100%").css("height", "");
                        }
                        if ($(this).attr("style") == undefined) {
                            $(this).css("width", "100%").css("height", "");
                        }
                    });
                    $(".exammiddle .InputBoxArea .uploadfile").hide();
                    $(".exammiddle .InputBoxArea .drawingboard").hide();

                }
                //多选题选项点击样式
                $(".mainbody.forall .innerInfo .examInfo .exammiddle .multioptionlist ul li").bind("click", function () {
                    if ($(this).hasClass("selected")) {
                        $(this).removeClass("selected").find("i.choose").removeClass("fa fa-check");
                        $(this).find("input").removeAttr("checked");
                    } else {
                        $(this).addClass("selected").find("i.choose").addClass("fa fa-check");
                        $(this).find("input").prop("checked", true);
                    }

                });
                //ABCD样式
                $(".optionlist").find("ul li i.optABCD").eq(0).html("A");
                $(".optionlist").find("ul li i.optABCD").eq(1).html("B");
                $(".optionlist").find("ul li i.optABCD").eq(2).html("C");
                $(".optionlist").find("ul li i.optABCD").eq(3).html("D");
                $(".optionlist").find("ul li i.optABCD").eq(4).html("E");
                $(".optionlist").find("ul li i.optABCD").eq(5).html("F");
                $(".optionlist").find("ul li i.optABCD").eq(6).html("G");

                //初始加载选项样式
                if (!$(".optionlist ul li input:checked").parent().hasClass("selected")) {
                    $(".optionlist ul li input:checked").parent().addClass("selected").find("i.choose").addClass("fa fa-check");
                }

                $(".examtitle .titleright").show();


                //富文本编辑器
                $(".fulltexteditor").bind("click", function (e) {
                    if (!$(this).hasClass("sel")) {
                        editor = CKEDITOR.replace('txtAnswer');
                        $(this).addClass("sel");
                        $(this).html("正在加载富文本编辑器...");
                        CKEDITOR.on('instanceReady', function (e) {
                            $(".fulltexteditor").html("富文本编辑器");
                            //鼠标在富文本编辑器中的时候，取消监控
                            this.document.on("click", function () { window.onblur = null; });
                            //鼠标离开富文本编辑器中的时候，加上监控
                            this.document.on("blur", function () { window.onblur = myblur; });
                        })

                    } else {
                        //alert(editor.getData());
                    }
                    //动态加载css和js
                    //var CKEDITOR;
                    //xe.load
                    //  .loadCss('/assets/ckeditor/plugins/codesnippet/lib/highlight/styles/monokai_sublime.css');
                    //$script(['/assets/ckeditor/ckeditor.js', '/assets/ckeditor/adapters/jquery.js'], function () {
                    //    //已加载完
                    //    alert("已加载完");
                    //    CKEDITOR.replace('txtAnswer');
                    //});
                })

                //画图板
                var paintInit = false;
                var initPaint = function () {
                    if (!initPaint) {
                        paintInit = true;
                        //$script(['/assets/jPainter/js/canvas.js'], function(){
                        //openPaint();
                        //});
                    } else {
                        openPaint();
                    }
                };
                var openPaint = function () {
                    //界面UI初始化，对话框
                    $("#dialog").dialog(
                        {
                            autoOpen: true,
                            show: {
                                effect: "blind",
                                duration: 920
                            },
                            hide: {
                                effect: "explode",
                                duration: 920
                            },
                            height: 630,
                            width: 920
                        });
                };
                $(".drawingboard").bind("click", function (e) {
                    initCanvas();
                    if ($("#dialog").dialog) {
                        initPaint();
                        $(".painterdialog").show();
                    } else {
                        forPaint.push(function () {
                            initPaint();
                            $(".painterdialog").show();
                        });
                    }
                })

                $("#uploadfile_File").bind("change", function (e) {
                    $(".uploadfile_error").hide();
                    var oFileList = document.getElementById('uploadfile_File').files;
                    if (oFileList.length > 0) {
                        var oFile = oFileList[0];
                        var rFilter = /^(image\/bmp|image\/gif|image\/jpeg|image\/png)$/i;
                        if (!rFilter.test(oFile.type)) {
                            document.getElementById("uploadfile_File").value = "";
                            $("#uploadfile_preview").css("backgroundImage", "");
                            $("#uploadfile_error_ext").show();
                            return;
                        }
                        if (oFile.size > 512 * 1024) {
                            document.getElementById("uploadfile_File").value = "";
                            $("#uploadfile_preview").css("backgroundImage", "");
                            $("#uploadfile_error_big").show();
                            return;
                        }

                        var oReader = new FileReader();
                        oReader.onload = function (e) {
                            //var oImage = document.getElementById('uploadfile_preview');
                            //oImage.src = e.target.result;
                            $("#uploadfile_preview").css("backgroundImage", "url(\"" + e.target.result + "\")");
                        }
                        oReader.readAsDataURL(oFile);
                    }
                });

                $("#a_uploadfile").bind("click", function (e) {
                    if ($("#dialog_uploadfile").dialog) {
                        document.getElementById("uploadfile_File").value = "";
                        $("#uploadfile_preview").css("backgroundImage", "");
                        $("#dialog_uploadfile").dialog(
                            {
                                autoOpen: true,
                                modal: true,
                                buttons: [
                                    {
                                        text: "上传"
                                        , click: function (event) {
                                            $(".uploadfile_error").hide();
                                            var oFileList = document.getElementById('uploadfile_File').files;
                                            if (oFileList.length <= 0) {
                                                document.getElementById("uploadfile_File").value = "";
                                                $("#uploadfile_preview").css("backgroundImage", "");
                                                $("#uploadfile_error_ext").show();
                                                return;
                                            }
                                            var oFile = oFileList[0];
                                            var rFilter = /^(image\/bmp|image\/gif|image\/jpeg|image\/png)$/i;
                                            if (!rFilter.test(oFile.type)) {
                                                document.getElementById("uploadfile_File").value = "";
                                                $("#uploadfile_preview").css("backgroundImage", "");
                                                $("#uploadfile_error_ext").show();
                                                return;
                                            }
                                            if (oFile.size > 512 * 1024) {
                                                document.getElementById("uploadfile_File").value = "";
                                                $("#uploadfile_preview").css("backgroundImage", "");
                                                $("#uploadfile_error_big").show();
                                                return;
                                            }

                                            $("#modal_uploadfile").modal({ backdrop: 'static' });

                                            var vFD = new FormData(document.getElementById('form_UploadFile'));

                                            var oXHR = new XMLHttpRequest();
                                            oXHR.addEventListener('load', function (e) {
                                                var responseText = e.target.responseText;
                                                $("#modal_uploadfile").modal("hide");
                                                $("#dialog_uploadfile").dialog("close");
                                                var html = "";
                                                var start = responseText.indexOf(",'") + ",'".length;
                                                var end = responseText.indexOf("','", start);
                                                var url = responseText.substring(start, end);
                                                html = "<img src=\"" + url + "\" />"
                                                CKEDITOR.instances.txtAnswer.insertHtml(
                                                    html
                                                );
                                            }, false);
                                            oXHR.addEventListener('error', function (e) {
                                                $("#modal_uploadfile").modal("hide");
                                                $("#dialog_uploadfile").dialog("close");
                                            }, false);
                                            oXHR.addEventListener('abort', function (e) {
                                                $("#modal_uploadfile").modal("hide");
                                                $("#dialog_uploadfile").dialog("close");
                                            }, false);
                                            oXHR.open('POST', '/Foundation/Upload?CKEditorFuncNum=1');
                                            oXHR.send(vFD);

                                            // $("#modal_uploadfile").modal("hide");


                                        }
                                    }
                                ],
                                show: {
                                    effect: "blind",
                                    duration: 920
                                },
                                hide: {
                                    effect: "explode",
                                    duration: 920
                                },
                                height: 600,
                                width: 600
                            }
                        );
                    }
                });

                //赋值给canvas
                var initCanvas = function () {
                    //清除画板
                    document.getElementById("myCanvas").getContext("2d").fillStyle = "#FFFFFF";
                    var width = $("#myCanvas").attr("width");
                    var height = $("#myCanvas").attr("height");
                    document.getElementById("myCanvas").getContext("2d").fillRect(0, 0, width, height);

                    var imgOld = $($('iframe.cke_wysiwyg_frame')[0].contentDocument.body).find('img[src^="data:"]');
                    var oldImg = null;
                    for (var i = 0; i < imgOld.length; i++) {
                        var a = $(imgOld[i]);
                        if (Object.isNullString(a.attr('class'))) {
                            oldImg = a;
                            break;
                        }
                    }
                    if (oldImg) {
                        var getimgdate = oldImg;
                        document.getElementById("myCanvas").getContext("2d").drawImage(getimgdate[0], 0, 0);
                    }
                }

            });
            App.updateFromServer($http, $state);
            $timeout(function () {
                //App.refreshPapers($http, $state, $st
                //App.refreshPapers($http, $state, $stateParams, function () {
                $script([cdn + '/v3.0/htmls/exam/js/examhtml.js'], function () {
                    $(".examtitle").show();
                    if ($(".examtitle").find(".titleright").length == 0) {
                        $(".examtitle").append('<div class="titleright"><span class="type"></span> <span class="Num"></span>/<span class="total"></span></div>');
                    }
                    $(".examtitle .titleright .type").html(App.paper.title);
                    $(".examtitle .titleright .Num").html(parseInt(($scope.model.rowNumber / 100)) + 1);
                    $(".examtitle .titleright .total").html(App.paper.quesNum);
                });
            });
            /*}).error(function (data) {
                console.log('Error: ' + data);
                $scope.loading = false;
                App.updateFromServer($http, $state);
                App.refreshPapers($http, $state, $stateParams);
            });*/
        };
        $scope.refreshFunc = refreshFunc;

        refreshFunc();

        //window.onblur = myblur;
        //Object.defineProperty(window, "onblur", { value: null, writable: false });

        //测试使用
        //window.onblur = null;

        

        window.onfocus = function () {
            console.log('FOCUS');
            if (blurTime) {
                console.log('clear BLUR');
                clearTimeout(blurTime);
                blurTime = null;
            }
            if (detectTimer) {
                console.log('clear detectTimer');
                clearTimeout(detectTimer);
                detectTimer = null;
            }
            $http.post('/cand/api/focusLog', {
                paperId: $scope.paperId
                , quesNo: $scope.model.rowNumber
                , focus: 'QUES_FOCUS'
            }).success(function (data) {
                //alert('您已经跳出界面{0}次了！'.Format(data));
            }).error(function (data) {
                console.log(data);
            });
        }
    }
]);