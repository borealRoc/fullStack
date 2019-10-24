$(function() {
    // 网站换肤功能 start
    var $skinCSSFile = $('#cssfile'),
        $skinSwitchList = $('#skin').find('li');

    function switchSkin(skinName) {
        $('#' + skinName).addClass('selected').siblings().removeClass('selected');
        $skinCSSFile.attr('href', 'styles/skin/' + skinName + '.css');
        $.cookie('myCssSkin', skinName, { path: '/', expires: 10 });
    };

    var cookieSkin = $.cookie('myCssSkin');
    if (cookieSkin) {
        switchSkin(cookieSkin);
    }

    $skinSwitchList.on('click', function() {
        switchSkin(this.id);
    });
    // 网站换肤功能 end
     
    // 导航栏显示隐藏功能 start
    var $nav = $('#nav'),
    	$navList = $nav.find('li:has(.jnNav)');

    $navList.hover(function () {
    	var $this = $(this),
    		$subNav = $this.find('.jnNav');
    	$subNav.stop(true, true).slideDown(100);
    }, function () {
    	var $this = $(this),
    		$subNav = $this.find('.jnNav');
    	$subNav.stop(true, true).slideUp(100);
    });
    // 导航栏显示隐藏功能 end
     
    // 最新动态滚动功能 start
    var $jnNoticeInfo = $("#jnNoticeInfo").find('ul'),
    	jnNoticeInfoListHei = $jnNoticeInfo.find('li:first').height(),
    	scrollNewsId;
    function newsScroll ($obj) {
  		$obj.find('li:first').stop(true, true).animate({'margin-top': -jnNoticeInfoListHei + 'px'}, 500, function () {
  			$obj.find('li:first').css('margin-top', 0).appendTo($obj);
  		})
    }
    $jnNoticeInfo.hover(function() {
    	clearInterval(scrollNewsId);
    }, function() {
    	scrollNewsId = setInterval(function () {newsScroll($jnNoticeInfo)}, 1000);
    }).trigger('mouseleave');
    // 最新动态滚动功能 end
    
    // 最新动态内容添加超链接提示 start
    var newsTooltip = $("a.tooltip"),
        x = 10, 
        y = 20;
    newsTooltip.mouseover(function(e) {
    	this.myTitle = this.title;
    	var toolTipStr = '<div id="tooltip">'+this.myTitle +'</div>';
    	this.title = '';
    	$('body').append(toolTipStr);
    	$("#tooltip").css({
    		left: e.pageX + x + 'px',
    		top: e.pageY + y + 'px'
    	}).show('fast');
    }).mouseout(function(e) {
    	this.title = this.myTitle;
    	$("#tooltip").remove();
    }).mousemove(function(e) {
    	$("#tooltip").css({
    		left: e.pageX + x + 'px',
    		top: e.pageY + y + 'px'
    	});
    })
    // 最新动态内容添加超链接提示 end
    
    // 品牌活动点击滑动效果 start
    var $jnBrandTab = $('#jnBrandTab'),
        $jnBrandList = $('#jnBrandList'),
        $jnBrandTabItem = $jnBrandTab.find('li'),
        $jnBrandListItem = $jnBrandList.find('li'),
        moveDis = $jnBrandListItem.outerWidth() * 4,
        index = 0;
    $jnBrandTabItem.on('click', function() {
    	var $this = $(this);
    	index = $this.index();
    	$this.addClass('chos').siblings().removeClass('chos');
    	if (!$jnBrandList.is('animated')) {
    		$jnBrandList.animate({'left': -moveDis * index + 'px'}, 300);
    	}
    }).eq(0).trigger('click');
    // 品牌活动点击滑动效果 end
});