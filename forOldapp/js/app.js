var url = window.location.href;
var index = url.indexOf("#");
var homeUrl = url.substring(0, index) + "#/home";
var hash = url.substring(index);
if (hash != "#/home" && hash != "#" && hash != "#/")
    window.location.href = homeUrl;

var myapp = angular.module("myapp", ["ui.router"])
    .run(['$rootScope', '$window', '$location', '$log', '$templateCache', function ($rootScope, $window, $location, $log, $templateCache) {
        $rootScope.$on('$stateChangeSuccess', function ($rootScope) {
            $templateCache.removeAll();
        });
    }])
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
                },
                controller: "healthCtrl"
            })
            .state("health.heartRate", {
                url: "/heartRate", views: {
                    "health": {templateUrl: "views/health_heartRate.html"}
                },
                controller: "heartRateCtrl"
            })
            .state("health.bloodPressure", {
                url: "/bloodPressure", views: {
                    "health": {templateUrl: "views/health_bloodPressure.html"}
                },
                controller: "bloodPressureCtrl"
            })
            .state("health.stepNumber", {
                url: "/stepNumber", views: {
                    "health": {templateUrl: "views/health_stepNumber.html"}
                },
                controller: "stepNumberCtrl"
            })
            .state("health.sleep", {
                url: "/sleep", views: {
                    "health": {templateUrl: "views/health_sleep.html"}
                },
                controller: "sleepCtrl"
            })

            .state("found", {
                url: "/found", views: {
                    "": {templateUrl: "found.html"},
                },
                controller: "foundCtrl"
            })
/*
            .state("found.charity", {
                url: "/charity", views: {
                    "found": {templateUrl: "views/found_charity.html"}
                },
                controller: "charityCtrl"
            })
            .state("found.activity", {
                url: "/activity", views: {
                    "found": {templateUrl: "views/found_activity.html"}
                },
                controller: "activityCtrl"
            })
            .state("found.volunteer", {
                url: "/volunteer", views: {
                    "found": {templateUrl: "views/found_volunteer.html"}
                },
                controller: "volunteerCtrl"
            })
            .state("found.heart", {
                url: "/heart", views: {
                    "found": {templateUrl: "views/found_heart.html"}
                },
                controller: "heartCtrl"
            })
            .state("found.share", {
                url: "/share", views: {
                    "found": {templateUrl: "views/found_share.html"}
                },
                controller: "shareCtrl"
            })
*/

            .state("recommend", {url: "/recommend", templateUrl: "recommend.html"})

            .state("mine", {url: "/mine", templateUrl: "mine.html"})

    })
    .controller("myCtrl", function ($scope) {
        //----index----
        $scope.Items = [
            {ui_sref: "health", text: "健康", className: "ac", name: "heartRate", src1: "health_", src2: "blue"},
            {ui_sref: "found", text: "发现", className: "", name: "found", src1: "find_", src2: "grey"},
            {ui_sref: "recommend", text: "推荐", className: "", name: "", src1: "recom_", src2: "grey"},
            {ui_sref: "mine", text: "我的", className: "", name: "", src1: "mine_", src2: "grey"}
        ];
        $scope.init = function (index) {
            for (var i = 0; i < $scope.Items.length; i++) {
                $scope.Items[i].src2 = "grey"
            }
            $scope.Items[index].src2 = "blue";

            addClass($scope.Items, index);

            switch (index) {
                case 0:
                    $scope.healAddClass(0);
                    break
            }
            var m = $scope.Items[index].name;
            $scope.$on('$viewContentLoaded',  loadJs(m));
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
            addClass($scope.healItems, index);
            $scope.item = $scope.healItems[index].text;
        };
    })
    .controller("healthCtrl", function ($scope) {
    })
    .controller("heartRateCtrl", function ($scope) {
        $scope.$on('$viewContentLoaded', loadJs("heartRate"));
    })
    .controller("bloodPressureCtrl", function ($scope) {
        $scope.$on('$viewContentLoaded', loadJs("bloodPressure"));
    })
    .controller("stepNumberCtrl", function ($scope) {
        $scope.$on('$viewContentLoaded', loadJs("stepNumber"));
    })
    .controller("sleepCtrl", function ($scope) {
        $scope.$on('$viewContentLoaded', loadJs("sleep"));
    })
    .controller("foundCtrl", function ($scope) {
        $scope.foundItems = [
            {ui_sref: "found.charity", text: "慈善", className: "ac", name: "charity"},
            {ui_sref: "found.activity", text: "活动", className: "", name: "activity"},
            {ui_sref: "found.volunteer", text: "志愿者", className: "", name: "volunteer"},
            {ui_sref: "found.heart", text: "心语", className: "", name: "heart"},
            {ui_sref: "found.share", text: "分享", className: "", name: "share"}
        ];
        $scope.foundItem = "慈善";//初始
        $scope.foundAddClass = function (index) {
            addClass($scope.foundItems, index);
            $scope.foundItem = $scope.foundItems[index].text;

        }
    });


//addClass
function addClass(arr, index) {
    for (var i = 0; i < arr.length; i++) {
        arr[i].className = "";
    }
    arr[index].className = "ac";
}

//load js
function loadJs(m) {
    ajax({
        url: "js/" + m + ".js",//请求地址
        type: "GET",//请求方式
        dataType: "script",
        success: function (response, xml) {
            localStorage.script = response;
            var _script = document.getElementById("script");
            document.body.removeChild(_script);
            var script = document.createElement("script");
            script.innerHTML = response;
            script.id = "script";
            document.body.appendChild(script);
            console.log('加载' + m + ".js");
        },
        fail: function (status) {
        }
    })

}

//function ajax：
function ajax(options) {
    options = options || {};
    options.type = (options.type || "GET").toUpperCase();
    options.dataType = options.dataType || "json";
    var params = formatParams(options.data);

    //创建 - 非IE6
    if (window.XMLHttpRequest) {
        var xhr = new XMLHttpRequest();
    } else { //IE6及其以下版本浏览器
        xhr = new ActiveXObject('Microsoft.XMLHTTP');
    }

    //接收
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4) {
            var status = xhr.status;
            if (status >= 200 && status < 300) {
                options.success && options.success(xhr.responseText, xhr.responseXML);
            } else {
                options.fail && options.fail(status);
            }
        }
    };

    //连接 和 发送
    if (options.type == "GET") {
        xhr.open("GET", options.url + "?" + params, true);
        xhr.send(null);
    } else if (options.type == "POST") {
        xhr.open("POST", options.url, true);
        //设置表单提交时的内容类型
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        xhr.send(params);
    }
}
//格式化参数
function formatParams(data) {
    var arr = [];
    for (var name in data) {
        arr.push(encodeURIComponent(name) + "=" + encodeURIComponent(data[name]));
    }
    arr.push(("v=" + Math.random()).replace(".", ""));
    return arr.join("&");
}


