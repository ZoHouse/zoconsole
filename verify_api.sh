#!/bin/bash

API_URL="https://zohm-api.up.railway.app/api/v1"
NODE_ID="wtfxzo"
ZONE_ID="wtfxzo-Z20" # Using Kitchen zone ID found in previous output

echo "Verifying API endpoints for Node: $NODE_ID"

# 1. Create Task
echo -e "\n1. Creating Task..."
TASK_ID="TASK_$(date +%s)"
curl -s -X POST "$API_URL/tasks" \
  -H "Content-Type: application/json" \
  -d "{
    \"node_id\": \"$NODE_ID\",
    \"task_id\": \"$TASK_ID\",
    \"task_name\": \"Curl Test Task $TASK_ID\",
    \"task_description\": \"Test task description\",
    \"photo_required\": \"no\",
    \"estimated_time\": \"10m\",
    \"category\": \"general\"
  }"
echo ""

# 2. Create Template
echo -e "\n2. Creating Template..."
TEMPLATE_ID="TPL_$(date +%s)"
curl -s -X POST "$API_URL/templates" \
  -H "Content-Type: application/json" \
  -d "{
    \"node_id\": \"$NODE_ID\",
    \"template_id\": \"$TEMPLATE_ID\",
    \"template_name\": \"Curl Test Template $TEMPLATE_ID\",
    \"total_est_time\": \"20m\"
  }"
echo ""

# 3. Link Template to Zone (Create Zone Template)
echo -e "\n3. Linking Template to Zone..."
curl -s -X POST "$API_URL/zone-templates" \
  -H "Content-Type: application/json" \
  -d "{
    \"node_id\": \"$NODE_ID\",
    \"zone_id\": \"$ZONE_ID\",
    \"zone_name\": \"Kitchen\",
    \"floor\": \"Service\",
    \"template_id\": \"$TEMPLATE_ID\",
    \"template_name\": \"Curl Test Template $TEMPLATE_ID\",
    \"use_case\": \"Testing Linkage\"
  }"
echo ""

# 4. Create Playlist
echo -e "\n4. Creating Playlist..."
curl -s -X POST "$API_URL/playlists" \
  -H "Content-Type: application/json" \
  -d "{
    \"node_id\": \"$NODE_ID\",
    \"playlist_type\": \"custom\",
    \"templates_included\": \"$TEMPLATE_ID\",
    \"priority\": \"normal\",
    \"est_time\": \"30m\"
  }"
echo ""
