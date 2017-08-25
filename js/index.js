$(function () {
    $('#dowebok').fullpage({
        sectionsColor: ['#1bbc9b', '#4BBFC3', '#7BAABE', '#f90'],
        anchors: ['page1', 'page2', 'page3', 'page4'],
        menu: '#menu',
        afterLoad: function (anchorLink, index) {
            if(index==3){
                
            }
            if (index == 2) {
                let canvas = $("canvas");
                for (let i = 0; i < canvas.length; i++) {
                    let ctx = canvas[i].getContext('2d');
                    if (i == 0) {
                        jingdu(ctx, 85)
                    } else if (i == 1) {
                        jingdu(ctx, 90)
                    } else if (i == 2) {
                        jingdu(ctx, 85)
                    } else if (i == 3) {
                        jingdu(ctx, 80)
                    }
                }
            }
        }
    });

    function jingdu(ctx, score) {
        let t;
        let num = 0;
        ctx.lineWidth = 20;
        ctx.strokeStyle = 'green';
        ctx.lineCap = "round"
        ctx.textAlign = 'center';
        ctx.font = 'bold 40px 宋体';
        ctx.textBaseline = 'middle';
        t = setInterval(farme, 30);
        function farme() {
            ctx.clearRect(0, 0, 300, 300);
            num++;
            if (num == score) {
                clearInterval(t);
            }
            let angle = (num * 360 / 100 - 90) / 180 * Math.PI;
            ctx.beginPath();
            ctx.arc(150, 150, 100, -Math.PI / 2, angle);
            ctx.stroke();
            ctx.fillText(`${num}%`, 150, 150)
        }
    }


   //钟表
    let inner=document.querySelector(".inner");
    for(var i=0;i<60;i++){
        let kd=document.createElement("div");//创建点
        kd.style.cssText=`width:2px;height:5px;background:#000;position:absolute;top:0;left:99px;transform-origin:1px 100px;transform:rotate(${i*6}deg)`
        if(i%5==0){
            kd.style.height="8px";
        }
        inner.appendChild(kd);
    }
    for(var i=1;i<=12;i++){
        let r=85;
        let x=r*Math.cos((i*30-90)*Math.PI/180);
        let y=r*Math.sin((i*30-90)*Math.PI/180);
        let num=document.createElement("div");//创建数字
        num.style.cssText=`font-size:14px;position:absolute;top:91px;left:95px;transform:translate(${x}px,${y}px);`
        num.innerHTML=`${i}`;
        inner.appendChild(num);
    }
    let point=document.createElement("div");
    point.style.cssText="width:10px;height:10px;background:#333;border-radius:50%;position:absolute;top:95px;left:95px"
    inner.appendChild(point);
    let point1=document.createElement("div");
    point1.style.cssText="width:4px;height:4px;background:red;border-radius:50%;position:absolute;top:98px;left:98px;z-index:1"
    inner.appendChild(point1);
    let hourPointer=document.createElement("div");//创建时针
    let minutePointer=document.createElement("div");//创建分针
    let secondPointer=document.createElement("div");//创建秒针
    setInterval(time,1000);
    time();
    function time(){
        let now=new Date();
        let hournum=now.getHours();
        let minutenum=now.getMinutes();
        let secondnum=now.getSeconds();

        hourPointer.style.cssText=`width:6px;height:60px;background:black;border-radius:6px 6px 0px 0px;position:absolute;top:40px;left:97px;transform-origin:bottom center;transform:rotate(${hournum*30+minutenum*0.5}deg)`
        inner.appendChild(hourPointer);

        minutePointer.style.cssText=`width:4px;height:70px;background:black;border-radius:4px 4px 0px 0px;position:absolute;top:30px;left:98px;transform-origin:bottom center;transform:rotate(${minutenum*6}deg)`
        inner.appendChild(minutePointer);

        secondPointer.style.cssText=`width:2px;height:90px;background:red;border-radius:2px;position:absolute;top:10px;left:99px;transform-origin:bottom center;transform:rotate(${secondnum*6}deg)`
        inner.appendChild(secondPointer);
    }
    

});
