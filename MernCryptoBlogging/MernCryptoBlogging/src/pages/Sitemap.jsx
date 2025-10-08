import React, { useState, useEffect } from 'react'
import { supabase } from '../utils/supabase'

const Sitemap = () => {
  const [posts, setPosts] = useState([])
  const [pages, setPages] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      const [postsResult, pagesResult] = await Promise.all([
        supabase.from('posts').select('id, title, created_at'),
        supabase.from('pages').select('id, slug, title, created_at')
      ])

      if (postsResult.error) throw postsResult.error
      if (pagesResult.error) throw pagesResult.error

      setPosts(postsResult.data || [])
      setPages(pagesResult.data || [])
    } catch (error) {
      console.error('Error fetching sitemap data:', error)
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

  const baseUrl = typeof window !== 'undefined' ? window.location.origin : 'https://merncryptoblog.com'
  const currentDate = new Date().toISOString()

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${baseUrl}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>${baseUrl}/blog</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>${baseUrl}/contact</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
  <url>
    <loc>${baseUrl}/privacy</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>yearly</changefreq>
    <priority>0.5</priority>
  </url>
  ${posts.map(post => `
  <url>
    <loc>${baseUrl}/post/${post.id}</loc>
    <lastmod>${new Date(post.created_at).toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`).join('')}
  ${pages.map(page => `
  <url>
    <loc>${baseUrl}/page/${page.slug}</loc>
    <lastmod>${new Date(page.created_at).toISOString()}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>`).join('')}
</urlset>`

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Sitemap</h1>
        
        <div className="space-y-8">
          <section>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Main Pages</h2>
            <ul className="space-y-2">
              <li><a href="/" className="text-green-600 hover:text-green-700">Home</a></li>
              <li><a href="/blog" className="text-green-600 hover:text-green-700">Blog</a></li>
              <li><a href="/contact" className="text-green-600 hover:text-green-700">Contact</a></li>
              <li><a href="/privacy" className="text-green-600 hover:text-green-700">Privacy Policy</a></li>
            </ul>
          </section>

          {posts.length > 0 && (
            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Blog Posts</h2>
              <ul className="space-y-2">
                {posts.map(post => (
                  <li key={post.id}>
                    <a 
                      href={`/post/${post.id}`} 
                      className="text-green-600 hover:text-green-700"
                    >
                      {post.title}
                    </a>
                    <span className="text-gray-500 text-sm ml-2">
                      ({new Date(post.created_at).toLocaleDateString()})
                    </span>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {pages.length > 0 && (
            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Custom Pages</h2>
              <ul className="space-y-2">
                {pages.map(page => (
                  <li key={page.id}>
                    <a 
                      href={`/page/${page.slug}`} 
                      className="text-green-600 hover:text-green-700"
                    >
                      {page.title}
                    </a>
                    <span className="text-gray-500 text-sm ml-2">
                      ({new Date(page.created_at).toLocaleDateString()})
                    </span>
                  </li>
                ))}
              </ul>
            </section>
          )}

          <section>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">XML Sitemap</h2>
            <p className="text-gray-600 mb-4">
              For search engines, you can access the XML sitemap at: 
              <a href="/sitemap.xml" className="text-green-600 hover:text-green-700 ml-2">
                /sitemap.xml
              </a>
            </p>
            <details className="bg-gray-50 p-4 rounded-lg">
              <summary className="cursor-pointer font-medium text-gray-800">
                View XML Sitemap Content
              </summary>
              <pre className="mt-4 text-xs text-gray-700 overflow-x-auto">
                {sitemap}
              </pre>
            </details>
          </section>
        </div>
      </div>
    </div>
  )
}

export default Sitemap
