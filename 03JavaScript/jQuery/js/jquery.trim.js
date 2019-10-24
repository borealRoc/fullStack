;
(function ($) {
	$.extend({
		trimL: function (text) {
			return (text || '').replace(/^\s+/g, '');
		},
		trimR: function (text) {
			return (text || '').replace(/\s+$/g, '');
		}
	});
	
})(jQuery);