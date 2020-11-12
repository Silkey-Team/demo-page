#!/bin/bash

ssh root@$1 'rm -rf /var/www/demo/*'
scp -r scripts root@$1:/var/www/demo/
scp -r build root@$1:/var/www/demo/
