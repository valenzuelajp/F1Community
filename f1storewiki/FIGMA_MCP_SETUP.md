---
title: "Figma MCP Setup Guide"
aliases:
  - Figma
  - Figma MCP
tags:
  - f1-community
  - wiki
  - figma
  - mcp
date: 2026-09-23
status: active
---

# Figma MCP Setup Guide

## Overview

This guide walks through connecting Figma to opencode via MCP (Model Context Protocol) so AI can read your design files, extract tokens, and generate code.

---

## Prerequisites

- Figma account with access to design files
- opencode installed and configured
- Node.js (for `npx`)

---

## Step 1: Get Figma Personal Access Token

1. Open [Figma Settings → Account](https://www.figma.com/settings)
2. Scroll to **Personal Access Tokens**
3. Click **Generate new token**
4. Name it: `opencode-mcp`
5. **Copy the token immediately** — you won't see it again

> Store this securely. Treat it like a password.

---

## Step 2: Find Your Figma File ID

Open your F1 design file in Figma (browser or desktop app).

**URL format:**
```
https://www.figma.com/file/FILE_ID/File-Name?node-id=...&t=...
                    ↑^^^^^^^^^
```

**The `FILE_ID` is the 22-character string after `/file/`**

Example:
```
https://www.figma.com/file/AbCdEfGhIjKlMnOpQrStUv/F1-Design-System?node-id=1%3A2
                                    ↑^^^^^^^^^^^^^^^^^^^^^^^
                              FILE_ID = AbCdEfGhIjKlMnOpQrStUv
```

### Quick Ways to Get It
- **Browser address bar** — click URL, copy segment after `/file/`
- **Figma dashboard** — right-click file → "Copy link" → extract ID
- **Plugin** — "Copy File ID" plugins available

---

## Step 3: Configure opencode

### Option A: Project-Level (Recommended)
Creates `.opencode/opencode.json` in your repo:

```bash
# In your F1Store repo root
mkdir -p .opencode
code .opencode/opencode.json
```

### Option B: Global (All Projects)
```bash
code ~/.config/opencode/opencode.json
```

### Add Configuration
```json
{
  "mcpServers": {
    "figma": {
      "command": "npx",
      "args": ["-y", "figma-mcp"],
      "env": {
        "FIGMA_API_KEY": "YOUR_FIGMA_TOKEN_HERE"
      }
    }
  }
}
```

Replace `YOUR_FIGMA_TOKEN_HERE` with your actual token.

---

## Step 4: Restart opencode

```bash
# Kill any running opencode, then restart
opencode
```

---

## Step 5: Test Connection

In opencode chat:
```
"List components in Figma file YOUR_FILE_ID"
```

Replace `YOUR_FILE_ID` with your actual File ID.

Expected: List of component names returned.

---

## Usage Examples

### Extract Design Tokens
```
"Get all color tokens from Figma file YOUR_FILE_ID"
"Extract spacing and typography tokens from Figma file YOUR_FILE_ID"
"Generate tailwind.config.ts from Figma design tokens in file YOUR_FILE_ID"
```

### Read Components
```
"Get Button component variants and props from Figma file YOUR_FILE_ID"
"List all components in the F1 Design System file YOUR_FILE_ID"
"Get the RaceCard component spec from Figma file YOUR_FILE_ID"
```

### Generate Code
```
"Create Button.tsx React component matching Figma Button spec from file YOUR_FILE_ID"
"Build design-tokens.json from Figma file YOUR_FILE_ID"
"Create CSS variables for all team colors from Figma file YOUR_FILE_ID"
```

### Verify Implementation
```
"Check if my Button.tsx matches Figma Button component from file YOUR_FILE_ID"
"Compare my tailwind.config.ts against Figma tokens from file YOUR_FILE_ID"
```

### Export Assets
```
"Download all driver headshots from Figma file YOUR_FILE_ID"
"Export all circuit map SVGs from Figma file YOUR_FILE_ID"
"Get all team logos as optimized SVGs from file YOUR_FILE_ID"
```

---

## Workflow: Design → Code

```
1. Design in Figma
       │
       ▼
2. "Get color/spacing/typography tokens from Figma file ID"
       │
       ▼
3. "Generate tailwind.config.ts from these tokens"
       │
       ▼
4. "Get Button component variants from Figma file ID"
       │
       ▼
5. "Create Button.tsx matching this spec"
       │
       ▼
6. "Verify my ProductCard matches Figma ProductCard from file ID"
       │
       ▼
7. Iterate
```

---

## F1 Project Specific: Team Colors

Your F1 design system likely has team colors. Extract once:

```
"Get all team color tokens from Figma file YOUR_FILE_ID"
```

Expected output:
```json
{
  "mercedes": { "primary": "#00D2BE", "secondary": "#000000" },
  "ferrari": { "primary": "#DC143C", "secondary": "#FFD700" },
  "red-bull": { "primary": "#1E41FF", "secondary": "#FFD700" },
  "mclaren": { "primary": "#FF8700", "secondary": "#000000" },
  "aston-martin": { "primary": "#006F62", "secondary": "#FFFFFF" },
  "alpine": { "primary": "#0090FF", "secondary": "#FF8700" },
  "williams": { "primary": "#005AFF", "secondary": "#FFFFFF" },
  "rb": { "primary": "#6692FF", "secondary": "#FFFFFF" },
  "sauber": { "primary": "#52E252", "secondary": "#000000" },
  "haas": { "primary": "#FFFFFF", "secondary": "#B6BABD" }
}
```

Then:
```
"Generate tailwind.config.ts with these team colors as CSS variables"
```

---

## Troubleshooting

| Issue | Solution |
|-------|----------|
| "MCP server not found" | Restart opencode after config change |
| "Invalid API key" | Regenerate token, check for extra spaces/newlines |
| "File not found" | Verify FILE_ID, ensure file is shared with your account |
| "Rate limit exceeded" | Wait 60 seconds (Figma: 30 req/min personal) |
| "Connection refused" | Check `npx -y figma-mcp` runs manually |
| No tools appear | Verify opencode version supports MCP (`opencode --version`) |

---

## Verify MCP Server Manually

```bash
# Test the MCP server directly
npx -y figma-mcp

# Should start and wait for stdio connection
# Press Ctrl+C to exit
```

---

## Security Notes

- **Never commit tokens** to git — use `.env` or opencode config (gitignored)
- **Project config** (`.opencode/opencode.json`) should be in `.gitignore`
- **Rotate tokens** periodically in Figma settings
- **Read-only access** — MCP cannot modify Figma files

---

## File Structure for F1 Project

```
F1Store/
├── .opencode/
│   └── opencode.json          # MCP config (gitignored)
├── f1storewiki/
│   └── FIGMA_MCP_SETUP.md     # This guide
└── src/
    └── lib/
        └── design-tokens.ts   # Generated from Figma
```

Add to `.gitignore`:
```
.opencode/opencode.json
```

---

## Next Steps After Setup

1. **Extract tokens** → Generate `tailwind.config.ts`
2. **Extract components** → Build base UI library (`Button`, `Card`, `Input`)
3. **Extract team colors** → Create `lib/constants/teams.ts`
4. **Sync regularly** — Re-run when designs update

---

*Created: 2026-08-28 | Update when Figma MCP or opencode changes*