# Install supervisor
apt-get update
apt-get install supervisor -y

# Copy supervisor config
cp ~/demo-oauth-page/compose/app.conf /etc/supervisor/conf.d/

# Pull latest image
#cd ~/compose
#echo $USERNAME
#echo $TOKEN
#docker login -u $USERNAME -p $TOKEN registry.gitlab.com
#docker-compose pull
cd ~/demo-oauth-page
docker-compose build

echo "supervisorctl status"
supervisorctl status

# Destroy current cointainers
if supervisorctl status | grep -q "RUN"; then
    echo "docker-compose down"
    supervisorctl update
    docker-compose down
else
    # first time run
    echo "service supervisor restart"
    service supervisor restart
fi

echo "supervisorctl status"
supervisorctl status

# Cleanup old images
docker system prune -f