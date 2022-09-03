#!/usr/bin/env bash

set -e

role=${CONTAINER_ROLE:-app}


if [ "$role" = "app" ]; then
    npm run start
else
    echo "Could not match the container role \"$role\""
    exit 1
fi
