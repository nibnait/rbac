/**
 * Created by lifubang on 2015/6/24.
 */
app.register('startController', ['$scope', '$http', '$state', '$location', '$timeout', 'App',
    function($scope, $http, $state, $location, $timeout, App)
    {
        $('#navTab').show();
        $timeout(function(){
            selTab('start');
        });

        $scope.App = App;
        window.scrollTo(0, 0);
        $scope.loading = false;
        $scope.model = {};

        $scope.refreshFunc = function() {
            $scope.loading = true;
            $http.post('/cand/api/papersExact', $scope.model).success(function (data) {

                if (App.checkData(data, $state)) {
                    App.Papers =
                        $scope.model.Papers = data;
                    for (var i=0; i<data.length; i++) {
                        App.savePaper(data[i]);
                        (function(idx){
                            $http.post('/cand/api/papersQuestion', {
                                paperId: $scope.model.Papers[idx]._id
                            }).success(function (ques) {
                                //console.log(data);
                                if (App.checkData(ques, $state)) {
                                    if (Object.isArray(ques)) {
                                        for (var j = 0; j < ques.length; j++) {
                                            App.saveQues($scope.model.Papers[idx]._id, ques[j]);
                                        }
                                    }
                                } else {
                                }
                            }).error(function (data) {
                                console.log('Error: ' + data);
                            });
                        })(i);
                    }
                    
            				$http.post('/cand/api/CandsState', {r: Math.random()}).success(function (cs) {
            					$scope.model.CandsState = cs;
            					if (cs != null && cs.submit == true) {
            					} else {
                                    var blSubmit = true;
                                    for (var i = 0; i < data.length; i++) {
                                        if (data[i].quesNum > data[i].answers) {
                                            blSubmit = false;
                                            break;
                                        } else {
                                        }
                                    }
                                    if (!blSubmit) {
                                        var stext = '您还有未作答的题目！<br /><span style="color:Red;font-weight:bold;">交卷后无法再次登录考试系统</span>，您确认要交卷吗？';

                                        $("#submitmodal .info").html(stext);
                                        if (whenSubmitPapers) {
                                            //stext = whenSubmitPapers($scope.model.Papers);
                                            whenSubmitPapers($scope.model.Papers);
                                        }
                                    } else {
                                        $("#submitmodal .info").html('<span style="color:Red;font-weight:bold;">交卷后无法再次登录考试系统！</span><br />您确认要交卷吗？');
                                    }
                                    $("#submitTip").unbind("click").bind("click", function () {
                                        $(this).attr("href","javascript:void(0)");
                                        var mytxt = $("#submitmodal .info").html();
                                        $.cxDialog.defaults.background = '#000';
                                        $.cxDialog({
                                            title: '提示',
                                            info: '<div class="showtip"><table align="center"><tbody><tr><td><i class="fa fa-exclamation-triangle"></i></td><td><span class="fbig fb"></span>' + mytxt + '</td></tr></tbody></table></div>',
                                            ok: function () {
                                                if (!$("#submitTip").hasClass("wsp")) {
                                                    $http.post('/cand/api/submit', { r: Math.random() }).success(function (cs) {
                                                        if (CompInfo.unionExam) {
                                                            location.href = "http://image.acmcoder.com/assets/public/v1.0/exam/uniteendexam.html";
                                                        } else {
                                                            location.href = "http://image.acmcoder.com/assets/public/v1.0/exam/endexam.html";
                                                        }
                                                    }).error(function (data) {
                                                        console.log('Error: ' + data);
                                                    });
                                                }                                               
                                            },
                                            okText: '确认',
                                            no: function () {

                                            },
                                            noText: '取消'
                                        });
                                        
                                    });
                                }
				            }).error(function (data) {
				                console.log('Error: ' + data);
				            });
                } else {
                    $scope.model.Papers = null;
                }
                $scope.loading = false;
            }).error(function (data) {
                console.log('Error: ' + data);
                $scope.loading = false;
            });
        };
        $scope.refreshFunc();

        $scope.prjPromptGet = function() {
            $http.post('/cand/api/prjPrompt', {}).success(function (data) {
                if (App.checkData(data, $state)) {
                    $scope.model.prjPrompt = data;
                } else {
                    $scope.model.prjPrompt = '';
                }
                $scope.loading = false;
            }).error(function (data) {
                console.log('Error: ' + data);
                $scope.loading = false;
            });
        };
        $scope.prjPromptGet();

        $scope.start = function(mt, pIndex) {
            var blNext = true;

            if (beforeEnterPaper) {
                blNext = beforeEnterPaper(mt, $scope.model.Papers, pIndex);
            }

            if (blNext) {
                $http.post('/cand/api/enterPaperNow', {
                    r: Math.random(), paperId: mt._id, rowNumber: 0
                }).success(function (data) {
                    if(Object.isNumber(data)) {
                        App.updateFromServer($http, $state);
                        if (mt.forCode)
                            gotoHash('#/main/onlinecode/{0}/{1}/{2}'.Format(mt._id, -1, 1));
                        else
                            gotoHash('#/main/answer/{0}/{1}/{2}'.Format(mt._id, -1, 1));
                    } else {
                        alert('考官现在有点忙，还没接受你的请求，请稍候再试！');
                    }
                }).error(function (data) {
                    alert('请按ctrl f5强制刷新浏览器！');
                });
            }
        };
    }
]);