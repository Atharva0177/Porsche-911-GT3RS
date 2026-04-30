# Hosting Guide: Porsche 911 GT3 RS Scrollytelling Microsite

This guide covers deploying your Next.js 14 scrollytelling site to various hosting platforms, from the easiest (Vercel) to more advanced options (AWS, DigitalOcean).

---

## 📋 Pre-Deployment Checklist

Before deploying, ensure:

- [ ] All 192 frame images are in `/public/sequence/` (WebP format recommended)
- [ ] Logo image exists at `/public/porsche.png`
- [ ] Performance card images exist (`/public/speed.png`, `/accel.png`, etc.)
- [ ] `npm run build` completes without errors locally
- [ ] Git repo is initialized and committed (`git status` shows clean working tree)
- [ ] Environment variables are set (if any)
- [ ] TypeScript compilation passes (`npm run build`)

---

## 🚀 Option 1: Vercel (Recommended - Easiest)

Vercel is the creator of Next.js and provides the smoothest deployment experience for Next.js apps.

### Pros
- Zero-config deployment
- Automatic HTTPS and CDN
- Fast builds and deployments
- Built-in analytics and monitoring
- Free tier available
- Automatic previews for pull requests

### Cons
- Pricing scales with usage (compute time, bandwidth)

### Step-by-Step Deployment

