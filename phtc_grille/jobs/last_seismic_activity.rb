require 'uri'

SCHEDULER.every '1s' do

  uri = URI('http://localhost:9292/last_seismic_activity')
  last_seismic_activity = JSON.parse(Net::HTTP.get(uri))["last_seismic_activity"]
  last_seismic_activity_time = JSON.parse(Net::HTTP.get(uri))["last_seismic_activity_time"]
  send_event('last_seismic_activity_text', { text: last_seismic_activity.to_s + " @ " + last_seismic_activity_time})
  send_event('last_seismic_activity',   { value: last_seismic_activity })
end