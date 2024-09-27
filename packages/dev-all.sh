# Based on: https://gist.github.com/wndhydrnt/3be3cd4552ec356f98e7497b0d4a426c
#!/bin/sh

SCRIPT=dev
PACKAGES=$(ls -1d $(dirname $0)/*/)

pids=""
RESULT=0

for PKG_DIR in $PACKAGES; do
  [ -f "$PKG_DIR/package.json" ] || continue
  
  HAS_DEV_SCRIPT=$(jq -r ".scripts.$SCRIPT // empty" "$PKG_DIR/package.json")
  [ -n "$HAS_DEV_SCRIPT" ] || continue
  
  PKG_NAME=$(jq -r '.name' "$PKG_DIR/package.json")
  
  sh -eo pipefail -c "pnpm --silent --color -F $PKG_NAME run $SCRIPT | \
  awk '{print \"${PKG_NAME}:${SCRIPT}: \"\$0}'" &
  pids="${pids} $!"
done

for pid in $pids; do
  wait $pid || let "RESULT=1"
done

exit ${RESULT}
