#!/bin/bash

mkdir -p /var/www/demo/build
cd /var/www/demo

# backup default settings
cp /etc/nginx/sites-available/default /etc/nginx/sites-available/default_copy_2
cp ./scripts/nginx-http-conf /etc/nginx/sites-available/default

# generate certificate
sudo apt-get remove certbot
sudo snap install --classic certbot
sudo certbot --nginx

sudo systemctl restart nginx

cd /var/www/demo/

sudo -u nodejs pm2 delete hello
sudo -u nodejs pm2 save --force
