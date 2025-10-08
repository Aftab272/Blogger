import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { supabase } from '../utils/supabase'
import SEO from '../components/SEO'
import StructuredData from '../components/StructuredData'
import { Calendar, Tag, ArrowLeft, Share2, BookOpen } from 'lucide-react'

const Post = () => {
  const { id } = useParams()
  const [post, setPost] = useState(null)
  const [relatedPosts, setRelatedPosts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (id) {
      fetchPost()
    }
  }, [id])

  const fetchPost = async () => {
    try {
      // Fetch the specific post
      const { data: postData, error: postError } = await supabase
        .from('posts')
        .select('*')
        .eq('id', id)
        .single()

      if (postError) throw postError

      setPost(postData)

      // Fetch related posts (same category, excluding current post)
      if (postData?.category) {
        const { data: relatedData, error: relatedError } = await supabase
          .from('posts')
          .select('*')
          .eq('category', postData.category)
          .neq('id', id)
          .order('created_at', { ascending: false })
          .limit(3)

        if (!relatedError) {
          setRelatedPosts(relatedData || [])
        }
      }
    } catch (error) {
      console.error('Error fetching post:', error)
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

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Post Not Found</h1>
          <p className="text-gray-600 mb-8">The post you're looking for doesn't exist.</p>
          <Link to="/blog" className="btn-primary">
            Back to Blog
          </Link>
        </div>
      </div>
    )
  }

  return (
    <>
      <SEO 
        title={post.seo_title || post.title}
        description={post.seo_description || post.content.substring(0, 160)}
        keywords={post.tags || post.category}
        image={post.image_url}
        type="article"
        publishedTime={post.created_at}
        modifiedTime={post.updated_at || post.created_at}
        author="MernCryptoBlog"
        section={post.category}
        tags={post.tags ? post.tags.split(',').map(tag => tag.trim()) : []}
      />
      
      <StructuredData 
        type="BlogPosting"
        data={{
          title: post.title,
          description: post.seo_description || post.content.substring(0, 160),
          image: post.image_url,
          datePublished: post.created_at,
          dateModified: post.updated_at || post.created_at,
          url: `${window.location.origin}/post/${post.id}`,
          category: post.category,
          keywords: post.tags
        }}
      />
      
      <StructuredData 
        type="BreadcrumbList"
        data={{
          items: [
            { name: 'Home', url: `${window.location.origin}/` },
            { name: 'Blog', url: `${window.location.origin}/blog` },
            { name: post.title, url: `${window.location.origin}/post/${post.id}` }
          ]
        }}
      />
      
      <div className="min-h-screen bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Breadcrumb */}
          <nav className="mb-8">
            <ol className="flex items-center space-x-2 text-sm text-gray-500">
              <li><Link to="/" className="hover:text-green-600">Home</Link></li>
              <li>/</li>
              <li><Link to="/blog" className="hover:text-green-600">Blog</Link></li>
              <li>/</li>
              <li className="text-gray-900">{post.title}</li>
            </ol>
          </nav>

          {/* Article Header */}
          <header className="mb-8">
            <div className="mb-4">
              <span className="inline-block bg-green-100 text-green-800 text-sm font-medium px-3 py-1 rounded-full flex items-center w-fit">
                <Tag className="h-4 w-4 mr-1" />
                {post.category}
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              {post.title}
            </h1>
            <div className="flex items-center text-gray-600 mb-6">
              <Calendar className="h-5 w-5 mr-2" />
              <time className="text-lg">
                {new Date(post.created_at).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </time>
            </div>
            {post.image_url && (
              <div className="relative">
                <img 
                  src={post.image_url} 
                  alt={post.title}
                  className="w-full h-64 md:h-96 object-cover rounded-lg shadow-lg"
                />
                <div className="absolute top-4 right-4">
                  <button className="bg-white bg-opacity-90 hover:bg-opacity-100 p-2 rounded-full shadow-md transition-all">
                    <Share2 className="h-5 w-5 text-gray-700" />
                  </button>
                </div>
              </div>
            )}
          </header>

          {/* Article Content */}
          <article className="prose prose-lg max-w-none">
            <div className="text-gray-800 leading-relaxed whitespace-pre-wrap">
              {post.content}
            </div>
          </article>

          {/* Tags */}
          {post.tags && (
            <div className="mt-8 pt-8 border-t border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {post.tags.split(',').map((tag, index) => (
                  <span 
                    key={index}
                    className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm"
                  >
                    {tag.trim()}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Related Posts */}
          {relatedPosts.length > 0 && (
            <section className="mt-12 pt-8 border-t border-gray-200">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Related Articles</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {relatedPosts.map((relatedPost) => (
                  <article key={relatedPost.id} className="card">
                    {relatedPost.image_url && (
                      <img 
                        src={relatedPost.image_url} 
                        alt={relatedPost.title}
                        className="w-full h-32 object-cover rounded-lg mb-3"
                      />
                    )}
                    <h4 className="font-semibold text-gray-900 mb-2">
                      <Link 
                        to={`/post/${relatedPost.id}`}
                        className="hover:text-green-600 transition-colors"
                      >
                        {relatedPost.title}
                      </Link>
                    </h4>
                    <p className="text-gray-600 text-sm line-clamp-2">
                      {relatedPost.content.substring(0, 100)}...
                    </p>
                  </article>
                ))}
              </div>
            </section>
          )}

          {/* Back to Blog */}
          <div className="mt-12 text-center">
            <Link to="/blog" className="btn-primary flex items-center justify-center w-fit mx-auto">
              <ArrowLeft className="h-5 w-5 mr-2" />
              Back to Blog
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}

export default Post
