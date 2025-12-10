# Installation Guide

Complete installation instructions for the Celsior ROI Calculator.

## 📋 Table of Contents

1. [Prerequisites](#prerequisites)
2. [Quick Installation](#quick-installation)
3. [Detailed Installation](#detailed-installation)
4. [Verification](#verification)
5. [First Run](#first-run)
6. [Next Steps](#next-steps)

---

## Prerequisites

### Required Software

#### 1. Node.js (v18.0.0 or higher)

**Check if installed:**
```bash
node --version
```

**If not installed or version is too old:**

**Windows/macOS:**
- Download from [nodejs.org](https://nodejs.org/)
- Choose "LTS" (Long Term Support) version
- Run installer and follow prompts
- Restart terminal after installation

**Linux (Ubuntu/Debian):**
```bash
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs
```

**Linux (Other distributions):**
- Use your package manager or download from [nodejs.org](https://nodejs.org/)

#### 2. npm (v9.0.0 or higher)

npm comes with Node.js. Verify:
```bash
npm --version
```

**If version is too old, update:**
```bash
npm install -g npm@latest
```

### System Requirements

| Component | Minimum | Recommended |
|-----------|---------|-------------|
| RAM | 4 GB | 8 GB |
| Disk Space | 1 GB free | 2 GB free |
| OS | Windows 10, macOS 10.15, Ubuntu 18.04 | Latest versions |
| Internet | Required for installation | - |

---

## Quick Installation

For experienced developers who just want to get started:

```bash
# 1. Navigate to project directory
cd celsior-roi-calculator

# 2. Install dependencies
npm install

# 3. Start development server
npm run dev

# 4. Open browser to http://localhost:3000
```

Done! Skip to [First Run](#first-run).

---

## Detailed Installation

### Step 1: Get the Project Files

You should already have the project files. If not, extract them to your desired location.

**Verify you have these key files:**
```bash
ls -la

# Should see:
# - package.json
# - vite.config.ts
# - tsconfig.json
# - index.html
# - main.tsx
# - App.tsx
# - components/
# - styles/
```

### Step 2: Open Terminal

**Windows:**
- Press `Win + R`
- Type `cmd` or `powershell`
- Press Enter

**macOS:**
- Press `Cmd + Space`
- Type `terminal`
- Press Enter

**Linux:**
- Press `Ctrl + Alt + T`

### Step 3: Navigate to Project Directory

```bash
cd /path/to/celsior-roi-calculator
```

**Example:**
```bash
# Windows
cd C:\Users\YourName\Desktop\celsior-roi-calculator

# macOS/Linux
cd ~/Desktop/celsior-roi-calculator
```

**Verify you're in the right directory:**
```bash
ls package.json
# Should show: package.json
```

### Step 4: Install Dependencies

This is the main installation step. It will download all required packages.

```bash
npm install
```

**What happens:**
- Downloads ~200 MB of packages
- Creates `node_modules/` folder
- Creates `package-lock.json` file
- Takes 2-10 minutes depending on internet speed

**Expected output:**
```
npm WARN deprecated [some warnings are normal]
...
added 1234 packages, and audited 1235 packages in 3m

123 packages are looking for funding
  run `npm fund` for details

found 0 vulnerabilities
```

**If you see errors, see [Troubleshooting](#troubleshooting).**

### Step 5: Verify Installation

```bash
# Check that node_modules exists
ls node_modules

# Should see many folders (react, vite, etc.)
```

**Verify key packages are installed:**
```bash
npm ls react
npm ls vite
npm ls tailwindcss
```

Each should show a version number.

---

## Verification

### Quick Verification

```bash
# Check package.json
cat package.json

# Run type check
npm run type-check

# Run linter
npm run lint
```

All commands should complete without errors.

### Full Verification Checklist

- [ ] Node.js v18+ installed (`node --version`)
- [ ] npm v9+ installed (`npm --version`)
- [ ] `node_modules/` folder exists
- [ ] `package-lock.json` file exists
- [ ] No errors in `npm install` output
- [ ] `npm run type-check` passes
- [ ] `npm run lint` passes

---

## First Run

### Start Development Server

```bash
npm run dev
```

**Expected output:**
```
  VITE v6.0.7  ready in 1234 ms

  ➜  Local:   http://localhost:3000/
  ➜  Network: use --host to expose
  ➜  press h + enter to show help
```

### Open in Browser

The browser should automatically open. If not:

1. Open your web browser
2. Navigate to: `http://localhost:3000`

**You should see:**
- Celsior ROI Calculator header
- Input panel on the left
- Results dashboard on the right
- Theme switcher in header

### Test Basic Functionality

1. **Toggle Dark Mode:**
   - Click moon/sun icon in header
   - Theme should switch

2. **Test Calculator:**
   - Enter values in input fields
   - See results update in real-time

3. **Test Tooltips:**
   - Hover over info icons (desktop)
   - Tooltips should appear with fade effect

4. **Test Responsiveness:**
   - Resize browser window
   - Layout should adapt

### Stop Development Server

When you're done:
- Press `Ctrl + C` in terminal
- Confirm with `Y` if asked

---

## Next Steps

### Customize the Application

1. **Change Branding:**
   - Edit `App.tsx` for header text
   - Modify `styles/globals.css` for colors

2. **Modify Calculator Logic:**
   - Edit `components/Calculator.tsx`
   - Adjust pricing in calculation functions

3. **Add Features:**
   - Create new components in `components/`
   - Import and use in `App.tsx`

### Build for Production

When ready to deploy:

```bash
npm run build
```

Creates optimized files in `dist/` folder.

### Preview Production Build

```bash
npm run preview
```

Opens production build at `http://localhost:4173`

### Deploy to Production

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed deployment guides for:
- Vercel
- Netlify  
- AWS
- Azure
- Docker
- And more...

---

## Troubleshooting

### Common Installation Issues

#### ❌ "npm: command not found"

**Solution:**
- Node.js not installed or not in PATH
- Install Node.js from [nodejs.org](https://nodejs.org/)
- Restart terminal after installation

#### ❌ "EACCES: permission denied"

**Solution:**
```bash
# Don't use sudo!
# Fix npm permissions:
mkdir ~/.npm-global
npm config set prefix '~/.npm-global'
export PATH=~/.npm-global/bin:$PATH

# Add to ~/.bashrc or ~/.zshrc to make permanent
echo 'export PATH=~/.npm-global/bin:$PATH' >> ~/.bashrc
```

#### ❌ "npm ERR! network timeout"

**Solution:**
```bash
# Increase timeout
npm config set fetch-timeout 60000
npm config set fetch-retries 5

# Try again
npm install
```

#### ❌ "Unsupported engine"

**Solution:**
```bash
# Check Node version
node --version

# If < v18, update Node.js from nodejs.org
```

#### ❌ "Module not found" after successful install

**Solution:**
```bash
# Clear and reinstall
rm -rf node_modules package-lock.json
npm cache clean --force
npm install
```

### First Run Issues

#### ❌ "Port 3000 already in use"

**Solution:**
```bash
# Use different port
npm run dev -- --port 3001
```

#### ❌ Blank page in browser

**Solution:**
1. Check browser console (F12) for errors
2. Clear browser cache
3. Try incognito/private mode
4. Verify all files are present

#### ❌ "Cannot find module @vitejs/plugin-react"

**Solution:**
```bash
# Reinstall dev dependencies
npm install
```

### Getting Help

If issues persist:

1. **Read documentation:**
   - [TROUBLESHOOTING.md](./TROUBLESHOOTING.md)
   - [SETUP.md](./SETUP.md)

2. **Check system requirements:**
   - Node 18+
   - npm 9+
   - Sufficient disk space

3. **Try clean install:**
```bash
rm -rf node_modules package-lock.json
npm cache clean --force
npm install
```

4. **Contact support:**
   - Pyramid Consulting Inc.

---

## Installation Checklist

Use this checklist to ensure proper installation:

### Before Installation
- [ ] Node.js 18+ installed
- [ ] npm 9+ installed
- [ ] 1+ GB free disk space
- [ ] Internet connection available
- [ ] Project files extracted/downloaded

### During Installation
- [ ] Navigated to correct directory
- [ ] Ran `npm install`
- [ ] No fatal errors occurred
- [ ] `node_modules/` folder created
- [ ] `package-lock.json` created

### After Installation
- [ ] `npm run type-check` passes
- [ ] `npm run lint` passes
- [ ] `npm run dev` starts server
- [ ] Browser opens to localhost:3000
- [ ] Application loads correctly
- [ ] Dark mode works
- [ ] Calculator works
- [ ] Tooltips work

### Optional but Recommended
- [ ] Read README.md
- [ ] Read QUICK_START.md
- [ ] Familiarize with file structure
- [ ] Test build: `npm run build`
- [ ] Test preview: `npm run preview`

---

## Post-Installation

### Development Workflow

1. **Start working:**
```bash
npm run dev
```

2. **Make changes:**
   - Edit files in `components/`, `App.tsx`, etc.
   - Changes auto-reload in browser

3. **Check quality:**
```bash
npm run lint
npm run type-check
```

4. **Build for production:**
```bash
npm run build
```

### Updating Dependencies

In the future, to update packages:

```bash
# Check for updates
npm outdated

# Update all dependencies
npm update

# Update specific package
npm install package-name@latest
```

### Backup Your Work

Recommended:
1. Use Git for version control
2. Commit changes regularly
3. Push to GitHub/GitLab/Bitbucket

**Initialize Git:**
```bash
git init
git add .
git commit -m "Initial commit"
```

---

## Installation Time Estimates

| Step | Time |
|------|------|
| Node.js installation | 5-10 min |
| Project setup | 1 min |
| npm install | 2-10 min |
| Verification | 1-2 min |
| First run | 1 min |
| **Total** | **10-25 min** |

*Times vary based on internet speed and system performance.*

---

## Success Criteria

You'll know installation was successful when:

✅ No errors in terminal  
✅ Development server starts  
✅ Browser opens automatically  
✅ Application loads and displays correctly  
✅ Dark mode toggle works  
✅ Calculator performs calculations  
✅ All tooltips work  
✅ Responsive design works  

---

## Need More Help?

### Documentation Files
- **Quick Start**: [QUICK_START.md](./QUICK_START.md)
- **Detailed Setup**: [SETUP.md](./SETUP.md)
- **Troubleshooting**: [TROUBLESHOOTING.md](./TROUBLESHOOTING.md)
- **Deployment**: [DEPLOYMENT.md](./DEPLOYMENT.md)
- **Package Info**: [PACKAGE_SUMMARY.md](./PACKAGE_SUMMARY.md)

### Learning Resources
- React: https://react.dev/learn
- TypeScript: https://typescriptlang.org/docs
- Vite: https://vitejs.dev/guide
- Tailwind: https://tailwindcss.com/docs

### Support
Contact Pyramid Consulting Inc. for assistance.

---

**Congratulations!** 🎉

You've successfully installed the Celsior ROI Calculator!

**Ready to start customizing?** Edit files in the `components/` folder and see changes instantly in your browser!

---

Built with ❤️ by Pyramid Consulting Inc.
