require 'uri'

SCHEDULER.every '1s' do

  uri = URI('http://127.0.0.1:9292/sensitivity')
  current_sensitivity = JSON.parse(Net::HTTP.get(uri))["sensitivity"]
  send_event('sensitivity', { textblue: current_sensitivity})

end