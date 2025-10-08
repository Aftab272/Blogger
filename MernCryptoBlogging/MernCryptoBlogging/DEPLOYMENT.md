# MernCryptoBlog Vercel Deployment Guide

## 🚀 Complete Deployment Setup

This guide covers deploying MernCryptoBlog to Vercel with proper environment variables, SPA routing, and optimization.

## 📋 Prerequisites

### Required Accounts
- [Vercel Account](https://vercel.com) (free tier available)
- [Supabase Account](https://supabase.com) (free tier available)
- [GitHub Account](https://github.com) (for repository hosting)

### Required Tools
- Node.js 18+ installed
- Git installed
- Vercel CLI (optional but recommended)

## 🛠️ Local Development Setup

### 1. Environment Variables
Create a `.env.local` file in the project root:

```bash
# Copy the example file
cp env.example .env.local
```

Edit `.env.local` with your Supabase credentials:
```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your_anon_key_here
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Start Development Server
```bash
npm run dev
```

Visit `http://localhost:3000` to see your application.

## 🗄️ Supabase Setup

### 1. Create Supabase Project
1. Go to [supabase.com](https://supabase.com)
2. Create a new project
3. Note your project URL and anon key

### 2. Database Setup
1. Go to your Supabase project dashboard
2. Navigate to SQL Editor
3. Copy and paste the contents of `database-schema.sql`
4. Run the SQL to create tables, policies, and sample data

### 3. Authentication Setup
1. Go to Authentication > Settings
2. Enable email authentication
3. Configure your site URL for production

## 🚀 Vercel Deployment

### Method 1: Vercel Dashboard (Recommended)

#### 1. Prepare Repository
```bash
# Initialize git if not already done
git init
git add .
git commit -m "Initial commit"

# Push to GitHub
git remote add origin https://github.com/yourusername/merncryptoblog.git
git push -u origin main
```

#### 2. Deploy to Vercel
1. Go to [vercel.com](https://vercel.com)
2. Click "New Project"
3. Import your GitHub repository
4. Configure project settings:
   - **Framework Preset**: Vite
   - **Root Directory**: `./` (default)
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`

#### 3. Environment Variables
In Vercel dashboard, go to Settings > Environment Variables:
```
VITE_SUPABASE_URL = https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY = your_anon_key_here
```

#### 4. Deploy
Click "Deploy" and wait for the build to complete.

### Method 2: Vercel CLI

#### 1. Install Vercel CLI
```bash
npm install -g vercel
```

#### 2. Login to Vercel
```bash
vercel login
```

#### 3. Deploy
```bash
# First deployment
vercel

# Follow the prompts:
# - Set up and deploy? Y
# - Which scope? (your account)
# - Link to existing project? N
# - Project name: merncryptoblog
# - Directory: ./
# - Override settings? N
```

#### 4. Set Environment Variables
```bash
vercel env add VITE_SUPABASE_URL
vercel env add VITE_SUPABASE_ANON_KEY
```

#### 5. Redeploy
```bash
vercel --prod
```

## ⚙️ Configuration Files

### vercel.json
```json
{
  "version": 2,
  "builds": [
    {
      "src": "package.json",
      "use": "@vercel/static-build",
      "config": {
        "distDir": "dist"
      }
    }
  ],
  "routes": [
    {
      "src": "/sitemap.xml",
      "dest": "/sitemap"
    },
    {
      "src": "/robots.txt",
      "dest": "/robots"
    },
    {
      "src": "/(.*)",
      "dest": "/index.html"
    }
  ],
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "X-Content-Type-Options",
          "value": "nosniff"
        },
        {
          "key": "X-Frame-Options",
          "value": "DENY"
        },
        {
          "key": "X-XSS-Protection",
          "value": "1; mode=block"
        }
      ]
    }
  ]
}
```

### vite.config.js
```javascript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    open: true,
    host: true
  },
  build: {
    outDir: 'dist',
    sourcemap: false,
    minify: 'terser',
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          router: ['react-router-dom'],
          supabase: ['@supabase/supabase-js'],
          icons: ['lucide-react']
        }
      }
    }
  }
})
```

## 🔧 Environment Variables

### Required Variables
```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your_anon_key_here
```

### Getting Supabase Credentials
1. Go to your Supabase project dashboard
2. Navigate to Settings > API
3. Copy:
   - **Project URL** → `VITE_SUPABASE_URL`
   - **anon public** key → `VITE_SUPABASE_ANON_KEY`

## 📊 Performance Optimization

### Build Optimization
- **Code Splitting**: Automatic chunk splitting
- **Tree Shaking**: Unused code removal
- **Minification**: Terser minification
- **Asset Optimization**: Image and font optimization

### Caching Strategy
- **Static Assets**: 1 year cache
- **HTML**: No cache (for SPA updates)
- **API Responses**: Appropriate cache headers

## 🔍 Testing Deployment

### Local Testing
```bash
# Build the project
npm run build

# Preview the build
npm run preview
```

### Production Testing
1. Visit your Vercel deployment URL
2. Test all routes:
   - `/` (Home)
   - `/blog` (Blog listing)
   - `/post/:id` (Individual posts)
   - `/page/:slug` (Custom pages)
   - `/contact` (Contact form)
   - `/privacy` (Privacy policy)
   - `/admin` (Admin dashboard)
   - `/login` (Admin login)

### SEO Testing
1. Check `/sitemap.xml`
2. Check `/robots.txt`
3. Test meta tags with browser dev tools
4. Validate structured data with Google's Rich Results Test

## 🚨 Troubleshooting

### Common Issues

#### Build Failures
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
npm run build
```

#### Environment Variables Not Working
- Ensure variables start with `VITE_`
- Check Vercel dashboard for correct variable names
- Redeploy after adding variables

#### SPA Routing Issues
- Verify `vercel.json` has correct rewrite rules
- Check that all routes fallback to `index.html`

#### Supabase Connection Issues
- Verify environment variables are correct
- Check Supabase project is active
- Ensure RLS policies are properly configured

### Debug Commands
```bash
# Check build output
npm run build

# Preview production build
npm run preview

# Check environment variables
echo $VITE_SUPABASE_URL
echo $VITE_SUPABASE_ANON_KEY
```

## 📈 Post-Deployment

### 1. Domain Setup (Optional)
1. Go to Vercel dashboard
2. Navigate to your project
3. Go to Settings > Domains
4. Add your custom domain

### 2. Analytics Setup
1. Add Google Analytics (optional)
2. Set up Vercel Analytics
3. Monitor Core Web Vitals

### 3. SEO Setup
1. Submit sitemap to Google Search Console
2. Verify domain ownership
3. Monitor search performance

### 4. Monitoring
1. Set up error tracking (Sentry)
2. Monitor performance metrics
3. Track user analytics

## 🔄 Continuous Deployment

### Automatic Deployments
- Push to `main` branch triggers automatic deployment
- Pull requests create preview deployments
- Environment variables are automatically included

### Manual Deployments
```bash
# Deploy to production
vercel --prod

# Deploy preview
vercel
```

## 📞 Support

### Documentation
- [Vercel Documentation](https://vercel.com/docs)
- [Supabase Documentation](https://supabase.com/docs)
- [Vite Documentation](https://vitejs.dev/guide/)

### Community
- [Vercel Discord](https://vercel.com/discord)
- [Supabase Discord](https://discord.supabase.com)
- [GitHub Issues](https://github.com/yourusername/merncryptoblog/issues)

---

**Ready for production deployment! 🚀**

