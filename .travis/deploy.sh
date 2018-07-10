#!/bin/bash
set -e
git config --global push.default simple # we only want to push one branch — master
# specify the repo on the live server as a remote repo, and name it 'production'
# <user> here is the separate user you created for deploying
git remote add deploy ssh://tmqps78@45.76.98.255/home/tmqps78/LTH_React/devlog
git push deploy master # push our updates