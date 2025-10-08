import React, { useState, useEffect } from 'react'
import { supabase } from '../utils/supabase'
import SEO from '../components/SEO'

const Privacy = () => {
  const [page, setPage] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchPrivacyPage()
  }, [])

  const fetchPrivacyPage = async () => {
    try {
      const { data, error } = await supabase
        .from('pages')
        .select('*')
        .eq('slug', 'privacy-policy')
        .single()

      if (error && error.code !== 'PGRST116') {
        console.error('Error fetching privacy page:', error)
      }

      setPage(data)
    } catch (error) {
      console.error('Error fetching privacy page:', error)
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
        title={page?.seo_title || "Privacy Policy - MernCryptoBlog"}
        description={page?.seo_description || "Learn about how we collect, use, and protect your personal information on MernCryptoBlog."}
        keywords="privacy policy, data protection, user privacy"
      />
      
      <div className="min-h-screen bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {page ? (
            <>
              <header className="mb-8">
                <h1 className="text-4xl font-bold text-gray-900 mb-6">{page.title}</h1>
                <p className="text-gray-600">
                  Last updated: {new Date(page.created_at).toLocaleDateString()}
                </p>
              </header>

              <article className="prose prose-lg max-w-none">
                <div className="text-gray-800 leading-relaxed whitespace-pre-wrap">
                  {page.content}
                </div>
              </article>
            </>
          ) : (
            <div className="text-center">
              <h1 className="text-4xl font-bold text-gray-900 mb-6">Privacy Policy</h1>
              <p className="text-gray-600 mb-8">
                Privacy policy content will be loaded from the database. Please create a page with slug 'privacy-policy' in the admin panel.
              </p>
              <div className="bg-gray-50 p-6 rounded-lg">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Default Privacy Policy</h2>
                <div className="text-left space-y-4 text-gray-700">
                  <p>
                    This privacy policy outlines how MernCryptoBlog collects, uses, and protects your personal information.
                  </p>
                  <p>
                    We are committed to protecting your privacy and ensuring the security of your personal data.
                  </p>
                  <p>
                    For questions about this privacy policy, please contact us through our contact form.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export default Privacy
