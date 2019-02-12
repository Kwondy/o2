$(function() {
	$('#header .menu').hover(function() {
	}, function() {
		$(this).removeClass('active');
		$('#header ul.depth-1 > li').removeClass('active');
	});
	$('#header ul.depth-1 > li').hover(function() {
		$('#header .menu').addClass('active');
		$('#header ul.depth-1 > li.active').removeClass('active');
		$(this).addClass('active');
	}, function() {
	});

	$('#header #sitemap').click(function() {
		$('#sitemap_close').css('display','block');
		var sitemap = $('#header ul.depth-1').clone();
		$('#header').append('<ul class="sitemap">' + sitemap.html() + '</ul>').append('<div class="curtain"></div>');
	});
	$(document).on('click', '#header .curtain', function() {
		$('#header .curtain, #header ul.sitemap').remove();
		$('#sitemap_close').css('display','none');
	});
	$('#header #sitemap_close').click(function() {
		$('#sitemap_close').css('display','none');
		$('#header .curtain, #header ul.sitemap').remove();
	});	
	
	$('#header #search_btn').click(function() {
		$('#search_btn_close').css('display','block');
		$('#search_area').css('display','block');
	});
	
	$('#header #search_btn_close').click(function() {
		$('#search_btn_close').css('display','none');
		$('#search_area').css('display','none');
	});	
	
	if($('body').hasClass('main')) {
		var topBoxHeight = $('.box-right').innerHeight() - 178;
		$('.map-area').css('height', topBoxHeight);
		$('.gallery-area').css('height', $('.media-area').innerHeight() + 2);

		var image = $('#map-image');
		var exImage;
		image.mapster({
			fill: false,
			stroke: false,
			singleSelect: true,
			mapKey: 'name',
			listKey: 'name',
			onMouseover: function(e) {
				switch(e.key) {
					case "서울시" :
						$('#mapster_wrap_0 img.mapster_el').attr('src', image.attr('src').replace('map.png', 'map_01.png'));
						break;
					case "경기도" :
						$('#mapster_wrap_0 img.mapster_el').attr('src', image.attr('src').replace('map.png', 'map_02.png'));
						break;
					case "인천" :
						$('#mapster_wrap_0 img.mapster_el').attr('src', image.attr('src').replace('map.png', 'map_03.png'));
						break;
					case "강원도" :
						$('#mapster_wrap_0 img.mapster_el').attr('src', image.attr('src').replace('map.png', 'map_04.png'));
						break;
					case "충북" :
						$('#mapster_wrap_0 img.mapster_el').attr('src', image.attr('src').replace('map.png', 'map_06.png'));
						break;
					case "경북" :
						$('#mapster_wrap_0 img.mapster_el').attr('src', image.attr('src').replace('map.png', 'map_05.png'));
						break;
					case "충남" :
						$('#mapster_wrap_0 img.mapster_el').attr('src', image.attr('src').replace('map.png', 'map_08.png'));
						break;
					case "대전" :
						$('#mapster_wrap_0 img.mapster_el').attr('src', image.attr('src').replace('map.png', 'map_07.png'));
						break;
					case "대구" :
						$('#mapster_wrap_0 img.mapster_el').attr('src', image.attr('src').replace('map.png', 'map_11.png'));
						break;
					case "전북" :
						$('#mapster_wrap_0 img.mapster_el').attr('src', image.attr('src').replace('map.png', 'map_09.png'));
						break;
					case "경남" :
						$('#mapster_wrap_0 img.mapster_el').attr('src', image.attr('src').replace('map.png', 'map_10.png'));
						break;
					case "울산" :
						$('#mapster_wrap_0 img.mapster_el').attr('src', image.attr('src').replace('map.png', 'map_12.png'));
						break;
					case "부산" :
						$('#mapster_wrap_0 img.mapster_el').attr('src', image.attr('src').replace('map.png', 'map_13.png'));
						break;
					case "전남" :
						$('#mapster_wrap_0 img.mapster_el').attr('src', image.attr('src').replace('map.png', 'map_14.png'));
						break;
					case "광주" :
						$('#mapster_wrap_0 img.mapster_el').attr('src', image.attr('src').replace('map.png', 'map_15.png'));
						break;
					case "제주도" :
						$('#mapster_wrap_0 img.mapster_el').attr('src', image.attr('src').replace('map.png', 'map_16.png'));
						break;
				}
			},
			onMouseout: function(e) {
				$('#mapster_wrap_0 img.mapster_el').attr('src', exImage);
			},
			onClick: function(e) {
				exImage = $('#mapster_wrap_0 img.mapster_el').attr('src');
				setTeamList(e.key);
			}
		});
		exImage = $('#mapster_wrap_0 img.mapster_el').attr('src');

		var currentMapWidth = $('#mapster_wrap_0 img.mapster_el').width();
		$('.map-area area').each(function() {
			var pointArray = $(this).attr('coords').split(',');
			for(var i = 0; i < pointArray.length; i++) {
				pointArray[i] = Math.round(pointArray[i] / (470 / currentMapWidth));
			}
			$(this).attr('coords', pointArray.join(','));
		});

		$(window).load(function() {
			var maxHeight = -1;
			$('.box-3').each(function(idx) {
				maxHeight = maxHeight > $(this).height() ? maxHeight : $(this).height();
			});
			$('.status-area, .guide-area, .news-area, .about-area').height(maxHeight);
		});
	}

	$('.tab').click(function() {
		var $parent = $(this).parent();
		$parent.children('.tab').removeClass('active');
		var id = $(this).attr('id');
		$(this).addClass('active');
		$parent.css({'height': $parent.innerHeight() + 2, 'max-height': $parent.innerHeight() + 2});
		if($parent.hasClass('animate')) {
			$('ul', $parent).css('position', 'absolute').fadeOut(800);
			$('ul.' + id, $parent).fadeIn(800, function() {
				$('ul', $parent).removeClass('active');
				$(this).addClass('active');
			});
		} else {
			$('ul', $parent).hide().removeClass('active');
			$('ul.' + id, $parent).show().addClass('active');
		}
	});

	/*var pageTitle = $(document).find("title").text();
	$('#side-nav li').each(function() {
		if($(this).text() == pageTitle) {
			$(this).addClass('on');
			$(this).parent().prev('h4').addClass('on');
		}
	});
	$('#side-nav h4').each(function() {
		if($(this).text() == pageTitle) {
			$(this).addClass('on');
		}
	});*/

});


