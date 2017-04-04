/*************网易云音乐项目*************/
function getUrlParams() {
    var params = {};
    var url = window.location.href;

    var p = url.split("#");
    console.log(p)
    if (p.length == 2) {
        p = p[1];
    } else {
        p = url;
    }

    p = url.split("?");
    params.anchor = p[0];
    if (p.length < 2) {
        return params;
    }

    p = p[1].split("&");
    for (var i = 0; i < p.length; i++) {
        var kv = p[i].split("=");
        params[kv[0]] = kv[1];
    }
    return params;
}

function GetQueryString(key)
{
    var reg = new RegExp("(^|&)"+ key +"=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if(r!=null)
        return  decodeURI(r[2]);
}

//设置路由
function route(m, container) {
    container = container || $("#share");
    $.ajax({
        url: "views/" + m + ".html",
        success: function (data) {
            container.html(data);
            loadJS(m);
        }
    });
}

//加载js
function loadJS(m) {
    $.ajax({
        url: "js/" + m + ".js",
        dataType: "script",
        success: function () {
        }
    })
}

$(function () {
    //本地储存localStorage
    /*if (!localStorage.count)
        localStorage.count = 1;
    localStorage.count++;
    if (localStorage.count == 1) {
        route("guide");
    } else {
        route("tab");
    }*/
    route("tab");
    route("audio",$("#global"))
});