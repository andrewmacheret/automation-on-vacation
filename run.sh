#!/usr/bin/env bash
set -e

docker rm -f automation-on-vacation || true

#./build.sh

docker run -d --name automation-on-vacation --network host automation-on-vacation:armhf

docker logs -t -f automation-on-vacation
