#!/usr/bin/env python3
"""
open-chatgpt.py

Opens ChatGPT in a browser and pastes a prompt into the input field.
Works on macOS using AppleScript for browser automation.

Usage:
    python open-chatgpt.py "Your prompt here"
    echo "Your prompt" | python open-chatgpt.py

Requirements:
    - macOS (uses AppleScript and pbcopy)
    - Default browser will be used
"""

import subprocess
import sys
import time
import argparse


def copy_to_clipboard(text: str) -> None:
    """Copy text to macOS clipboard using pbcopy."""
    process = subprocess.Popen(['pbcopy'], stdin=subprocess.PIPE)
    process.communicate(text.encode('utf-8'))


def open_url(url: str) -> None:
    """Open URL in default browser."""
    subprocess.run(['open', url], check=True)


def paste_in_browser_applescript() -> None:
    """
    Use AppleScript to paste into the active browser window.
    This clicks in the input area and pastes from clipboard.
    """
    # AppleScript to:
    # 1. Wait for page to load
    # 2. Simulate Cmd+V to paste
    applescript = '''
    delay 3
    tell application "System Events"
        keystroke "v" using command down
    end tell
    '''
    subprocess.run(['osascript', '-e', applescript], check=True)


def paste_with_click_applescript() -> None:
    """
    More robust version that clicks in the input area first.
    ChatGPT's input is typically at the bottom center of the window.
    """
    applescript = '''
    -- Wait for page to load
    delay 4

    tell application "System Events"
        -- Press Tab a few times to get to the input field (ChatGPT focuses it automatically usually)
        -- Then paste
        keystroke "v" using command down

        -- Wait a moment then press Enter to submit (optional - comment out if you want to review first)
        -- delay 0.5
        -- keystroke return
    end tell
    '''
    subprocess.run(['osascript', '-e', applescript], check=True)


def main():
    parser = argparse.ArgumentParser(
        description="Open ChatGPT and paste a prompt"
    )
    parser.add_argument(
        'prompt',
        nargs='?',
        default=None,
        help="The prompt to paste. If not provided, reads from stdin."
    )
    parser.add_argument(
        '--no-paste',
        action='store_true',
        help="Only open browser and copy to clipboard, don't auto-paste"
    )
    parser.add_argument(
        '--delay',
        type=int,
        default=4,
        help="Seconds to wait before pasting (default: 4)"
    )
    args = parser.parse_args()

    # Get prompt from argument or stdin
    if args.prompt:
        prompt = args.prompt
    elif not sys.stdin.isatty():
        prompt = sys.stdin.read().strip()
    else:
        print("Error: No prompt provided. Pass as argument or pipe to stdin.")
        print("Usage: python open-chatgpt.py \"Your prompt here\"")
        print("   or: echo \"Your prompt\" | python open-chatgpt.py")
        sys.exit(1)

    print("Copying prompt to clipboard...")
    copy_to_clipboard(prompt)

    print("Opening ChatGPT in browser...")
    open_url("https://chatgpt.com/")

    if args.no_paste:
        print("\nPrompt copied to clipboard. Press Cmd+V to paste in ChatGPT.")
    else:
        print(f"Waiting {args.delay} seconds for page to load...")

        # Custom AppleScript with configurable delay
        applescript = f'''
        delay {args.delay}
        tell application "System Events"
            keystroke "v" using command down
        end tell
        '''

        try:
            subprocess.run(['osascript', '-e', applescript], check=True)
            print("Prompt pasted! Review and press Enter to generate the image.")
        except subprocess.CalledProcessError:
            print("\nAuto-paste failed. The prompt is in your clipboard - press Cmd+V to paste manually.")


if __name__ == "__main__":
    main()
