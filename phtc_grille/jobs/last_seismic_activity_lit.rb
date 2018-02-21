require 'uri'

SCHEDULER.every '1s' do

  uri = URI('http://localhost:9292/last_seismic_activity_lit')
  last_seismic_activity_lit1 = JSON.parse(Net::HTTP.get(uri))["last_seismic_activity_lit1"]
  last_seismic_activity_time_lit1 = JSON.parse(Net::HTTP.get(uri))["last_seismic_activity_time_lit1"]
  last_seismic_activity_lit2 = JSON.parse(Net::HTTP.get(uri))["last_seismic_activity_lit2"]
  last_seismic_activity_time_lit2 = JSON.parse(Net::HTTP.get(uri))["last_seismic_activity_time_lit2"]
  last_hit_3 = JSON.parse(Net::HTTP.get(uri))["last_hit_3"]
  last_hit_time_3 = JSON.parse(Net::HTTP.get(uri))["last_hit_time_3"]
    
  send_event('last_seismic_activity_text_lit1', { text: last_seismic_activity_lit1.to_s + " @ " + last_seismic_activity_time_lit1})
  send_event('last_seismic_activity_lit1',   { value: last_seismic_activity_lit1 })
    
  send_event('last_seismic_activity_text_lit2', { text: last_seismic_activity_lit2.to_s + " @ " + last_seismic_activity_time_lit2})
  send_event('last_seismic_activity_lit2',   { value: last_seismic_activity_lit2 })
  
  send_event('last_hit_text_3', { text: last_hit_3.to_s + " @ " + last_hit_time_3})
  send_event('last_hit_3',   { value: last_hit_3 })
end