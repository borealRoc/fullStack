;
(function ($) {

    $.fn.extend({
    	'color': function (val) {
    		if (val == undefined) {
    			return this.css('color');
    		} else {
    			return this.css('color', val);
    		}
    	},
    	'bgcolor': function (val) {
    		if (val == undefined) {
    			return this.css('background-color');
    		} else {
    			return this.css('background-color', val);
    		}
    	}
    });
    
})(jQuery);