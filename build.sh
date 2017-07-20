#!/usr/bin/env bash
set -e

if [ ! -f rootfs.tar.gz ]; then
  curl https://dev.alpinelinux.org/alpine/v3.5/releases/armhf/alpine-minirootfs-3.5.0-armhf.tar.gz -o rootfs.tar.gz
fi

docker build -f ./Dockerfile -t automation-on-vacation:armhf .
