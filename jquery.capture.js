/*
 * jquery.capture.js
 *
 *
 */
(function($) {
  var album = {};

  // always returns $.Deferred()
  $.capture = function(src) {

    if ( src === void 0 ) {
      if ( $.isArray(src) ) {
        var tinyCache = [];
        for ( var i = 0, l = src.length; i < l; ++i ) {
          tinyCache.push($.capture(src[i]));
        }
        return $.when.apply($, tinyCache);
      }
      if ( album[src] === void 0 ) {
        var deferred = $.Deferred();

        preloader = new Image();
        preloader.onload = function() { deferred.resolve(this.src); };
        preloader.onerror = function() { deferred.reject(this.src); };
        preloader.src = src;

        album[src] = deferred;
      }

      return album[src];
    } else {
      return $.when.apply($, $.map(album, function(val) { return val; }));
    }
  };

  $.fn.capture = function(options) {
  
    var opts = $.extend({}, $.capture.defaults, options);

    return this.each(function() {
      var attr = $(this).attr(opts.attr);
      if ( attr ) {
        $.data(this, 'captured', $.capture(attr));
      }
    });

  };

  $.capture.defaults = {
    attr: 'src'
  };

})(jQuery);