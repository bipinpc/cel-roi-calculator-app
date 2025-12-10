# Available Commands

Quick reference for all npm commands and common operations.

## 📋 npm Scripts

These commands are defined in `package.json` and available via `npm run <command>`.

### Development Commands

#### `npm run dev`
**Start development server with hot reload**

```bash
npm run dev
```

- Starts Vite dev server on http://localhost:3000
- Hot module replacement enabled
- Opens browser automatically
- Press `Ctrl + C` to stop

**Options:**
```bash
npm run dev -- --port 3001    # Use different port
npm run dev -- --host         # Expose to network
npm run dev -- --open         # Force open browser
```

---

#### `npm run build`
**Build for production**

```bash
npm run build
```

- Creates optimized production build
- Output to `dist/` folder
- Minifies JavaScript and CSS
- Generates source maps
- Takes 10-30 seconds

**Output:**
```
dist/
├── index.html
├── assets/
│   ├── index-[hash].js
│   ├── index-[hash].css
│   └── [other assets]
```

**Advanced:**
```bash
npm run build -- --mode production  # Explicit mode
npm run build -- --analyze          # Analyze bundle size
```

---

#### `npm run preview`
**Preview production build locally**

```bash
npm run preview
```

- Serves the `dist/` folder
- Opens on http://localhost:4173
- Must run `npm run build` first
- Tests production build before deployment

**Options:**
```bash
npm run preview -- --port 4174  # Different port
npm run preview -- --open       # Open browser
```

---

### Code Quality Commands

#### `npm run lint`
**Run ESLint code linter**

```bash
npm run lint
```

- Checks for code quality issues
- Reports style violations
- Identifies potential bugs
- Exit code 0 = no issues, 1 = has issues

**Fix automatically:**
```bash
npm run lint -- --fix
```

**Check specific files:**
```bash
npm run lint src/App.tsx
npm run lint "src/**/*.tsx"
```

---

#### `npm run type-check`
**Run TypeScript type checker**

```bash
npm run type-check
```

- Checks for type errors
- No code emission (`noEmit: true`)
- Reports type mismatches
- Should pass before deployment

**Example output:**
```
> tsc --noEmit

# No output = success!
```

---

## 📦 npm Package Management

### Installation

#### `npm install`
**Install all dependencies**

```bash
npm install
```

- Reads `package.json`
- Downloads packages to `node_modules/`
- Creates/updates `package-lock.json`
- Run this first after cloning project

**Aliases:**
```bash
npm i           # Short form
npm ci          # Clean install (faster, uses lock file)
```

---

#### `npm install <package>`
**Install new package**

```bash
# Production dependency
npm install recharts

# Development dependency  
npm install -D prettier

# Specific version
npm install react@18.3.1

# Multiple packages
npm install axios date-fns lodash
```

---

#### `npm uninstall <package>`
**Remove package**

```bash
npm uninstall package-name

# Also remove from package.json
npm uninstall --save package-name
```

---

### Updates

#### `npm outdated`
**Check for outdated packages**

```bash
npm outdated
```

**Example output:**
```
Package      Current  Wanted  Latest
react        18.2.0   18.3.1  18.3.1
vite         5.0.0    5.4.11  6.0.7
```

---

#### `npm update`
**Update packages**

```bash
# Update all packages (respecting semver)
npm update

# Update specific package
npm update react

# Update to latest (ignoring semver)
npm install react@latest
```

---

#### `npm audit`
**Check for security vulnerabilities**

```bash
npm audit

# Auto-fix vulnerabilities
npm audit fix

# Force fix (may break things)
npm audit fix --force
```

---

### Information

#### `npm ls`
**List installed packages**

```bash
# All packages (tree view)
npm ls

# Top-level only
npm ls --depth=0

# Specific package
npm ls react

# Global packages
npm ls -g --depth=0
```

---

#### `npm info <package>`
**Get package information**

```bash
npm info react

# Get specific field
npm info react version
npm info react dependencies
```

---

## 🧹 Cleanup Commands

#### Clean node_modules
```bash
rm -rf node_modules
npm install
```

#### Clean npm cache
```bash
npm cache clean --force
```

#### Clean build artifacts
```bash
rm -rf dist node_modules/.vite
```

#### Nuclear option (full clean)
```bash
rm -rf node_modules package-lock.json dist node_modules/.vite
npm cache clean --force
npm install
```

---

## 🔧 Troubleshooting Commands

#### Check versions
```bash
node --version
npm --version
```

