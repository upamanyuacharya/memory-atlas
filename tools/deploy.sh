#!/usr/bin/env bash
# Deploy The Memory Atlas to memory.upamanyuacharya.com (WordOps static site).
#
# Three hard-won rules:
#  1. Never overwrite a served file in place — nginx open_file_cache keeps the old inode
#     size and serves the new file truncated at the OLD byte count.
#  2. Use ONE ssh connection. The host rate-limits SSH per source IP: a burst of scp calls
#     gets port 22 dropped for minutes (learned deploying v2.0.0).
#  3. Releases are atomic (review round 2): every deploy lands in its own directory under
#     releases/, is checked there, and the served `htdocs` symlink is switched with a single
#     rename. Nothing is ever half-deployed; the previous release stays for rollback:
#        ssh root@172.104.47.189 'cd /var/www/memory.upamanyuacharya.com && ln -sfn releases/<tag> htdocs.tmp && mv -Tf htdocs.tmp htdocs && nginx -s reload'
set -euo pipefail
cd "$(dirname "$0")/.."
HOST=root@172.104.47.189
SITE=/var/www/memory.upamanyuacharya.com
TAG=$(git describe --tags --always)-$(date -u +%Y%m%d%H%M%S)

npm run build:check >/dev/null || { echo "index.html is stale vs data/atlas-data.js — run npm run build"; exit 1; }

echo "→ uploading release $TAG + switching (one ssh session)"
tar czf - index.html sitemap.xml robots.txt read assets/*.png assets/og.jpg | ssh -o ConnectTimeout=25 "$HOST" "
  set -e
  cd $SITE
  R=releases/$TAG; mkdir -p \$R; tar xzf - -C \$R
  # first migration: a real htdocs directory becomes releases/pre-atomic and htdocs a symlink
  if [ -d htdocs ] && [ ! -L htdocs ]; then mv htdocs releases/pre-atomic; fi
  # sanity: the release must be complete before it is served
  test -s \$R/index.html && test -s \$R/read/index.html && test -s \$R/sitemap.xml && [ \$(ls \$R/read/*.html | wc -l) -ge 20 ] && [ \$(ls \$R/assets/*.png | wc -l) -ge 5 ]
  chown -R www-data:www-data \$R
  ln -sfn \$R htdocs.tmp && mv -Tf htdocs.tmp htdocs
  nginx -t -q && nginx -s reload
  # keep the last 5 releases (+ the pre-atomic snapshot)
  ls -1dt releases/v* 2>/dev/null | tail -n +6 | xargs -r rm -rf
  echo \"  serving \$(readlink htdocs)\"
"

echo "→ verifying over HTTPS"
for p in index.html read/index.html read/hbm.html read/wall.html read/investor.html sitemap.xml; do
  lh=$(md5sum "$p" | cut -d' ' -f1)
  rh=$(curl -s "https://memory.upamanyuacharya.com/$p" | md5sum | cut -d' ' -f1)
  if [ "$lh" = "$rh" ]; then echo "  ✓ $p"; else echo "  ✗ $p (local $lh · live $rh) — roll back: ssh $HOST 'cd $SITE && ls releases'"; exit 1; fi
done
echo "deployed $TAG"
