# RoviSys City Detector Chrome Extension

A lightweight Chrome extension that scans visible webpage text for RoviSys office cities and shows a notification when a match is found.

## Features

- Scans visible page text for city names
- Matches against predefined RoviSys office cities
- Uses case-insensitive detection
- Shows a styled notification popup when a match is found
- Displays only one notification per page load
- Highlights detected city names on the page
- Includes Google Maps links for detected cities

## Office Cities

- Kalamazoo
- Aurora
- Houston
- Chicago
- Boston
- Holly Springs
- Thousand Oaks
- Atlanta
- Singapore
- Phoenix
- Puerto Rico
- Indonesia
- Columbus
- San Diego
- Malaysia
- Ireland
- Manassas
- Japan
- Netherlands
- Taiwan

## Tech Stack

- Chrome Extension (Manifest V3)
- JavaScript content script
- Basic DOM manipulation
- No external APIs

## Project Structure

```text
.
├── manifest.json
└── content.js
```

## Getting Started

1. Open Chrome and go to `chrome://extensions`.
2. Enable **Developer mode**.
3. Click **Load unpacked**.
4. Select this project folder.
5. Visit a webpage containing one of the office cities.

## How It Works

- The content script runs on all pages.
- It reads visible text from the page.
- If one or more city names are found, it:
  - Highlights matching city text
  - Shows a notification with city details and map links

## Attribution

This project was created with assistance from GitHub Copilot in VS Code using Claude Opus 4.6 and GPT-5.3-Codex models.
