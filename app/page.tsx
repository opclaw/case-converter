'use client'

import { useState, useCallback } from 'react'

const convertTypes = [
  { id: 'uppercase', label: 'UPPERCASE', convert: (s: string) => s.toUpperCase() },
  { id: 'lowercase', label: 'lowercase', convert: (s: string) => s.toLowerCase() },
  { id: 'title', label: 'Title Case', convert: (s: string) => s.replace(/\w\S*/g, (t) => t.charAt(0).toUpperCase() + t.substr(1).toLowerCase()) },
  { id: 'sentence', label: 'Sentence case', convert: (s: string) => s.toLowerCase().replace(/(^\s*\w|[.!?]\s*\w)/g, (c) => c.toUpperCase()) },
  { id: 'camel', label: 'camelCase', convert: (s: string) => s.replace(/\w\S*/g, (t, i) => i ? t.charAt(0).toUpperCase() + t.substr(1).toLowerCase() : t.toLowerCase()) },
  { id: 'snake', label: 'snake_case', convert: (s: string) => s.replace(/\s+/g, '_').toLowerCase() },
  { id: 'kebab', label: 'kebab-case', convert: (s: string) => s.replace(/\s+/g, '-').toLowerCase() },
]

export default function Home() {
  const [input, setInput] = useState('')
  const [copied, setCopied] = useState<string | null>(null)

  const copyToClipboard = useCallback((value: string, id: string) => {
    navigator.clipboard.writeText(value)
    setCopied(id)
    setTimeout(() => setCopied(null), 2000)
  }, [])

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: 'var(--neutral-50)' }}>
      {/* Header */}
      <header className="sticky top-0 z-50" style={{ 
        backgroundColor: 'var(--color-surface)',
        borderBottom: '1px solid var(--color-border)',
        boxShadow: 'var(--shadow-sm)'
      }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl logo-gradient flex items-center justify-center text-2xl text-white shadow-lg">
                Aa
              </div>
              <div>
                <span className="text-xl font-bold" style={{ color: 'var(--color-text-primary)' }}>
                  Case Converter
                </span>
                <p className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>
                  Change text case
                </p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="hero">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl logo-gradient text-3xl text-white shadow-xl mb-6">
              Aa
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4" style={{ color: 'var(--color-text-primary)' }}>
              Case Converter
            </h1>
            <p className="text-lg md:text-xl" style={{ color: 'var(--color-text-secondary)' }}>
              Convert text between different case formats instantly.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="flex-1 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        <div className="card p-6 md:p-8">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Enter text to convert..."
            className="textarea mb-6"
            style={{ height: '160px' }}
          />

          <div className="space-y-3">
            {convertTypes.map(({ id, label, convert }) => {
              const result = input ? convert(input) : ''
              return (
                <div 
                  key={id} 
                  className="card p-4 flex items-center justify-between"
                  style={{ 
                    backgroundColor: 'var(--neutral-50)',
                    border: '1px solid var(--color-border)'
                  }}
                >
                  <div className="flex-1 min-w-0">
                    <div 
                      className="text-xs font-medium mb-1"
                      style={{ color: 'var(--color-text-muted)' }}
                    >
                      {label}
                    </div>
                    <div 
                      className="font-mono text-sm truncate"
                      style={{ color: 'var(--color-text-primary)' }}
                    >
                      {result || '—'}
                    </div>
                  </div>
                  {result && (
                    <button
                      onClick={() => copyToClipboard(result, id)}
                      className={`btn-copy ml-4 whitespace-nowrap ${copied === id ? 'copied' : ''}`}
                    >
                      {copied === id ? '✓ Copied!' : '📋 Copy'}
                    </button>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="footer">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-sm">© 2024 SmartOK Tools. Free online tools.</p>
        </div>
      </footer>
    </div>
  )
}
