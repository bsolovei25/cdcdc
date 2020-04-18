#!/bin/bash

# set default location of git project
GIT_DIR="/opt/evj/back"
GIT_DIR2="/opt/evj/front"

if [[ -z $1 ]]
then
    TAGNAME="v$(date -u +"%Y-%m-%dT%H_%M_%SZ")"
else
    TAGNAME=$1
fi

function cook_tag() {
    dir=$1
    cd $dir
    #git pull
    git checkout release
    git pull origin master --no-edit
    git tag -a $TAGNAME HEAD -m "Created with pipelines at $(date -u +"%Y-%m-%dT%H:%M:%SZ")"
    git push origin release $TAGNAME
}

echo "Tagname supplied: $TAGNAME"
echo "Fetching changes"
echo "prepating ssh-agent ..."
#eval $(ssh-agent -s)
#ssh-add ~/.ssh/hailfor-rsa

echo "Going into $GIT_DIR ..."
cook_tag $GIT_DIR

echo "Going into $GIT_DIR2 ..."
cook_tag $GIT_DIR2

echo $TAGNAME > /tmp/current_tagname
