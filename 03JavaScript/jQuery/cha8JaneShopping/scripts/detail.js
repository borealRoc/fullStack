$(function() {
	// 商品图片点击切换 start
	var $zoomWrap = $('#zoomWrap'),
		$thickImg = $('#thickImg'),
		$thumblist = $('#thumblist'),
		$zoomWrapA = $zoomWrap.find('.jqzoom'),
		$zoomWrapImg = $zoomWrapA.find('img'),
		$thumblistA = $thumblist.find('a');

		$thumblistA.livequery('click', function(event) {
			var $this = $(this),
				smallPic = $this.attr('data-small-img'),
				bigPic = $this.attr('data-big-img');
			$zoomWrapA.attr('href', bigPic);	
			$zoomWrapImg.attr('src', smallPic);
			$thickImg.attr('href', bigPic);
		});

	// 商品图片点击切换 end
	
	// 商品属性选项切换卡 start
	var $propertyTabList = $('#propertyTab').find('li'),
	    $propertyCtt = $('#propertyCtt').find('div');

	$propertyTabList.on('click', function() {
		var $this = $(this),
		    index = $this.index();
		$this.addClass('selected').siblings().removeClass('selected');
		$propertyCtt.eq(index).show().siblings().hide();
	}); 
	// 商品属性选项切换卡 end
	
	// 点击颜色属性切换商品图片 start
	var $skuColor = $('.color_change'),
	    skuColorTxt = $skuColor.find('strong'),
	    $skuColorList = $skuColor.find('li');
	$skuColorList.on('click', function() {
		var $this = $(this);
			$thisImg = $this.find('img'),
			imgSrc = $thisImg.attr('src'),
			imgAlt = $thisImg.attr('alt');
			imgColor = $thisImg.attr('data-key');
		var srcStr = imgSrc.substring(0, imgSrc.lastIndexOf('.'));
		$zoomWrapA.attr('href', srcStr + '_one_big.jpg');	
		$zoomWrapImg.attr('src', srcStr + '_one_small.jpg');
		$thickImg.attr('href', srcStr + '_one_big.jpg');
		skuColorTxt.text(imgAlt);
		$thumblist.empty().append($('#' + imgColor).html());
	});  
	// 点击颜色属性切换商品图片 end 
	
	// 点击尺寸属性切换尺寸 start
	var $proSize = $('.pro_size'),
	    $skuSize = $('#skuSize'),
	    $sizeTxt = $proSize.find('strong'),
	    $skuSizeList = $skuSize.find('li');
	    $skuSizeList.on('click', function() {
	    	var $this = $(this);
	    	$sizeTxt.text($this.find('span').text());
	    	/* Act on the event */
	    });   
	// 点击尺寸属性切换尺寸 end 
	
	// 更好商品数量价格联动 start
	var $skuNum = $('#num_sort'),
	    $skuTotalPrice = $('.pro_price').find('span'),
	    skuTotalPrice = $skuTotalPrice.text();
	$skuNum.change(function() {
		var $this = $(this),
			skuNum = $this.val();
		$skuTotalPrice.text(skuTotalPrice * skuNum);
	}).change();   
	// 更好商品数量价格联动 end
	
	// 商品评分效果 star
	var $ratingList = $('.rating').find('li');
	$ratingList.on('click', function(event) {
		var $this = $(this),
			thisClass = $this.attr('class');
		$this.parent('ul').removeClass().addClass('rating ' + thisClass + 'star');
		return false;
	});  
	// 商品评分效果 start     













});