# MernCryptoBlog

A full-stack React + Supabase blog application for cryptocurrency and blockchain content.

## Features

- 🚀 **Modern Tech Stack**: React + Vite + Tailwind CSS
- 🔐 **Authentication**: Supabase Auth with email/password
- 📝 **Content Management**: Comprehensive admin dashboard
- 🎨 **Beautiful UI**: Brown and green color theme
- 🔍 **SEO Optimized**: Dynamic meta tags, Open Graph, Twitter Cards
- 📱 **Responsive Design**: Mobile-first approach
- 🌐 **Dynamic Pages**: Custom pages from database
- 📊 **Admin Dashboard**: Full CRUD operations with sidebar navigation

### 🎛️ Admin Panel Features
- **Dashboard**: Statistics, recent content, quick actions
- **Posts Management**: Create, edit, delete blog posts with SEO
- **Pages Management**: Custom pages with slug generation
- **Settings**: Site configuration and branding
- **Responsive**: Mobile-friendly sidebar navigation
- **Secure**: Protected routes with Supabase authentication

## Tech Stack

- **Frontend**: React 18, Vite, Tailwind CSS
- **Backend**: Supabase (PostgreSQL, Auth, Real-time)
- **Routing**: React Router DOM
- **Icons**: Lucide React
- **Deployment**: Vercel ready

## Database Schema

### Tables

1. **posts** - Blog posts with SEO metadata
2. **pages** - Custom pages with slugs
3. **settings** - Site configuration

### Key Features

- Row Level Security (RLS) enabled
- Public read access, authenticated write access
- Optimized indexes for performance
- Sample data included

## Setup Instructions

### 1. Clone and Install

```bash
git clone <repository-url>
cd MernCryptoBlog
npm install
```

### 2. Supabase Setup

1. Create a new project at [supabase.com](https://supabase.com)
2. Go to Settings > API to get your credentials
3. Copy `env.example` to `.env` and fill in your Supabase credentials:

```env
VITE_SUPABASE_URL=your_supabase_url_here
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key_here
```

### 3. Database Setup

1. Go to your Supabase project dashboard
2. Navigate to SQL Editor
3. Copy and paste the contents of `database-schema.sql`
4. Run the SQL to create tables, policies, and sample data

### 4. Authentication Setup

1. In Supabase dashboard, go to Authentication > Settings
2. Enable email authentication
3. Configure your site URL for production

### 5. Run Development Server

```bash
npm run dev
```

Visit `http://localhost:3000` to see your blog!

## Admin Access

1. Go to `/login`
2. Create an account (first user will be admin)
3. Access admin dashboard at `/admin`

### 🎛️ Admin Panel Overview

The admin panel features a modern sidebar navigation with the following sections:

#### 📊 Dashboard
- Site statistics (posts, pages, views)
- Recent content overview
- Quick action buttons
- Welcome section with branding

#### 📝 Posts Management
- Create new blog posts
- Edit existing posts
- Delete posts with confirmation
- SEO optimization (title, description, tags)
- Category and tag management
- Image URL support

#### 🌐 Pages Management
- Create custom pages
- Automatic slug generation
- SEO metadata per page
- Content management
- Page preview

#### ⚙️ Settings
- Site name and description
- SEO keywords
- Favicon URL
- Global site configuration
- Real-time preview

#### 🔐 Security Features
- Protected routes with authentication
- Row Level Security (RLS)
- Secure logout functionality
- User session management

## Admin Features

### Posts Management
- Create, edit, delete blog posts
- SEO optimization (title, description, tags)
- Category and tag management
- Image URL support (GitHub/Unsplash)

### Pages Management
- Create custom pages with slugs
- SEO metadata for each page
- Dynamic routing (`/page/your-slug`)

### Settings Management
- Site name and description
- SEO keywords
- Favicon URL
- Global site configuration

## SEO Features

- Dynamic meta tags per page/post
- Open Graph tags for social sharing
- Twitter Card support
- JSON-LD structured data
- XML sitemap at `/sitemap`
- Optimized for search engines

## Deployment

### Vercel Deployment

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables in Vercel dashboard:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
4. Deploy!

### Environment Variables

Make sure to set these in your deployment platform:

```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## Project Structure

```
src/
├── components/
│   ├── admin/          # Admin dashboard components
│   ├── Header.jsx      # Site header
│   ├── Footer.jsx      # Site footer
│   ├── Layout.jsx      # Main layout wrapper
│   ├── SEO.jsx         # SEO metadata component
│   └── ProtectedRoute.jsx
├── context/
│   └── AuthContext.jsx # Authentication context
├── pages/              # Page components
├── styles/
│   └── index.css       # Tailwind CSS
├── utils/
│   └── supabase.js     # Supabase client
└── App.jsx             # Main app component
```

## Customization

### Colors
The app uses a brown and green color scheme defined in `tailwind.config.js`:

- **Brown**: Primary brand color
- **Green**: Accent and action color
- **Gray**: Neutral colors

### Content
- All content is managed through the admin dashboard
- Images use external URLs (GitHub, Unsplash, etc.)
- No file uploads required

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

MIT License - feel free to use this project for your own blog!

## Support

For questions or issues:
- Check the documentation
- Open an issue on GitHub
- Contact: support@merncryptoblog.com

---

**Happy Blogging! 🚀**
