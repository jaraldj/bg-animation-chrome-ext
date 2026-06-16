# Animate Website Background

A lightweight Chrome extension that adds customizable animated backgrounds to any website. Use the popup to enable/disable the animation and choose a preset.

## Features
- Toggle animated backgrounds on/off (persists via `chrome.storage.sync`).
- Select from multiple animation presets.
- Automatically reloads the active tab when settings change.

## Installation (Developer)
1. Open Chrome and go to `chrome://extensions/`.
2. Enable **Developer mode** (top-right).
3. Click **Load unpacked** and select the `animates-bg` folder.

## Usage
- Click the extension icon to open the popup.
- Use the toggle to enable or disable animations.
- Choose an animation from the dropdown; the active tab will reload to apply changes.

## Files
- `manifest.json` — extension manifest and permissions.
- `popup.html`, `popup.js` — UI for toggling and selecting animations.
- `content.js` — injects the background animation into pages.
- `background.js` — service worker / background logic.
- `style.css` — styles for the injected backgrounds and popup.

## Permissions
Requires `storage`, `activeTab`, and `scripting`. `host_permissions` are set to `<all_urls>` so the content script can run on any site.

## Contributing
Small, focused contributions welcome. Open an issue or submit a PR.

## License
MIT
