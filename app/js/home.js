function getPlayList(limit, callback) {//回调函数在请求数据成功后执行
    var server = "http://musicapi.duapp.com/api.php" || "api/topPlayList.json";
    limit = limit || 6;
    //访问缓存
    if (local()) {
        callback(JSON.parse(localStorage.playlists));
        console.log("访问缓存");
    } else {
        //访问服务器
        console.log("访问服务器");
        $.ajax({
            url: server + "?type=topPlayList&cat=%E5%85%A8%E9%83%A8&offset=0&limit=" + limit,
            async: true,
            success: function (data) {
                if (data.code == 200) {
                    localStorage.playlists = JSON.stringify(data.playlists);//缓存到本地
                    localStorage.time = new Date().getTime();
                    callback && callback(data.playlists);//实参为json文件
                }
            }
        })
    }
}
//判断本地缓存
function local() {
    if (!localStorage.playlists)
        return false;
    if (new Date().getTime() - localStorage.time >= 5* 60 * 1000)
        return false;
    return true;
    //return false
}

//将数据生成结构并添加到html中
(function () {
    getPlayList(6, function (data) {
        var songlist = $("#songlist");
        var template = $(".template").html();
        for (var i = 0; i < data.length; i++) {
            var $template = $(template);
            $template.find("img").attr("src", data[i].coverImgUrl).end()
                .find("div span").html((data[i].playCount/10000).toFixed(2)+"万" ).end()
                .find("p").html(data[i].name ).end()
                .appendTo(songlist);
        }
    });
})();


