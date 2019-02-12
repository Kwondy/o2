/* Korean initialisation for the jQuery calendar extension. */
/* Written by DaeKwon Kang (ncrash.dk@gmail.com), Edited by Genie. */
jQuery(function($){
	$.datepicker.regional['ko'] = {
		closeText: '�ݱ�',
		prevText: '������',
		nextText: '������',
		currentText: '����',
		monthNames: ['1��','2��','3��','4��','5��','6��','7��','8��','9��','10��','11��','12��'],
		monthNamesShort: ['1��','2��','3��','4��','5��','6��','7��','8��','9��','10��','11��','12��'],
		dayNames: ['�Ͽ���','������','ȭ����','������','�����','�ݿ���','�����'],
		dayNamesShort: ['��','��','ȭ','��','��','��','��'],
		dayNamesMin: ['��','��','ȭ','��','��','��','��'],
		weekHeader: 'Wk',
		dateFormat: 'yy-mm-dd',
		firstDay: 0,
		showButtonPanel: true,
		changeMonth: true,
		changeYear: true,	
		//yearRange: 'c-15:c+1',
		yearRange: '-20:+1',
		isRTL: false,
		showMonthAfterYear: true,
		selectOtherMonths: true,
		yearSuffix: '��',
		showOn: 'focus', 
		buttonImage: null, 
		buttonImageOnly: false
	};
		
	$.datepicker.setDefaults($.datepicker.regional['ko']);
});


var cssAddFlag = true;
function CalAddCss(){
		var cssHtml = "<style type='text/css'>";
		cssHtml += ".calLayout{	border:1px solid #DDDDDD; background-color:#ECEADF;	position:absolute;padding:2px;display:none;z-index:9999	}";			
		cssHtml += ".calTitle{ border:1px solid #D4D1BF; background-color: #ffffff; width:99%;	font-size:9pt;}";			
		cssHtml += ".calHeader{	padding:2px; padding-bottom:0px;text-align:center;}";
		cssHtml += ".calBody{padding:2px;padding-top:0px;text-align:center;	}";
		cssHtml += ".calDay{background-color: #FBFBFB;border:1px solid #CBC7BD;	width:20px;float:left;font-size:8pt;padding-top:3px;padding-bottom:2px;cursor:pointer;}";
		cssHtml += ".calSunDay{	background-color: #FBFBFB;border:1px solid #CBC7BD;	width:20px;float:left;font-size:8pt;padding-top:3px;padding-bottom:2px;cursor:pointer;color:red;}";
		cssHtml += ".calSatDay{ background-color: #FBFBFB;border:1px solid #CBC7BD;	width:20px;float:left;font-size:8pt;padding-top:3px;padding-bottom:2px;cursor:pointer;	color:blue;}";
		cssHtml += ".calOtherDay{background-color: #FBFBFB;	border:1px solid #CBC7BD;width:20px;float:left;font-size:8pt;padding-top:3px;padding-bottom:2px;cursor:pointer;color:#CBC7BD;}";
		cssHtml += ".dayToday{background-color: #368CFE;border:1px solid #CBC7BD;font-weight:bold;font-weight:bold;width:20px;float:left;font-size:8pt;padding-top:3px;padding-bottom:2px;cursor:pointer;color:white;	}";
		cssHtml += ".calSelDay{	background-color: #CF4040;border:1px solid #CBC7BD;font-weight:bold;width:20px;float:left;font-size:8pt;padding-top:3px;padding-bottom:2px;cursor:pointer;text-decoration:underline;color:white;}";
		cssHtml += ".dayEvMon{font-size:8pt;width:25px;	height:15px;background-color: #FBFBFB;border:1px solid #CBC7BD;	padding:4px 4px 0px 3px;float:left;cursor:pointer;}";		
		cssHtml += ".MonToday{font-size:8pt;width:25px;	height:15px;background-color: #368CFE;border:1px solid #CBC7BD;	font-weight:bold;padding:4px 4px 0px 3px;color:white;cursor:pointer;}";
		cssHtml += ".selMon{font-size:8pt;width:25px;height:15px;background-color: #CF4040;border:1px solid #CBC7BD;font-weight:bold;padding:4px 4px 0px 3px;text-decoration:underline;color:white;}";
		cssHtml += ".calOnDay{background-color: #006060;border:1px solid #4B22C0;float:left;cursor:pointer;color:white;}";
		cssHtml += ".calDaySpace{padding:1px;float:left;}";
		cssHtml += ".calDayBr{clear:both;height:2px;}";
		cssHtml += ".calDayTitle{padding-top:2px;width:22px;float:left;	font-size:8pt;}";			
		cssHtml += ".divHeadOnRigth{color:#18CCA8;cursor:pointer;}";
		cssHtml += ".todayBtn{clear:both;text-align: center;font-size:8pt;cursor:pointer;background-color: #FBFBFB;border:1px solid #CBC7BD;padding:4px 4px 0px 3px;height:15px;}";
		cssHtml += ".todayLay{padding-left:2px;}</style>";
		$("head").append(cssHtml);
}

