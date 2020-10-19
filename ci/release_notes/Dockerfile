FROM python:3.8-slim as base
WORKDIR /app
COPY ./requirements.txt ./
RUN pip install -r requirements.txt
RUN pip install --upgrade python-gitlab 

FROM base as runtime
ENV GITLAB_TOKEN="zh1Thw-dZVw5sx58KZjp"
ENV GITLAB_HOST="gitlab.funcoff.club"
ENV OUTPUT_DESCRIPTION='./output'
COPY ./ ./
EXPOSE 80
