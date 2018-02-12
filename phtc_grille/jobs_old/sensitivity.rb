require 'uri'

SCHEDULER.every '1s' do

  uri = URI('http://192.168.1.12:9292/sensitivity')
  current_sensitivity = JSON.parse(Net::HTTP.get(uri))["sensitivity"]
  send_event('sensitivity', { text: current_sensitivity})

end