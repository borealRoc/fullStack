;
(function ($) {
	$.fn.extend({
		'slide': function (opts) {
			opts = $.extend({
				speed: 2000,
				active: 'chos'
			}, opts);

			var slideWrap = $("#jnImageSlide"),
				slideImgs = $('#jnImageWrap > img', this),
				slideBtn = $('#jnBtnWrap > a', this),
				slideImgsLen = slideImgs.length,
				index = 0,
				timeId = null;

			slideBtn.mouseover(function() {
				var $this = $(this);
				index = $this.index();
				$this.addClass(opts.active).siblings().removeClass(opts.active);
				slideImgs.eq(index).stop(true, true).fadeIn().siblings().stop(true, true).fadeOut();
			}).eq(0).trigger('mouseover');


			slideWrap.hover(function() {
				if (timeId) {
					clearInterval(timeId);
				}
			}, function() {
				timeId = setInterval(function () {
					slideBtn.eq(index).addClass(opts.active).siblings().removeClass(opts.active);
					slideImgs.eq(index).stop(true, true).fadeIn().siblings().stop(true, true).fadeOut();
					index ++ ;
					if (index === slideImgsLen) {
						index = 0;
					}
				}, opts.speed);
			}).trigger('mouseleave');

			return this;

		}
	})

})(jQuery);