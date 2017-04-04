(function (){
    var tab_container=$(".tab_container");
    route("home",tab_container);
    var nav=$(".tab .nav");
    nav.find(".item").each(function (i) {
        $(this).click(function () {
            $(this).addClass("ac").siblings().removeClass("ac");
            $("#ht").animate({
                left:25*i+"%"
            },300);
            switch (i){
                case 0:
                    route("home",tab_container);
                    break;
                case 1:
                    route("allsong",tab_container);
                    break;
                case 2:
                    route("rank",tab_container);
                    break;
                case 3:
                    route("hotsinger",tab_container);
                    break;
            }
        })
    })
})();

