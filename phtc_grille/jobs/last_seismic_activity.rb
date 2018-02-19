require 'uri'

SCHEDULER.every '1s' do

  uri = URI('http://localhost:9292/last_seismic_activity')
  last_seismic_activity1 = JSON.parse(Net::HTTP.get(uri))["last_seismic_activity1"]
  last_seismic_activity_time1 = JSON.parse(Net::HTTP.get(uri))["last_seismic_activity_time1"]
  last_seismic_activity2 = JSON.parse(Net::HTTP.get(uri))["last_seismic_activity2"]
  last_seismic_activity_time2 = JSON.parse(Net::HTTP.get(uri))["last_seismic_activity_time2"]
    
  send_event('last_seismic_activity_text1', { text: last_seismic_activity1.to_s + " @ " + last_seismic_activity_time1})
  send_event('last_seismic_activity1',   { value: last_seismic_activity1 })
  send_event('last_seismic_activity_text2', { text: last_seismic_activity2.to_s + " @ " + last_seismic_activity_time2})
  send_event('last_seismic_activity2',   { value: last_seismic_activity2 })
end