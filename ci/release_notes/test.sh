
source set_env.sh

TAGNAME="$(curl --header "PRIVATE-TOKEN: ${GITLAB_TOKEN}" https://${GITLAB_HOST}/api/v4/projects/${CI_PROJECT_ID}/repository/tags/ --silent | jq 'sort_by(.commit.created_at) | .[].name ' | tail -n 1)"
DESCRIPTION_FILE_PATH="${OUTPUT_DESCRIPTION}/$(ls -t1 ${OUTPUT_DESCRIPTION} | head -1)"
RELEASE_NAME="$TAGNAME"
echo $TAGNAME

tagname="$(ssh root@deploy.funcoff.club cat /tmp/current_tagname)"
echo $tagname