#### 1. Create a Vercel Account
- Go to [vercel.com](https://vercel.com)
- Sign up with GitHub, GitLab, or email
- Link your Git account

#### 2. Connect Your Repository
```bash
# Option A: Via Vercel Dashboard
# 1. Click "Add New..." → "Project"
# 2. Select your Git provider
# 3. Find and import the "sequence" repository
# 4. Vercel auto-detects Next.js and configures it
# 5. Click "Deploy"

# Option B: Via Vercel CLI
npm i -g vercel
vercel link  # Link to Vercel project
vercel       # Deploy (dev environment)
vercel --prod  # Deploy to production
```

#### 3. Configure Build Settings
In Vercel Dashboard (Project Settings):

```
Build Command: npm run build
Output Directory: .next
Install Command: npm install
```

#### 4. Set Environment Variables (if needed)
In **Settings → Environment Variables**:
```
NEXT_PUBLIC_API_URL = https://api.example.com  # if applicable
```

#### 5. Custom Domain
In **Settings → Domains**:
```
1. Enter your domain (e.g., porsche911.example.com)
2. Add DNS records as shown
3. Wait for DNS propagation (~24 hours)
```

#### 6. Monitor Deployment
- Deployments page shows live build logs
- Access your site at `https://sequence.vercel.app` (auto-generated)
- Production domain goes live once DNS propagates

### Estimated Cost (Vercel)
- **Free tier**: 100 GB bandwidth/month, 1,000 serverless function invocations
- **Pro**: $20/month, includes more bandwidth and analytics
- For a static site like this, **free tier should be sufficient**

---

## 🚀 Option 2: Netlify

Another excellent platform with great Next.js support.

### Pros
- Easy Git integration
- Generous free tier (100 GB/month bandwidth)
- Great UI and deployment history
- Built-in split testing
- Easy form handling

### Cons
- Slightly slower builds than Vercel
- Free tier has some limitations on serverless functions

### Step-by-Step Deployment

#### 1. Create a Netlify Account
- Go to [netlify.com](https://netlify.com)
- Sign up with GitHub/GitLab/Bitbucket

#### 2. Connect Repository
```bash
# Via Netlify Dashboard
# 1. Click "Add new site" → "Import an existing project"
# 2. Choose your Git provider
# 3. Select the repository
```

#### 3. Build Settings
Netlify auto-detects Next.js, but manually verify:

```
Build command: npm run build
Publish directory: .next
Node version: 18.x (or latest)
```

#### 4. Deploy
- Connect and Netlify auto-deploys on every push
- View build logs in real-time
- Production URL: `https://sequence.netlify.app` (auto-generated)

#### 5. Custom Domain
In **Domain Settings**:
```
1. Add custom domain
2. Update DNS to point to Netlify
3. SSL auto-enabled
```

### Estimated Cost (Netlify)
- **Free**: 100 GB bandwidth, 300 min/month build time
- **Pro**: $19/month for more bandwidth and features
- **For this site**: Free tier is sufficient

---

## 🚀 Option 3: AWS Amplify

Full-featured AWS hosting with advanced deployment options.

### Pros
- Scalable to any traffic level
- AWS ecosystem integration
- Pay-as-you-go pricing
- Advanced networking options

### Cons
- More complex setup
- Higher learning curve
- Pricing can get expensive with traffic

### Step-by-Step Deployment

#### 1. Create AWS Account
- Go to [aws.amazon.com](https://aws.amazon.com)
- Sign up and set up billing

#### 2. Install AWS Amplify CLI
```bash
npm install -g @aws-amplify/cli
amplify configure
# Follow prompts to connect your AWS account
```

#### 3. Initialize Amplify Project
```bash
amplify init
# Project name: sequence
# Environment: prod
# Default editor: Visual Studio Code
# App type: javascript
# Framework: nextjs
```

#### 4. Add Hosting
```bash
amplify add hosting
# Select: Hosting with Amplify Console
# Environment: Production
```

#### 5. Deploy
```bash
amplify push
# Builds and deploys automatically
amplify open
# Opens your deployed site
```

#### 6. Add Custom Domain
In **AWS Amplify Console**:
```
1. App → Domain management
2. Add domain
3. Create or point existing domain
4. Configure DNS
```

### Estimated Cost (AWS Amplify)
- **Free tier**: 15 GB storage, 5 GB data transfer/month for 12 months
- **After free tier**: ~$0.01–$0.15 per GB stored, ~$0.15 per GB transferred
- **For this site**: Likely $5–$15/month depending on traffic

---

## 🚀 Option 4: Railway

Simple, modern platform with great Next.js support.

### Pros
- Very easy deployment
- Pay-as-you-go ($5/month minimum)
- Good for small projects
- Fast support

### Cons
- Smaller ecosystem
- Fewer advanced features than AWS/Vercel

### Step-by-Step Deployment

#### 1. Create Railway Account
- Go to [railway.app](https://railway.app)
- Sign up with GitHub

#### 2. Deploy via CLI
```bash
npm i -g @railway/cli
railway login
railway init
# Follow prompts
railway deploy
```

#### 3. Or via Dashboard
```
1. New Project → Deploy from GitHub
2. Select repository
3. Auto-detects Next.js
4. Deploys automatically
```

#### 4. Add Custom Domain
In **Project → Deployments → Settings**:
```
Add custom domain and update DNS
```

### Estimated Cost (Railway)
- **Pay-as-you-go**: $5/month minimum, ~$0.10/hour compute
- **For this site**: ~$10–$20/month

---

## 🚀 Option 5: DigitalOcean App Platform

Affordable VPS and managed app hosting.

### Pros
- Affordable ($5–$12/month)
- Full control over server
- Good documentation
- SSH access if needed

### Cons
- More manual configuration
- Less automated than Vercel/Netlify

### Step-by-Step Deployment

#### 1. Create DigitalOcean Account
- Go to [digitalocean.com](https://digitalocean.com)
- Sign up and add billing

#### 2. Create App via Dashboard
```
1. Click "Create" → "App"
2. Connect GitHub repository
3. Select branch (main)
4. Configure build
```

#### 3. Build & Runtime Settings
```
Build command: npm run build
Run command: npm start
Node version: 18.x
```

#### 4. Deploy
- Automatically deploys on push to main
- View logs in dashboard
- App runs on `*.ondigitalocean.app` subdomain

#### 5. Add Custom Domain
In **Settings → Domains**:
```
Add your domain and update DNS
```

### Estimated Cost (DigitalOcean)
- **App Platform**: $7–$12/month (minimum)
- **For this site**: ~$12/month

---

## 📦 Option 6: Self-Hosted (VPS)

For complete control, host on your own server.

### Pros
- Full control
- Cheapest long-term option
- No vendor lock-in

### Cons
- You manage everything (security, backups, updates)
- Requires DevOps knowledge
- Manual deployment process

### Step-by-Step Deployment (Ubuntu VPS Example)

#### 1. Provision VPS
```bash
# Rent a server from:
# - DigitalOcean ($5/month)
# - Linode ($5/month)
# - Hetzner (~$3/month)
# - AWS EC2 (pay-as-you-go)

# SSH into your server
ssh root@your_server_ip
```

#### 2. Install Node.js & npm
```bash
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs
node --version  # v18.x.x
npm --version   # 9.x.x
```

#### 3. Install PM2 (Process Manager)
```bash
sudo npm i -g pm2
pm2 install pm2-logrotate  # Auto-rotate logs
```

#### 4. Clone Your Repository
```bash
cd /home/ubuntu  # or suitable directory
git clone https://github.com/yourusername/sequence.git
cd sequence
npm install
npm run build
```

#### 5. Start Application with PM2
```bash
pm2 start "npm start" --name "porsche-site"
pm2 save
pm2 startup  # Restart on server reboot
```

#### 6. Install Nginx (Reverse Proxy)
```bash
sudo apt-get install nginx
sudo systemctl start nginx
sudo systemctl enable nginx
```

#### 7. Configure Nginx
Create `/etc/nginx/sites-available/porsche`:
```nginx
server {
    listen 80;
    server_name porsche911.example.com;
    
    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

Enable and test:
```bash
sudo ln -s /etc/nginx/sites-available/porsche /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

#### 8. Enable HTTPS with Let's Encrypt
```bash
sudo apt-get install certbot python3-certbot-nginx
sudo certbot --nginx -d porsche911.example.com
# Follow prompts to auto-renew
```

#### 9. Point Domain to Server
Update your DNS provider (Namecheap, GoDaddy, etc.):
```
A Record: porsche911.example.com → your_server_ip
```

#### 10. Monitor Application
```bash
pm2 logs porsche-site  # View real-time logs
pm2 status             # Check process status
pm2 monit              # Dashboard
```

### Estimated Cost (Self-Hosted VPS)
- **Server**: $3–$10/month (DigitalOcean, Linode, Hetzner)
- **Domain**: ~$12/year
- **Total**: ~$4–$11/month

---

## 🔄 Setting Up CI/CD Pipeline

Automate builds and deployments on every git push.

### GitHub Actions (Free)

Create `.github/workflows/deploy.yml`:
```yaml
name: Deploy to Production

on:
  push:
    branches: [main]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
          cache: 'npm'
      
      - run: npm install
      - run: npm run build
      - run: npm run test  # if you have tests
      
      # Deploy to Vercel
      - uses: amondnet/vercel-action@v20
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
          vercel-args: '--prod'
```

Set secrets in **GitHub → Settings → Secrets and variables → Actions**.

---

## 📊 Performance Optimization for Hosting

### 1. Image Optimization
```bash
# Verify frame images are WebP (most efficient)
# Fallback to PNG if needed
# Consider serving via CDN
```

### 2. Enable Caching Headers
In `next.config.js`:
```javascript
const headers = async () => {
  return [
    {
      source: '/sequence/:path*',
      headers: [
        {
          key: 'Cache-Control',
          value: 'public, max-age=31536000, immutable',
        },
      ],
    },
    {
      source: '/:path*',
      headers: [
        {
          key: 'Cache-Control',
          value: 'public, max-age=3600, s-maxage=86400',
        },
      ],
    },
  ];
};

module.exports = {
  async headers() {
    return headers();
  },
};
```

### 3. Enable Compression
Most hosting platforms auto-enable gzip. For self-hosted:
```nginx
gzip on;
gzip_types text/plain text/css text/xml application/json;
gzip_min_length 1000;
```

### 4. Use CDN for Assets
Consider using Cloudflare or AWS CloudFront:
```
1. Set up CDN to cache /public/* assets
2. Set long cache expiration for frame images
3. Enable automatic image optimization
```

### 5. Monitor Performance
- **Vercel Analytics**: Built-in
- **Google PageSpeed Insights**: Free tool
- **WebPageTest**: [webpagetest.org](https://webpagetest.org)
- **Sentry**: Error tracking

---

## 🔒 Security Checklist

- [ ] Enable HTTPS/SSL (auto on Vercel/Netlify)
- [ ] Set security headers in `next.config.js`:
  ```javascript
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'X-XSS-Protection', value: '1; mode=block' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
        ],
      },
    ];
  }
  ```
- [ ] Keep dependencies updated: `npm audit` and `npm update`
- [ ] Use `.gitignore` to prevent secrets being committed
- [ ] Never commit `.env.local` or API keys

---

## 📈 Domain Setup (All Platforms)

### Register a Domain
- **Registrars**: Namecheap, GoDaddy, Google Domains, Route 53
- **Cost**: ~$10–$15/year

### Point Domain to Your Host

#### For Vercel:
```
Update DNS:
CNAME: www → cname.vercel-dns.com
A: @ → 76.76.19.165
```

#### For Netlify:
```
CNAME: www → your-site.netlify.app
A: @ → 75.2.60.5
```

#### For DigitalOcean:
```
CNAME: www → your-app.ondigitalocean.app
A: @ → your_app_ip
```

### SSL Certificate
- **Vercel/Netlify**: Automatic via Let's Encrypt
- **Self-hosted**: Use Certbot:
  ```bash
  sudo certbot certonly --standalone -d porsche911.example.com
  ```

---

## 🚀 Recommended Setup

### For Beginners: **Vercel**
- Zero config
- Best for Next.js
- Free tier sufficient
- CLI: `vercel deploy --prod`

### For Cost-Conscious: **Netlify Free**
- Generous free tier (100GB/month)
- Simple deployment
- Great for static sites

### For Control: **DigitalOcean VPS**
- Full server control
- Affordable ($5–$12/month)
- Good learning experience

### For Enterprise: **AWS Amplify**
- Scales infinitely
- Advanced features
- Integration with AWS services

---

## ✅ Post-Deployment Checklist

- [ ] Test site on desktop and mobile
- [ ] Check all images load
- [ ] Verify canvas renders correctly
- [ ] Test intro splash (10 sec timer)
- [ ] Check scroll performance
- [ ] Monitor build logs for errors
- [ ] Set up uptime monitoring
- [ ] Configure error tracking (Sentry, LogRocket)
- [ ] Enable analytics (Vercel, Google Analytics)
- [ ] Document deployment process for team

---

## 🔧 Common Issues & Solutions

### Canvas frames not loading
```
1. Verify images in /public/sequence/ are WebP
2. Check browser console for 404 errors
3. Ensure image count matches frameCount prop
```

### Build fails with memory error
```bash
# Increase Node memory
NODE_OPTIONS=--max-old-space-size=2048 npm run build
```

### Slow initial load
```
1. Enable image optimization in next.config.js
2. Use CDN for /public assets
3. Add caching headers
4. Consider reducing frame count
```

### CORS errors
```javascript
// In next.config.js
async headers() {
  return [
    {
      source: '/:path*',
      headers: [
        { key: 'Access-Control-Allow-Origin', value: '*' },
      ],
    },
  ];
}
```

---

## 📚 Additional Resources

- **Next.js Deployment**: [nextjs.org/docs/deployment](https://nextjs.org/docs/deployment)
- **Vercel Docs**: [vercel.com/docs](https://vercel.com/docs)
- **Netlify Docs**: [netlify.com/docs](https://netlify.com/docs)
- **AWS Amplify**: [docs.amplify.aws](https://docs.amplify.aws)
- **DigitalOcean Tutorials**: [digitalocean.com/community/tutorials](https://digitalocean.com/community/tutorials)

---

**Last Updated:** April 30, 2026  
**Questions?** Refer to platform-specific docs or ask your hosting provider's support team.
