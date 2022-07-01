#!/bin/bash

kubectl patch -n jarvis-trading-ui deployment trade-bot-ui -p "{\"spec\":{\"template\":{\"metadata\":{\"labels\":{\"date\":\"`date +'%s'`\"}}}}}"
