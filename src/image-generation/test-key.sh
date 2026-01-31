#!/bin/bash
# Test if OPENAI_API_KEY is valid and billing is active for image generation

echo "=== OpenAI API Key Test ==="
echo ""

# Check if key is set
if [ -z "$OPENAI_API_KEY" ]; then
    echo "ERROR: OPENAI_API_KEY environment variable is not set"
    echo "   Set it with: export OPENAI_API_KEY='your-key-here'"
    exit 1
fi

echo "OPENAI_API_KEY is set (${#OPENAI_API_KEY} characters)"
echo ""

# Test 1: Models endpoint (basic connectivity)
echo "Test 1: Basic API connectivity (models endpoint)..."
RESPONSE=$(curl -s -w "\n%{http_code}" \
    https://api.openai.com/v1/models \
    -H "Authorization: Bearer $OPENAI_API_KEY")

HTTP_CODE=$(echo "$RESPONSE" | tail -n1)

if [ "$HTTP_CODE" -eq 200 ]; then
    echo "  PASS: API key is valid"
else
    echo "  FAIL: HTTP $HTTP_CODE"
    BODY=$(echo "$RESPONSE" | sed '$d')
    ERROR_MSG=$(echo "$BODY" | grep -o '"message": *"[^"]*"' | sed 's/"message": "//g' | sed 's/"//g')
    echo "  Error: $ERROR_MSG"
    exit 1
fi

# Test 2: Chat completions (requires active billing)
echo ""
echo "Test 2: Chat completions API (requires billing)..."
RESPONSE=$(curl -s -w "\n%{http_code}" \
    https://api.openai.com/v1/chat/completions \
    -H "Authorization: Bearer $OPENAI_API_KEY" \
    -H "Content-Type: application/json" \
    -d '{
        "model": "gpt-4o-mini",
        "messages": [{"role": "user", "content": "Say OK"}],
        "max_tokens": 5
    }')

HTTP_CODE=$(echo "$RESPONSE" | tail -n1)
BODY=$(echo "$RESPONSE" | sed '$d')

if [ "$HTTP_CODE" -eq 200 ]; then
    echo "  PASS: Chat completions working"
else
    echo "  FAIL: HTTP $HTTP_CODE"
    ERROR_MSG=$(echo "$BODY" | grep -o '"message": *"[^"]*"' | sed 's/"message": "//g' | sed 's/"//g')
    ERROR_CODE=$(echo "$BODY" | grep -o '"code": *"[^"]*"' | sed 's/"code": "//g' | sed 's/"//g')
    echo "  Error: $ERROR_MSG"
    if [ "$ERROR_CODE" = "billing_not_active" ]; then
        echo ""
        echo "  Your account needs active billing for API usage."
        echo "  Visit: https://platform.openai.com/account/billing"
    fi
    exit 1
fi

# Test 3: Responses API (used by the cover generator)
echo ""
echo "Test 3: Responses API (used by cover generator)..."
RESPONSE=$(curl -s -w "\n%{http_code}" \
    https://api.openai.com/v1/responses \
    -H "Authorization: Bearer $OPENAI_API_KEY" \
    -H "Content-Type: application/json" \
    -d '{
        "model": "gpt-4o-mini",
        "input": "Say OK"
    }')

HTTP_CODE=$(echo "$RESPONSE" | tail -n1)
BODY=$(echo "$RESPONSE" | sed '$d')

if [ "$HTTP_CODE" -eq 200 ]; then
    echo "  PASS: Responses API working"
else
    echo "  FAIL: HTTP $HTTP_CODE"
    ERROR_MSG=$(echo "$BODY" | grep -o '"message": *"[^"]*"' | sed 's/"message": "//g' | sed 's/"//g')
    ERROR_CODE=$(echo "$BODY" | grep -o '"code": *"[^"]*"' | sed 's/"code": "//g' | sed 's/"//g')
    echo "  Error: $ERROR_MSG"
    if [ "$ERROR_CODE" = "billing_not_active" ]; then
        echo ""
        echo "  Your account needs active billing for the Responses API."
        echo "  Visit: https://platform.openai.com/account/billing"
    fi
    exit 1
fi

echo ""
echo "=== All tests passed ==="
echo "Your API key is ready for cover image generation."
