$ = @jQuery

days = 24 * 60 * 60
hours = 60 * 60
minutes = 60

$.fn.countdown = (options) ->
  defaults =
    onTick: ->
    onFinish: ->
    displayTick: (element, d, h, m, s) ->
      intervals =
        'Days': d
        'Hours': h
        'Minutes': m
        'Seconds': s

      html = ''
      $.each intervals, (k, v) ->
        html += "<span class='countdown#{k}'>#{('0' + v).slice(-2)}</span>"
        html += "<span class='countdown#{k}Divider'>:</span>" if k != 'Seconds'
      html = "<span class='countdown'>#{html}</span>"

      element.html html

    displayFinish: (element) ->
      element.html ''

  options || (options = {});
  options = $.extend({}, defaults, options);

  self = this
  callback = false

  remaining = ->
    now = (new Date()).getTime()
    seconds = Math.floor((options.timestamp - now) / 1000)
    seconds = 0 if seconds < 0
    seconds

  (tick = ->
    left = remaining()

    if left > 0
      d = Math.floor(left / days)
      left %= days
      h = Math.floor(left / hours)
      left %= hours
      m = Math.floor(left / minutes)
      left %= minutes
      s = left

      options.displayTick self, d, h, m, s
      options.onTick(self, d, h, m, s) if callback

      callback = true

      setTimeout tick, 1000
    else
      options.displayFinish self
      options.onFinish(self) if callback
  )()
