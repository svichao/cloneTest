(function () {
    var items=document.getElementById("found_items");
    console.log(items);

    var aItem=items.getElementsByClassName("item");
    items.style.marginLeft=-100*index+"vw";

    addClass(aItem, index);
})();


