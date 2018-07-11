#!/bin/bash
set -e
git config --global push.default simple # we only want to push one branch — master
# specify the repo on the live server as a remote repo, and name it 'production'
# <user> here is the separate user you created for deploying
git remote add deploy ssh://tmqps78@$IP$DEPLOY_DIR # travis environment varialbe
git push deploy master # push our updates

ssh apps@$IP <<EOF
  cd $DEPLOY_DIR
  npm i --save
  npm run build
EOF