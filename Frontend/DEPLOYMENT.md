# 🚀 JustCrypto - Deployment Guide

This guide will help you deploy JustCrypto to Vercel.

## 📋 Prerequisites

- GitHub account
- Vercel account (free tier available)
- Your project code pushed to GitHub

## 🎯 Step-by-Step Deployment

### 1. Prepare Your Repository

1. **Initialize Git** (if not already done)
   ```bash
   git init
   git add .
   git commit -m "Initial commit: Crypto Portfolio Tracker"
   ```

2. **Create GitHub Repository**
   - Go to [GitHub](https://github.com) and create a new repository
   - Name it `crypto-portfolio-tracker` or similar
   - Don't initialize with README (we already have one)

3. **Push to GitHub**
   ```bash
   git remote add origin https://github.com/YOUR_USERNAME/crypto-portfolio-tracker.git
   git branch -M main
   git push -u origin main
   ```

### 2. Deploy to Vercel

1. **Go to Vercel**
   - Visit [vercel.com](https://vercel.com)
   - Sign up/login with your GitHub account

2. **Import Project**
   - Click "New Project"
   - Import your GitHub repository
   - Vercel will auto-detect it's a Next.js project

3. **Configure Environment Variables**
   In the Vercel dashboard, add these environment variables:
   
   ```
   DATABASE_URL=file:./dev.db
   NEXTAUTH_URL=https://your-project-name.vercel.app
   NEXTAUTH_SECRET=your-super-secret-key-here
   COINGECKO_API_URL=https://api.coingecko.com/api/v3
   ```

   **Important Notes:**
   - Replace `your-project-name` with your actual Vercel project name
   - Generate a secure `NEXTAUTH_SECRET` (you can use: `openssl rand -base64 32`)
   - The `DATABASE_URL` will work for SQLite on Vercel

4. **Deploy**
   - Click "Deploy"
   - Wait for the build to complete (usually 2-3 minutes)

### 3. Post-Deployment Setup

1. **Test Your Deployment**
   - Visit your Vercel URL
   - Try creating an account
   - Test the trading functionality

2. **Database Setup**
   - The SQLite database will be created automatically on first use
   - No additional setup required

## 🔧 Environment Variables Reference

| Variable | Description | Example |
|----------|-------------|---------|
| `DATABASE_URL` | SQLite database path | `file:./dev.db` |
| `NEXTAUTH_URL` | Your app's URL | `https://your-app.vercel.app` |
| `NEXTAUTH_SECRET` | Secret for JWT signing | `your-secret-key` |
| `COINGECKO_API_URL` | CoinGecko API endpoint | `https://api.coingecko.com/api/v3` |

## 🚨 Important Notes

### SQLite on Vercel
- SQLite works on Vercel but has limitations
- Data persists between deployments
- For production, consider upgrading to PostgreSQL

### Free Tier Limits
- **Vercel**: 100GB bandwidth/month, unlimited deployments
- **CoinGecko**: 10-50 calls/minute (sufficient for our use case)
- **Database**: SQLite file size limit

### Security
- Never commit `.env.local` to Git
- Use strong `NEXTAUTH_SECRET` in production
- Consider rate limiting for production use

## 🔄 Updating Your Deployment

1. **Make Changes**
   ```bash
   # Make your changes
   git add .
   git commit -m "Update: description of changes"
   git push origin main
   ```

2. **Automatic Deployment**
   - Vercel automatically redeploys on push to main branch
   - Check the Vercel dashboard for deployment status

## 🐛 Troubleshooting

### Build Failures
- Check the Vercel build logs
- Ensure all dependencies are in `package.json`
- Verify environment variables are set

### Database Issues
- SQLite database is created automatically
- If issues persist, check file permissions

### Authentication Issues
- Verify `NEXTAUTH_URL` matches your domain
- Check `NEXTAUTH_SECRET` is set correctly

### API Issues
- CoinGecko API is free and doesn't require keys
- Check network connectivity
- Verify API endpoints are correct

## 📊 Monitoring

### Vercel Analytics
- Enable Vercel Analytics in your dashboard
- Monitor performance and usage

### Error Tracking
- Check Vercel function logs
- Monitor API response times

## 🎯 Production Checklist

- [ ] Environment variables configured
- [ ] Strong `NEXTAUTH_SECRET` set
- [ ] Domain configured (if using custom domain)
- [ ] Analytics enabled
- [ ] Error monitoring set up
- [ ] Performance optimized
- [ ] Mobile responsive tested
- [ ] All features working

## 🔗 Useful Links

- [Vercel Documentation](https://vercel.com/docs)
- [Next.js Deployment](https://nextjs.org/docs/deployment)
- [NextAuth.js Deployment](https://next-auth.js.org/deployment)
- [Prisma Deployment](https://www.prisma.io/docs/guides/deployment)

## 🎉 Success!

Once deployed, your Crypto Portfolio Tracker will be live and accessible to users worldwide!

**Demo URL**: `https://your-project-name.vercel.app`

Share your deployed app and start tracking crypto portfolios! 🚀
