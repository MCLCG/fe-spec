#!/usr/bin/env sh

## 在linux下才能执行这个脚本

# 确保脚本抛出遇到的错误
set -e

# 定义变量
push_addr=`git remote get-url --push origin`
commit_info=`git describe --all --always --long`
dist_path=docs/.vuepress/dist
push_branch=gh-pages

# 生成静态文件
npm run docs:build

# 进入生成的文件夹
cd $dist_path

# 执行git的脚本
git init
git add -A
git commit -m "deploy, $commit_info"
git push -f $push_addr HEAD:$push_branch

cd -
rimraf $dist_path
