//判断和限制字数的
$(".text").on("keydown keyup", function () {
    var l = $(this).val().length;
    if (l > 40) {
        alert("字数已经超过限制");
        l = 40;
        $(this).val(function (index, val) {
            return val.slice(0, 40);
        })
    }
    $(".xianzhi span").text(function () {
        return l < 10 ? "0" + l : l;
    });
})

//打开待办事项
$(".daiban").click(function () {
    $(".add").slideUp(500);
    $(".done").slideUp(500);
    $(".wait").delay(500).slideDown(300);
    $(".close").css("display", "none");
})

//打开已完成事项
$(".yiwan").click(function () {
    $(".add").slideUp(500);
    $(".wait").slideUp(500);
    $(".done").delay(500).slideDown(300);
    $(".close").css("display", "none");
})

//关闭添加页面
$(".close").click(function () {
    $(".add").slideUp(500);
    $(".wait").delay(500).slideDown(300);
    $(this).css("display", "none");
})

//跳转到添加页面
$(".addbtn").click(function () {
    $(".wait").slideUp(500);
    $(".done").slideUp(500);
    $(".add").delay(500).slideDown(300);
    $(".close").css("display", "block");
})

//点击提交
$("#submit").click(function () {
    var val = $(".text").val();
    if (val == "") {
        alert("请输入内容之后再提交");
        return;
    }
    var data = getDate();
    var date = new Date();
    var time = date.getTime();
    data.push({text: val, time, isDone: false, isStar: false,isDelete:false})
    saveDate(data);
    $(".text").val("");
    $(".xianzhi span").text("00");
    alert("提交成功");
    reWrite();
})

//获取信息的函数
function getDate() {
    if (localStorage.todo) {
        return JSON.parse(localStorage.todo)
    } else {
        return [];
    }
}

//保存信息的函数
function saveDate(data) {
    localStorage.todo = JSON.stringify(data);
}

//重绘页面
function reWrite() {
    $(".item").empty();
    var data = getDate();
    var str1 = "", str2 = "";
    $.each(data, function (index, value) {
        if (value.isDone == false) {
            str1 += `
               <li id="${index}">
                    <input type="checkbox">
                    <p>${value.text}</p>
                    <time>${time(value.time)}</time>`
            if (value.isStar) {
                str1 += "<i class='iconfont active'>&#xe622;</i>";
            } else {
                str1 += "<i class='iconfont'>&#xe622;</i>";
            }
        } else {
            str2 += `
                <li id="${index}">
                    <input type="checkbox">
                    <p>${value.text}</p>
                    <time>${time(value.time)}</time>
                    <i class="iconfont">&#xe622;</i>
                </li>`;
        }
    })
    $(".wait ul").html(str1);
    $(".done ul").html(str2);
}
reWrite()

//时间处理函数
function time(ms) {
    var date = new Date();
    date.setTime(ms);
    var year = date.getFullYear();
    var month = addZero(date.getMonth() + 1);
    var day = addZero(date.getDate());
    var hour = addZero(date.getHours());
    var min = addZero(date.getMinutes());
    var sec = addZero(date.getSeconds());
    return year + "/" + month + "/" + day + "/" + hour + "/" + min + "/" + sec;
}
function addZero(num) {
    return num < 10 ? "0" + num : num;
}
//time(1321314165465)

//移动到已完成事件
$(".movebtn").click(function () {
    var data = getDate();
    $(".wait ul li").each(function (index, ele) {
        if ($(this).find("input").prop("checked")) {
            var index = $(this).attr("id");
            data[index].isDone = true;
        }
    })
    saveDate(data);
    reWrite();
})

//删除已完成
$(".clearbtn").click(function () {
    var data = getDate();
    console.log(data);
    $(".done ul li").each(function (index, ele) {
        if ($(this).find("input").prop("checked")) {
            var index = $(this).attr("id");
            data[index].isDelete = true;
        };
    });
    data = data.filter(function (ele) {
        return !ele.isDelete;
    });
    saveData(data);
    reWrite();
})

//点击星号事件
$(".wait ul").on("click","i",function () {
    var data=getData();
    var index=$(this).parent().attr("id");
    data[index].isStar=!data[index].isStar;
    saveData(data);
    reWrite();
})
$(".done ul").on("click","i",function () {
    var data=getData();
    var index=$(this).parent().attr("id");
    data[index].isStar=!data[index].isStar;
    saveData(data);
    reWrite();
})
//内容过长弹出框
$(".wait ul li p").on("click",function () {
    $(".overText").fadeToggle(400)
    $(".overText").text($(this).text());
});
$(".done ul li p").on("click",function () {
    $(".overText").fadeToggle(400)
    $(".overText").text($(this).text());
});
