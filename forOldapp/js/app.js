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
            console.log(m);
            loadJs(m);
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

            //var m = $scope.healItems[index].name;
            //loadJs(m);
        };
    })
    .controller("healthCtrl", function ($scope) {

    })
    .controller("heartRateCtrl", function ($scope) {
        $scope.$on('$viewContentLoaded',loadJs("heartRate"));
    })
    .controller("bloodPressureCtrl", function ($scope) {
        $scope.$on('$viewContentLoaded',loadJs("bloodPressure"));
    })
    .controller("stepNumberCtrl", function ($scope) {
        $scope.$on('$viewContentLoaded',loadJs("stepNumber"));
    })
    .controller("sleepCtrl", function ($scope) {
        $scope.$on('$viewContentLoaded',loadJs("sleep"));
    });

//加载js
function loadJs(m) {
    ajax({
        url: "js/" + m + ".js",//请求地址
        type: "GET",//请求方式
        dataType: "script",
        success: function (response, xml) {
            var script=document.createElement("script");
            script.innerHTML=response;
            document.body.appendChild(script);
            console.log('加载'+m+".js");
        },
        fail: function (status) {
        }
    })

}

//定义ajax：
function ajax(options){
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