#### Verify installation
```bash
npm ls react
npm ls vite
npm ls tailwindcss
```

#### Check for errors
```bash
npm run type-check
npm run lint
```

#### Rebuild
```bash
rm -rf node_modules/.vite
npm run dev
```

---

## 🌐 Git Commands

While not npm commands, these are commonly used:

#### Initialize repository
```bash
git init
git add .
git commit -m "Initial commit"
```

#### Commit changes
```bash
git add .
git commit -m "Description of changes"
```

#### Push to remote
```bash
git remote add origin <url>
git push -u origin main
```

#### Check status
```bash
git status
git log --oneline
```

---

## 🚀 Deployment Commands

### Vercel

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel

# Deploy to production
vercel --prod
```

### Netlify

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Deploy
netlify deploy

# Deploy to production
netlify deploy --prod
```

### GitHub Pages

```bash
# Install gh-pages
npm install -g gh-pages

# Build and deploy
npm run build
gh-pages -d dist
```

---

## 🔍 Useful npm Commands

#### Clear cache
```bash
npm cache clean --force
```

#### Dedupe dependencies
```bash
npm dedupe
```

#### Rebuild native modules
```bash
npm rebuild
```

#### Check npm configuration
```bash
npm config list
npm config get registry
```

#### Set npm registry
```bash
npm config set registry https://registry.npmjs.org/
```

#### Find package location
```bash
npm root        # Local node_modules
npm root -g     # Global node_modules
```

---

## 📊 Performance Analysis

#### Analyze bundle size
```bash
npm run build -- --analyze
```

#### Check build time
```bash
time npm run build
```

#### Production bundle info
```bash
npm run build
ls -lh dist/assets/
```

---

## 🎯 Common Workflows

### Start fresh development
```bash
npm install
npm run dev
```

### Check before commit
```bash
npm run lint
npm run type-check
npm run build
```

### Deploy to production
```bash
npm run build
npm run preview  # Test locally first
# Then deploy dist/ folder
```

### Update all dependencies
```bash
npm outdated
npm update
npm audit fix
npm test
```

### Troubleshoot issues
```bash
rm -rf node_modules package-lock.json
npm cache clean --force
npm install
npm run dev
```

---

## 🛠️ Custom Scripts

You can add custom scripts to `package.json`:

```json
{
  "scripts": {
    "clean": "rm -rf dist node_modules/.vite",
    "deploy": "npm run build && vercel --prod",
    "check": "npm run lint && npm run type-check"
  }
}
```

Then run:
```bash
npm run clean
npm run deploy
npm run check
```

---

## 📝 Command Aliases

Create shortcuts in your shell:

**Bash/Zsh (~/.bashrc or ~/.zshrc):**
```bash
alias nrd="npm run dev"
alias nrb="npm run build"
alias nrp="npm run preview"
alias nrl="npm run lint"
alias nrt="npm run type-check"
alias ni="npm install"
```

**Then use:**
```bash
nrd   # Instead of npm run dev
nrb   # Instead of npm run build
```

---

## 🔑 Quick Reference

| Command | What it does |
|---------|-------------|
| `npm install` | Install dependencies |
| `npm run dev` | Start dev server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run lint` | Check code quality |
| `npm run type-check` | Check TypeScript types |
| `npm update` | Update packages |
| `npm outdated` | Check outdated packages |
| `npm audit` | Security check |
| `npm ls` | List installed packages |

---

## 💡 Pro Tips

1. **Use npm ci for CI/CD:**
   ```bash
   npm ci  # Faster, uses lock file exactly
   ```

2. **Install without saving:**
   ```bash
   npm install --no-save package-name
   ```

3. **Update package.json interactively:**
   ```bash
   npx npm-check-updates -u
   npm install
   ```

4. **Run one-off packages without installing:**
   ```bash
   npx create-react-app my-app
   ```

5. **Check what npm will do:**
   ```bash
   npm install --dry-run
   ```

---

## 📚 Documentation

- **npm docs**: https://docs.npmjs.com/
- **Vite commands**: https://vitejs.dev/guide/cli.html
- **Package.json**: https://docs.npmjs.com/cli/v9/configuring-npm/package-json

---

## Need Help?

For command-specific help:
```bash
npm help
npm help install
npm help run-script
```

For project help, see:
- [TROUBLESHOOTING.md](./TROUBLESHOOTING.md)
- [SETUP.md](./SETUP.md)
- [START_HERE.md](./START_HERE.md)

---

**Quick start:** `npm install && npm run dev` 🚀
