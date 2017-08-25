var st;
$("#start").click(function () {
    $(this).css("display", "none");
    drawSnack();
    createFood();
    st = setInterval(move, 500)
})
$("#pause").click(function () {
    alert("继续");
    //clearInterval(st);
})

for (var i = 0; i < 24; i++) {
    for (var j = 0; j < 24; j++) {
        $("<div></div>").addClass("block").attr("id", j + "-" + i).appendTo(".scene");
    }
}
var snackArr = [{x: 0, y: 0}, {x: 1, y: 0}, {x: 2, y: 0}];
var snackHead = snackArr[snackArr.length - 1];

function drawSnack() {
    $(".snackbody").removeClass("snackbody");
    $(".snackhead").removeClass("snackhead");
    $.each(snackArr, function (index, value) {
        $("#" + value.x + "-" + value.y).addClass("snackbody");
    });
    $("#" + snackHead.x + "-" + snackHead.y).addClass("snackhead");
}

function createFood() {
    do {
        var rx = Math.floor(Math.random() * 20);
        var ry = Math.floor(Math.random() * 20);
    } while ($("#" + rx + "-" + ry).hasClass("snackbody"));
    $("#" + rx + "-" + ry).addClass("food");
}

var dir = "r";
$(document).keydown(function (e) {
    switch (e.keyCode) {
        case 65:
        case 37:
            dir = "l";
            break;
        case 87:
        case 38:
            dir = "t";
            break;
        case 68:
        case 39:
            dir = "r";
            break;
        case 83:
        case 40:
            dir = "b";
            break;
    }
});

function move() {
    switch (dir) {
        case "r":
            snackHead = {x: snackHead.x + 1, y: snackHead.y};
            break;
        case "l":
            snackHead = {x: snackHead.x - 1, y: snackHead.y};
            break;
        case "t":
            snackHead = {x: snackHead.x, y: snackHead.y - 1};
            break;
        case "b":
            snackHead = {x: snackHead.x, y: snackHead.y + 1};
            break;
    }
    snackArr.push(snackHead);
    var head = $("#" + snackHead.x + "-" + snackHead.y);
    var scorenum = snackArr.length - 4;
    var statenum = Math.ceil((scorenum + 1) / 5);
    $("#score").html(scorenum);
    $("#state").html(statenum);
    if (head.hasClass("snackbody") || head.length === 0) {
        alert(`漂亮 得${scorenum}分`);
        location.reload();
    }
    if (head.hasClass("food")) {
        head.removeClass("food");
        createFood();
    } else {
        snackArr.shift();
    }
    drawSnack();
}



