import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import CustomHelmetProvider from './components/HelmetProvider'
import Layout from './components/Layout'
import Home from './pages/Home'
import Blog from './pages/Blog'
import Post from './pages/Post'
import Page from './pages/Page'
import Contact from './pages/Contact'
import Privacy from './pages/Privacy'
import Sitemap from './pages/Sitemap'
import SitemapXML from './pages/SitemapXML'
import Robots from './pages/Robots'
import Admin from './pages/Admin'
import Login from './pages/Login'
import ProtectedRoute from './components/ProtectedRoute'

function App() {
  return (
    <CustomHelmetProvider>
      <AuthProvider>
        <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="blog" element={<Blog />} />
            <Route path="post/:id" element={<Post />} />
            <Route path="page/:slug" element={<Page />} />
            <Route path="contact" element={<Contact />} />
            <Route path="privacy" element={<Privacy />} />
            <Route path="sitemap" element={<Sitemap />} />
            <Route path="sitemap.xml" element={<SitemapXML />} />
            <Route path="robots.txt" element={<Robots />} />
          </Route>
          
          {/* Auth Routes */}
          <Route path="/login" element={<Login />} />
          
          {/* Protected Admin Routes */}
          <Route path="/admin" element={
            <ProtectedRoute>
              <Admin />
            </ProtectedRoute>
          } />
        </Routes>
        </Router>
      </AuthProvider>
    </CustomHelmetProvider>
  )
}

export default App
