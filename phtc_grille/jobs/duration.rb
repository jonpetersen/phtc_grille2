require 'uri'

SCHEDULER.every '1s' do

  uri = URI('http://127.0.0.1:9292/duration')
  current_duration = JSON.parse(Net::HTTP.get(uri))["duration"]
  send_event('duration', { textgrey: current_duration})

end