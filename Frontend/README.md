# 🚀 JustCrypto

A modern, full-stack cryptocurrency portfolio tracker with mock trading functionality built with Next.js 14, TypeScript, and Tailwind CSS.

## ✨ Features

### Core Features (All Required)
- **Live Crypto Prices**: Real-time prices for BTC, ETH, USDT, USDC, XMR, and SOL
- **Auto-refresh**: Prices update every 30 seconds
- **Authentication**: Secure login/register system with NextAuth.js
- **Portfolio Dashboard**: Track your $10,000 starting balance and P&L
- **Trading Interface**: Buy/sell cryptocurrencies with real-time price conversion
- **Trade History**: View your last 10 trades
- **Mobile Responsive**: Professional UI that works on all devices

### Bonus Features
- **Dark/Light Mode**: Theme toggle (already implemented!)
- **Real-time Updates**: Live price updates with WebSocket-like experience
- **Price Alerts**: Set alerts for price movements (database ready)
- **Professional UI**: Beautiful animations and glass morphism design

## 🛠️ Tech Stack

### Frontend
- **Next.js 14** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first CSS framework
- **Radix UI** - Accessible component library
- **Framer Motion** - Smooth animations
- **NextAuth.js** - Authentication

### Backend
- **Prisma** - Database ORM
- **SQLite** - Lightweight database
- **Next.js API Routes** - Serverless API

### External APIs
- **CoinGecko API** - Free crypto price data (no API key required)

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or pnpm

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd Frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp env.example .env.local
   ```
   
   Update `.env.local` with your configuration:
   ```env
   DATABASE_URL="file:./dev.db"
   NEXTAUTH_URL="http://localhost:3000"
   NEXTAUTH_SECRET="your-secret-key-here"
   COINGECKO_API_URL="https://api.coingecko.com/api/v3"
   ```

4. **Set up the database**
   ```bash
   npx prisma generate
   npx prisma db push
   ```

5. **Start the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📱 Usage

### For New Users
1. **Sign Up**: Create an account with email and password
2. **Get Started**: You'll receive $10,000 in mock USD
3. **Explore**: View live crypto prices on the homepage
4. **Trade**: Buy and sell cryptocurrencies on the trading page
5. **Track**: Monitor your portfolio performance on the dashboard

### For Existing Users
1. **Sign In**: Use your existing credentials
2. **Dashboard**: View your portfolio and recent trades
3. **Trading**: Execute buy/sell orders with real-time prices
4. **Monitor**: Track your P&L and holdings

## 🎯 Supported Cryptocurrencies

- **BTC** - Bitcoin
- **ETH** - Ethereum  
- **USDT** - Tether
- **USDC** - USD Coin
- **XMR** - Monero
- **SOL** - Solana

## 🏗️ Project Structure

```
Frontend/
├── app/                    # Next.js 14 app router
│   ├── api/               # API routes
│   │   ├── auth/          # Authentication endpoints
│   │   ├── crypto/        # Crypto price API
│   │   └── portfolio/     # Portfolio operations
│   ├── auth/              # Authentication pages
│   ├── dashboard/         # Portfolio dashboard
│   ├── trading/           # Trading interface
│   └── page.tsx           # Homepage
├── components/            # Reusable UI components
│   ├── ui/               # Base UI components
│   ├── crypto-ticker.tsx # Live price ticker
│   ├── crypto-price-cards.tsx # Price display cards
│   └── ...
├── hooks/                 # Custom React hooks
├── lib/                   # Utilities and configurations
│   ├── auth.ts           # NextAuth.js config
│   ├── db.ts             # Prisma client
│   └── api/              # External API services
├── prisma/               # Database schema
└── types/                # TypeScript definitions
```

## 🔧 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/signin` - User login
- `GET /api/auth/session` - Get current session

### Crypto Data
- `GET /api/crypto` - Get live crypto prices
- `GET /api/crypto?type=details` - Get detailed crypto information

### Portfolio
- `GET /api/portfolio` - Get user portfolio
- `POST /api/portfolio` - Execute trade (buy/sell)

## 🎨 Design Features

- **Glass Morphism**: Modern glass-like UI elements
- **Smooth Animations**: Framer Motion powered transitions
- **Responsive Design**: Mobile-first approach
- **Dark Theme**: Professional dark color scheme
- **Live Ticker**: Scrolling crypto price display
- **Interactive Cards**: Hover effects and animations

## 🚀 Deployment

### Vercel (Recommended)
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Set environment variables in Vercel dashboard
4. Deploy!

### Environment Variables for Production
```env
DATABASE_URL="your-production-database-url"
NEXTAUTH_URL="https://your-domain.vercel.app"
NEXTAUTH_SECRET="your-secure-secret-key"
COINGECKO_API_URL="https://api.coingecko.com/api/v3"
```

## 📊 Database Schema

### Users
- `id` - Unique identifier
- `email` - User email (unique)
- `name` - User display name
- `password` - Hashed password
- `createdAt` - Account creation date

### Portfolios
- `id` - Portfolio identifier
- `userId` - Owner user ID
- `totalValue` - Total portfolio value
- `cashBalance` - Available cash
- `createdAt` - Portfolio creation date

### Holdings
- `id` - Holding identifier
- `portfolioId` - Portfolio reference
- `symbol` - Crypto symbol (BTC, ETH, etc.)
- `amount` - Quantity held
- `averagePrice` - Average purchase price

### Trades
- `id` - Trade identifier
- `portfolioId` - Portfolio reference
- `symbol` - Crypto symbol
- `type` - "buy" or "sell"
- `amount` - Trade quantity
- `price` - Execution price
- `totalValue` - Total trade value
- `timestamp` - Trade execution time

## 🔒 Security Features

- **Password Hashing**: bcryptjs for secure password storage
- **Session Management**: NextAuth.js JWT sessions
- **Protected Routes**: Middleware-based route protection
- **Input Validation**: Server-side validation for all inputs
- **SQL Injection Protection**: Prisma ORM prevents SQL injection

## 🎯 Performance Optimizations

- **API Caching**: 30-second cache for crypto prices
- **Image Optimization**: Next.js automatic image optimization
- **Code Splitting**: Automatic code splitting with Next.js
- **Static Generation**: Pre-rendered pages where possible
- **Database Indexing**: Optimized database queries

## 🐛 Troubleshooting

### Common Issues

1. **Database Connection Error**
   - Ensure `.env.local` is properly configured
   - Run `npx prisma db push` to create the database

2. **Authentication Issues**
   - Check `NEXTAUTH_SECRET` is set
   - Verify `NEXTAUTH_URL` matches your domain

3. **Crypto Prices Not Loading**
   - Check internet connection
   - Verify CoinGecko API is accessible
   - Check browser console for errors

4. **Build Errors**
   - Run `npm install` to ensure all dependencies are installed
   - Check TypeScript errors with `npm run build`

## 📝 License

This project is created for educational purposes as part of a blockchain assignment.

## 🤝 Contributing

This is an assignment project, but feel free to fork and improve!

## 📞 Support

For issues or questions, please check the troubleshooting section or create an issue in the repository.

---

**Built with ❤️ using Next.js 14, TypeScript, and modern web technologies.**
