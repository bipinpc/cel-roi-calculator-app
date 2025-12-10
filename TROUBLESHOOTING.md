# Troubleshooting Guide

Common issues and solutions for running the Celsior ROI Calculator locally.

## Installation Issues

### ❌ "npm install" fails

**Error: `EACCES: permission denied`**

**Solution:**
```bash
# Don't use sudo with npm!
# Fix npm permissions:
mkdir ~/.npm-global
npm config set prefix '~/.npm-global'
export PATH=~/.npm-global/bin:$PATH

# Then try again:
npm install
```

**Error: `network timeout` or `ETIMEDOUT`**

**Solution:**
```bash
# Increase timeout
npm config set fetch-timeout 60000
npm config set fetch-retries 5

# Try again
npm install
```

**Error: `Unsupported engine`**

**Solution:**
```bash
# Check Node version
node --version

# If less than v18, update Node.js
# Download from https://nodejs.org/
```

### ❌ "Module not found" after installation

**Solution:**
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm cache clean --force
npm install
```

## Development Server Issues

### ❌ "Port 3000 already in use"

**Solution 1: Use different port**
```bash
npm run dev -- --port 3001
```

**Solution 2: Kill process on port 3000**

**macOS/Linux:**
```bash
lsof -ti:3000 | xargs kill -9
```

**Windows:**
```bash
netstat -ano | findstr :3000
taskkill /PID <PID> /F
```

### ❌ "Cannot find module '@vitejs/plugin-react'"

**Solution:**
```bash
npm install @vitejs/plugin-react --save-dev
```

### ❌ Server starts but page is blank

**Solution:**
1. Check browser console (F12) for errors
2. Verify `main.tsx` exists and is correct
3. Clear browser cache (Ctrl+Shift+Delete)
4. Try incognito/private mode
5. Check if `index.html` has `<div id="root"></div>`

### ❌ "Uncaught SyntaxError: Unexpected token"

**Solution:**
```bash
# Clear Vite cache
rm -rf node_modules/.vite
npm run dev
```

## Build Issues

### ❌ "npm run build" fails

**Error: TypeScript errors**

**Solution:**
```bash
# Check for type errors
npm run type-check

# Fix reported errors or temporarily skip:
# (Not recommended for production)
# Add to vite.config.ts:
# build: { rollupOptions: { external: [] } }
```

**Error: Out of memory**

**Solution:**
```bash
# Increase Node memory
NODE_OPTIONS="--max-old-space-size=4096" npm run build
```

### ❌ Build succeeds but deployed site is blank

**Solution:**

1. **Check base path in vite.config.ts:**
```typescript
// For root domain
base: '/'

// For subdirectory
base: '/subdirectory/'
```

2. **Verify index.html in dist:**
```bash
ls dist/index.html  # Should exist
cat dist/index.html # Should have content
```

3. **Check server configuration:**
- Ensure SPA routing (redirects to index.html)
- Check .htaccess or server config

## Component Issues

### ❌ "React Hook Error" or "Invalid Hook Call"

**Solution:**
```bash
# Usually caused by duplicate React
npm ls react
# If multiple versions, remove duplicates:
npm dedupe
```

### ❌ Dark mode not working

**Solution:**
1. Check localStorage (F12 → Application → Local Storage)
2. Clear localStorage and try again
3. Verify `isDarkMode` state in App.tsx
4. Check if `dark` class applied to body

### ❌ Tooltips not appearing

**Solution:**
1. Check z-index conflicts (tooltips use z-[9999])
2. Verify SmartTooltip component is imported
3. Check browser console for errors
4. Try different browser

### ❌ Calculator not calculating

**Solution:**
1. Open browser console (F12)
2. Check for JavaScript errors
3. Verify input values are valid numbers
4. Check Calculator.tsx for logic errors

## Styling Issues

### ❌ Tailwind classes not working

**Solution:**
```bash
# Verify Tailwind is installed
npm ls tailwindcss

# Check globals.css is imported in main.tsx
# Should have: import './styles/globals.css'

# Clear cache and restart
rm -rf node_modules/.vite
npm run dev
```

### ❌ Custom fonts not loading

**Solution:**
1. Check font files exist in `/public/fonts/`
2. Verify font-face declarations in globals.css
3. Check browser Network tab for 404 errors
4. Clear browser cache

### ❌ Responsive design broken

**Solution:**
1. Check viewport meta tag in index.html:
```html
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
```

2. Test in different browsers
3. Use browser DevTools responsive mode
4. Check for fixed widths overriding responsive classes

## Performance Issues

### ❌ Slow development server

**Solution:**
```bash
# Clear Vite cache
rm -rf node_modules/.vite

# Reduce file watching
# In vite.config.ts:
server: {
  watch: {
    ignored: ['**/node_modules/**', '**/.git/**']
  }
}
```

### ❌ Slow build times

**Solution:**
```bash
# Enable caching
npm install -D vite-plugin-compression

