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
| `login.html` | Sign in + request access page |
| `admin.html` | Admin panel — approve users, manage tab permissions |
| `css/shared.css` | Shared navigation styles |
| `js/firebase-config.js` | Firebase config — **fill in your own values** |
| `js/auth-guard.js` | Auth protection logic included on every page |

---

## Setting Up Firebase Auth

The site uses Firebase for login and user management. It's free for small sites.

### Step 1 — Create a Firebase project
1. Go to [console.firebase.google.com](https://console.firebase.google.com)
2. Click **Add project** → name it (e.g. `jsan-wedding`) → click through
3. On the project overview, click **\</\>** (Web) to add a web app
4. Give it a nickname (e.g. `wedding-site`) → click **Register app**
5. Copy the `firebaseConfig` object shown — you'll need it in Step 3

### Step 2 — Enable Email/Password Auth
1. In the Firebase console left sidebar → **Authentication** → **Sign-in method**
2. Click **Email/Password** → toggle **Enable** → Save

### Step 3 — Set up Firestore database
1. Left sidebar → **Firestore Database** → **Create database**
2. Choose **Start in production mode** → pick a region (us-east1 is fine) → Done
3. Go to **Rules** tab and replace the content with:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId} {
      allow read, create: if request.auth != null && request.auth.uid == userId;
      allow update, delete: if request.auth != null
        && request.auth.token.email == 'aznaimo@gmail.com';
    }
  }
}
```
4. Click **Publish**

### Step 4 — Fill in your config
Open `js/firebase-config.js` and replace the placeholder values with your actual config from Step 1.

### Step 5 — Push and create your admin account
1. Push the updated files: `git add . && git commit -m "Add Firebase auth" && git push`
2. Go to your live site → `login.html`
3. Click **Request Access** and sign up with **aznaimo@gmail.com**
4. That email is hardcoded as admin — you'll automatically have full access
5. Share the site URL with people you want to invite; they request access and you approve them in `admin.html`

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
git remote add origin git remote add origin https://github.com/alexnaimo/jsan.06.18.27.git
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
