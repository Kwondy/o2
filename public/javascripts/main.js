$(document).ready(function(e) {
   
	/************************ ���� �ֻ�� �˾���ü �����̵� ��� **************************/	
    $('#topSliderBanner').before('<div id="topSliderBanner_nav">');
	$('#topSliderBanner').cycle({ 
		fx:     'scrollHorz', /*fade, fadeout, none, scrollHorz, scrollVert */
		slides: 'li',
		swipe: true,		
		timeout: 5000,
		speed:  800,
        pager:  '#topSliderBanner_nav'
	});			
    //���� �ֻ�� �˾���ü �����̵� ���,���� ��������	
	$("#topSliderBanner_nav").append('<a href="#" class="topBannerPlay" title="���"><span class="skip">���</span></a><a href="#" class="topBannerStop" title="����"><span class="skip">����</span></a>');
    

	    //���,���� �ʱ�
	$("#topSliderBanner_nav").children(".topBannerPlay").removeClass("on");
	$("#topSliderBanner_nav").children(".topBannerStop").addClass("on");
	
    //���� �ֻ�� �˾���ü �����̵� ���,����,����,���� ����
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
    /*�ݱ�*/
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

