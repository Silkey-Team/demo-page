# Silkey DEMO page

## DigitalOcean Deployment

### Deploy as static files

#### First Run Based On DigitalOcean Droplet 

- create NodeJS droplet
- setup (sub)domains (including www.)
- ssh to server and run `nodejs-droplet-install.sh` on the server 
  Certbot script will ask you several quesions, when ask for domain type ie:  
  `demo-staging.silkey.io www.demo-staging.silkey.io`

__Check configuration__
```
cat /etc/nginx/sites-available/default
sudo -u nodejs pm2 list
# should be no items in the list
```
 
### Deploy service

    npm run build:staging
    ./scripts/deploy.sh demo-staging.silkey.io

### Docekerized deployment

- Create droplet based on predefinedd docker image
- Setup github:

```
# SSH to the server ssh root@<digitalocean server IP>
ssh root@159.203.176.56

ssh-keygen -t rsa -b 4096 -C "your_github_email@example.com"
eval "$(ssh-agent -s)"

# add generated public key to deplayment keys on github
cat ~/.ssh/id_rsa.pub

git config --global user.email "demo@silkey.io"
git config --global user.name "Digitalocean Docker"
git clone git@github.com:Silkey-Team/demo-oauth-page.git

cd ~/demo-oauth-page
git pull origin master

# in case you want to test other branch
git checkout -t origin/feature/oauth-demo
```
- setup docker app:

```
docker-compose build

# when run app first time, make sure all good by manually executing:
docker-compose up

# when all good, CTRL+C and run:
git checkout master
git fetch origin
git reset --hard origin/master

./compose/deploy.sh
```
