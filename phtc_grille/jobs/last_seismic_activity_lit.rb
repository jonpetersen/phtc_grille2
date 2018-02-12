require 'uri'

SCHEDULER.every '1s' do

  uri = URI('http://localhost:9292/last_seismic_activity_lit')
  last_seismic_activity_lit = JSON.parse(Net::HTTP.get(uri))["last_seismic_activity_lit"]
  last_seismic_activity_time_lit = JSON.parse(Net::HTTP.get(uri))["last_seismic_activity_time_lit"]
  send_event('last_seismic_activity_text_lit', { text: last_seismic_activity_lit.to_s + " @ " + last_seismic_activity_time_lit})
  send_event('last_seismic_activity_lit',   { value: last_seismic_activity_lit })
end