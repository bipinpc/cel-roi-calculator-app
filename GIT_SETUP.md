# Git Setup & Configuration Guide

Complete guide for version control setup with Git for the Celsior ROI Calculator.

## 📋 Table of Contents

1. [.gitignore Configuration](#gitignore-configuration)
2. [Git Initialization](#git-initialization)
3. [First Commit](#first-commit)
4. [Remote Repository Setup](#remote-repository-setup)
5. [Best Practices](#best-practices)

---

## .gitignore Configuration

### ✅ What's Excluded from Version Control

The `.gitignore` file is configured to exclude the following:

#### 🗂️ Dependencies (Should NEVER be committed)
```
node_modules/          # All npm packages (~200 MB)
/.pnp                  # Yarn PnP
.pnp.js
```

**Why?** These are downloaded via `npm install` and are platform-specific.

#### 📦 Build Artifacts (Should NEVER be committed)
```
/dist                  # Production build output
/build                 # Alternative build folder
dist-ssr               # Server-side rendering build
*.local                # Local build files
```

**Why?** These are generated from source code. Commit source, not builds.

#### 🔐 Environment Variables (CRITICAL - Never commit!)
```
.env                   # Environment variables
.env.local             # Local environment overrides
.env.development.local # Development environment
.env.test.local        # Test environment
.env.production.local  # Production environment
.env*.local            # All local env files
```

**Why?** May contain API keys, secrets, and sensitive data.

#### 📝 Logs (Should not be committed)
```
logs/                  # Log directory
*.log                  # All log files
npm-debug.log*         # npm debug logs
yarn-debug.log*        # Yarn debug logs
pnpm-debug.log*        # pnpm debug logs
```

**Why?** Generated during runtime, not relevant to source code.

#### 💻 Editor/IDE Files (Should not be committed)
```
.vscode/*              # VSCode settings (except whitelisted)
.idea/                 # IntelliJ/WebStorm settings
.DS_Store              # macOS folder metadata
*.swp                  # Vim swap files
.history/              # VSCode local history
.eslintcache           # ESLint cache
```

**Why?** These are user/machine-specific preferences.

**Exception:** Some VSCode files ARE included:
```
!.vscode/extensions.json    # Recommended extensions
!.vscode/settings.json      # Shared project settings
```

#### 🖥️ Operating System Files (Should not be committed)
```
.DS_Store              # macOS
Thumbs.db              # Windows
Desktop.ini            # Windows
._*                    # macOS resource forks
```

**Why?** OS-generated, not relevant to the project.

#### ⚡ Build Tool Cache (Should not be committed)
```
.vite/                 # Vite cache
node_modules/.vite     # Vite module cache
*.tsbuildinfo          # TypeScript build cache
.eslintcache           # ESLint cache
```

**Why?** Temporary cache files, regenerated on build.

#### 🚀 Deployment Artifacts (Optional)
```
.vercel/               # Vercel deployment cache
.netlify/              # Netlify deployment cache
.firebase/             # Firebase deployment cache
```

**Why?** Platform-specific deployment metadata.

#### 📊 Testing/Coverage (Should not be committed)
```
/coverage              # Code coverage reports
/.nyc_output           # NYC coverage tool output
*.lcov                 # Coverage data files
```

**Why?** Generated during testing, can be regenerated.

---

## What SHOULD Be Committed

### ✅ Always Commit These:

1. **Source Code**
   - `/App.tsx`
   - `/main.tsx`
   - `/components/**/*.tsx`
   - `/styles/globals.css`

2. **Configuration Files**
   - `package.json` ✅
   - `tsconfig.json` ✅
   - `vite.config.ts` ✅
   - `.eslintrc.json` ✅
   - `.gitignore` ✅
   - `index.html` ✅

3. **Documentation**
   - `README.md` ✅
   - All `.md` files ✅

4. **Lock Files** (Recommended)
   - `package-lock.json` ✅

**Why commit package-lock.json?**
- Ensures consistent dependencies across all environments
- Prevents "works on my machine" issues
- Makes builds reproducible

**If you want to exclude it:** Uncomment in `.gitignore`:
```gitignore
# package-lock.json
```

---

## Git Initialization

### Step 1: Initialize Git Repository

```bash
# Navigate to project root
cd celsior-roi-calculator

# Initialize Git
git init
```

**Expected output:**
```
Initialized empty Git repository in /path/to/celsior-roi-calculator/.git/
```

### Step 2: Configure Git (First Time Only)

```bash
# Set your name
git config user.name "Your Name"

# Set your email
git config user.email "your.email@example.com"

# Optional: Set default branch name to 'main'
git config init.defaultBranch main
```

**Verify configuration:**
```bash
git config --list
```

### Step 3: Verify .gitignore

```bash
# Check that .gitignore exists
cat .gitignore

# Test what will be tracked
git status
```

**You should see:**
- ✅ Source files (*.tsx, *.css)
- ✅ Config files (package.json, etc.)
- ✅ Documentation (*.md)
- ❌ node_modules (should NOT appear)
- ❌ dist folder (should NOT appear)
- ❌ .env files (should NOT appear)

---

## First Commit

### Stage All Files

```bash
# Stage all files (respects .gitignore)
git add .

# Or stage specific files
git add package.json tsconfig.json vite.config.ts
git add App.tsx main.tsx
git add components/
```

### Check What Will Be Committed

```bash
git status
```

**Should show:**
```
On branch main

Changes to be committed:
  new file:   .eslintrc.json
  new file:   .gitignore
  new file:   App.tsx
  new file:   main.tsx
  new file:   package.json
  new file:   components/Calculator.tsx
  ... (more files)
```

**Should NOT show:**
- `node_modules/`
- `dist/`
- `.env` files
- `.DS_Store`
- `*.log`

### Create First Commit

```bash
git commit -m "Initial commit: Celsior ROI Calculator v1.0.0"
```

**Expected output:**
```
[main (root-commit) abc1234] Initial commit: Celsior ROI Calculator v1.0.0
 XX files changed, XXXX insertions(+)
 create mode 100644 .eslintrc.json
 create mode 100644 .gitignore
 ...
```

### Verify Commit

```bash
# See commit history
git log

# See what files were committed
git ls-tree -r main --name-only
```

---

## Remote Repository Setup

### GitHub

#### Step 1: Create GitHub Repository

1. Go to [github.com](https://github.com)
2. Click "New repository"
3. Name: `celsior-roi-calculator`
4. Description: "ROI Calculator for AI Productivity Tools"
5. **Don't** initialize with README, .gitignore, or license (we already have these)
6. Click "Create repository"

#### Step 2: Connect Local to Remote

```bash
# Add remote (replace with your URL)
git remote add origin https://github.com/yourusername/celsior-roi-calculator.git

# Verify remote
git remote -v
```

#### Step 3: Push to GitHub

```bash
# Push to main branch
git push -u origin main
```

**Expected output:**
```
Enumerating objects: XX, done.
Counting objects: 100% (XX/XX), done.
...
To https://github.com/yourusername/celsior-roi-calculator.git
 * [new branch]      main -> main
Branch 'main' set up to track remote branch 'main' from 'origin'.
```

### GitLab

```bash
# Add GitLab remote
git remote add origin https://gitlab.com/yourusername/celsior-roi-calculator.git

# Push to GitLab
git push -u origin main
```

### Bitbucket

```bash
# Add Bitbucket remote
git remote add origin https://bitbucket.org/yourusername/celsior-roi-calculator.git

# Push to Bitbucket
git push -u origin main
```

---

## Best Practices

### 1. Commit Often, Push Regularly

```bash
# After making changes
git add .
git commit -m "Add feature X"
git push
```

### 2. Write Meaningful Commit Messages

**Good:**
```bash
git commit -m "Add break-even analysis to ROI dashboard"
git commit -m "Fix tooltip fade animation on first display"
git commit -m "Update pricing model for GitHub Copilot"
```

**Bad:**
```bash
git commit -m "Update stuff"
git commit -m "Fix bug"
git commit -m "Changes"
```

### 3. Review Before Committing

```bash
# See what changed
git status
git diff

# See what will be committed
git diff --staged
```

### 4. Use Branches for Features

```bash
# Create new branch
git checkout -b feature/new-pricing-model

# Make changes...
git add .
git commit -m "Implement new pricing model"

# Merge back to main
git checkout main
git merge feature/new-pricing-model
```

### 5. Never Commit Sensitive Data

**Before committing, check for:**
- ❌ API keys
- ❌ Passwords
- ❌ Tokens
- ❌ Private keys
- ❌ Database credentials
- ❌ Email addresses (in config)

**If accidentally committed:**
```bash
# Remove from last commit (if not pushed)
git reset HEAD~1

# Remove file from Git but keep locally
git rm --cached .env
git commit -m "Remove .env from version control"
```

### 6. Keep .gitignore Updated

When adding new tools or dependencies:
```bash
# Edit .gitignore
echo "new_folder/" >> .gitignore

# Commit the change
git add .gitignore
git commit -m "Update .gitignore for new_folder"
```

---

## Common Git Workflows

### Daily Development

```bash
# Start of day - get latest changes
git pull

# Make changes to files...

# Check what changed
git status
git diff

# Stage changes
git add .

# Commit
git commit -m "Descriptive message"

# Push to remote
git push
```

### Feature Development

```bash
# Create feature branch
git checkout -b feature/export-to-pdf

# Make changes...
git add .
git commit -m "Add PDF export functionality"

# Push branch
git push -u origin feature/export-to-pdf

# Create Pull Request on GitHub/GitLab
# After review and approval, merge
```

### Bug Fix

```bash
# Create bugfix branch
git checkout -b bugfix/tooltip-positioning

# Fix the bug...
git add .
git commit -m "Fix tooltip positioning on mobile"

# Push and create PR
git push -u origin bugfix/tooltip-positioning
```

---

## Verifying .gitignore Works

### Test 1: Check node_modules is Ignored

```bash
# node_modules should NOT appear
git status

# Even after adding
git add node_modules/
# Should show: "The following paths are ignored..."
```

### Test 2: Check dist is Ignored

```bash
npm run build
git status
# dist/ should NOT appear
```

### Test 3: Check .env is Ignored

```bash
echo "API_KEY=secret123" > .env
git status
# .env should NOT appear
```

---

## Troubleshooting

### ❌ node_modules appears in git status

**Solution:**
```bash
# Remove from tracking
git rm -r --cached node_modules/

# Commit the removal
git commit -m "Remove node_modules from version control"
```

### ❌ Accidentally committed .env

**Solution:**
```bash
# If not pushed yet
git reset HEAD~1
git add .gitignore
git commit -m "Add .env to .gitignore"

# If already pushed (DANGER: rewrites history)
git rm --cached .env
git commit -m "Remove .env from version control"
git push --force
```

### ❌ .gitignore not working

**Solution:**
```bash
# Clear Git cache
git rm -r --cached .
git add .
git commit -m "Apply .gitignore rules"
```

---

## Repository Size

### Expected Repository Size

**Without node_modules and dist:**
- Source code: ~500 KB
- Documentation: ~100 KB
- **Total: ~600 KB**

**With node_modules (DON'T COMMIT!):**
- Would be ~200 MB ❌

### Check Repository Size

```bash
# See repository size
git count-objects -vH
```

---

## .gitignore Template Summary

```gitignore
# Core (NEVER commit)
node_modules/
dist/
.env*

# Build artifacts
*.tsbuildinfo
.vite/

# Editor files
.vscode/*
.idea/
.DS_Store

# Logs
*.log

# Platform-specific
.vercel/
.netlify/
```

---

## Additional Resources

- **Git Documentation**: https://git-scm.com/doc
- **GitHub Guides**: https://guides.github.com/
- **gitignore.io**: https://gitignore.io/ (Generate .gitignore)
- **Git Cheat Sheet**: https://training.github.com/downloads/github-git-cheat-sheet/

---

## Checklist

### Before First Commit
- [ ] `.gitignore` file exists
- [ ] `node_modules/` is ignored
- [ ] `dist/` is ignored
- [ ] `.env` files are ignored
- [ ] `git status` shows only source files
- [ ] No sensitive data in tracked files

### First Commit
- [ ] Git initialized (`git init`)
- [ ] User configured (`git config`)
- [ ] Files staged (`git add .`)
- [ ] Commit created (`git commit`)
- [ ] Verify with `git log`

### Push to Remote
- [ ] GitHub/GitLab repo created
- [ ] Remote added (`git remote add origin`)
- [ ] Pushed to remote (`git push -u origin main`)
- [ ] Repository visible online

---

**Your project is now properly configured for version control!** 🎉

**Next steps:**
1. Make changes to your code
2. `git add .`
3. `git commit -m "Descriptive message"`
4. `git push`

---

Built with ❤️ by Pyramid Consulting Inc.
