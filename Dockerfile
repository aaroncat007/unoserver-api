FROM telemark/docker-node-unoconv:12.18.3

#### Begin setup ####
# Installs git, unoconv and chinese fonts
RUN apt-get update && apt-get -y install \
    python3 \
    python3-pip \
&& rm -rf /var/lib/apt/lists/*

RUN python3 -m pip install unoserver

# Bundle app source
COPY . /src

# Change working directory
WORKDIR /src

# Install dependencies
RUN npm install --production

# Env variables
ENV SERVER_PORT 3000
ENV PAYLOAD_MAX_SIZE 1048576
ENV PAYLOAD_TIMEOUT 120000
ENV TIMEOUT_SERVER 120000
ENV TIMEOUT_SOCKET 140000

# Expose 3000
EXPOSE 3000

# Startup
ENTRYPOINT unoserver --daemon --interface=0.0.0.0 --port=2002 & node standalone.js