#!/bin/sh

if [ "$BASE_HREF" != "/" ]; then
  sed -i -e "s/\(<base href=\"\).*\(\".*>\)/\1\/$BASE_HREF\/\2/g" /usr/share/nginx/html/index.html
fi
sed -i -e "s/\(<title>\).*\(<\/title>\)/\1$TITLE\2/g" /usr/share/nginx/html/index.html
exec "$@"
