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
    <div className="min-h-screen flex flex-col bg-slate-50">
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-teal-500 to-cyan-600 flex items-center justify-center text-2xl shadow-lg">Aa</div>
              <div>
                <h1 className="text-xl font-bold text-slate-900">Case Converter</h1>
                <p className="text-sm text-slate-500">Change text case</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <section className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-teal-500 to-cyan-600 text-3xl shadow-xl mb-6">Aa</div>
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">Case Converter</h2>
            <p className="text-lg md:text-xl text-slate-600">Convert text between different case formats instantly.</p>
          </div>
        </div>
      </section>

      <main className="flex-1 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        <div className="bg-white rounded-2xl border border-slate-200 shadow-lg p-6 md:p-8">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Enter text to convert..."
            className="w-full h-40 textarea mb-6"
          />

          <div className="space-y-3">
            {convertTypes.map(({ id, label, convert }) => {
              const result = input ? convert(input) : ''
              return (
                <div key={id} className="bg-slate-50 rounded-xl p-4 border border-slate-200 flex items-center justify-between">
                  <div className="flex-1 min-w-0">
                    <div className="text-xs font-medium text-slate-500 mb-1">{label}</div>
                    <div className="font-mono text-sm text-slate-900 truncate">{result || '—'}</div>
                  </div>
                  {result && (
                    <button
                      onClick={() => copyToClipboard(result, id)}
                      className="ml-4 text-xs font-medium text-teal-600 hover:text-teal-700 whitespace-nowrap"
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

      <footer className="bg-slate-900 text-slate-400 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-sm">© 2024 SmartOK Tools. Free online tools.</p>
        </div>
      </footer>
    </div>
  )
}
