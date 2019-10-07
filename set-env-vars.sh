#!/bin/bash

awk '!/NODE_ENV/' .env >> temp && mv temp .env
echo -e '\nNODE_ENV='$1 >> .env
awk NF .env >> temp && mv temp .env
