#!/usr/bin/env sh

git config -f .gitmodules --get-regex submodule\.\*url \
  | sed 's/submodule.//g;s/.url//g' \
  | awk '{print $2,$1}' \
  | xargs -n2 git clone --recursive \
  | sh
