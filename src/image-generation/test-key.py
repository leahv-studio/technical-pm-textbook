#!/usr/bin/env python3
"""Test OpenAI API key with the Python SDK"""

import os
import sys

# Check environment variable
api_key = os.environ.get("OPENAI_API_KEY", "")
print("=== OpenAI Python SDK Test ===\n")

if not api_key:
    print("ERROR: OPENAI_API_KEY not set")
    sys.exit(1)

print(f"OPENAI_API_KEY from env: {len(api_key)} characters")
print(f"Key prefix: {api_key[:8]}...")

try:
    from openai import OpenAI
    print(f"\nopenai package imported successfully")

    # Create client - this uses OPENAI_API_KEY by default
    client = OpenAI()

    # Check what key the client is using
    print(f"Client API key: {len(client.api_key)} characters")
    print(f"Client key prefix: {client.api_key[:8]}...")

    if client.api_key != api_key:
        print("\nWARNING: Client is using a DIFFERENT key than OPENAI_API_KEY!")
        print("The SDK may be reading from a config file.")

    # Test 1: List models
    print("\nTest 1: Listing models...")
    models = client.models.list()
    print(f"  PASS: Found {len(list(models))} models")

    # Test 2: Chat completions
    print("\nTest 2: Chat completions...")
    response = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[{"role": "user", "content": "Say OK"}],
        max_tokens=5
    )
    print(f"  PASS: Response: {response.choices[0].message.content}")

    # Test 3: Responses API (what the cover generator uses)
    print("\nTest 3: Responses API...")
    resp = client.responses.create(
        model="gpt-4o-mini",
        input="Say OK"
    )
    output_text = getattr(resp, "output_text", None)
    if not output_text:
        output_text = resp.output[0].content[0].text
    print(f"  PASS: Response: {output_text[:50]}...")

    print("\n=== All tests passed ===")

except Exception as e:
    print(f"\nFAILED: {type(e).__name__}: {e}")
    sys.exit(1)
