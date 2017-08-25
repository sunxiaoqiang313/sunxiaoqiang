window.onload = function () {
    /*导航*/
    {
        const lis = document.querySelectorAll(".nav li");
        const xiala = document.querySelector(".xiala");
        lis.forEach(function (ele, index) {
            ele.onmouseover = function () {
                xiala.classList.add("bt");
                xiala.style.height = "229px";
            }
            ele.onmouseout = function () {
                xiala.classList.remove("bt");
                xiala.style.cssText = "";
            }
        })
        xiala.onmouseover = function () {
            xiala.classList.add("bt");
            xiala.style.height = "229px";
        }
        xiala.onmouseout = function () {
            xiala.classList.remove("bt");
            xiala.style.cssText = "";
        }
    }
    /*banner*/
    {
        const banner = document.querySelector(".banner .right");
        const imglis = document.querySelectorAll(".banner .right .imgbox li");
        const dianlis = document.querySelectorAll(".banner .right .dianbox li");
        const left = document.querySelector(".banner .last");
        const right = document.querySelector(".banner .next");
        dianlis.forEach(function (ele, index) {
            ele.onmouseover = function () {
                for (var i = 0; i < dianlis.length; i++) {
                    imglis[i].classList.remove("active");
                    dianlis[i].classList.remove("hot");
                }
                imglis[index].classList.add("active");
                dianlis[index].classList.add("hot");
                num = index;
            }
        })
        let num = 0;
        let move = function () {
            num++;
            if (num == dianlis.length) {
                num = 0;
            }
            if (num == -1) {
                num = dianlis.length - 1;
            }
            for (var i = 0; i < dianlis.length; i++) {
                imglis[i].classList.remove("active");
                dianlis[i].classList.remove("hot");
            }
            imglis[num].classList.add("active");
            dianlis[num].classList.add("hot");
        }
        let st = setInterval(move, 3000);
        banner.onmouseover = function () {
            clearInterval(st);
        }
        banner.onmouseout = function () {
            st = setInterval(move, 3000);
        }
        left.onclick = function () {
            num -= 2;
            move();
        }
        right.onclick = function () {
            move();
        }
    }
    /*小米明星单品*/
    {
        const ul = document.querySelector(".carousel ul");
        const sp = document.querySelector("h2.title");
        const left = document.querySelector(".title .left")
        const right = document.querySelector(".title .right")
        let num = 0;
        let kaiguan;
        let st = setInterval(move, 3000);

        function move() {
            num++;
            ul.style.left = (num % 2) * -1240 + "px";
        }

        addEventListener("transitionend", function () {
            kaiguan = true;
        })
        sp.onmouseover = function () {
            clearInterval(st)
        }
        sp.onmouseout = function () {
            st = setInterval(move, 3000);
        }
        left.onclick = function () {
            if (kaiguan) {
                kaiguan = false;
                ul.style.left = -1240 + "px";
            }
        }
        right.onclick = function () {
            if (kaiguan) {
                kaiguan = false;
                ul.style.left = "0";
            }
        }
    }
    /*内容*/
    {
        const banner=document.querySelector(".content-list .content-item");
        const ul = document.querySelector(" .content-item .item-list");
        const dians = document.querySelectorAll(" .content-item .xm .dian");
        const prev = document.querySelector(" .content-item .left");
        const next = document.querySelector(" .content-item .right");
        dians.forEach(function (ele, index) {
            ele.onclick = function () {
                for(var i=0;i<dians.length;i++){
                    dians[i].classList.remove("hot")
                }
                ul.style.left = -index * 296 + "px";
                this.classList.add("hot")
                num = index;
            }
        })
        let num = 0;
        prev.onclick = function () {
            num--;
            if (now < 0) {
                num=0;
                return;
            }
            ul.style.left = num * 296 + "px";
        }
        next.onclick = function () {
            num++;
            if (num > dians.length-1) {
                num = dians.length-1;
                return;
            }
            ul.style.left = -num * 296 + "px";
        }

    }


}