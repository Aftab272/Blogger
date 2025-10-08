-- MernCryptoBlog Database Schema
-- Run this SQL in your Supabase SQL editor

-- Enable Row Level Security
ALTER TABLE IF EXISTS posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS pages ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS messages ENABLE ROW LEVEL SECURITY;

-- Create posts table
CREATE TABLE IF NOT EXISTS posts (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    category TEXT NOT NULL,
    tags TEXT,
    image_url TEXT,
    seo_title TEXT,
    seo_description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create pages table
CREATE TABLE IF NOT EXISTS pages (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    content TEXT NOT NULL,
    seo_title TEXT,
    seo_description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create settings table
CREATE TABLE IF NOT EXISTS settings (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    site_name TEXT NOT NULL DEFAULT 'MernCryptoBlog',
    description TEXT,
    keywords TEXT,
    favicon_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create messages table for contact form
CREATE TABLE IF NOT EXISTS messages (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    subject TEXT NOT NULL,
    message TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    read_at TIMESTAMP WITH TIME ZONE,
    status TEXT DEFAULT 'unread'
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_posts_category ON posts(category);
CREATE INDEX IF NOT EXISTS idx_posts_created_at ON posts(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_pages_slug ON pages(slug);

-- Row Level Security Policies

-- Posts: Allow public read access, authenticated users can write
CREATE POLICY "Posts are viewable by everyone" ON posts
    FOR SELECT USING (true);

CREATE POLICY "Authenticated users can insert posts" ON posts
    FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can update posts" ON posts
    FOR UPDATE USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can delete posts" ON posts
    FOR DELETE USING (auth.role() = 'authenticated');

-- Pages: Allow public read access, authenticated users can write
CREATE POLICY "Pages are viewable by everyone" ON pages
    FOR SELECT USING (true);

CREATE POLICY "Authenticated users can insert pages" ON pages
    FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can update pages" ON pages
    FOR UPDATE USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can delete pages" ON pages
    FOR DELETE USING (auth.role() = 'authenticated');

-- Settings: Allow public read access, authenticated users can write
CREATE POLICY "Settings are viewable by everyone" ON settings
    FOR SELECT USING (true);

CREATE POLICY "Authenticated users can insert settings" ON settings
    FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can update settings" ON settings
    FOR UPDATE USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can delete settings" ON settings
    FOR DELETE USING (auth.role() = 'authenticated');

-- Messages: Allow public insert, authenticated users can read
CREATE POLICY "Anyone can insert messages" ON messages
    FOR INSERT WITH CHECK (true);

CREATE POLICY "Authenticated users can read messages" ON messages
    FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can update messages" ON messages
    FOR UPDATE USING (auth.role() = 'authenticated');

-- Insert default settings
INSERT INTO settings (site_name, description, keywords) 
VALUES (
    'MernCryptoBlog',
    'Your trusted source for cryptocurrency insights, blockchain technology, and digital finance news.',
    'cryptocurrency, blockchain, bitcoin, ethereum, crypto news, digital finance'
) ON CONFLICT DO NOTHING;

-- Insert sample posts (optional)
INSERT INTO posts (title, content, category, tags, image_url, seo_title, seo_description) VALUES
(
    'The Future of Cryptocurrency in 2024',
    'Cryptocurrency continues to evolve rapidly, with new technologies and regulations shaping the landscape. In this comprehensive analysis, we explore the key trends and developments that are expected to define the crypto space in 2024.

From the rise of institutional adoption to the development of more sustainable blockchain solutions, the cryptocurrency ecosystem is maturing. Major financial institutions are increasingly integrating digital assets into their portfolios, while governments worldwide are developing clearer regulatory frameworks.

Key areas to watch include:
- Central Bank Digital Currencies (CBDCs)
- DeFi protocol innovations
- Layer 2 scaling solutions
- Environmental sustainability initiatives
- Cross-chain interoperability

The market is showing signs of increased stability and mainstream acceptance, with traditional finance and crypto becoming increasingly interconnected.',
    'Analysis',
    'cryptocurrency, 2024, trends, blockchain, DeFi',
    'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=800&h=400&fit=crop',
    'The Future of Cryptocurrency in 2024 - MernCryptoBlog',
    'Explore the key trends and developments that will define cryptocurrency in 2024, from institutional adoption to sustainable blockchain solutions.'
),
(
    'Understanding Bitcoin Halving: What It Means for Investors',
    'Bitcoin halving is one of the most significant events in the cryptocurrency calendar, occurring approximately every four years. This mechanism is built into Bitcoin''s code to control inflation and maintain scarcity.

What is Bitcoin Halving?
Bitcoin halving reduces the reward for mining new blocks by 50%. This event occurs every 210,000 blocks, which takes roughly four years to complete. The most recent halving occurred in 2024, reducing the block reward from 6.25 BTC to 3.125 BTC.

Historical Impact:
- 2012 Halving: Bitcoin price increased significantly in the following year
- 2016 Halving: Similar pattern of price appreciation
- 2020 Halving: Led to the 2021 bull market
- 2024 Halving: Current market dynamics

For investors, halving events typically signal potential price appreciation due to reduced supply growth. However, market conditions, adoption rates, and external factors also play crucial roles in determining outcomes.',
    'Bitcoin',
    'bitcoin, halving, mining, investment, cryptocurrency',
    'https://images.unsplash.com/photo-1621761191319-c6fb62004040?w=800&h=400&fit=crop',
    'Understanding Bitcoin Halving: What It Means for Investors',
    'Learn about Bitcoin halving events, their historical impact, and what they mean for cryptocurrency investors.'
),
(
    'DeFi Revolution: Decentralized Finance Explained',
    'Decentralized Finance (DeFi) represents one of the most innovative applications of blockchain technology, offering financial services without traditional intermediaries.

What is DeFi?
DeFi refers to financial applications built on blockchain networks that operate without central authorities. These applications provide services like lending, borrowing, trading, and earning interest through smart contracts.

Key DeFi Components:
- Decentralized Exchanges (DEXs)
- Lending Protocols
- Yield Farming
- Liquidity Mining
- Automated Market Makers (AMMs)

Popular DeFi Platforms:
- Uniswap: Leading decentralized exchange
- Compound: Lending and borrowing protocol
- Aave: Multi-asset lending platform
- MakerDAO: Decentralized stablecoin system

Benefits of DeFi:
- Permissionless access
- Transparency
- Global availability
- Reduced counterparty risk
- Programmable money

However, DeFi also comes with risks including smart contract vulnerabilities, impermanent loss, and regulatory uncertainty. Investors should conduct thorough research before participating in DeFi protocols.',
    'DeFi',
    'DeFi, decentralized finance, blockchain, smart contracts, yield farming',
    'https://images.unsplash.com/photo-1639322537504-6427a16b0a28?w=800&h=400&fit=crop',
    'DeFi Revolution: Decentralized Finance Explained',
    'Discover how DeFi is revolutionizing finance through decentralized applications, smart contracts, and blockchain technology.'
) ON CONFLICT DO NOTHING;
