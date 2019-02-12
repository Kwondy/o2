$(document).ready(function(e) {
   
	/************************ 메인 최상단 팝업대체 슬라이드 배너 **************************/	
    $('#topSliderBanner').before('<div id="topSliderBanner_nav">');
	$('#topSliderBanner').cycle({ 
		fx:     'scrollHorz', /*fade, fadeout, none, scrollHorz, scrollVert */
		slides: 'li',
		swipe: true,		
		timeout: 5000,
		speed:  800,
        pager:  '#topSliderBanner_nav'
	});			
    //메인 최상단 팝업대체 슬라이드 재생,정지 동적생성	
	$("#topSliderBanner_nav").append('<a href="#" class="topBannerPlay" title="재생"><span class="skip">재생</span></a><a href="#" class="topBannerStop" title="정지"><span class="skip">정지</span></a>');
    

	    //재생,정지 초기
	$("#topSliderBanner_nav").children(".topBannerPlay").removeClass("on");
	$("#topSliderBanner_nav").children(".topBannerStop").addClass("on");
	
    //메인 최상단 팝업대체 슬라이드 재생,정지,이전,다음 제어
	$("#topSliderBanner_nav").children(".topBannerPlay").on("click",function(){
		$('#topSliderBanner').cycle('resume');				
        $(this).removeClass("on");
		$(this).siblings(".topBannerStop").addClass("on");
		return false;	
	});
    $("#topSliderBanner_nav").children(".topBannerStop").on("click",function(){
		$('#topSliderBanner').cycle('pause');	
        $(this).removeClass("on");
		$(this).siblings(".topBannerPlay").addClass("on");        
		return false;	
	});
    /*닫기*/
    $(".topSliderArea .bannerBottom").children(".closeBtn").on("click",function(){
		//alert("dd");
		var newDate = new Date();
		newDate.setHours(newDate.getHours() + 24);
		if($("#oneDayChk").prop("checked")){
			document.cookie = "popup_1=2; path=/; expires=" + newDate.toGMTString() + ";";
		};
		$('.topSliderArea').slideUp();
		return false;	
	});
	
});	

