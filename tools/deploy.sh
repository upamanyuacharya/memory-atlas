#!/usr/bin/env bash
# Deploy The Memory Atlas to memory.upamanyuacharya.com (WordOps static site).
#
# Two hard-won rules:
#  1. Never scp index.html in place — nginx open_file_cache keeps the old inode size and
#     serves the new file truncated at the OLD byte count. Stage, then mv -f over, then reload.
#  2. Use ONE ssh connection. The host rate-limits SSH per source IP (ufw limit / sshd):
#     a burst of scp calls gets port 22 dropped for minutes (learned deploying v2.0.0).
#     So everything travels as a single tar stream over a single ssh session; the swap
#     happens remotely in that same session; verification is done over HTTPS.
set -euo pipefail
cd "$(dirname "$0")/.."
HOST=root@172.104.47.189
ROOT=/var/www/memory.upamanyuacharya.com/htdocs

npm run build:check >/dev/null || { echo "index.html is stale vs data/atlas-data.js — run npm run build"; exit 1; }

echo "→ uploading + swapping (one ssh session)"
tar czf - index.html sitemap.xml robots.txt read assets/*.png | ssh -o ConnectTimeout=25 "$HOST" "
  set -e
  S=/tmp/atlas-stage; rm -rf \$S; mkdir -p \$S; tar xzf - -C \$S
  cd $ROOT
  for f in index.html sitemap.xml robots.txt; do cp \$S/\$f \$f.new && mv -f \$f.new \$f; done
  rm -rf read.new; cp -r \$S/read read.new; rm -rf read; mv read.new read
  mkdir -p assets; for f in \$S/assets/*.png; do b=\$(basename \$f); cmp -s \$f assets/\$b || { cp \$f assets/\$b.new && mv -f assets/\$b.new assets/\$b; }; done
  chown -R www-data:www-data .
  nginx -t -q && nginx -s reload
  rm -rf \$S
  echo '  swapped + nginx reloaded'
"

echo "→ verifying over HTTPS"
for p in index.html read/index.html read/hbm.html read/wall.html read/investor.html sitemap.xml; do
  lh=$(md5sum "$p" | cut -d' ' -f1)
  rh=$(curl -s "https://memory.upamanyuacharya.com/$p" | md5sum | cut -d' ' -f1)
  if [ "$lh" = "$rh" ]; then echo "  ✓ $p"; else echo "  ✗ $p (local $lh · live $rh)"; exit 1; fi
done
echo "deployed $(git describe --tags --always)"