// �ʱ�ȭ			
function initCalMonthView(obj){
	if( cssAddFlag == true ){
		CalAddCss();
		cssAddFlag = false;
	}
	
	// id ����
	var calId = "Cal" + obj.id;				
	
	// calendar type (day,mon)
	var calType = obj.type == null ? "day" : obj.type;				
	if( calType.toLowerCase() != "day" && calType.toLowerCase() != "mon"){
		calType = "day";
	}
	
	// �ּҳ⵵, �ִ�⵵ 
	var minYear 	= obj.min == null ? "2000" : obj.min;
	var maxYear 	= obj.max == null ? new Date().getFullYear()+1 : obj.max;
	var splitKey 	= obj.splitKey == null ? "-" : obj.splitKey; 
	var todayYN		= obj.today == null ? "n" : "y";
	var iconYN		= obj.icon  == null ? "n" : "y";
	var iconUrl    = obj.iconUrl == null ? "http://cfile9.uf.tistory.com/image/033D38485170E404103786" : obj.iconUrl ; 

	// �޷� ���̾ƿ�(��üƲ+������)�׸���
	drawCalForm(calId,obj.id,calType,minYear,maxYear,"n","n",iconUrl);
	
	if( calType == "day"){
		$("#"+obj.id).attr("maxlength",10);
		$("#"+calId).css("width","170px");
		$("#"+calId +"btn.todayBtn").css("width","157px");							
	}else{
		$("#"+obj.id).attr("maxlength",7);
		$("#"+calId).css("width","146px");
		$("#"+calId +"btn.todayBtn").css("width","133px");
	}

	
	// input box�� click event 
	$("#"+obj.id + ",#"+ calId + "Icon").click(function(event){					
		var datesVal = $("#"+obj.id).val();
		if( calType == "mon") datesVal += splitKey + '1';
		
		var dates = isValidCheck(datesVal ,splitKey);
		if( calType == "day"){
			makeCal(calId,dates,splitKey);
		}else{
			makeCalMon(calId,dates,splitKey);
		}
		calPosition(obj.id,calId);																					
		$("#"+calId).show();
		
	});
	
	// �ܺ� ȭ�� Ŭ���� �޷°��߱�
	$(document).click(function(event){
		var parentEls = $( event.target).parents().map(function () { return this.id; }).get().join(", ");
		if(parentEls.indexOf(calId+",") == -1 && event.target.id != obj.id && parentEls.indexOf(calId+"Icon,")){
			$("#"+calId).hide();
		}
	});
	
	$(window).resize(function(event){
		calPosition(obj.id,calId);
	});
	
	// �޷»�� ����/���� ��ư ó��
	$("#"+calId+"before,#"+calId+"next").click(function(event){
		var plus = -1;
		if(this.id.indexOf("next") > -1){ var plus = 1; }
		
		if( calType == "day"){
			var dates = calDate($("#"+ calId + "selYear").val(),$("#"+calId + "selMon").val(),plus,isValidCheck($("#"+obj.id).val(),splitKey));					
			if((dates[0] >= minYear && plus == -1) || (dates[0] <= maxYear && plus == 1)){
				makeCal(calId,dates,splitKey);
			}	
		}else{
			var dates = calDate($("#"+ calId + "selYear").val(),'1',plus*12,isValidCheck($("#"+obj.id).val()+splitKey+'1',splitKey));
			if((dates[0] >= minYear && plus == -1) || (dates[0] <= maxYear && plus == 1)){
				makeCalMon(calId,dates,splitKey);
			}
		}					 
	}).mouseover(function(){
		$(this).addClass("divHeadOnRigth");
	}).mouseout(function(){
		$(this).removeClass("divHeadOnRigth");
	});;
	
	// �������ý� �ʿ����
	if( calType == "day"){
		// �⵵,�� selectbox ���ý� �̺�Ʈ
		$("#"+calId+"selYear,#"+calId+"selMon").change(function(event){
			var dates = calDate($("#"+ calId + "selYear").val(),$("#"+calId + "selMon").val(),0,isValidCheck($("#"+obj.id).val(),splitKey));					
			makeCal(calId,dates,splitKey);
		});	
		//$("#"+obj.id).mask('1111'+ splitKey +'11'+ splitKey +'11');
	}else{
		$("#"+calId+"selYear").change(function(event){
			var dates = calDate($("#"+ calId + "selYear").val(),1,0,isValidCheck($("#"+obj.id).val()+splitKey+'1',splitKey));					
			makeCalMon(calId,dates,splitKey);
		});	
		//$("#"+obj.id).mask('1111'+ splitKey +'11');
	}
	
	$("#"+calId+"btn").click(function(){
		$("#"+obj.id).val("");
		var dates = isValidCheck('',splitKey);
		if( calType == 'day'){
			makeCal(calId,dates,splitKey);			
		}else{
			makeCalMon(calId,dates,splitKey);		
		}
	});
	
	calPosition(obj.id,calId);
}

