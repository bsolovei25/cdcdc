#!/bin/bash
build_site="http://build.funcoff.club:${BUILD_PORT}"
checkstate() {

	res=$(curl --silent ${build_site})

	if [[ $res == *"html"* ]]; then
		exit 0
	else
		exit 2
	fi
}

check_online()
{
    attempt=0
    while [ $attempt -le 10 ]; do
	attempt=$(( $attempt + 1 ))
	echo "Waiting for server to be up (attempt: $attempt)..."
	docker logs ${CI_PROJECT_NAME}
	result=$(docker logs ${CI_PROJECT_NAME})
	if grep -q 'Server is listening' <<< $result ; then
	    echo "Server is up"
    	    docker logs ${CI_PROJECT_NAME}
	    exit 0
	    break
	fi
	sleep 30
    done
}


# testing availability
check_online


# doing tests
# checkstate

if [[ $? -eq 0 ]]
then
	echo "Develop server <${CI_PROJECT_NAME}-mbo> is online. Proceed to deploy stage"
else
	echo "Failed to build."
	exit 2
fi

