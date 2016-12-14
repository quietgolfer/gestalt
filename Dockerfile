FROM node:6

RUN mkdir /app
WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH
ENV DISPLAY :99

ADD test/xvfb_init /etc/init.d/xvfb
ADD test/xvfb_daemon_run /usr/bin/xvfb-daemon-run

RUN curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add - && \
    echo "deb http://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list && \
    echo "deb http://mozilla.debian.net/ jessie-backports firefox-release" > /etc/apt/sources.list.d/debian-mozilla.list && \
    wget mozilla.debian.net/pkg-mozilla-archive-keyring_1.1_all.deb && \
    dpkg -i pkg-mozilla-archive-keyring_1.1_all.deb && \
    apt-get update -yy -qq && \
    apt-get install yarn libelf1 xvfb -yy -qq && \
    apt-get install --target-release jessie-backports firefox -yy -qq && \
    chmod a+x /etc/init.d/xvfb /usr/bin/xvfb-daemon-run

ADD package.json yarn.lock /app/

RUN yarn --pure-lockfile

ADD . /app
