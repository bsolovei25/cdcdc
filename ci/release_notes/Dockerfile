FROM python:3.8-slim as base
WORKDIR /app
COPY ./requirements.txt ./
RUN pip install -r requirements.txt
RUN pip install --upgrade python-gitlab 

FROM base as runtime
COPY ./ ./
EXPOSE 80
