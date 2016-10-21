FROM node:5

RUN mkdir /app
WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH

# firefox

RUN echo "deb http://mozilla.debian.net/ jessie-backports firefox-release" > /etc/apt/sources.list.d/debian-mozilla.list && \
    wget mozilla.debian.net/pkg-mozilla-archive-keyring_1.1_all.deb && \
    dpkg -i pkg-mozilla-archive-keyring_1.1_all.deb && \
    apt-get update -yy && \
    apt-get install -t jessie-backports firefox -yy

# app

ADD . /app

RUN npm install --quiet && \
    npm run bootstrap

# xvfb

ENV DISPLAY :99
RUN apt-get install -yy -q xvfb

ADD test/xvfb_init /etc/init.d/xvfb
RUN chmod a+x /etc/init.d/xvfb
ADD test/xvfb_daemon_run /usr/bin/xvfb-daemon-run
RUN chmod a+x /usr/bin/xvfb-daemon-run