# Add to vite.config.ts
import viteCompression from 'vite-plugin-compression'
plugins: [..., viteCompression()]
```

### ❌ Large bundle size

**Solution:**
1. **Analyze bundle:**
```bash
npm run build -- --analyze
```

2. **Code split large components:**
```typescript
const LazyComponent = lazy(() => import('./Component'))
```

3. **Remove unused dependencies:**
```bash
npm uninstall unused-package
```

## Browser Compatibility

### ❌ Not working in older browsers

**Solution:**

Add browserslist to package.json:
```json
{
  "browserslist": [
    "defaults",
    "not IE 11"
  ]
}
```

### ❌ Icons not showing

**Solution:**
```bash
# Verify lucide-react is installed
npm ls lucide-react

# If missing:
npm install lucide-react
```

## Git Issues

### ❌ "gitignore not working"

**Solution:**
```bash
# Clear git cache
git rm -r --cached .
git add .
git commit -m "Fix gitignore"
```

### ❌ Huge repository size

**Solution:**
```bash
# Make sure node_modules is gitignored
echo "node_modules" >> .gitignore
git rm -r --cached node_modules
git commit -m "Remove node_modules"
```

## Production Issues

### ❌ "404 on page refresh" (deployed site)

**Solution:**

Your server needs SPA routing. Add redirect rules:

**Netlify (_redirects):**
```
/*    /index.html   200
```

**Vercel (vercel.json):**
```json
{
  "rewrites": [{ "source": "/(.*)", "destination": "/" }]
}
```

**Apache (.htaccess):**
```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
</IfModule>
```

**Nginx:**
```nginx
location / {
  try_files $uri $uri/ /index.html;
}
```

### ❌ Assets not loading in production

**Solution:**
1. Check base path in vite.config.ts
2. Verify assets in dist folder
3. Check browser Network tab for 404s
4. Use relative paths, not absolute

### ❌ Environment variables not working

**Solution:**
1. Prefix with `VITE_`: `VITE_API_URL`
2. Access via `import.meta.env.VITE_API_URL`
3. Set in hosting platform dashboard
4. Rebuild after changing env vars

## TypeScript Errors

### ❌ "Cannot find module" for .tsx files

**Solution:**

Check tsconfig.json includes:
```json
{
  "compilerOptions": {
    "jsx": "react-jsx",
    "moduleResolution": "bundler"
  },
  "include": ["**/*.ts", "**/*.tsx"]
}
```

### ❌ Type errors in UI components

**Solution:**
```bash
# Skip type checking temporarily
npm run build -- --no-typecheck

# Or fix types properly by checking:
npm run type-check
```

## Still Having Issues?

### Debug Checklist

1. ✅ Node version ≥ 18: `node --version`
2. ✅ npm version ≥ 9: `npm --version`
3. ✅ Clean install: `rm -rf node_modules package-lock.json && npm install`
4. ✅ Clear cache: `rm -rf node_modules/.vite`
5. ✅ Browser console errors: Check F12 Developer Tools
6. ✅ Network tab: Check for failed requests
7. ✅ Try different browser
8. ✅ Try incognito/private mode
9. ✅ Restart computer (seriously, it sometimes helps!)

### Getting Help

1. **Check documentation:**
   - README.md
   - SETUP.md
   - DEPLOYMENT.md

2. **Search existing issues:**
   - Vite: https://github.com/vitejs/vite/issues
   - React: https://github.com/facebook/react/issues
   - Tailwind: https://github.com/tailwindlabs/tailwindcss/issues

3. **Create detailed bug report:**
   - Node version
   - npm version
   - Operating system
   - Error message (full text)
   - Steps to reproduce
   - Screenshots if applicable

4. **Contact support:**
   - Pyramid Consulting Inc.
   - Include all debugging information

## Quick Fixes Summary

| Issue | Quick Fix |
|-------|-----------|
| Module not found | `rm -rf node_modules && npm install` |
| Port in use | `npm run dev -- --port 3001` |
| Build fails | `rm -rf node_modules/.vite && npm run build` |
| Types error | `npm run type-check` |
| Blank page | Check browser console (F12) |
| Styles not working | Verify globals.css imported |
| 404 on refresh | Configure SPA routing |
| Slow dev server | `rm -rf node_modules/.vite` |

## Prevention Tips

1. **Always use Node 18+**
2. **Don't modify node_modules**
3. **Commit package-lock.json**
4. **Use .gitignore properly**
5. **Test in multiple browsers**
6. **Keep dependencies updated**
7. **Clear cache when weird stuff happens**

---

**Most issues are fixed by clearing cache and reinstalling!** 🔧

If all else fails, start fresh:
```bash
# Nuclear option
rm -rf node_modules package-lock.json node_modules/.vite
npm cache clean --force
npm install
npm run dev
```

Good luck! 🚀
