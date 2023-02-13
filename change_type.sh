#!/bin/sh
# for osx use 
# sed -i '' 's/"type"...

# Check if package.json file exists
if [ -f "node_modules/proxmox-api/package.json" ]; then
  # Replace "type": "module" with "type": "commonjs" in package.json
  sed -i 's/"type": "module"/"type": "commonjs"/g' node_modules/proxmox-api/package.json
  echo "Changed 'type' in node_modules/proxmox-api/package.json to 'commonjs'"
else
  echo "node_modules/proxmox-api/package.json not found"
fi