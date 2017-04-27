/**
 * Created by lifubang on 2015/6/24.
 */
app.register('rulesController', ['$scope', '$http', '$state', '$location', '$timeout', 'App',
    function($scope, $http, $state, $location, $timeout, App)
    {
        $('#navTab').show();
        selTab('rules');
        $scope.App = App;
        window.scrollTo(0, 0);

        var mayTimer = null;
        //var mayTimePassed = 0;
        var rendTimeFunc = function() {
            //mayTimePassed++;
            var lsecs = user.vipCode - App.serverTime.mayStarted;
            var ft = {hours:'00',mins:'00',secs:'00'};
            if (lsecs > 0)
                ft = App.formatTime(lsecs);

            $('#timeToStart').html('{0}:{1}:{2}'.Format(ft.hours, ft.mins, ft.secs)).show();
            if (lsecs <= 0) {
                if (mayTimer) {
                	clearInterval(mayTimer);
                	mayTimer = null;
                }
                
                setTimeout(function() {
	                $('#btnStartExam').removeAttr('disabled');
	                $('#dvStartExam').show();
	              }, 1000);
            }
        };
        
        $scope.goToStart = function(paperId, rowNumber) {
            var strTo = '';
            console.log('in goToStart');
            console.log('App.serverTime.usedTime: ', App.serverTime.usedTime);
            if (App.serverTime.usedTime<0) {
                if (App.serverTime.timeType == 3) {
                    strTo = 'start';
                } else {
	                strTo = '#/main/practise';
	                gotoHash(strTo);
	                return;
	                /*else if (App.serverTime.usedTime<0) {
	                 alert('考试还未开始，请耐心等待，并关注上方的倒计时！');
	                 return;
	                 }*/
	               }
            //} else if (App.serverTime.usedTime > 0) {
            	//strTo = 'start';
            } else if (App.serverTime.usedTime >= 0) {
                if (App.serverTime.timeType == 3 && App.serverTime.unifiedExam != true) {
                    strTo = 'start';
                } else {
                    //alert(user.vipCode);
                    var lsecs = user.vipCode - App.serverTime.mayStarted;
            				console.log('user.vipCode: ', user.vipCode);
            				console.log('App.serverTime.mayStarted: ', App.serverTime.mayStarted);
            				console.log('lsecs: ', lsecs);
                    if (lsecs <= 0) {
                        strTo = 'start';
                    } else {
                        $('#dvTimend').modal({backdrop: 'static'});
                        if (mayTimer) clearInterval(mayTimer);
                        mayTimer = setInterval(rendTimeFunc, 1000);
                        return;
                    }
                }
            }
            strTo = '#/main/{0}'.Format(strTo);
            $scope.startExam((strTo));
        };

        $scope.$on('user.startExam', function(e, d){
            console.log('user.startExam');
            $scope.startExam();
        });
        $scope.startExam = function() {
            var lsecs = user.vipCode - App.serverTime.mayStarted;
    				console.log('user.vipCode: ', user.vipCode);
    				console.log('App.serverTime.mayStarted: ', App.serverTime.mayStarted);
    				console.log('lsecs: ', lsecs);
            if (App.serverTime.usedTime > 0 || App.serverTime.timeType == 3 || lsecs <= 0) {
                $http.post('/cand/api/startExam', {
                    r: Math.random()
                }).success(function (data) {
    								console.log('/cand/api/startExam: ', data);
                    if (App.checkData(data, $state)) {
                        App.serverTime = data[1];
                        App.cs = data[0];
                        if (App.cs) {
                            /*if (App.cs.submit == true) {
                                //location.href = "/v1.0/exam/endexam.html";
                            } else*/
                            {
                                $('#dvTimend').modal('hide');
                                gotoHash('#/main/start');
                            }
                        } else {
                            alert('试卷还在路上，请稍后点击按钮开始！');
                        }
                    } else {
                        if (Object.isNull(App.serverTime))
                            App.serverTime = {};
                    }
                }).error(function (data) {
                    console.log(data);
                });
            } else {
                console.log('再等一下呗！');
            }
        }

        if (isMobile) {
            $(".stepinfo .list ul li.cur span").html(2);
            $(".toolguider a.bottom").attr("onclick", "javascript: gotoHash('#/main/personalInfo');");
        }


        //10秒阅读
        var limited = 10;
        if (App.serverTime.usedTime > -15 && App.serverTime.usedTime < -10) {
            limited = -App.serverTime.usedTime;
        }

        //limited = parseInt(Math.random() * 300);

        var tl;
        TLimited();
        function TLimited() { tl = window.setTimeout(timeLimitedFun, 1000); };
        function timeLimitedFun() {
            if (limited > 1) {
                //加载
                limited--;
                $(".toolguider .limitedred").html("（" + limited + "）");
                TLimited();
            } else {
                //时间到了
                $(".toolguider.limited a.next").removeAttr('disabled').attr("href", "javascript:;").click(function(){
                    //gotoHash('#/main/practise');
                });
                //start
                $(".toolguider.limited").removeClass("limited");
                $(".toolguider .limitedred").remove();
            }
        }
    }
]);