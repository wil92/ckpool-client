# CKPool Client

CKPool Client is a CLI to visualize the mining statistics of your CKPool service.

## About

This project is meant to be used in parallel with the CKPool mining pool service. The CkPool mining pool service defines
some JSON files that update periodically with mining statistics. These statistics are used by this client to visualize
the mining performance.

The files are located in the CKPool logs directory and have the following paths:

```
├── pool
│   ├── pool.status
├── users
│   ├── <wallet_address1>
│   ├── <wallet_address0>
│   ├── ...
```

> All these files are JSON files that contain the mining statistics and performance of the pool and the users.

## Installation

I recommend using Docker to run this client, and here I leave you a simple `Dockerfile` to build the image:

```Dockerfile
# dashboard.Dockerfile
FROM node:20.17

RUN apt-get update && apt-get install -y git

WORKDIR /

RUN git clone https://github.com/wil92/ckpool-client.git

WORKDIR /ckpool-client
RUN npm install

EXPOSE 3000

CMD ["node", "bin/www"]
```

Then you can start the container with Docker or, in my case, with docker-compose:

```yaml
# docker-compose.yml
version: '3.8'

services:
  ckpool_client:
    build:
      context: .
      dockerfile: dashboard.Dockerfile
    container_name: ckpool_client
    ports:
      - "3000:3000"
    environment:
      - POOL_LOGS_PATH=/logs
    volumes:
      - <ckpool-logs-folder>:/logs
```

> Replace `<ckpool-logs-folder>` with the path to your CKPool logs folder.
> You can also make use of a volume and share it with the CKPool service container if you are using docker-compose for both services.
