# Local Setup Guide

This guide will help you set up and run the Celsior ROI Calculator on your local machine.

## System Requirements

- **Operating System**: Windows 10/11, macOS 10.15+, or Linux
- **Node.js**: Version 18.0.0 or higher
- **npm**: Version 9.0.0 or higher (comes with Node.js)
- **RAM**: Minimum 4GB (8GB recommended)
- **Disk Space**: ~500MB for node_modules

## Step-by-Step Installation

### 1. Install Node.js

If you don't have Node.js installed:

**Windows/macOS:**
- Download from [nodejs.org](https://nodejs.org/)
- Choose the LTS (Long Term Support) version
- Run the installer and follow the prompts

**Linux (Ubuntu/Debian):**
```bash
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs
```

**Verify installation:**
```bash
node --version  # Should show v18.0.0 or higher
npm --version   # Should show 9.0.0 or higher
```

### 2. Clone or Download the Project

**Option A: Using Git**
```bash
git clone <your-repository-url>
cd celsior-roi-calculator
```

**Option B: Download ZIP**
- Download the project ZIP file
- Extract to your desired location
- Open terminal/command prompt in that folder

### 3. Install Dependencies

From the project root directory, run:

```bash
npm install
```

This will:
- Download all required packages (~200MB)
- Set up the development environment
- Take 2-5 minutes depending on your internet speed

**Expected output:**
```
added 1234 packages, and audited 1235 packages in 2m
```

### 4. Start Development Server

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

### 5. Open in Browser

The application should automatically open in your default browser. If not, manually navigate to:

```
http://localhost:3000
```

## Troubleshooting

### Port 3000 is already in use

If port 3000 is occupied, Vite will automatically try the next available port (3001, 3002, etc.). Check the terminal output for the actual URL.

**Alternatively**, you can specify a different port:
```bash
npm run dev -- --port 3001
```

### npm install fails

**Clear npm cache:**
```bash
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
```

**Check Node version:**
```bash
node --version
```
Make sure it's 18.0.0 or higher. If not, upgrade Node.js.

### Module not found errors

```bash
npm install
```

If problems persist:
```bash
rm -rf node_modules package-lock.json
npm install
```

### TypeScript errors

```bash
npm run type-check
```

This will show detailed TypeScript errors if any exist.

### Build errors

Try clearing the build cache:
```bash
rm -rf dist .vite
npm run build
```

## Production Build

To create a production-optimized build:

```bash
npm run build
```

This creates a `dist/` folder with optimized static files.

### Preview Production Build

```bash
npm run preview
```

Opens the production build at `http://localhost:4173`

### Deploy Production Build

The `dist/` folder can be deployed to any static hosting service:
- Vercel
- Netlify
- AWS S3 + CloudFront
- GitHub Pages
- Azure Static Web Apps

## Development Tips

### Hot Module Replacement (HMR)

The dev server supports HMR - changes to your code will instantly reflect in the browser without a full page reload.

### Code Quality

Run linting before committing:
```bash
npm run lint
```

Run type checking:
```bash
npm run type-check
```

### Browser DevTools

- Open DevTools: `F12` or `Cmd+Option+I` (Mac)
- React DevTools extension recommended
- Use the Console tab to check for warnings/errors

## Project Configuration Files

- **package.json** - Dependencies and scripts
- **vite.config.ts** - Vite bundler configuration
- **tsconfig.json** - TypeScript compiler settings
- **.eslintrc.json** - ESLint linting rules
- **styles/globals.css** - Global styles and Tailwind v4 config

## Environment Variables

Currently, this project doesn't require any environment variables. If you need to add them:

1. Create a `.env` file in the root directory
2. Add variables with `VITE_` prefix:
   ```
   VITE_API_URL=https://api.example.com
   ```
3. Access in code:
   ```typescript
   const apiUrl = import.meta.env.VITE_API_URL
   ```

## Updating Dependencies

Check for outdated packages:
```bash
npm outdated
```

Update all dependencies:
```bash
npm update
```

Update specific package:
```bash
npm install package-name@latest
```

## Common Development Workflows

### Adding a New Component

1. Create file in `/components/`
2. Use TypeScript (.tsx extension)
3. Import and use in other components

### Modifying Styles

- Global styles: Edit `/styles/globals.css`
- Component styles: Use Tailwind utility classes
- Custom tokens: Add to `:root` in globals.css

### Adding Icons

This project uses Lucide React:
```tsx
import { IconName } from 'lucide-react'

<IconName className="w-4 h-4" />
```

Browse icons at [lucide.dev](https://lucide.dev)

## Performance Optimization

The build is already optimized, but for additional improvements:

1. **Code splitting** - Automatically handled by Vite
2. **Image optimization** - Use WebP format when possible
3. **Bundle analysis**:
   ```bash
   npm run build -- --analyze
   ```

## Getting Help

- **React docs**: [react.dev](https://react.dev)
- **Vite docs**: [vitejs.dev](https://vitejs.dev)
- **Tailwind docs**: [tailwindcss.com](https://tailwindcss.com)
- **TypeScript docs**: [typescriptlang.org](https://www.typescriptlang.org)

## Next Steps

- Customize branding in `/App.tsx`
- Adjust pricing models in `/components/Calculator.tsx`
- Modify styling in `/styles/globals.css`
- Add your own components in `/components/`

Happy coding! 🚀
