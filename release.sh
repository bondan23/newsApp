#!/bin/bash
cd android && ./gradlew assembleRelease && open app/build/outputs/apk/ && cd ..
