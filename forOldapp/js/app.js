var myapp = angular.module("myapp", ["ui.router"])
    .config(function ($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.when("", "/health");
        $stateProvider
            .state("health", {url: "/health", templateUrl: "health.html"})
            .state("health.heartRate", {url: "/heartRate", templateUrl: "views/health_heartRate.html"})
            .state("health.bloodPressure", {url: "/bloodPressure", templateUrl: "views/health_bloodPressure.html"})
            .state("health.stepNumber", {url: "/stepNumber", templateUrl: "views/health_stepNumber.html"})
            .state("health.sleep", {url: "/sleep", templateUrl: "views/health_sleep.html"})

            .state("found", {url: "/found", templateUrl: "found.html"})
            .state("recommend", {url: "/recommend", templateUrl: "recommend.html"})
            .state("mine", {url: "/mine", templateUrl: "mine.html"})
    })
    .controller("myCtrl", function () {

    })
    .controller("healthCtrl", function ($scope) {
        $scope.navItems = [
            {ui_sref: "health.heartRate", text: "心率", className: "ac"},
            {ui_sref: "health.bloodPressure", text: "血压", className: ""},
            {ui_sref: "health.stepNumber", text: "步数", className: ""},
            {ui_sref: "health.sleep", text: "睡眠", className: ""}
        ];
        $scope.item = $scope.navItems[0].text;
        $scope.addClass = function (index) {
            for (var i = 0; i < $scope.navItems.length; i++) {
                $scope.navItems[i].className = "";
            }
            $scope.navItems[index].className = "ac";
            $scope.item = $scope.navItems[index].text;
        }
    });
