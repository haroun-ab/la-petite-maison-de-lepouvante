#!/bin/sh
set -e

echo "Waiting for gateway to be reachable..."
while ! nc -z gateway 8888; do
  echo "Gateway not ready yet, waiting..."
  sleep 2
done

echo "Gateway is reachable, starting Nginx..."
exec nginx -g "daemon off;"
