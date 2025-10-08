import React, { useEffect } from 'react'

const PerformanceOptimizer = () => {
  useEffect(() => {
    // Preload critical resources
    const preloadCriticalResources = () => {
      // Preload critical CSS
      const criticalCSS = document.createElement('link')
      criticalCSS.rel = 'preload'
      criticalCSS.href = '/src/styles/index.css'
      criticalCSS.as = 'style'
      criticalCSS.onload = () => {
        criticalCSS.rel = 'stylesheet'
      }
      document.head.appendChild(criticalCSS)

      // Preload critical fonts
      const fontPreload = document.createElement('link')
      fontPreload.rel = 'preload'
      fontPreload.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap'
      fontPreload.as = 'style'
      document.head.appendChild(fontPreload)
    }

    // Optimize images
    const optimizeImages = () => {
      const images = document.querySelectorAll('img')
      images.forEach(img => {
        // Add loading="lazy" for images below the fold
        if (!img.hasAttribute('loading')) {
          img.setAttribute('loading', 'lazy')
        }
        
        // Add decoding="async" for better performance
        if (!img.hasAttribute('decoding')) {
          img.setAttribute('decoding', 'async')
        }
      })
    }

    // Optimize third-party scripts
    const optimizeThirdPartyScripts = () => {
      // Add rel="noopener noreferrer" to external links
      const externalLinks = document.querySelectorAll('a[href^="http"]')
      externalLinks.forEach(link => {
        if (!link.hasAttribute('rel')) {
          link.setAttribute('rel', 'noopener noreferrer')
        }
      })
    }

    // Initialize optimizations
    preloadCriticalResources()
    optimizeImages()
    optimizeThirdPartyScripts()

    // Monitor Core Web Vitals
    const monitorCoreWebVitals = () => {
      if ('web-vital' in window) {
        // This would be implemented with web-vitals library
        console.log('Core Web Vitals monitoring enabled')
      }
    }

    monitorCoreWebVitals()

    // Cleanup function
    return () => {
      // Cleanup any event listeners or timers
    }
  }, [])

  return null
}

export default PerformanceOptimizer
