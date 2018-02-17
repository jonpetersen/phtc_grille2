class Dashing.HotStatusApp extends Dashing.Widget

  constructor: ->
    super

  onData: (data) ->
    return if not @status
    status = @appstatus.toLowerCase()

    if [ 'inactive', 'reactivating', 'active', 'unknown' ].indexOf(status) != -1
      backgroundClass = "hot-status-app-#{status}"
    else
      backgroundClass = "hot-status-app-neutral"

    lastClass = @lastClass

    if lastClass != backgroundClass
      $(@node).toggleClass("#{lastClass} #{backgroundClass}")
      @lastClass = backgroundClass

      audiosound = @get(status + 'sound')
      audioplayer = new Audio(audiosound) if audiosound?
      if audioplayer
        audioplayer.play()

  ready: ->
    @onData(null)
