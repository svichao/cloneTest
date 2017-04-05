function getSongList(limit, offset, callback) {//回调函数在请求数据成功后执行
    var server = "http://musicapi.duapp.com/api.php" || "/api/topPlayList.json";
    limit = limit || 6;
    offset = offset || 0;
    //访问缓存
    if (isBoolean(offset)) {
        console.log("访问缓存");
        callback && callback(JSON.parse(localStorage.playlists));
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
            }
        })
    }
}
//判断本地缓存
function isBoolean(offset) {
    if (!localStorage.playlists)
        return false;
    if (new Date().getTime() - localStorage.time >= 2 * 60 * 1000)
        return false;
    if(offset||offset>0)
        return false;
    return true;
}

//构造结构
function buildAllSong(data) {
    var songlist = $("#songlist");
    var template = $(".template").html();
    for (var i = 0; i < data.length; i++) {
        var $template = $(template);
        $template.find("a").attr("href", "#detail/?id="+data[i].id).end()
            .find("img").attr("src", data[i].coverImgUrl).end()
            .find("div span").html((data[i].playCount / 10000).toFixed(2) + "万").end()
            .find("p").html(data[i].name).end()
            .on("click", function () {
                route("detail", $("#share"));
            })
            .appendTo(songlist);
    }
    countbottom = 0;//请求次数归零
}


/********************自运行*********************/
var countbottom = 0;//全局变量来控制请求次数

//将数据生成结构并添加到html中
(function () {
    countbottom = 0;//初始化
    getSongList(6, null, buildAllSong);
    var songHeight=$("#songlist").find(".item").eq(0).height();
    $(window).scroll(function () {
        var winHeight = $(this).height();
        var winScroll = $(this).scrollTop();
        var docHeight = $(document).height();
        var dif = docHeight - winHeight - winScroll;
        if (dif == 0) {
            countbottom++;
            if (countbottom == 1) {
                var offset = Math.ceil(winScroll / songHeight/3) * 6;
                getSongList(6, offset, buildAllSong);
            }
        }
    })
})();