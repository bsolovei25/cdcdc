#!/bin/bash

source set_env.sh

#TAGNAME="$(curl --header "PRIVATE-TOKEN: ${GITLAB_TOKEN}" https://${GITLAB_HOST}/api/v4/projects/${CI_PROJECT_ID}/repository/tags/ --silent | jq 'sort_by(.commit.created_at) | .[].name ' | tail -n 1)"
DESCRIPTION_FILE_PATH="${OUTPUT_DESCRIPTION}/$(ls -t1 ${OUTPUT_DESCRIPTION} | head -1)"
RELEASE_NAME="$TAGNAME"
#RELEASE_NAME=$(ssh deploy.funcoff.club cat /tmp/current_tagname)
#TAGNAME=$(ssh deploy.funcoff.club cat /tmp/current_tagname)
#
echo "Tagname: $TAGNAME"
echo "DESCRIPTION_FILE_PATH: $DESCRIPTION_FILE_PATH"
DESCRIPTION=''

# replace quotes
sed -E -i "s/\"/\'/g" $DESCRIPTION_FILE_PATH

# replace tabs :(
sed -E -i "s/\t/ /g" $DESCRIPTION_FILE_PATH


# Load data from file
while read -r line; do
    DESCRIPTION="${DESCRIPTION}${line}\n";
done < "${DESCRIPTION_FILE_PATH}"

echo $DESCRIPTION
curl --request POST\
     --header 'Content-Type: application/json'\
     --header "Private-Token: ${GITLAB_TOKEN}"\
     --data-binary "{\"name\": \"${RELEASE_NAME//\"/}\", \"tag_name\": \"${TAGNAME//\"/}\", \"description\": \"${DESCRIPTION}\"}"\
     "https://${GITLAB_HOST}/api/v4/projects/${CI_PROJECT_ID}/releases"

# the same for another project
#echo $DESCRIPTION
curl --request POST\
     --header 'Content-Type: application/json'\
     --header "Private-Token: ${GITLAB_TOKEN}"\
     --data-binary "{\"name\": \"${RELEASE_NAME//\"/}\", \"tag_name\": \"${TAGNAME//\"/}\", \"description\": \"${DESCRIPTION}\"}"\
     "https://${GITLAB_HOST}/api/v4/projects/26/releases"
