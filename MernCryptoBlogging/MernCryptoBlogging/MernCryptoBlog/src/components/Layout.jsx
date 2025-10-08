import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from './Header'
import Footer from './Footer'
import SEO from './SEO'
import PerformanceOptimizer from './PerformanceOptimizer'

const Layout = () => {
  return (
    <>
      <SEO />
      <PerformanceOptimizer />
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow">
          <Outlet />
        </main>
        <Footer />
      </div>
    </>
  )
}

export default Layout
