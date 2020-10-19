#!/bin/bash

source setenv.sh

TAGNAME="$(curl --header "PRIVATE-TOKEN: ${GITLAB_TOKEN}" https://${GITLAB_HOST}/api/v4/projects/${PROJECT_ID}/repository/tags/ --silent | jq 'sort_by(.commit.created_at) | .[].name ' | tail -n 1)"
DESCRIPTION_FILE_PATH="${OUTPUT_DESCRIPTION}/$(ls -t1 ${OUTPUT_DESCRIPTION} | head -1)"
RELEASE_NAME="$TAGNAME"


echo "Tagname: $TAGNAME"
echo "Release name: $RELEASE_NAME"
echo "DESCRIPTION_FILE_PATH: $DESCRIPTION_FILE_PATH"
echo "GITLAB_TOKEN: $GITLAB_TOKEN"
echo "OUTPUT_DESCRIPTION: $OUTPUT_DESCRIPTION"
echo "GITLAB_HOST: $GITLAB_HOST"
echo "PROJECT ID: $PROJECT_ID"

DESCRIPTION=''

# replace quotes
#sed -E -i "s/\"/\'/g" $DESCRIPTION_FILE_PATH

 # replace quotes
sed -E -i "s/\"/\'/g" $DESCRIPTION_FILE_PATH

# replace tabs
sed -E -i "s/\t/ /g" $DESCRIPTION_FILE_PATH

# Load data from file
while read -r line; do
    DESCRIPTION="${DESCRIPTION}${line}\n";
done < "${DESCRIPTION_FILE_PATH}"
#echo $DESCRIPTION

#desc=$(cat $DESCRIPTION_FILE_PATH)
echo ""
#echo "$desc"






curl --request POST\
     --header 'Content-Type: application/json'\
     --header "Private-Token: ${GITLAB_TOKEN}"\
     --data-binary "{\"name\": \"${RELEASE_NAME//\"/}\", \"tag_name\": \"${TAGNAME//\"/}\", \"description\": \"${DESCRIPTION}\"}"\
     "https://${GITLAB_HOST}/api/v4/projects/${PROJECT_ID}/releases"
