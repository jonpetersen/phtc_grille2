require 'uri'

SCHEDULER.every '1s' do

  uri = URI('http://192.168.1.12:9292/status')
  current_status = JSON.parse(Net::HTTP.get(uri))["status"]
  send_event('status', { text: current_status})

end