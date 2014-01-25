#!/bin/sh
node server.js & node=$!
while sleep 1
do
	git remote update
	git diff --quiet master origin/master && continue
	git merge origin/master
	kill $node
	wait $node
	node server.js & node=$!
done
