# This script runs an NPM script for every package in parallel, prefixing the
# stdout of each stdout with the package's directory name, and fails if one of
# the commands exits with a code != 0
# Based on: https://gist.github.com/wndhydrnt/3be3cd4552ec356f98e7497b0d4a426c

#!/bin/sh

# If first argument is missing, exit with an error
[ -z $1 ] && echo -e "This script should be called with the name of an NPM \
script as an argument. \nExample: $0 build" && exit 1;

PACKAGES_DIR=$(dirname $0)
PACKAGES=$(cd $PACKAGES_DIR && ls -1d */ | sed 's#/##')

pids=""
RESULT=0

for PACKAGE in $PACKAGES; do
  # 'sh -eo pipefail -c' allows for capturing the correct exit code.
  # It is needed because the output of ./program.sh is piped through awk to prefix the output.
  # The pipe makes the line to always exit with a code of 0 because 'awk' always succeeds without -o pipefail.
  sh -eo pipefail -c "pnpm --silent -F $PACKAGE run $1 | awk '{print \"[${PACKAGE}] \"\$0}'" &
  pids="${pids} $!"
done

# 'jobs -p' might work as well
for pid in $pids; do
  # 'wait' is nice and returns the exit code of a process even if the process has exited already!
  wait $pid || let "RESULT=1"
done

exit ${RESULT}
