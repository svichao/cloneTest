
function getSongDetail(limit, offset, callback) {//回调函数在请求数据成功后执行
    var server = "http://api.imjad.cn/cloudmusic" || "/api/topPlayList.json";
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
            url:server+"/?type=playlist&id="+"id",/////////////
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

(function () {
    getUrlParams();
    console.log(getUrlParams().id);
})();