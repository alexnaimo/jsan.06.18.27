# Alex & Jenna — Wedding Website
**June 18, 2027 · The Vista at Sunken Meadow · Kings Park, NY**

Private wedding planning & guest website, hosted on GitHub Pages.

---

## Pages

| File | Description |
|------|-------------|
| `index.html` | Home / landing page with countdown |
| `sunken-meadow.html` | Full interactive wedding planner |
| `britt-call-notes.html` | Photographer (Britt) call notes — transcript, to-dos, timeline |
| `venue.html` | Venue info, directions, hotels, parking |
| `registry.html` | Wedding registry links |
| `wedding-party.html` | Wedding party bios & photos |
| `css/shared.css` | Shared navigation styles |

---

## Deploying to GitHub Pages

### Step 1 — Create a new GitHub repo
1. Go to [github.com/new](https://github.com/new)
2. Name it something like `wedding` or `alex-jenna-wedding`
3. Set it to **Private** (requires GitHub Pro at $4/mo, or use a free public repo with a hard-to-guess name)
4. Don't initialize with a README (you already have one)

### Step 2 — Push these files
Open Terminal and run:
```bash
cd "/Users/alex/Claude-Cowork/Projects/personal/wedding-planning"
git init
git add .
git commit -m "Initial wedding website"
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
git branch -M main
git push -u origin main
```

### Step 3 — Enable GitHub Pages
1. In your GitHub repo, go to **Settings → Pages**
2. Under **Source**, select **Deploy from a branch**
3. Branch: `main` / Folder: `/ (root)`
4. Click **Save**
5. Your site will be live at: `https://YOUR_USERNAME.github.io/YOUR_REPO_NAME/`

> **Note on privacy:** GitHub Pages on private repos requires GitHub Pro ($4/month). If you use a free public repo, the code is technically public but the URL is only known to people you share it with — which is fine for a wedding site with no sensitive info.

---

## Adding content over time

- **Wedding party** — edit `wedding-party.html`, replace the placeholder cards with real names and bios
- **Registry** — edit `registry.html`, add your actual registry URLs to the buttons
- **Hotels / travel info** — edit `venue.html`, fill in the placeholder sections
- **Planner updates** — all done in `sunken-meadow.html` (has its own localStorage persistence)

---

## Local preview
Just open `index.html` in any browser — no server needed. All pages work locally via file:// links.
