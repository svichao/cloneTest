
(function () {
    //build pages
    document.getElementById("stepNumber").innerHTML=document.getElementById("stepNumberTemp").innerHTML;

    drawStepNumber();

})();

//chart心率图
function drawStepNumber() {
    var cvs = document.getElementById("cvs");
    var ctx = cvs.getContext("2d");
    var winW = window.innerWidth;
    var W = 0.94 *winW;
    var w = 8.3 / 100 * W;

    //heart data
    var data1 = [];
    var data2 = [];
    for (var a = 0; a < 20; a++) {
        var b = parseInt(Math.random() * 15 + 65);
        data2.push(b);
        b += parseInt(Math.random() * 10 + 40);
        data1.push(b);
    }

    ctx.clearRect(0, 0, W, 120);
    ctx.fillStyle = "#fff";
    ctx.fill();

    drawChart(data1,"#3bda3b","#adf6ad");
    drawChart(data2,"#42b7d6","#83dbf2");

    function drawChart(data,lineColor, color1) {

        //linearGradient
        ctx.beginPath();
        ctx.strokeStyle = lineColor;
        var Y0 = 180 - data[0];
        var Yn = 180 - data[data.length-1];
        ctx.moveTo(0, Y0 );
        ctx.arc(0, Y0, 2.5, 0, Math.PI * 2);
        ctx.arc(0, Yn, 2.5, 0, Math.PI * 2);
        ctx.lineWidth = 1.5;
        ctx.stroke();

        ctx.lineWidth=3;
        for (var i = 0; i < data.length; i++) {
            Y = 180 - data[i];
            var nextX=(i + 1) * W/(data.length-1);
            var nextY = 180 - data[i + 1];
            ctx.lineTo(nextX, nextY);
        }
        ctx.stroke();
        ctx.strokeStyle = "transparent";
        ctx.lineTo(13 * w, 180);
        ctx.lineTo(0, 180);
        ctx.closePath();
        var grd = ctx.createLinearGradient(0, 0, 0, 180);
        grd.addColorStop(0, color1);
        grd.addColorStop(1,"#fff");
        ctx.fillStyle = grd;
        ctx.fill();


    }

    //table
    for (var y = 0; y < 6; y++) {
        for (var x = 0; x < 12; x++) {
            //console.log(x);
            ctx.beginPath();
            ctx.lineWidth=1;
            ctx.rect(x * w, y * 30, w, 30);
            ctx.strokeStyle = "#d4d2d1";
            ctx.stroke();
        }
    }
}
