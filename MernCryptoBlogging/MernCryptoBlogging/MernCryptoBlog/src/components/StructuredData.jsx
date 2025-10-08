import React from 'react'
import { Helmet } from 'react-helmet-async'

const StructuredData = ({ 
  type = 'WebSite',
  data = {}
}) => {
  const getStructuredData = () => {
    const baseUrl = typeof window !== 'undefined' ? window.location.origin : 'https://merncryptoblog.com'
    
    switch (type) {
      case 'WebSite':
        return {
          "@context": "https://schema.org",
          "@type": "WebSite",
          "name": data.siteName || "MernCryptoBlog",
          "description": data.description || "Your trusted source for cryptocurrency insights and blockchain technology news",
          "url": baseUrl,
          "potentialAction": {
            "@type": "SearchAction",
            "target": {
              "@type": "EntryPoint",
              "urlTemplate": `${baseUrl}/blog?search={search_term_string}`
            },
            "query-input": "required name=search_term_string"
          }
        }
      
      case 'BlogPosting':
        return {
          "@context": "https://schema.org",
          "@type": "BlogPosting",
          "headline": data.title,
          "description": data.description,
          "image": data.image,
          "author": {
            "@type": "Organization",
            "name": "MernCryptoBlog"
          },
          "publisher": {
            "@type": "Organization",
            "name": "MernCryptoBlog",
            "logo": {
              "@type": "ImageObject",
              "url": `${baseUrl}/logo.png`
            }
          },
          "datePublished": data.datePublished,
          "dateModified": data.dateModified || data.datePublished,
          "mainEntityOfPage": {
            "@type": "WebPage",
            "@id": data.url
          },
          "articleSection": data.category,
          "keywords": data.keywords
        }
      
      case 'BreadcrumbList':
        return {
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          "itemListElement": data.items.map((item, index) => ({
            "@type": "ListItem",
            "position": index + 1,
            "name": item.name,
            "item": item.url
          }))
        }
      
      case 'Organization':
        return {
          "@context": "https://schema.org",
          "@type": "Organization",
          "name": data.name || "MernCryptoBlog",
          "description": data.description || "Cryptocurrency and blockchain news and insights",
          "url": baseUrl,
          "logo": `${baseUrl}/logo.png`,
          "contactPoint": {
            "@type": "ContactPoint",
            "telephone": "+1-555-123-4567",
            "contactType": "customer service",
            "email": "contact@merncryptoblog.com"
          },
          "sameAs": [
            "https://twitter.com/merncryptoblog",
            "https://linkedin.com/company/merncryptoblog"
          ]
        }
      
      default:
        return null
    }
  }

  const structuredData = getStructuredData()

  if (!structuredData) return null

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(structuredData)}
      </script>
    </Helmet>
  )
}

export default StructuredData
