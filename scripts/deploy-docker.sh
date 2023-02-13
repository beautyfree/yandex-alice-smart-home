#!/bin/sh

# Exit on any error
set -euo pipefail

IMAGE=devall/smart-home

docker build . \
  --platform linux/amd64 \
  -t $IMAGE

docker push $IMAGE
