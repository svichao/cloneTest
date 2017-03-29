//angular module
var myapp = angular.module("myapp", ["ngRoute"])
    //route
    .config(function ($routeProvider) {
        $routeProvider
            .when("/", {templateUrl: "views/health_heartRate.html", controller: "heartRateCtrl"})
            .when("/heartRate", {templateUrl: "views/health_heartRate.html", controller: "heartRateCtrl"})
            .when("/bloodPressure", {templateUrl: "views/health_bloodPressure.html", controller: "bloodPressureCtrl"})
            .when("/stepNumber", {templateUrl: "views/health_stepNumber.html", controller: "stepNumberCtrl"})
            .when("/sleep", {templateUrl: "views/health_sleep.html", controller: "sleepCtrl"})
    })
    .controller("myCtrl", function ($scope) {//health---header
        $scope.navItems = [
            {href: "#/heartRate", text: "心率", className: "ac"},
            {href: "#/bloodPressure", text: "血压", className: ""},
            {href: "#/stepNumber", text: "步数", className: ""},
            {href: "#/sleep", text: "睡眠", className: ""}
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
