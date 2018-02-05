class MainController < Sinatra::Base

  get '/' do
    '<h1>phtc_grille_app</h1>'
  end
  
  # restart service at /lib/systemd/system/phtc_grille.service
  get '/restart' do
    `service phtc_grille restart`
    'service restarted'
  end
  
  # restart service at /lib/systemd/system/phtc_grille.service
  get '/stop' do
    `service phtc_grille stop`
    'service stopped'
  end
  
  get '/status' do
    status = `systemctl is-active phtc_grille.service`
    status
  end

end
