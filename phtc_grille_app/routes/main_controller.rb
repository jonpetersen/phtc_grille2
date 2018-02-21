class MainController < Sinatra::Base

  get '/' do
    '<h1>phtc_grille_app</h1>'
  end
  
  # restart service at /lib/systemd/system/phtc_grille.service
  get '/restart' do
    `sudo service phtc_grille restart`
    status = `systemctl is-active phtc_grille.service` 
    redirect "http://petworth.dvrdns.org:3030/phtc"
    #{"status" => status}.to_json
  end
  
  get '/start' do
    `sudo service phtc_grille start`
    status = `systemctl is-active phtc_grille.service` 
    redirect "http://petworth.dvrdns.org:3030/phtc"
    #{"status" => status}.to_json
  end
  
  get '/stop' do
    `sudo service phtc_grille stop`
    status = `systemctl is-active phtc_grille.service`
    redirect "http://petworth.dvrdns.org:3030/phtc"
    #{"status" => status}.to_json
  end
  
  get '/status' do
    status = `systemctl is-active phtc_grille.service`
    {"status" => status.strip!}.to_json
  end
  
  get '/appstatus' do
    status = `systemctl is-active thin`
    {"appstatus" => status.strip!}.to_json
  end
  
  get '/restartapp' do
    `sudo service thin restart`
    appstatus = `systemctl is-active thin` 
    {"status" => appstatus}.to_json
    redirect "http://petworth.dvrdns.org:3030/phtc"
    
  end
  
  get '/sensitivity' do
    file = File.read("/home/pi/phtc/phtc_grille2.json") 
	sensitivity = JSON.parse(file)["SeismicIntensity"]
	{"sensitivity" => sensitivity}.to_json  
  end
  
  get '/increase_sensitivity' do
    file = File.read("/home/pi/phtc/phtc_grille2.json") 
	json_hash = JSON.parse(file)
	json_hash["SeismicIntensity"] = json_hash["SeismicIntensity"] - 0.5
	File.open("/home/pi/phtc/phtc_grille2.json", "w") do |file|
      file.puts json_hash.to_json
    end
	{"sensitivity" => json_hash["SeismicIntensity"]}.to_json
	redirect "http://petworth.dvrdns.org:3030/phtc"  
  end
  
  get '/decrease_sensitivity' do
    file = File.read("/home/pi/phtc/phtc_grille2.json") 
	json_hash = JSON.parse(file)
	json_hash["SeismicIntensity"] = json_hash["SeismicIntensity"] + 0.5
	File.open("/home/pi/phtc/phtc_grille2.json", "w") do |file|
      file.puts json_hash.to_json
    end
	{"sensitivity" => json_hash["SeismicIntensity"]}.to_json
	redirect "http://petworth.dvrdns.org:3030/phtc"  
  end
  
  get '/duration' do
    file = File.read("/home/pi/phtc/phtc_grille2.json") 
	duration = JSON.parse(file)["PredefinedSecondsUntilDim"]
	{"duration" => duration}.to_json  
  end
  
  get '/increase_duration' do
    file = File.read("/home/pi/phtc/phtc_grille2.json") 
	json_hash = JSON.parse(file)
	json_hash["PredefinedSecondsUntilDim"] = json_hash["PredefinedSecondsUntilDim"] + 1
	File.open("/home/pi/phtc/phtc_grille2.json", "w") do |file|
      file.puts json_hash.to_json
    end
	{"duration" => json_hash["PredefinedSecondsUntilDim"]}.to_json
	redirect "http://petworth.dvrdns.org:3030/phtc"  
  end
  
  get '/decrease_duration' do
    file = File.read("/home/pi/phtc/phtc_grille2.json") 
	json_hash = JSON.parse(file)
	json_hash["PredefinedSecondsUntilDim"] = json_hash["PredefinedSecondsUntilDim"] - 1
	File.open("/home/pi/phtc/phtc_grille2.json", "w") do |file|
      file.puts json_hash.to_json
    end
	{"duration" => json_hash["PredefinedSecondsUntilDim"]}.to_json
	redirect "http://petworth.dvrdns.org:3030/phtc"  
  end
  
  get '/last_seismic_activity' do
    last_seismic_activity1 = YAML.load_file("/home/pi/phtc/last_seismic_intensity1.yml") 
	last_seismic_activity_time1 = File.mtime("/home/pi/phtc/last_seismic_intensity1.yml")
	last_seismic_activity_time1 = last_seismic_activity_time1.strftime("%a %H:%M:%S")
	last_seismic_activity2 = YAML.load_file("/home/pi/phtc/last_seismic_intensity2.yml") 
	last_seismic_activity_time2 = File.mtime("/home/pi/phtc/last_seismic_intensity2.yml")
	last_seismic_activity_time2 = last_seismic_activity_time2.strftime("%a %H:%M:%S")
	
	{"last_seismic_activity1" => last_seismic_activity1,"last_seismic_activity_time1" => last_seismic_activity_time1,"last_seismic_activity2" => last_seismic_activity2,"last_seismic_activity_time2" => last_seismic_activity_time2}.to_json  
  end
  
  get '/last_seismic_activity_lit' do
    last_seismic_activity_lit1 = YAML.load_file("/home/pi/phtc/last_seismic_intensity_lit1.yml") 
	last_seismic_activity_time_lit1 = File.mtime("/home/pi/phtc/last_seismic_intensity_lit1.yml")
	last_seismic_activity_time_lit1 = last_seismic_activity_time_lit1.strftime("%a %H:%M:%S")
	last_seismic_activity_lit2 = YAML.load_file("/home/pi/phtc/last_seismic_intensity_lit2.yml") 
	last_seismic_activity_time_lit2 = File.mtime("/home/pi/phtc/last_seismic_intensity_lit2.yml")
	last_seismic_activity_time_lit2 = last_seismic_activity_time_lit2.strftime("%a %H:%M:%S")
	last_hit_3 = YAML.load_file("/home/pi/phtc/last_hit_3.yml") 
	last_hit_time_3 = File.mtime("/home/pi/phtc/last_hit_3.yml")
	last_hit_time_3 = last_hit_time_3.strftime("%a %H:%M:%S")

	{"last_seismic_activity_lit1" => last_seismic_activity_lit1,"last_seismic_activity_time_lit1" => last_seismic_activity_time_lit1,"last_seismic_activity_lit2" => last_seismic_activity_lit2,"last_seismic_activity_time_lit2" => last_seismic_activity_time_lit2,"last_hit_3" => last_hit_3, "last_hit_time_3" => last_hit_time_3}.to_json  
  end
  
end
