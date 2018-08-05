window.onload = function(){
	var main = document.querySelector('main');
	var mainstyle = main.style;
	var sections = document.querySelectorAll('main section');
	var sectionsLength = sections.length;
	var navSvg = document.querySelector('nav svg');
	var navPaths = document.querySelectorAll('nav path');
	var pagenav = document.querySelector('#pagenav');
	var navs = document.querySelectorAll('#pagenav li');
	var navsA = document.querySelectorAll('#pagenav a');
	var skillcards = document.querySelectorAll('.skillcard');
	var skillcardsLength = skillcards.length;
	var skillcard;
	var mottos = document.querySelectorAll("#motto span");
	var h2s = document.querySelectorAll("main h2");
	var icon = document.querySelector("#icon");
	var exs = document.querySelectorAll(".ex");
	var workH3 = document.querySelector("#work h3 span");
	var scrollButton = document.querySelector('#scrollButton');
	var aboutH3 = document.querySelector("#about h3 span");

	var winH=0;
	var winW=0;

	var now = 0;
	var prev = 0
	var ingTimer;

	var i;

	resizeEvent();

	setTimeout(function(){
		sections[0].classList.add("active");
	},1);

	for(i=0;i<sectionsLength;i++){
		navsA[i].onclick = function(e){
			e.preventDefault();
			prev = now;
			now = parseInt(this.getAttribute("no"));
			pageMove();
		}
	}

	navSvg.onclick = function(e){
		e.preventDefault();
		navSvg.setAttribute("class",'close');
		setTimeout(function(){navSvg.setAttribute('class',"");},300);
		pagenav.classList.toggle('active');
	}

	scrollButton.onclick = function(e){
		if(now == sectionsLength - 1)return;
		prev = now;
		now++;
		pageMove();
	}

	function pageMove(){
		mainstyle.top = -winH * now + "px";
		sections[now].classList.add("active");
		sections[prev].classList.remove("active");

		switch(now){
			case 1:
				for(i=0;i<exs.length;i++){
					exs[i].style.transition = "transform 1s "+i*200+"ms";
				}
				break;
			case 2:
				for(i=0;i<skillcardsLength;i++){
					skillcards[i].style.transition = "top 1s "+i*50+"ms,opacity 1s "+i*100+"ms";
				}
				break;
		}
		switch(prev){
			case 1:
				for(i=0;i<exs.length;i++){
					exs[i].style.transition = "";
				}
				break;
			case 2:
				for(i=0;i<skillcardsLength;i++){
					skillcards[i].style.transition = "top 1s,opacity 1s";
				}
				break;
		}

		navs[prev].classList.remove("active");
		navs[now].classList.add("active");
		navPaths[prev].setAttribute("class","");
		navPaths[now].setAttribute("class","active");
		if(now == sectionsLength - 1){
			scrollButton.classList.add('end');
		}else if(prev == sectionsLength - 1){
			scrollButton.classList.remove('end');
		}
		clearTimeout(ingTimer);
		ingTimer = setTimeout(function(){main.removeAttribute("ing");},500);
	}


	var WHEEL_EVENT = 'onwheel' in document?'onwheel':'onmousewheel';
	document[WHEEL_EVENT] = function(e){
		e.preventDefault();

		var delta = e.deltaY?-e.deltaY:e.wheelDelta;
		prev = now;

		if (delta < 0 && now < 4 && main.getAttribute("ing") != "down"){//down
			now++;
			main.setAttribute("ing","down");
		} else if (delta > 0 && now > 0 && main.getAttribute("ing") != "up"){//up
			now--;
			main.setAttribute("ing","up");
		}
		if(prev != now){
			pageMove();
		}
	}


  window.addEventListener("touchstart",touchStart);

  function touchStart(e){
	  // e.preventDefault();
	  touchStartY = e.touches[0].pageY;
	  window.addEventListener("touchmove", touchMove);
  }

  function touchMove(e){
	  // e.preventDefault();
	  touchMoveY = e.changedTouches[0].pageY;

		prev = now;
		if (touchStartY > touchMoveY + 50 && now < 4 && main.getAttribute("ing") != "down"){//down
			now++;
			main.setAttribute("ing","down");
		} else if (touchStartY +50 < touchMoveY && now > 0 && main.getAttribute("ing") != "up"){//up
			now--;
			main.setAttribute("ing","up");
		}
		if(prev != now){
			window.removeEventListener("touchmove",touchMove);
			pageMove();
		}
  }

  window.addEventListener("resize",resizeEvent);

	function resizeEvent(){
		winH = window.innerHeight;
		winW = window.innerWidth;

		for(i=0;i<sectionsLength;i++){
			sections[i].style.height = winH+"px";
			sections[i].style.display = "block";
		}

		var sw;
		var sh;
		var ss;
		var sww;
		var shh;
		for(i=0;i<skillcardsLength;i++){
			skillcard = skillcards[i]
			sw = skillcard.clientWidth -20;
			sh = skillcard.clientHeight -20;
			ss = skillcard.querySelector("span");
			sww = sw/ss.clientWidth;
			shh = sh/ss.clientHeight;
			if(sww > shh)sww = shh;
			ss.style.transform = "translate(-50%,-50%) scale("+sww+","+sww+")";
		}

		var h2H = 0;
		var h2W = 0;
		for(i=0;i<sectionsLength;i++){
			h2H = h2s[i].clientHeight;
			h2W = h2s[i].clientWidth;
			var ww = winW / h2W;
			h2s[i].style.transform = "scale("+ww+","+ww+")";
			h2s[i].style.top = ww*h2H+"px";
		}

		mainstyle.top = -winH * now + "px";

		var ratio = (workH3.parentNode.clientWidth-10) / workH3.clientWidth;
		workH3.style.transform = "scale("+ratio+","+ratio+")";

		ratio = (aboutH3.parentNode.clientWidth-10) / aboutH3.clientWidth;
		aboutH3.style.transform = "scale("+ratio+","+ratio+")";
	}
}

