var audioController={
    server:"http://musicapi.duapp.com/api.php",
    play: function () {
        $.ajax({
            type:"get",
            url:this.server+"?type=url&id=299594",
            async:true,
            success: function (data) {
                if (data.code==200){
                    //$("#audio").prop("src",data.data[0].url).play();
                    var audio=$("#audio").get(0);
                    audio.src=data.data[0].url;
                    audio.play();
                }
            }
        })
    }
};

(function () {

}());