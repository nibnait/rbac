/**
 * Created by lifubang on 2015/6/24.
 */
app.register('myPhotoController', ['$scope', '$http', '$state', '$location', '$timeout', 'App',
    function ($scope, $http, $state, $location, $timeout, App) {
        $('#navTab').show();
        selTab('myPhoto');
        $scope.App = App;
        window.scrollTo(0, 0);


        $timeout(function () {
            $(".innerInfo .stepinfo .toolguider .bottom.nocamera").click(function () {
                if (top.ACMGlobal.camera) {
                    $.cookie("photoPageTip", "1");
                }
                if ($.cookie("photoPageTip") == null) {
                    $.cookie("photoPageTip", "1");
                    initLoadMyPhoto();
                    $(".monitor .monitorBox").addClass("heightLimited");
                } else {
                    gotoHash('#/main/rules');
                }
            });
        });


    }
]);