# 🚀 Hostinger Upload & Deployment Guide for Karam Utsav Website

If you are having trouble uploading your website from GitHub to Hostinger, **you do NOT need GitHub at all!**

Hostinger Shared Hosting (standard Apache/LiteSpeed) does not run `npm run build` or Node.js automatically on raw GitHub repositories. When you upload raw source code from GitHub, the server shows a blank screen or 404 error because the browser cannot execute raw `.tsx` files directly.

Instead, use **Method 1 (Recommended)** which takes less than 2 minutes and works 100% guaranteed.

---

## ⚡ Method 1: Direct File Manager Upload (Easiest — No GitHub Needed)

### Step 1: Download the Production ZIP
1. Open the website and click **"Download for Hostinger (ZIP)"** (or download `karamutsav-hostinger-build.zip` from your project files).
2. Save `karamutsav-hostinger-build.zip` to your computer.

### Step 2: Open Hostinger File Manager
1. Log in to your **Hostinger Account** (hPanel: [https://hpanel.hostinger.com](https://hpanel.hostinger.com)).
2. Under **Websites**, click **Manage** next to your domain.
3. In the left or center menu, find and click **File Manager** (or **Files → File Manager**).
4. Click **Access files of [your domain]**.
5. Double-click the **`public_html`** folder to open it.

> 💡 **Tip:** If there is a default Hostinger `default.php` file inside `public_html`, you can delete or rename it so your new site loads cleanly.

### Step 3: Upload the ZIP
1. In the top right corner of File Manager, click the **Upload** icon (arrow pointing up).
2. Select **File**, and choose `karamutsav-hostinger-build.zip` from your computer.
3. Wait for the upload progress bar to reach 100%.

### Step 4: Extract the Files
1. Right-click on `karamutsav-hostinger-build.zip` in Hostinger File Manager.
2. Click **Extract**.
3. In the popup window, make sure the destination folder is set to `public_html` (or `.`).
4. Click **Extract**.
5. Once extracted, you will see `index.html`, `.htaccess`, and the `assets/` folder right inside `public_html`.
6. *(Optional)* You can now delete `karamutsav-hostinger-build.zip` to save disk space.

### Step 5: Test Your Website!
Open your browser and visit your domain:
👉 `https://yourdomain.com`

**Your website is now 100% LIVE on Hostinger!**
All images, music synthesizer, cultural gallery, e-book preview, legal pages, and fonts will load instantly.

---

## 🛠️ Method 2: If You Still Want to Use GitHub

If you prefer to maintain a GitHub repository, here is why raw pushes fail and how to fix it:

### Why pushing raw code to Hostinger Git fails:
- Hostinger's standard Git feature only clones files; it does **not** run `npm install` and `npm run build`.
- Browsers cannot run TypeScript (`src/main.tsx`). They require the compiled bundle (`dist/index.html` + `dist/assets/*.js`).

### How to use GitHub with Hostinger:

#### Option A: Deploy via GitHub Actions (Automated FTP)
We have already created the automated workflow file for you in `/.github/workflows/deploy-hostinger.yml`.

1. Push this repository to your GitHub account.
2. In Hostinger hPanel, go to **Files → FTP Accounts** and copy:
   - FTP Host (e.g. `ftp.yourdomain.com`)
   - FTP Username
   - FTP Password
3. In your GitHub repository:
   - Go to **Settings → Secrets and variables → Actions**.
   - Click **New repository secret** and add:
     - `HOSTINGER_FTP_SERVER` (your FTP Host)
     - `HOSTINGER_FTP_USERNAME` (your FTP Username)
     - `HOSTINGER_FTP_PASSWORD` (your FTP Password)
4. Every time you push to `main`, GitHub Actions will automatically compile the website and upload the live files into Hostinger's `public_html`!

#### Option B: Commit the `dist/` folder
If you want to use Hostinger's Git deployment tool without GitHub Actions:
1. Build locally with `npm run build`.
2. Push the contents of the `dist/` folder to a branch (e.g. `gh-pages` or `live`).
3. In Hostinger Git deployment, point the branch to `dist` or root.

---

## 📋 What is Included in the Hostinger Build:
- **`index.html`**: Clean, production-optimized entry point with relative `./assets` paths.
- **`.htaccess`**: Configured for Apache/LiteSpeed with SPA URL rewriting, Gzip compression, and proper JavaScript MIME types.
- **`assets/`**: High-performance minified JavaScript and CSS bundles.
- **Cultural Assets**: Audio synthesizer files, book covers, and icons.

For any questions, write to `contact@karamutsav.org`.
Johar! (जोहार! • জোহাৰ!)
