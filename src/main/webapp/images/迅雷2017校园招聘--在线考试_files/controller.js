/**
 * Created by lifubang on 2015/6/24. v10
 */
if (Object.isNullString(cdn))
	cdn = '';
app.register('MainController', ['$scope', '$rootScope', '$http', '$state', '$stateParams', '$location', '$timeout', 'App',
	function($scope, $rootScope, $http, $state, $stateParams, $location, $timeout, App) {
		$scope.App = App;
		App.refreshMyInfo($http);
		//alert('');
		App.updateFromServer($http, $state);
		App.serverTimer = window.setInterval(function () {
				App.updateFromServer($http, $state);
			}
			, 600000);
		App.timer = window.setInterval(function () {
		    App.rendTime($rootScope);
		}, 1000);


		if (isMobile) {
			$(".footer").html('acmcoder.com &copy; 2015 All rights reserved.');
		}
		//App.refreshPapers($http, $state, $stateParams);

		$scope.submitPaper = function () {
			/*App.submitAPaper($http, $state, $state.params.paperId, function (r) {
			 if (App.serverTime.usedTime >= 0) {
			 gotoHash('#/main/start');
			 } else {
			 gotoHash('#/main/practise');
			 }
			 });*/

			$scope.$broadcast('main.submitAPaper', $state.params.paperId);
		};

	    
	   

		$scope.goToQuestion = function (paperId, rowNumber) {
			/*var strTo = 'answer';
			 if (App.paper.forCode)
			 strTo = 'onlinecode';
			 gotoHash('#/main/{2}/{0}/{1}/0'
			 .Format(App.paper._id, rowNumber, strTo));*/
			$scope.$broadcast('main.gotoQuestion', paperId, rowNumber);
		};

		$scope.$on('$stateChangeStart',
			function (event, toState, toParams, fromState, fromParams) {
				/*console.log(event);
				 console.log(toState);
				 console.log(toParams);
				 console.log(fromState);
				 console.log(fromParams);*/
				if (!blClickInBody) {
					cxalert('提示','哎呀！<br />考试系统不支持浏览器的后退功能');
					event.preventDefault();
					blClickInBody = false;
					return;
				} else {
					if (toState.url.startWith('/onlinecode')
						|| toState.url.startWith('/answer')) {
					    App.answering = true;
					    if (toState.url.startWith('/answer')) {
					        $(".mianall").addClass("foranswer").removeClass("forcode");
					    }
					    if (toState.url.startWith('/onlinecode')) {
					        $(".mianall").addClass("forcode").removeClass("foranswer");
					        $(".myCalculator").hide();
					    }
					} else {
						App.answering = false;
					}
					if (fromState.url.startWith('/answer')) {
					    $(".mianall").removeClass("foranswer").removeClass("forcode");
					}
					if (fromState.url.startWith('/onlinecode')) {
					    $(".myCalculator").show();
						if (window.codeResultTimer)
							clearTimeout(window.codeResultTimer);
					}
					if (fromState.url.startWith('/onlinecode')
						&& !(toState != null && toState.url.startWith('/onlinecode'))) {
						//alert('从编程题切到别的题，请把css调回去！');
						$(".mianall").addClass("forall").removeClass("forcode");
						$(".codeshow").hide();
						$(".mianall .header .logo").parent().addClass("w1000");
						$(".mianall .mainbody .innerInfo").addClass("w1000");
						$(".mianall .mainbody").addClass("forall");

						//$(".mianall .mainbody .innerInfo .stepinfo .left .info .title").html($(".mianall .mainbody .innerInfo .examtitle .titleleft .title").html()).find(".examtype").addClass("small").removeClass("examtype");
						$(".mianall .mainbody .innerInfo .examtitle").show();
					}
					if (fromState.url.startWith('/onlinecode')
						|| fromState.url.startWith('/answer')) {
						window.onblur = window.onfocus = null;
					} else {
					}
				}
				blClickInBody = false;
			});

		$scope.goToPaper = function (p) {
			var strTo = 'answer';
			if (p.forCode) {
				strTo = 'onlinecode';
				$(".codeshow").show();
				$(".loadshow").show();
				$(".examtitle").hide();
				$(".examContent").hide();
				$(".mianall .header .w1000").removeClass("w1000");
				$(".mianall .mainbody .innerInfo").removeClass("w1000");
			}
			else {
			}
			gotoHash('#/main/{2}/{0}/{1}/1'
				.Format(p._id, -1, strTo));
		};

		$scope.startExam = function() {
			$rootScope.$broadcast('user.startExam');
		};

		setTimeout(function () {
			$script.ready('forCode', function () {
				for (var i = 0; i < forCode.length; i++) {
					forCode[i]();
				}
			});
			$script.ready('forPaint', function () {
				for (var i = 0; i < forPaint.length; i++) {
					forPaint[i]();
				}
			});
		    xe.load.loadCss(cdn + '/v3.0/htmls/exam/css/leanModal.css')
				.loadCss(cdn + '/assets/ckeditor/plugins/codesnippet/lib/highlight/styles/monokai_sublime.css')
				.loadCss(cdn + '/v3.0/htmls/exam/lib/codemirror.css')
				.loadCss(cdn + '/CodeMirror/addon/hint/show-hint.css')
				.loadCss(cdn + '/v3.0/htmls/exam/addon/display/fullscreen.css');

			xe.load.loadCss(cdn + '/assets/jPainter/jquery-ui-1.11.0.custom/jquery-ui.css')
				.loadCss(cdn + '/assets/jPainter/jquery-ui-1.11.0.custom/jquery-ui.structure.css')
				.loadCss(cdn + '/assets/jPainter/colorpicker-master/jquery.colorpicker.css')
				.loadCss(cdn + '/assets/jPainter/jquery-ui-1.11.0.custom/jquery-ui.theme.css');
			$script.path('');

			$script([cdn + '/v3.0/htmls/exam/lib/codemirror.js'], function(){
				$script([cdn + '/v3.0/htmls/exam/mode/javascript/javascript.js'
					, cdn + '/v3.0/htmls/exam/mode/scheme/scheme.js'
					, cdn + '/v3.0/htmls/exam/addon/selection/active-line.js'
					, cdn + '/v3.0/htmls/exam/addon/display/fullscreen.js'
					, cdn + '/CodeMirror/addon/edit/matchbrackets.js'
					, cdn + '/CodeMirror/addon/hint/show-hint.js'
					, cdn + '/CodeMirror/addon/hint/javascript-hint.js'
					, cdn + '/CodeMirror/mode/javascript/javascript.js'
					, cdn + '/CodeMirror/addon/search/match-highlighter.js'], 'forCode');
			});
			$script([cdn + '/assets/jPainter/js/anyLine.js'], function () {
			    $script([cdn + '/assets/jPainter/js/canvas.js']
					, 'forPaint');
			});
		}, 1000);


	    /***** 弹出警示 *****/
		recBlur = function () {
		    if (examNotStart) { return;}
		    if (location.hash.indexOf("answer") > 0) {
		        if (blurTime) {
		            clearTimeout(blurTime);
		            blurTime = null;
		        }
		        $http.post('/cand/api/focusLog', {
		            paperId: App.paperId
                    , quesNo: App.rowNumber
                    , focus: 'QUES_BLUR'
		        }).success(function (data) {
		            if (!isNaN(data)) {
		                if (parseInt(data) < 5) {
		                    //弹出提示层
		                    if (isMobile) {
		                        cxalert('提示', '<div class="leaveMobile1"><div class="info"><div class="mess"><div class="line1"><i class="fa fa-tags"></i> 哎哟，离开页面被发现喽！</div><div class="line2">您已经离开页面 <span>' + data + '</span> 次 </div><div class="line3">离开次数将记录在您的考试成绩中，请遵守考试规则！</div></div></div></div>');
		                    } else {
		                        $.cxDialog.defaults.baseClass = "forWin";
		                        $.cxDialog.defaults.width = 800;
		                        $.cxDialog.defaults.height = 400;
		                        if (parseInt(data) == 0) {
		                            $.cxDialog({
		                                title: '',
		                                info: '<div class="leavepage1" style="width:800px;"><div class="info"><div class="mess"><div class="line1">哎哟，离开页面被发现喽！</div><div class="line2">您又跳出一次啦！</div><div class="line3">离开次数将记录在您的考试成绩中，请遵守考试规则！</div></div></div></div>',
		                                ok: function () {
		                                    $("#cxdialog").attr("style", "");
		                                    $.cxDialog.defaults.baseClass = '';
		                                    $.cxDialog.defaults.width = 0;
		                                    $.cxDialog.defaults.height = 0;
		                                },
		                                okText: '我知道了'
		                            });
		                        } else {
		                            $.cxDialog({
		                                title: '',
		                                info: '<div class="leavepage1" style="width:800px;"><div class="info"><div class="mess"><div class="line1">哎哟，离开页面被发现喽！</div><div class="line2">您已经离开页面 <span>' + data + '</span> 次 </div><div class="line3">离开次数将记录在您的考试成绩中，请遵守考试规则！</div></div></div></div>',
		                                ok: function () {
		                                    $("#cxdialog").attr("style", "");
		                                    $.cxDialog.defaults.baseClass = '';
		                                    $.cxDialog.defaults.width = 0;
		                                    $.cxDialog.defaults.height = 0;
		                                },
		                                okText: '我知道了'
		                            });
		                        }
		                        
		                        
		                    }

		                } else {
		                    if (isMobile) {
		                        cxalert('提示', '<div class="leaveMobile5"><div class="info"><div class="mess"><div class="line1"><i class="fa fa-tags"></i> 哎哟，黄牌警告喽！</div><div class="line2">您已经离开页面 <span>' + data + '</span> 次 </div><div class="line3">离开次数将记录在您的考试成绩中，超过<span style="font-weight:bold;">10</span>次会影响<br />您的考试成绩。请遵守考试规则！</div></div></div></div>');
		                    }
		                    else {
		                        $.cxDialog.defaults.baseClass = "forWin";
		                        $.cxDialog.defaults.width = 800;
		                        $.cxDialog.defaults.height = 400;
		                        $.cxDialog({
		                            title: '',
		                            info: '<div class="leavepage5"><div class="info"><div class="mess"><div class="line1">哎哟，黄牌警告喽！</div><div class="line2">您已经离开页面 <span>' + data + '</span> 次 </div><div class="line3">离开次数将记录在您的考试成绩中，超过<span style="font-weight:bold;">10</span>次会影响<br />您的考试成绩。请遵守考试规则！</div></div></div></div>',
		                            ok: function () {
		                                $("#cxdialog").attr("style", "");
		                                $.cxDialog.defaults.baseClass = '';
		                                $.cxDialog.defaults.width = 0;
		                                $.cxDialog.defaults.height = 0;

		                            },
		                            okText: '我知道了'
		                        });
		                    }
		                }
		            } else {
		                cxalert('提示', "网络链接错误，请检查网络故障！");
		            }
		            //alert('您已经跳出界面{0}次了！'.Format(data));
		        }).error(function (data) {
		            cxalert('提示', "网络链接错误，请检查网络故障！");
		            console.log(data);
		        });
		    }


		};
	}

]);