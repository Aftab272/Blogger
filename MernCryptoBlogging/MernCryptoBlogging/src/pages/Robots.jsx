import React from 'react'

const Robots = () => {
  const baseUrl = typeof window !== 'undefined' ? window.location.origin : 'https://merncryptoblog.com'
  
  const robotsTxt = `User-agent: *
Allow: /

# Sitemaps
Sitemap: ${baseUrl}/sitemap.xml

# Disallow admin areas
Disallow: /admin/
Disallow: /login

# Allow all other content
Allow: /blog/
Allow: /post/
Allow: /page/
Allow: /contact
Allow: /privacy
Allow: /sitemap

# Crawl delay (optional)
Crawl-delay: 1`

  // Set content type for robots.txt
  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      document.contentType = 'text/plain'
    }
  }, [])

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Robots.txt</h1>
        
        <div className="bg-gray-50 p-6 rounded-lg mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Robots.txt Information</h2>
          <p className="text-gray-600 mb-4">
            This is the robots.txt file for MernCryptoBlog. It tells search engine crawlers which pages they can access.
          </p>
        </div>

        <div className="bg-white border rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Current robots.txt content:</h3>
          <pre className="text-sm text-gray-700 overflow-x-auto whitespace-pre-wrap bg-gray-50 p-4 rounded">
            {robotsTxt}
          </pre>
        </div>

        <div className="mt-8 text-center">
          <a 
            href="/robots.txt" 
            className="btn-primary"
            target="_blank"
            rel="noopener noreferrer"
          >
            View Raw robots.txt
          </a>
        </div>
      </div>
    </div>
  )
}

export default Robots
