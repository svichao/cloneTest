function getPlayList(limit, offset, callback) {//回调函数在请求数据成功后执行
    var server = "http://musicapi.duapp.com/api.php" || "api/topPlayList.json";
    limit = limit || 6;
    offset = offset || 0;
    //访问缓存
    if (isBoolean(offset)) {
        console.log("访问缓存");
        callback(JSON.parse(localStorage.playlists));
    } else {
        //访问服务器
        console.log("访问服务器");
        $.ajax({
            url: server + "?type=topPlayList&cat=%E5%85%A8%E9%83%A8&offset=" + offset + "&limit=" + limit,
            async: true,
            success: function (data) {
                if (data.code == 200) {
                    localStorage.playlists = JSON.stringify(data.playlists);//缓存到本地
                    localStorage.time = new Date().getTime();
                    callback && callback(data.playlists);//实参为json文件
                }
                countbottom = 0;//请求次数归零
            }
        })
    }
}
//判断本地缓存
function isBoolean(offset) {
    if (!localStorage.playlists)
        return false;
    if (new Date().getTime() - localStorage.time >= 5 * 60 * 1000)
        return false;
    if (offset || offset > 0)
        return false;
    return true;
}

//构造结构
function build(data) {
    var songlist = $("#songlist");
    var template = $(".template").html();
    for (var i = 0; i < data.length; i++) {
        var $template = $(template);
        $template.find("a").attr("href","#/")
            .find("img").attr("src", data[i].coverImgUrl).end()
            .find("div span").html((data[i].playCount / 10000).toFixed(2) + "万").end()
            .find("p").html(data[i].name).end()
            .on("click", function () {
                route("detail",$("#share"));
            })
            .appendTo(songlist);
    }
}

var countbottom = 0;//全局变量来控制请求次数

/********************自运行*********************/
//将数据生成结构并添加到html中
(function () {
    getPlayList(6, null, build);
    $(window).scroll(function () {
        var vh = $(window).height();
        var winScroll = $(window).scrollTop();
        var dif = $(document).height() - vh;
        if (winScroll == dif) {
            if (countbottom == 0) {
                var offset = parseInt(winScroll / vh) * 6;
                console.log(offset);
                getPlayList(6, offset, build);
            }
            countbottom++;
        }
    })

})();