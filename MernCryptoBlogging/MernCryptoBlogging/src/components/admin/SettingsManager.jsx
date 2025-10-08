import React, { useState, useEffect } from 'react'
import { supabase } from '../../utils/supabase'
import { Save } from 'lucide-react'

const SettingsManager = () => {
  const [settings, setSettings] = useState({
    site_name: '',
    description: '',
    keywords: '',
    favicon_url: ''
  })
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState('')

  useEffect(() => {
    fetchSettings()
  }, [])

  const fetchSettings = async () => {
    try {
      const { data, error } = await supabase
        .from('settings')
        .select('*')
        .single()

      if (error && error.code !== 'PGRST116') throw error

      if (data) {
        setSettings(data)
      }
    } catch (error) {
      console.error('Error fetching settings:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSaving(true)
    setMessage('')

    try {
      // Check if settings exist
      const { data: existingSettings } = await supabase
        .from('settings')
        .select('id')
        .single()

      if (existingSettings) {
        // Update existing settings
        const { error } = await supabase
          .from('settings')
          .update(settings)
          .eq('id', existingSettings.id)

        if (error) throw error
      } else {
        // Create new settings
        const { error } = await supabase
          .from('settings')
          .insert([settings])

        if (error) throw error
      }

      setMessage('Settings saved successfully!')
      setTimeout(() => setMessage(''), 3000)
    } catch (error) {
      console.error('Error saving settings:', error)
      setMessage('Error saving settings. Please try again.')
    } finally {
      setSaving(false)
    }
  }

  const handleChange = (e) => {
    setSettings({
      ...settings,
      [e.target.name]: e.target.value
    })
  }

  if (loading) {
    return (
      <div className="p-6">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Site Settings</h2>
        <p className="text-gray-600 mt-2">
          Configure your site's basic information and SEO settings.
        </p>
      </div>

      {message && (
        <div className={`mb-6 p-4 rounded-md ${
          message.includes('successfully') 
            ? 'bg-green-100 border border-green-400 text-green-700'
            : 'bg-red-100 border border-red-400 text-red-700'
        }`}>
          {message}
        </div>
      )}

      <div className="bg-white rounded-lg shadow p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Site Name *
            </label>
            <input
              type="text"
              name="site_name"
              value={settings.site_name}
              onChange={handleChange}
              required
              className="input-field"
              placeholder="MernCryptoBlog"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Favicon URL
            </label>
            <input
              type="url"
              name="favicon_url"
              value={settings.favicon_url}
              onChange={handleChange}
              className="input-field"
              placeholder="https://example.com/favicon.ico"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Site Description *
          </label>
          <textarea
            name="description"
            value={settings.description}
            onChange={handleChange}
            required
            rows={3}
            className="input-field"
            placeholder="Your site description for SEO and social media..."
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Keywords
          </label>
          <input
            type="text"
            name="keywords"
            value={settings.keywords}
            onChange={handleChange}
            className="input-field"
            placeholder="cryptocurrency, blockchain, bitcoin, ethereum, crypto news"
          />
          <p className="text-sm text-gray-500 mt-1">
            Comma-separated keywords for SEO
          </p>
        </div>

        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="text-lg font-medium text-gray-900 mb-3">Preview</h3>
          <div className="space-y-2">
            <div>
              <strong>Title:</strong> {settings.site_name || 'Site Name'}
            </div>
            <div>
              <strong>Description:</strong> {settings.description || 'Site description'}
            </div>
            <div>
              <strong>Keywords:</strong> {settings.keywords || 'No keywords set'}
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={saving}
            className="btn-primary flex items-center disabled:opacity-50"
          >
            <Save className="h-5 w-5 mr-2" />
            {saving ? 'Saving...' : 'Save Settings'}
          </button>
        </div>
        </form>
      </div>
    </div>
  )
}

export default SettingsManager
