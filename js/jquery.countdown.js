// Generated by CoffeeScript 1.7.1
(function() {
  var $, days, hours, minutes;

  $ = this.jQuery;

  days = 24 * 60 * 60;

  hours = 60 * 60;

  minutes = 60;

  $.fn.countdown = function(options) {
    var callback, defaults, remaining, self, tick;
    defaults = {
      onTick: function() {},
      onFinish: function() {},
      displayTick: function(element, d, h, m, s) {
        var html, intervals;
        intervals = {
          'days': d,
          'hours': h,
          'minutes': m,
          'seconds': s
        };
        html = '';
        $.each(intervals, function(k, v) {
          html += "<span class='countdown-" + k + "'>" + (('0' + v).slice(-2)) + "</span>";
          if (k !== 'seconds') {
            return html += "<span class='countdown-" + k + "-divider'>:</span>";
          }
        });
        html = "<span class='countdown'>" + html + "</span>";
        return element.html(html);
      },
      displayFinish: function(element) {
        return element.html('');
      }
    };
    options || (options = {});
    options = $.extend({}, defaults, options);
    self = this;
    callback = false;
    remaining = function() {
      var now, seconds;
      now = (new Date()).getTime();
      seconds = Math.floor((options.timestamp - now) / 1000);
      if (seconds < 0) {
        seconds = 0;
      }
      return seconds;
    };
    return (tick = function() {
      var d, h, left, m, s;
      left = remaining();
      if (left > 0) {
        d = Math.floor(left / days);
        left %= days;
        h = Math.floor(left / hours);
        left %= hours;
        m = Math.floor(left / minutes);
        left %= minutes;
        s = left;
        options.displayTick(self, d, h, m, s);
        if (callback) {
          options.onTick(self, d, h, m, s);
        }
        callback = true;
        return setTimeout(tick, 1000);
      } else {
        options.displayFinish(self);
        if (callback) {
          return options.onFinish(self);
        }
      }
    })();
  };

}).call(this);