//Ŭ�� �̺�Ʈ
function calClickEvent(id){
	$("#" + id + " .calOtherDay,.calDay,.calSunDay,.calSatDay,.MonToday,.selMon,.dayEvMon").click(function(event) {
        $("#" + id.substring(3)).val(this.id.replace(id,""));
		$("#" + id).hide();
	}).mouseover(function(){
		$(this).addClass("calOnDay");
	}).mouseout(function(){
		$(this).removeClass("calOnDay");
	});
} 

// �޷� �� �׸��� 
function drawCalForm(id,tId,calType,min,max,todayYN,iconYN,imageUrl){ // tId = �Է�âID			
	if(iconYN == "y"){
		$(document.body).append("<div id='"+ id +"Icon' style='position:absolute'><img id='"+ id +"IconImg' src='"+ imageUrl +"'><div>");
	}
	
	// layout
	$(document.body).append("<div id='"+ id +"' onselectstart='return false' class='calLayout'><div>");
	
	// ��� ��,�� �̵� 
	var html  = "<div class='calTitle'><table width='100%'><tr><td id='"+ id +"before' width='10%'  style='font-size: 10px'>��</td><td width='80%' align='center'>";
		
	// �⼱��
	html += "<select id='"+ id +"selYear'>";
    for(var i=min;i<=max;i++){ html += "<option value=" + i + ">" + i + "</option>"; }
	html += "</select>"
	
	// ������ (�Ϻ��޷��� ��쿡��)
	if( calType == "day"){
		html += "<select id='"+ id +"selMon'>";
	    for(var i=1;i<=12;i++){ html += "<option value=" + i + ">" + i + "��</option>"; }
		html += "</select>"						
	}
	
	html += "</td><td id='"+ id +"next' width='10%' style='font-size: 10px'>��</td></tr></table></div>";
	if( calType == "day" )html += "<div id='" + id + "Header' class='calHeader'></div>";
	html += "<div id='" + id + "Content' class='calBody'></div>";
	
	if( todayYN == "y"){
		html += "<div class='todayLay'><div id='" + id + "btn' class='todayBtn'>Today</div></div>";
	}
		
	$("#"+id).html(html);				
	
	// ������ (�Ϻ��޷��� ��쿡��)
	if (calType == "day") {
		var tempHtml = ""; 
		var yoil = ["��", "��", "ȭ", "��", "��", "��", "��"];
		for (i = 0; i < 7; i++) {
			tempHtml += "<div class='calDayTitle'>" + yoil[i] + "</div>";
			if (i == 6) { tempHtml += "<div class='calDayBr'></div>"; }
			else { tempHtml += "<div class='calDaySpace'></div>"; }
		}
		$("#" + id + "Header").append(tempHtml);
	}		
	
		
}

