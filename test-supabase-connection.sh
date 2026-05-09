#!/bin/bash

# Test script to verify Supabase connection
# Run with: bash test-supabase-connection.sh

echo "🔍 Testing Supabase Connection..."
echo ""

# Check if .env.local exists
if [ ! -f .env.local ]; then
    echo "❌ ERROR: .env.local file not found!"
    echo "   Please create .env.local with your Supabase credentials."
    echo "   See .env.example for template."
    exit 1
fi

# Source the .env.local file
source .env.local

# Check if variables are set
if [ -z "$VITE_SUPABASE_URL" ]; then
    echo "❌ ERROR: VITE_SUPABASE_URL is not set in .env.local"
    exit 1
fi

if [ -z "$VITE_SUPABASE_ANON_KEY" ]; then
    echo "❌ ERROR: VITE_SUPABASE_ANON_KEY is not set in .env.local"
    exit 1
fi

echo "✅ Environment variables found:"
echo "   VITE_SUPABASE_URL: ${VITE_SUPABASE_URL:0:30}..."
echo "   VITE_SUPABASE_ANON_KEY: ${VITE_SUPABASE_ANON_KEY:0:30}..."
echo ""

# Test Supabase connection
echo "📡 Testing connection to Supabase..."
HTTP_CODE=$(curl -s -o /dev/null -w "%{http_code}" "$VITE_SUPABASE_URL/rest/v1/" \
    -H "apikey: $VITE_SUPABASE_ANON_KEY" \
    -H "Authorization: Bearer $VITE_SUPABASE_ANON_KEY")

if [ "$HTTP_CODE" -eq 200 ]; then
    echo "✅ Successfully connected to Supabase!"
else
    echo "❌ Failed to connect to Supabase (HTTP $HTTP_CODE)"
    echo "   Please check your credentials and network connection."
    exit 1
fi

echo ""
echo "🎉 All checks passed! Your Supabase setup is working."
echo ""
echo "Next steps:"
echo "1. Run 'bun run dev' to start the development server"
echo "2. Navigate to /share to add a test vehicle"
echo "3. Check /marketplace to see the vehicle listed"
