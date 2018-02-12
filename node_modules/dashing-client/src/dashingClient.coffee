lodash          = require 'lodash'
request         = require 'request'

class DashingClient
    # Create a new DashingClient
    #
    # Parameters:
    # * `dashingBaseUri` - URI of the dashing server.  e.g. "http://dashboardserver.com".
    # * `apiKey` - The API key to authorize the client to Dashing.
    # * `options.username` - Username for basic auth.
    # * `options.password` - Password for basic auth.
    #
    constructor: (@dashingBaseUri, @apiKey, @options) ->

    # Push some data to Dashing
    #
    # Parameters:
    # * `widgetId` is the `data-id` of the widget to update.
    # * `data` is the data to send to to widget.  This should be an object to be JSONified.
    #
    # e.g.: `send('welcome', {text: "Hey, look what I can do!"})`
    #
    send: (widgetId, data, done) ->
        data    = lodash.extend {}, data, {auth_token: @apiKey}
        options = lodash.extend {json: data}, @options
        request.post "#{@dashingBaseUri}/widgets/#{widgetId}", options, done

    toString: () ->
        return "DashingClient for #{@dashingBaseUri}"

module.exports = exports = DashingClient
