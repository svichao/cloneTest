function getSongDetail(id, callback) {//回调函数在请求数据成功后执行
    var server = "https://api.imjad.cn/cloudmusic" || "/api/playlist.json";
    console.log("访问服务器");//访问服务器
    $.ajax({
        type:"get",
        url: server + "/?type=playlist&id=" + id,//
        async: true,
        success: function (data) {
            if (data.code == 200) {
                localStorage.detaillist = JSON.stringify(data.playlist.tracks);//缓存到本地
                localStorage.detailtime = new Date().getTime();
                callback && callback(data.playlist);//实参为json文件
            }
        }
    })
}

function buildDetail(data) {
    var tracks = data.tracks;
    console.log(tracks.length);
    var avatarUrl = data.avatarUrl;
    var nickname = data.nickname;
    var playCount = data.playCount;
    var name = data.name;
    var musiclist = $("#musiclist");
    var template1 = $(".template1").html();
    var $template1 = $(template1);
    var template2 = $(".template2").html();
    $template1.find(".info span").html((playCount / 10000).toFixed(2) + "万").end()
        .find(".name span").html(name).end()
        .find(".name img").attr("src", avatarUrl).end()
        .find(".name i").html(nickname).end()
        .appendTo(musiclist);
    for (var i = 0; i < tracks.length; i++) {
        var music=tracks[i];
        var $template2 = $(template2);
        $template2.find(".No").html(i+1).end()
            .find(".singer .music").html(music.name).end()
            .find(".singer span").html(music.ar[0].name).end()
            .appendTo(musiclist);

        $template2.data("music", music).click(function(){
            var m = $(this).data("music");
            audioController.play(m);
            $("#global").show();
        });
    }
}

(function () {
    var p = getUrlParams();
    console.log(p);
    getSongDetail(p.id, buildDetail)

})();