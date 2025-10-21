#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

console.log('🚀 Setting up Crypto Portfolio Tracker...\n');

// Check if .env.local exists
const envPath = path.join(process.cwd(), '.env.local');
const envExamplePath = path.join(process.cwd(), 'env.example');

if (!fs.existsSync(envPath)) {
  if (fs.existsSync(envExamplePath)) {
    console.log('📝 Creating .env.local from env.example...');
    fs.copyFileSync(envExamplePath, envPath);
    console.log('✅ .env.local created successfully!');
  } else {
    console.log('⚠️  env.example not found. Creating basic .env.local...');
    const basicEnv = `# Database
DATABASE_URL="file:./dev.db"

# NextAuth.js
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key-here-change-in-production"

# CoinGecko API (no key required for free tier)
COINGECKO_API_URL="https://api.coingecko.com/api/v3"
`;
    fs.writeFileSync(envPath, basicEnv);
    console.log('✅ Basic .env.local created!');
  }
} else {
  console.log('✅ .env.local already exists');
}

// Check if database exists
const dbPath = path.join(process.cwd(), 'dev.db');
if (!fs.existsSync(dbPath)) {
  console.log('📊 Database not found. Run "npx prisma db push" to create it.');
} else {
  console.log('✅ Database exists');
}

console.log('\n🎉 Setup complete! Next steps:');
console.log('1. Update .env.local with your configuration');
console.log('2. Run "npx prisma db push" to create the database');
console.log('3. Run "npm run dev" to start the development server');
console.log('4. Open http://localhost:3000 in your browser');
console.log('\n📚 Check README.md for detailed instructions');
