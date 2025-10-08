import React from 'react'
import { HelmetProvider } from 'react-helmet-async'

const CustomHelmetProvider = ({ children }) => {
  return (
    <HelmetProvider>
      {children}
    </HelmetProvider>
  )
}

export default CustomHelmetProvider
