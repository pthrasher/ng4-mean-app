#!/bin/bash
for file in `find $PWD/src -type f -name '*.less'`; do
  NEWNAME=`echo $file | sed "s|\.less|\.css|"`
  echo "$file -> $NEWNAME"
  node_modules/.bin/lessc $file $NEWNAME;
done
