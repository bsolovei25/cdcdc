# base image
FROM gitlab.funcoff.club:4567/oaovd/osspu/evj/front/caches:17.03.2020
#FROM node:lts-buster

# install chrome for protractor tests
#RUN wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add -
#RUN sh -c 'echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google.list'
#RUN apt-get update && apt-get install -yq google-chrome-stable


# set working directory
#WORKDIR /app

# add '/app/node_moudles/.bin' to $PATH
#ENV PATH /app/node_modules/.bin:$PATH

# install and cache app dependencies
COPY ./package.json /app/package.json
RUN npm install
#ENV NG_CLI_ANALYTICS=ci
#RUN npm install @angular/cli@9.0.1

# add app
COPY ./ /app

# start app
CMD ng serve --host 0.0.0.0 --disableHostCheck
