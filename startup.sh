#!/bin/sh

echo "Start sshd"
/usr/sbin/sshd

echo "Start nginx"
nginx -g "daemon off;"