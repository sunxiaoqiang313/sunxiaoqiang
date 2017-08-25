var provinces = [];
var citys = [];
var data = [];
$.ajax({
    url: "http://api.jisuapi.com/weather/city",
    data: {appkey: "b5f3adca61a07d6f"},
    dataType: "jsonp",
    success: function (r) {
        data = r.result;
        //得到省级
        provinces = $.grep(data, function (value) {
            if (value.parentid === "0") {
                return true;
            }
        });
        $.each(provinces, function (index, value) {
            $("<option>").html(value.city).val(value.cityid).appendTo(".header #province");
            //console.log(value)
        });
    }
});
//得到城市
$("#province").on("change blur", function () {
    var id = $(this).val();
    citys = $.grep(data, function (value) {
        if (value.parentid === id) {
            return true;
        }
    });
    $("#city").empty();
    $.each(citys, function (index, value) {
        $("<option>").html(value.city).val(value.cityid).appendTo(".header #city");
        //console.log(value)
    });
});

var str="";
var str1="";
$.ajax({
    url: "http://api.jisuapi.com/weather/query?appkey=yourappkey&city=北京",
    data: {appkey: "b5f3adca61a07d6f"},
    dataType: "jsonp",
    success: function (r) {
        var value = r.result;
        //console.log(value)
        value.daily.shift();
        $("#date").html(value.date);
        $("#week").html(value.week);
        $("#weat").html(value.weather);
        $("#direct").html(value.winddirect);
        $("#img").attr('src',"img/weathercn/"+value.img+".png");
        $.each(value.daily,function(index,value){
           str+=`
                <li>
                <p class="date1">${value.date}</p>
                <p class="week1">${value.week}</p>
                <p class="direct1">${value.day.weather}</p>
                <p class="weat1">${value.day.windpower}</p>
                <div class="imgbox"><img src="img/weathercn/${value.day.img}.png" alt=""></div>
                </li>`;
        });
        $("#weilai").empty();
        $("#weilai").html(str);
    }
});

$("#city").on("change blur", function () {
    var id1 = $(this).val();
    var ctiyq = $(this).find("option:selected").text();
    //console.log(citys);
    $.ajax({
        url: "http://api.jisuapi.com/weather/query?&city=" + ctiyq,
        data: {appkey: "b5f3adca61a07d6f"},
        dataType: "jsonp",
        success: function (r) {
            var value = r.result;
            value.daily.shift();
            //console.log(value);
            $("#date").html(value.date);
            $("#week").html(value.week);
            $("#weat").html(value.weather);
            $("#direct").html(value.winddirect);
            $("#img").attr('src',"img/weathercn/"+value.img+".png");
            str1="";
            $.each(value.daily,function(index,value){
                str1+=`
                <li>
                <p class="date1">${value.date}</p>
                <p class="week1">${value.week}</p>
                <p class="direct1">${value.day.weather}</p>
                <p class="weat1">${value.day.windpower}</p>
                <div class="imgbox"><img src="img/weathercn/${value.day.img}.png" alt=""></div>
                </li>`;
            });
            $("#weilai").empty();
            $("#weilai").html(str1);
        }
    })
});
