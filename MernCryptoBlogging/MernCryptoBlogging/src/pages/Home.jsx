import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { supabase } from '../utils/supabase'
import SEO from '../components/SEO'
import StructuredData from '../components/StructuredData'
import TestSupabase from '../components/TestSupabase'
import { ArrowRight, TrendingUp, Shield, Zap } from 'lucide-react'

const Home = () => {
  const [featuredPosts, setFeaturedPosts] = useState([])
  const [settings, setSettings] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      // Fetch featured posts
      const { data: posts, error: postsError } = await supabase
        .from('posts')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(6)

      if (postsError) throw postsError

      // Fetch site settings
      const { data: siteSettings, error: settingsError } = await supabase
        .from('settings')
        .select('*')
        .single()

      if (settingsError && settingsError.code !== 'PGRST116') throw settingsError

      setFeaturedPosts(posts || [])
      setSettings(siteSettings)
    } catch (error) {
      console.error('Error fetching data:', error)
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

  return (
    <>
      <SEO 
        title={settings?.site_name || 'MernCryptoBlog - Your Trusted Crypto News Source'}
        description={settings?.description || 'Stay updated with the latest cryptocurrency news, blockchain technology insights, and digital finance trends.'}
        keywords={settings?.keywords || 'cryptocurrency, blockchain, bitcoin, ethereum, crypto news, digital finance'}
      />
      
      <StructuredData 
        type="Organization"
        data={{
          name: settings?.site_name || 'MernCryptoBlog',
          description: settings?.description || 'Your trusted source for cryptocurrency insights and blockchain technology news'
        }}
      />
      
      <StructuredData 
        type="WebSite"
        data={{
          siteName: settings?.site_name || 'MernCryptoBlog',
          description: settings?.description || 'Your trusted source for cryptocurrency insights and blockchain technology news'
        }}
      />
      
      <div className="min-h-screen">
        <TestSupabase />
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-green-600 to-brown-600 text-white py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                {settings?.site_name || 'MernCryptoBlog'}
              </h1>
              <p className="text-xl md:text-2xl mb-8 text-green-100">
                {settings?.description || 'Your trusted source for cryptocurrency insights and blockchain technology news'}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link 
                  to="/blog" 
                  className="bg-white text-green-600 hover:bg-green-50 font-semibold py-3 px-8 rounded-lg transition-colors duration-200 flex items-center justify-center"
                >
                  Explore Our Blog
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
                <Link 
                  to="/contact" 
                  className="border-2 border-white text-white hover:bg-white hover:text-green-600 font-semibold py-3 px-8 rounded-lg transition-colors duration-200"
                >
                  Get In Touch
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Why Choose MernCryptoBlog?
              </h2>
              <p className="text-xl text-gray-600">
                Stay ahead with expert insights and analysis
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <TrendingUp className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Market Analysis</h3>
                <p className="text-gray-600">
                  In-depth analysis of cryptocurrency markets and trends
                </p>
              </div>
              
              <div className="text-center">
                <div className="bg-brown-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <Shield className="h-8 w-8 text-brown-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Security Focus</h3>
                <p className="text-gray-600">
                  Expert insights on blockchain security and best practices
                </p>
              </div>
              
              <div className="text-center">
                <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <Zap className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Latest News</h3>
                <p className="text-gray-600">
                  Breaking news and updates from the crypto world
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Posts */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">
              Featured Articles
            </h2>
            
            {featuredPosts.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">No posts available yet.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {featuredPosts.map((post) => (
                  <article key={post.id} className="card hover:shadow-lg transition-shadow duration-200">
                    {post.image_url && (
                      <img 
                        src={post.image_url} 
                        alt={post.title}
                        className="w-full h-48 object-cover rounded-lg mb-4"
                      />
                    )}
                    <div className="mb-2">
                      <span className="inline-block bg-green-100 text-green-800 text-sm font-medium px-2.5 py-0.5 rounded">
                        {post.category}
                      </span>
                    </div>
                    <h3 className="text-xl font-semibold mb-3 text-gray-900">
                      <Link 
                        to={`/post/${post.id}`}
                        className="hover:text-green-600 transition-colors"
                      >
                        {post.title}
                      </Link>
                    </h3>
                    <p className="text-gray-600 mb-4 line-clamp-3">
                      {post.content.substring(0, 150)}...
                    </p>
                    <div className="flex items-center justify-between">
                      <time className="text-sm text-gray-500">
                        {new Date(post.created_at).toLocaleDateString()}
                      </time>
                      <Link 
                        to={`/post/${post.id}`}
                        className="text-green-600 hover:text-green-700 font-medium"
                      >
                        Read More →
                      </Link>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-16 bg-white">
          <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold mb-6 text-gray-900">
              Stay Updated with Crypto News
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Get the latest insights on cryptocurrency, blockchain technology, and digital finance.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                to="/blog" 
                className="btn-primary"
              >
                Read Our Blog
              </Link>
              <Link 
                to="/contact" 
                className="btn-outline"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}

export default Home
