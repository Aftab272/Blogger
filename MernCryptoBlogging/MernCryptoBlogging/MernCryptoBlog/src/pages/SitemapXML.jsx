import React, { useState, useEffect } from 'react'
import { supabase } from '../utils/supabase'

const SitemapXML = () => {
  const [sitemap, setSitemap] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    generateSitemap()
  }, [])

  const generateSitemap = async () => {
    try {
      const baseUrl = typeof window !== 'undefined' ? window.location.origin : 'https://merncryptoblog.com'
      const currentDate = new Date().toISOString()

      // Fetch posts
      const { data: posts, error: postsError } = await supabase
        .from('posts')
        .select('id, created_at, updated_at')
        .order('created_at', { ascending: false })

      if (postsError) throw postsError

      // Fetch pages
      const { data: pages, error: pagesError } = await supabase
        .from('pages')
        .select('slug, created_at, updated_at')
        .order('created_at', { ascending: false })

      if (pagesError) throw pagesError

      // Generate XML sitemap
      const sitemapXML = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9">
  
  <!-- Homepage -->
  <url>
    <loc>${baseUrl}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
  
  <!-- Blog listing -->
  <url>
    <loc>${baseUrl}/blog</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.9</priority>
  </url>
  
  <!-- Contact page -->
  <url>
    <loc>${baseUrl}/contact</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
  
  <!-- Privacy page -->
  <url>
    <loc>${baseUrl}/privacy</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>yearly</changefreq>
    <priority>0.5</priority>
  </url>
  
  <!-- Sitemap page -->
  <url>
    <loc>${baseUrl}/sitemap</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.6</priority>
  </url>
  
  <!-- Blog posts -->
  ${posts?.map(post => `
  <url>
    <loc>${baseUrl}/post/${post.id}</loc>
    <lastmod>${new Date(post.updated_at || post.created_at).toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`).join('') || ''}
  
  <!-- Custom pages -->
  ${pages?.map(page => `
  <url>
    <loc>${baseUrl}/page/${page.slug}</loc>
    <lastmod>${new Date(page.updated_at || page.created_at).toISOString()}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>`).join('') || ''}
  
</urlset>`

      setSitemap(sitemapXML)
    } catch (error) {
      console.error('Error generating sitemap:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-green-600"></div>
      </div>
    )
  }

  // Set content type for XML
  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      document.contentType = 'application/xml'
    }
  }, [])

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">XML Sitemap</h1>
        
        <div className="bg-gray-50 p-6 rounded-lg mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Sitemap Information</h2>
          <p className="text-gray-600 mb-4">
            This is the XML sitemap for MernCryptoBlog. Search engines use this to discover and index your content.
          </p>
          <p className="text-sm text-gray-500">
            Last generated: {new Date().toLocaleString()}
          </p>
        </div>

        <details className="bg-white border rounded-lg">
          <summary className="p-4 cursor-pointer font-medium text-gray-900 hover:bg-gray-50">
            View XML Sitemap Content
          </summary>
          <div className="p-4 border-t">
            <pre className="text-xs text-gray-700 overflow-x-auto whitespace-pre-wrap">
              {sitemap}
            </pre>
          </div>
        </details>

        <div className="mt-8 text-center">
          <a 
            href="/sitemap.xml" 
            className="btn-primary"
            target="_blank"
            rel="noopener noreferrer"
          >
            View Raw XML
          </a>
        </div>
      </div>
    </div>
  )
}

export default SitemapXML
