$("#text").on("keydown keyup",function(){
    var l=$(this).val().length;
    if(l>40){
        l=40;
        alert("超过字数限制");
    }
    $(".xianzhi span").text(function(){
        return l<10?"0"+l:l;
    })
});
$("#submit").click(function(){
    var val=$("#text").val();
    if(val===""){
        alert("请输入")
        return;
    }
    var data=getData();
    var date=new Date();
    var time=date.getTime();
    data.push({text:val,time,isDone:false,isStar:false,isDelete:false});
    saveData(data);
    $("#text").val("");
    $(".xianzhi span").text("00");
    alert("提交成功")
    reWrite();
});
/*$(".close").click(function(){
    $(".add").hide();
    $(".wait").show();
})*/
function getData(){
    if(localStorage.todo){
        return JSON.parse(localStorage.todo);
    }else{
        return [];
    }
}
function saveData(data){
    localStorage.todo=JSON.stringify(data);
}
function reWrite(){
    $(".item ul").empty();
    var data=getData();
    var str1="",str2="";
    $.each(data,function(index,value){
        if(value.isDone==false){
            str1+=`<li id="${index}">
                    <input type="checkbox">
                    <p>${value.text}</p>
                    <time><span class="iconfont">&#xe641;</span> ${time(value.time)}</time>
                    `
            if(value.isStar){
                str1+="<i class='iconfont star active'>&#xe65a;</i><>";
            }else{
                str1+="<i class='iconfont star'>&#xe65a;</i><>";
            }
        }else{
            str2+=`<li id="${index}">            
                    <input type="checkbox">
                    <p>${value.text}</p>
                    <time><span class="iconfont">&#xe641;</span> ${time(value.time)}</time>
                    <>
                    `
        };
    });
    $(".wait ul").html(str1);
    $(".done ul").html(str2);
}
reWrite();
function time(ms){
    var date=new Date();
    date.setTime(ms);
    var year=date.getFullYear();
    var month=addZero(date.getMonth()+1);
    var day=addZero(date.getDate());
    var hour=addZero(date.getHours());
    var minute=addZero(date.getMinutes());
    var second=addZero(date.getSeconds());
    return year+"/"+month+"/"+day+" "+hour+":"+minute+":"+second;
}
function addZero(num){
    return num<10?"0"+num:num;
}
$(".waitli").click(function(){
    $(".wait").show();
    $(".add").hide();
    $(".done").hide();
})
$(".doneli").click(function(){
    $(".done").show();
    $(".add").hide();
    $(".wait").hide();
})
$(".addli").click(function(){
    $(".item").hide(500).siblings(".add").show();
})
$(".move").click(function(){
    var data=getData();
    $(".wait ul li").each(function(index,ele){
        if($(this).find("input").prop("checked")){
            var index=$(this).attr("id");
            data[index].isDone=true;
        }
    });
    saveData(data);
    reWrite();
})
$(".clearbtn").click(function(){
    var data=getData();
    $(".done ul li").each(function(index,ele){
        if($(this).find("input").prop("checked")){
            var index=$(this).attr("id");
            data[index].isDelete=true;
        }
    });
    data=data.filter(function(ele){
        return !ele.isDelete;
    });
    saveData(data);
    reWrite();
})
$(".addbtn").click(function(){
    $(".item").hide().siblings(".add").show();
});
$(".wait ul").on("click","i",function(){
    var data=getData();
    var index=$(this).parent().attr("id");
    data[index].isStar=!data[index].isStar;
    saveData(data);
    reWrite();
});
$(".item ul p").on("click",function(){
    alert($(this).text());
});
