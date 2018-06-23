#!/bin/bash

# build first
npm run build

# parse token
url=`git remote get-url origin`
regex="devfans:(.+)@github"
[[ $url =~ $regex ]]
if [[ $? != 0 ]]
then
  echo "token is not included in the url"
  exit 1
fi
GITHUB_TOKEN="${BASH_REMATCH[1]}"
REPO="https://devfans:${GITHUB_TOKEN}@github.com/devfans/devfans.github.io"

if [ -d temp ]
then
  rm -rf temp
fi

mkdir temp

pushd temp
echo "cloning repo from github"
git clone --depth=1 $REPO
pushd devfans.github.io
cp -rf ../../dist/* .
git add *
git commit -m 'update deploy'
echo "committing update"

exit 0

git push origin master
echo "deployed successfully"

popd
popd
rm -rf temp


