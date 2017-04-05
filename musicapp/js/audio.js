
var audioController = {
	server: "http://musicapi.duapp.com/api.php",
	play: function (music){
		console.log(music);
		var audio_state = $("#audio_state");

		// 播放歌曲
		audio_state.html("歌曲加载中。。。。");
		$.ajax({
			type:"get",
			url:this.server+"?type=url&id="+music.id,
			async:true,
			success:function(data){
				if (data.code===200){		
					var audio = $("#audio").get(0);
					audio.src = data.data[0].url;
					audio.play();
					
					audio_state.html("歌曲加载成功");
				}
			}
		});
		
		// 显示歌曲
		$("#audio_name").html(music.name);
	}
};

(function(){
	
})();
