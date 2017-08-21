# Deploy to Github Pages by copying /public into master branch
# https://gist.github.com/cobyism/4730490

#!/bin/sh

webpack

git checkout gh-pages
sed -i "" '/build/d' ./.gitignore # remove line from .gitignore
git add .
git commit -m "Edit .gitignore to publish"

git push origin --force

git reset HEAD~
git checkout .gitignore

git checkout master
