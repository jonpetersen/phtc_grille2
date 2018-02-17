require 'uri'

SCHEDULER.every '1s' do

  uri = URI('http://127.0.0.1:9292/status')
  current_status = JSON.parse(Net::HTTP.get(uri))["status"]
  uri = URI('http://127.0.0.1:9292/appstatus')
  current_appstatus = JSON.parse(Net::HTTP.get(uri))["appstatus"]
  send_event('appstatus', { appstatus: current_appstatus})
  send_event('hotstatus', { status: current_status})
  #send_event('hotstatus_snapshot', { message: "Some message", status:"ok" })
  #send_event('status', { text: "currently " + current_status})
  #send_event('hotstatus', { status: "currently " + current_status})

end