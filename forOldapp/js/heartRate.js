//chart心率图
(function () {
    var cvs = document.getElementById("cvs");
    var ctx = cvs.getContext("2d");
    var w = 8.5 / 100 * $(window).width();
    var W = 0.94 * $(window).width();
//console.log(w);

//heart data
    var data = [85, 75, 80, 100, 90, 80, 76, 84, 74, 80, 77, 83];

    ctx.clearRect(0, 0, W, 120);
    ctx.fillStyle = "#fff";
    ctx.fill();

    //linearGradient
    ctx.beginPath();
    ctx.strokeStyle = "transparent";
    var Y0 = (120 - data[0]) / 80;
    ctx.moveTo(0, Y0 * 120);
    for (i = 0; i < data.length; i++) {
        Y = (120 - data[i]) / 80;
        nextY = (120 - data[i + 1]) / 80;
        ctx.lineTo((i + 1) * w, nextY * 120);
    }
    ctx.lineTo(12 * w,120);
    ctx.lineTo(0,120);
    ctx.closePath();
    var grd = ctx.createLinearGradient(0,0,0,100);
    grd.addColorStop(0,"#3bbddc");
    grd.addColorStop(1,"#f0f9fc");
    ctx.fillStyle = grd;
    ctx.fill();

    //table
    for (var y = 0; y < 4; y++) {
        for (var x = 0; x < 11; x++) {
            //console.log(x);
            ctx.beginPath();
            ctx.rect(x * w, y * 30, w, 30);
            ctx.strokeStyle = "#d4d2d1";
            ctx.stroke();
        }
    }

    //dot
    ctx.strokeStyle = "#01CCE7";
    for (var i = 0; i < data.length; i++) {
        var Y = (120 - data[i]) / 80;
        var nextY = (120 - data[i + 1]) / 80;
        ctx.beginPath();
        ctx.arc(i * w, Y * 120, 2.5, 0, Math.PI * 2);
        ctx.lineTo((i + 1) * w, nextY * 120);
        ctx.lineWidth = 1.5;
        ctx.stroke();
    }
})();
