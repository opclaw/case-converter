'use client'

import { useState } from 'react'
import styles from './page.module.css'

type CaseType = 'upper' | 'lower' | 'title' | 'sentence' | 'camel' | 'snake' | 'kebab' | 'alternating'

export default function Home() {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [copied, setCopied] = useState(false)

  const convertCase = (type: CaseType) => {
    if (!input) return

    let result = ''
    switch (type) {
      case 'upper':
        result = input.toUpperCase()
        break
      case 'lower':
        result = input.toLowerCase()
        break
      case 'title':
        result = input.toLowerCase().replace(/\b\w/g, l => l.toUpperCase())
        break
      case 'sentence':
        result = input.toLowerCase().replace(/(^|\.|\!|\?)\s*\w/g, l => l.toUpperCase())
        break
      case 'camel':
        result = input.toLowerCase().replace(/[^a-zA-Z0-9]+(.)/g, (m, chr) => chr.toUpperCase())
        break
      case 'snake':
        result = input.toLowerCase().replace(/\s+/g, '_').replace(/[^a-z0-9_]/g, '')
        break
      case 'kebab':
        result = input.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')
        break
      case 'alternating':
        result = input.split('').map((c, i) => i % 2 === 0 ? c.toLowerCase() : c.toUpperCase()).join('')
        break
    }
    setOutput(result)
  }

  const copyText = () => {
    navigator.clipboard.writeText(output)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const buttons: { type: CaseType; label: string }[] = [
    { type: 'upper', label: 'UPPER CASE' },
    { type: 'lower', label: 'lower case' },
    { type: 'title', label: 'Title Case' },
    { type: 'sentence', label: 'Sentence case' },
    { type: 'camel', label: 'camelCase' },
    { type: 'snake', label: 'snake_case' },
    { type: 'kebab', label: 'kebab-case' },
    { type: 'alternating', label: 'aLtErNaTiNg' },
  ]

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>🔄 Case Converter</h1>
      
      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Enter your text here..."
        className={styles.input}
      />

      <div className={styles.buttons}>
        {buttons.map(({ type, label }) => (
          <button
            key={type}
            onClick={() => convertCase(type)}
            className={styles.caseBtn}
          >
            {label}
          </button>
        ))}
      </div>

      {output && (
        <>
          <textarea
            value={output}
            readOnly
            className={styles.output}
          />
          <button onClick={copyText} className={styles.copyBtn}>
            {copied ? '✓ Copied!' : '📋 Copy Result'}
          </button>
        </>
      )}
    </div>
  )
}