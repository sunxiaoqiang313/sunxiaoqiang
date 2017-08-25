window.onload=function(){
	//banner
	{   
		const banner=document.querySelector(".banner");
		const center=document.querySelector(".banner .banner-center");
		const imgs=document.querySelectorAll(".banner-center .banner-img li");
		const dians=document.querySelectorAll(".banner-center .dian li");
        const colorarr=["#E8E8E8","#E8E8E8","#84CEF1","#284ECF","#F0F0F0"];
		dians.forEach(function(ele,index){
			ele.onmouseover=function(){
				for(var i=0;i<dians.length;i++){
					imgs[i].classList.remove("active");
					dians[i].classList.remove("active");
				}
				this.classList.add("active");
                imgs[index].classList.add("active");
                banner.style.background=colorarr[index];
                num=index;
			}
		})
        let num=0;
		let move=function(){
			num++;
			if(num==dians.length){
				num=0;
			}
			for(var i=0;i<dians.length;i++){
				imgs[i].classList.remove("active");
				dians[i].classList.remove("active");
			}
			imgs[num].classList.add("active");
			dians[num].classList.add("active");
			banner.style.background=colorarr[num];
		}
        let st=setInterval(move,3000);
        center.onmouseover=function(){
        	clearInterval(st)
        }
        center.onmouseout=function(){
        	st=setInterval(move,3000);
        }
	}
	//直播
	{
		const toplis=document.querySelectorAll(".modul .left .top li");
		const botlis=document.querySelectorAll(".modul .left .bottom ul li");
		const mask=document.querySelectorAll(".smak");
		const mao=document.querySelectorAll(".modul .left .bottom ul li .mao");
		botlis.forEach(function(ele,index){
			ele.onmouseover=function(){
				for(var i=0;i<botlis.length;i++){
					toplis[i].style.opacity="0"
                    mask[i].style.opacity="0";
                    mao[i].style.display="none"
				}
				toplis[index].style.opacity="1";
				mask[index].style.opacity="1";
                mao[index].style.display="block"
			}
		})
	}
	//广告
	{
		const ul=document.querySelector(".modul .left .bottom .guanggao .rig .gao");
		let num=0
		setInterval(function(){
			num++;
			if(num==4){
				num=0
			}
			ul.style.top=-num*40+"px";
		},3000)
	}
    /*头部加载*/
	{
		const navyd=document.querySelector(".nav-wrapper");
		const hs=document.querySelector(".head-seek");
		const huise=document.querySelector(".huise");
		let obj=document.body.scrollTop==0?document.documentElement:document.body;
		addEventListener("scroll",function(){
			if(obj.scrollTop>=huise.offsetTop){
				hs.style.height="50px";
				navyd.style.cssText="width:36px;height:332px";
			}else{
				hs.style.height="";
				navyd.style.cssText="";
			}
		})
	}
	/*跳转导航*/
	{
		const floors=document.querySelectorAll(".floor");
		const yds=document.querySelectorAll(".yd");
		let colorarr=["hotpink","dodgerblue","greenyellow","red","cyan","yellow","black"]
		let obj=document.documentElement.scrollTop==0?document.body:document.documentElement;
		addEventListener("scroll",function(){
			yds.forEach(function(ele,index){
				ele.onclick=function(){
					animate(obj,{scrollTop:floors[index].offsetTop-50},300)
				}
				if(obj.scrollTop>floors[index].offsetTop+50){
					for(let i=0;i<yds.length;i++){
						yds[i].style.background="";
					}
					yds[index].style.background=colorarr[index];
				}
			})
		})
	}
    /*返回顶部*/
	{
		const floor1=document.querySelector(".floor1");
		const yd1=document.querySelector(".yd1");
		let obj=document.documentElement.scrollTop==0?document.body:document.documentElement;
		addEventListener("scroll",function(){
				yd1.onclick=function(){
					animate(obj,{scrollTop:floor1.offsetTop},300)
				}
		})
	}
	/*侧边栏*/
	{
		const asides=document.querySelectorAll(".aside1 .a1");
		const yincangs=document.querySelectorAll(".yincang");
		//let st=setTimeout;
		asides.forEach(function(ele,index){
			ele.onmouseover=function(){
				//setTimeout(function(){
					yincangs[index].style.opacity="1";
					yincangs[index].style.transform="translateX(90px)";
				//},200)

			}
			ele.onmouseout=function(){
				//clearTimeout(st)
				yincangs[index].style.opacity="0";
				yincangs[index].style.transform="";
			}
		})

	}

	/*按需加载*/
	{
		let imgs=document.images;
		imgs=Array.from(imgs);
		let imgss=[];
		for(var i=0;i<imgs.length;i++){
			if(i>16){
				imgss.push(imgs[i]);
			}
		}
		window.addEventListener("scroll",function(){
			imgss.forEach(function(ele,index){
				let st=document.body.scrollTop;
				if(st+window.innerHeight>getPosition(ele)){
					ele.src=ele.getAttribute("date-src");
				}
			})
		})
		function getPosition(obj){
			let ot=obj.offsetTop;
			let parent=obj.offsetParent;
			while(parent!=null&&parent.nodeName!="BODY"){
				ot+=parent.offsetTop;
				parent=parent.offsetParent;
			}
			return ot;
		}

	}


























}