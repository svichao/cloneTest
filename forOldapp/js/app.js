var myapp = angular.module("myapp", ["ui.router"])
    .config(function ($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise("/home");
        $stateProvider.state("home", {//default
                url: "/home", views: {
                    "": {templateUrl: "health.html"},
                    "health@home": {templateUrl: "views/health_heartRate.html"}
                }
            })

            .state("health", {//点击health
                url: "/health", views: {
                    "": {templateUrl: "health.html"},
                    "health@health": {templateUrl: "views/health_heartRate.html"}
                }
            })
            .state("health.heartRate", {
                url: "/heartRate", views: {
                    "health": {templateUrl: "views/health_heartRate.html"}
                }
            })
            .state("health.bloodPressure", {
                url: "/bloodPressure", views: {
                    "health": {templateUrl: "views/health_bloodPressure.html"}
                }
            })
            .state("health.stepNumber", {
                url: "/stepNumber", views: {
                    "health": {templateUrl: "views/health_stepNumber.html"}
                }
            })
            .state("health.sleep", {
                url: "/sleep", views: {
                    "health": {templateUrl: "views/health_sleep.html"}
                }
            })

            .state("found", {url: "/found", templateUrl: "found.html"})

            .state("recommend", {url: "/recommend", templateUrl: "recommend.html"})

            .state("mine", {url: "/mine", templateUrl: "mine.html"})

    })
    .controller("myCtrl", function ($scope) {
        //----index----
        $scope.Items = [
            {ui_sref: "health", text: "健康", name: "heartRate"},
            {ui_sref: "found", text: "发现", name: ""},
            {ui_sref: "recommend", text: "推荐", name: ""},
            {ui_sref: "mine", text: "我的", name: ""}
        ];
        $scope.init = function () {
            $scope.healAddClass(0);
            var m = $scope.Items[0].name;
            loadJs(m)
        };

        //----healthCtrl----
        var date = new Date();
        $scope.month = date.getMonth() + 1;
        $scope.date = date.getDate();

        $scope.healItems = [
            {ui_sref: "health.heartRate", text: "心率", className: "ac", name: "heartRate"},
            {ui_sref: "health.bloodPressure", text: "血压", className: "", name: "bloodPressure"},
            {ui_sref: "health.stepNumber", text: "步数", className: "", name: "stepNumber"},
            {ui_sref: "health.sleep", text: "睡眠", className: "", name: "sleep"}
        ];
        $scope.item = "心率";//初始
        $scope.healAddClass = function (index) {
            for (var i = 0; i < $scope.healItems.length; i++) {
                $scope.healItems[i].className = "";
            }
            $scope.healItems[index].className = "ac";
            $scope.item = $scope.healItems[index].text;

            var m = $scope.healItems[index].name;
            loadJs(m)
        };
    })
    .controller("healthCtrl", function ($scope) {
        loadJs("heartRate");//初始
    });

//加载js
function loadJs(m) {
    $.ajax({
        url: "js/" + m + ".js",
        dataType: "script",
        success: function () {

        }
    })
}
