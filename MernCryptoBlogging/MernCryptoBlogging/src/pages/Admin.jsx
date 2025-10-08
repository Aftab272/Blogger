import React, { useState } from 'react'
import SEO from '../components/SEO'
import AdminLayout from '../components/admin/AdminLayout'
import Dashboard from '../components/admin/Dashboard'
import PostsManager from '../components/admin/PostsManager'
import PagesManager from '../components/admin/PagesManager'
import SettingsManager from '../components/admin/SettingsManager'

const Admin = () => {
  const [activeTab, setActiveTab] = useState('dashboard')

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />
      case 'posts':
        return <PostsManager />
      case 'pages':
        return <PagesManager />
      case 'settings':
        return <SettingsManager />
      default:
        return <Dashboard />
    }
  }

  return (
    <>
      <SEO 
        title="Admin Dashboard - MernCryptoBlog"
        description="Manage your blog content and settings"
        keywords="admin dashboard, content management"
      />
      
      <AdminLayout activeTab={activeTab} setActiveTab={setActiveTab}>
        {renderContent()}
      </AdminLayout>
    </>
  )
}

export default Admin
