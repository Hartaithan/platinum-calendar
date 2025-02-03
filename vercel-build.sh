#!/bin/bash

if [ "$VERCEL_GIT_COMMIT_REF" = "prod" ] || [ "$VERCEL_GIT_COMMIT_REF" = "preview" ]; then
  echo "build can proceed"
  exit 1;
else
  echo "build ignored"
  exit 0; 
fi