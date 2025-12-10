# Deployment Guide

This guide covers deploying the Celsior ROI Calculator to various hosting platforms.

## Build for Production

Before deploying, create an optimized production build:

```bash
npm run build
```

This creates a `dist/` folder containing:
- Minified JavaScript bundles
- Optimized CSS
- Static assets
- `index.html` entry point

## Deployment Options

### 1. Vercel (Recommended)

**Easiest deployment with zero configuration.**

#### Via CLI:
```bash
npm install -g vercel
vercel
```

#### Via Git:
1. Push code to GitHub/GitLab/Bitbucket
2. Visit [vercel.com](https://vercel.com)
3. Click "Import Project"
4. Select your repository
5. Vercel auto-detects Vite and deploys

**Settings:**
- Framework Preset: Vite
- Build Command: `npm run build`
- Output Directory: `dist`

### 2. Netlify

**Simple drag-and-drop or Git deployment.**

#### Drag & Drop:
1. Run `npm run build`
2. Visit [netlify.com](https://netlify.com)
3. Drag `dist/` folder to deploy zone

#### Via Git:
1. Push code to GitHub
2. Connect repository in Netlify
3. Configure build settings:
   - Build command: `npm run build`
   - Publish directory: `dist`
   - Node version: 18

**netlify.toml** (optional):
```toml
[build]
  command = "npm run build"
  publish = "dist"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

### 3. GitHub Pages

**Free hosting for GitHub repositories.**

#### Setup:
```bash
npm install -g gh-pages
```

Add to `package.json`:
```json
{
  "scripts": {
    "deploy": "npm run build && gh-pages -d dist"
  },
  "homepage": "https://yourusername.github.io/repo-name"
}
```

Update `vite.config.ts`:
```typescript
export default defineConfig({
  base: '/repo-name/',
  // ... rest of config
})
```

#### Deploy:
```bash
npm run deploy
```

### 4. AWS S3 + CloudFront

**Scalable enterprise solution.**

#### Prerequisites:
- AWS Account
- AWS CLI installed and configured

#### Steps:

1. **Create S3 Bucket:**
```bash
aws s3 mb s3://celsior-roi-calculator
```

2. **Enable Static Website Hosting:**
```bash
aws s3 website s3://celsior-roi-calculator \
  --index-document index.html \
  --error-document index.html
```

3. **Upload Build:**
```bash
npm run build
aws s3 sync dist/ s3://celsior-roi-calculator --delete
```

4. **Set Public Access:**
```bash
aws s3api put-bucket-policy \
  --bucket celsior-roi-calculator \
  --policy file://bucket-policy.json
```

**bucket-policy.json:**
```json
{
  "Version": "2012-10-17",
  "Statement": [{
    "Sid": "PublicReadGetObject",
    "Effect": "Allow",
    "Principal": "*",
    "Action": "s3:GetObject",
    "Resource": "arn:aws:s3:::celsior-roi-calculator/*"
  }]
}
```

5. **Create CloudFront Distribution** (optional, for CDN):
- Point to S3 bucket
- Enable HTTPS
- Set default root object: `index.html`

### 5. Azure Static Web Apps

**Microsoft Azure hosting.**

#### Via Azure CLI:
```bash
# Install Azure CLI
npm install -g @azure/static-web-apps-cli

# Login
az login

# Deploy
swa deploy ./dist
```

#### Via GitHub Actions:
1. Create Azure Static Web App resource
2. GitHub Actions workflow auto-generated
3. Push to main branch triggers deployment

### 6. Docker

**Containerized deployment.**

**Dockerfile:**
```dockerfile
# Build stage
FROM node:18-alpine as build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Production stage
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

**nginx.conf:**
```nginx
server {
    listen 80;
    server_name _;
    root /usr/share/nginx/html;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    gzip on;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript;
}
```

**Build & Run:**
```bash
docker build -t celsior-roi-calculator .
docker run -p 8080:80 celsior-roi-calculator
```

### 7. Traditional Web Hosting

**For shared hosting (cPanel, etc.).**

1. Run `npm run build`
2. Upload contents of `dist/` folder to public_html or www
3. Configure .htaccess for SPA routing:

**.htaccess:**
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

## Environment Variables

For production deployments with environment variables:

1. Create `.env.production`:
```
VITE_API_URL=https://api.production.com
```

2. In hosting platform, set environment variables:
   - Vercel: Project Settings → Environment Variables
   - Netlify: Site Settings → Build & Deploy → Environment
   - Others: Check platform documentation

## Performance Optimization

### 1. Enable Compression
Most platforms enable gzip/brotli by default. Verify with:
```bash
curl -H "Accept-Encoding: gzip" -I https://your-site.com
```

### 2. Set Cache Headers
Configure long-term caching for assets:
- `.js`, `.css`: 1 year
- `index.html`: no-cache

### 3. Enable CDN
Use CloudFlare, AWS CloudFront, or platform's built-in CDN.

### 4. Monitor Performance
- Google Lighthouse
- WebPageTest
- GTmetrix

## Custom Domain

### Vercel:
1. Project Settings → Domains
2. Add your domain
3. Configure DNS with nameservers or A/CNAME records

### Netlify:
1. Site Settings → Domain Management
2. Add custom domain
3. Update DNS records

### CloudFlare (Optional):
- Add site to CloudFlare
- Update nameservers
- Enable CDN, SSL, and performance features

## SSL/HTTPS

Most modern platforms provide free SSL certificates:
- **Vercel**: Automatic
- **Netlify**: Automatic (Let's Encrypt)
- **GitHub Pages**: Automatic
- **CloudFront**: Use AWS Certificate Manager

## Continuous Deployment

### GitHub Actions Example:

**.github/workflows/deploy.yml:**
```yaml
name: Deploy

on:
  push:
    branches: [main]

jobs:
  build-deploy:
    runs-on: ubuntu-latest
    
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node
        uses: actions/setup-node@v3
        with:
          node-version: 18
          cache: 'npm'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Build
        run: npm run build
      
      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v20
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.ORG_ID }}
          vercel-project-id: ${{ secrets.PROJECT_ID }}
```

## Health Checks

After deployment, verify:

✅ Site loads correctly  
✅ Dark mode toggle works  
✅ Calculator performs calculations  
✅ Responsive on mobile  
✅ No console errors  
✅ Forms submit properly  
✅ Charts render correctly  

## Monitoring & Analytics

Consider adding:
- **Google Analytics** - User tracking
- **Sentry** - Error monitoring
- **LogRocket** - Session replay
- **Plausible** - Privacy-friendly analytics

## Rollback Strategy

Most platforms support rollback:
- **Vercel**: Deployments page → Previous deployment → Promote
- **Netlify**: Deploys tab → Previous deploy → Publish
- **AWS**: Update CloudFront to point to previous S3 version

## Cost Estimates

| Platform | Free Tier | Paid Tier |
|----------|-----------|-----------|
| Vercel | Unlimited public sites | $20/mo Pro |
| Netlify | 100GB bandwidth | $19/mo Pro |
| GitHub Pages | Unlimited public | N/A |
| AWS S3 | $0.023/GB | Usage-based |
| Azure | 100GB bandwidth | Usage-based |

## Support & Issues

If deployment fails:
1. Check build logs
2. Verify Node version (18+)
3. Clear build cache
4. Check environment variables
5. Review platform documentation

---

**Ready to deploy?** Choose a platform and follow the steps above! 🚀

For questions, contact Pyramid Consulting Inc.
