#!/bin/bash
build_site="http://build.funcoff.club:8000"
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
    while [ $attempt -le 88 ]; do
	attempt=$(( $attempt + 1 ))
	echo "Waiting for server to be up (attempt: $attempt)..."
	result=$(docker logs ${CI_PROJECT_NAME})
	if grep -q 'Angular Live Development Server is listening' <<< $result ; then
	    echo "Server is up"
	    break
	fi
	sleep 2
    done
}


# testing availability
check_online

# doing tests
checkstate

if [[ $? -eq 0 ]]
then
	echo "Develop server <${CI_PROJECT_NAME}> is online. Proceed to deploy stage"
else
	echo "Failed to build."
	exit 2
fi