// ��¥����(�޺���) �޷³��� �׸���
function makeCal(id,dates,splitKey){				
	
	// �̹��� ���۳�¥,��������¥ 
	var firstDay  = new Date(dates[0],eval(dates[1]-1),1).getDay();
	
	// �̹��� ��������¥
	var lastDate 	= new Date(dates[0],eval(dates[1]),0);
	var lastDateNum = lastDate.getDate();
	var lastDay     = lastDate.getDay();
	
	// ������ ��������¥
	var beforeMonDate	= new Date(dates[0],eval(dates[1]-1),0);
	var beforeMonLastDay = beforeMonDate.getDate();
	var beforeYearMonText = beforeMonDate.getFullYear() + splitKey + strFormat(beforeMonDate.getMonth()+1) + splitKey;
	
	var nextMonDate	= new Date(dates[0],eval(dates[1]),1);
	var nextYearMonText = nextMonDate.getFullYear() + splitKey + strFormat(nextMonDate.getMonth()+1) + splitKey;
	  
	var nowYearMonText = dates[0] + splitKey + strFormat(dates[1]) + splitKey;
	
	var ndate = new Date();
	var today = ndate.getFullYear() + splitKey + strFormat(ndate.getMonth()+1) + splitKey + strFormat(ndate.getDate());
	//-----------------------------------------------------	
	var html = "";				
	var brCount = 1; // �ٳѱ� count
	
	// before month
	for( i = 1; i<=firstDay; i++){
		html += "<div class='calOtherDay' id='"+ id + beforeYearMonText + (beforeMonLastDay-(firstDay-i)) +"'>"+ (beforeMonLastDay-(firstDay-i)) + "</div><div class='calDaySpace'></div>";
		brCount ++;					
	}	
					
	// now month
	for (i = 1; i <= lastDateNum; i++) {					
		var dayCss = "calDay";				
		if (brCount % 7 == 1) { dayCss = "calSunDay" ; }
		else if(brCount % 7 == 0){ dayCss = "calSatDay" ; }
	
		html += "<div class='"+ dayCss +"' id='"+ id + nowYearMonText + strFormat(i) +"'>" + i + "</div>";
		
		if( brCount %7 == 0 && i != lastDateNum ){ html += "<div class='calDayBr'></div>"; }
		else{ html += "<div class='calDaySpace'></div>"; }
		brCount ++;
	}
	
	// next month
	var nexyStartDay = 1;
	for( i = lastDay; i<6; i++){
		html += "<div class='calOtherDay' id='" +id + nextYearMonText + strFormat(nexyStartDay) +"'>"+ nexyStartDay++ + "</div><div class='calDaySpace'></div>";
	}
	
	// ���� ����
	$("#" + id + "Content").html(html);
	
	// �⵵ select ����
	$("#" + id + "selYear").val(dates[0]);
	
	// �Ϻ��޷��� ��� �� select ����
	$("#" + id + "selMon").val(eval(dates[1]));
	
	// ���ó�¥ üũ
	$("#" + id+ today).addClass("dayToday");
	
	// �Է³�¥ üũ
	if(dates[4] == true){
		$("#" +id + dates[3]).addClass("calSelDay");					
		// �Է³�¥�� ��ȿ�� ��¥�� input�� �����͸� ���Ŀ� �°� ����
		$("#" + id.substring(3)).val(dates[3]);
	} 
	
	calClickEvent(id);
}

function makeCalMon(id,dates,splitKey){
	var nowYeaText = dates[0] + splitKey;
	
	var ndate = new Date();
	var today = ndate.getFullYear() + splitKey + strFormat(ndate.getMonth()+1);
	
	var html = "<div class='calDayBr'></div><div class='calDayBr'></div>";				
	for(var i=1;i<13;i++){
		html += "<div class='dayEvMon' id='"+ id + nowYeaText + strFormat(i) +"'>" + i + "��</div>";
		if( i %4 == 0 && i != 12){ html += "<div class='calDayBr'></div>"; }
		else{
			html += "<div class='calDaySpace'></div>"; 
		}
	}				
	// ���� ����
	$("#" + id + "Content").html(html);				
	// �⵵ select ����
	$("#" + id + "selYear").val(dates[0]);
	
	// ���ó�¥ üũ
	$("#" + id + today).addClass("MonToday");
	
	// �Է³�¥ üũ
	if(dates[4] == true){
		$("#" +id + dates[3].substring(0,7)).addClass("selMon");
		
		// �Է³�¥�� ��ȿ�� ��¥�� input�� �����͸� ���Ŀ� �°� ����
		$("#" + id.substring(3)).val( dates[3].substring(0,7));
	} 
	
	calClickEvent(id);
}

// ��¥ ��ȿ�� üũ
function isValidCheck(strDate,splitKey,todayCheck){
	var date = strDate;
	
	var dates = date.split(splitKey);
	var idate = new Date(dates[0],eval(dates[1])-1,eval(dates[2]));
	var ndate = new Date();
	
	var isValid = true;
	if( dates[0] != idate.getFullYear()) isValid = false;  
	else if( eval(dates[1])-1 != idate.getMonth()) isValid = false; 
	else if( eval(dates[2]) != idate.getDate()) isValid = false;

	if( isValid == false ){
		dates[0] = ndate.getFullYear();
		dates[1] = strFormat(ndate.getMonth()+1);
		dates[2] = strFormat(ndate.getDate());
	}	
	
	dates[3] = dates[0] +splitKey + strFormat(dates[1]) + splitKey + strFormat(dates[2]);
	dates[4] = isValid;
	return dates;
}	

function calDate(year,month,adjust,isValidDate){
	var date = new Date(year,(month-1)+adjust,1);
	var dates = [date.getFullYear(),date.getMonth()+1,date.getDate(),isValidDate[3],isValidDate[4]];
	return dates;
}

// ��¥ format ���߱�
function strFormat(str){
	if((str+"").length == 1) str = "0" + str;
	return str;				
}

// �޷���ġ����		
function calPosition(target,id){
	var tInput  = $("#" + target).offset();
	var tHeight = $("#" + target).outerHeight();
	var tWidth 	= $("#" + target).outerWidth();
	
	var calHeight 	= $("#" + id).outerHeight();
	
	if( tInput != null){
		$("#" + id).css({"top":tInput.top+tHeight , "left":tInput.left});
		$("#" + id + "Icon").css({"top":tInput.top+3,"left":tInput.left+tWidth+2});
	}
}