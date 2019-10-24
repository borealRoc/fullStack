;
(function($) {
    $.fn.extend({
        'alertBgColor': function(opts) {
            opts = $.extend({
                odd: 'odd',
                even: 'even',
                selected: 'selected'
            }, opts);

            $("tbody > tr:odd", this).addClass(opts.odd);
            $("tbody > tr:even", this).addClass(opts.even);
            $("tbody > tr").has(':checked').addClass(opts.selected);
            $("tbody > tr", this).on('click', function() {
                var _this = $(this);
                var hasSelected = _this.hasClass('selected');
                _this[hasSelected? 'removeClass': 'addClass'](opts.selected).find(':checkbox').attr("checked", !hasSelected);

            });
            return this;
        }
    });

})(jQuery);