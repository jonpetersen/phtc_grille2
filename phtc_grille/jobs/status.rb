require 'uri'

SCHEDULER.every '3s' do

  uri = URI('http://127.0.0.1:9292/status')
  current_status = JSON.parse(Net::HTTP.get(uri))["status"]
  
  appstatusport_is_open = Socket.tcp("127.0.0.1", 3000, connect_timeout: 5) { true } rescue false
  if appstatusport_is_open
    uri = URI('http://127.0.0.1:3000/appstatus') #nodejs URI
    current_appstatus = Net::HTTP.get(uri)
  else
    current_appstatus = "unkown"
  end
  
  send_event('appstatus', { appstatus: current_appstatus})
  send_event('hotstatus', { status: current_status})
  #send_event('hotstatus_snapshot', { message: "Some message", status:"ok" })
  #send_event('status', { text: "currently " + current_status})
  #send_event('hotstatus', { status: "currently " + current_status})

end