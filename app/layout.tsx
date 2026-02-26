import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  metadataBase: new URL('https://case-converter.vercel.app'),
  alternates: {
    canonical: 'https://case-converter.vercel.app',
  },
  title: 'Case Converter — Change Text Case | Free Online Tool',
  description: 'Convert text between different case formats: uppercase, lowercase, title case, sentence case, and more.',
  keywords: ['case converter', 'text case', 'uppercase', 'lowercase', 'title case', 'camel case'],
  authors: [{ name: 'SmartOK Tools' }],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://case-converter.vercel.app',
    siteName: 'Case Converter',
    title: 'Case Converter — Change Text Case',
    description: 'Convert text between different case formats.',
    images: [{
      url: '/og-image.svg',
      width: 1200,
      height: 630,
      alt: 'Case Converter - Change Text Case',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Case Converter',
    description: 'Convert text between different case formats.',
    images: ['/og-image.svg'],
  },
  robots: { index: true, follow: true },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'SoftwareApplication',
              name: 'Case Converter',
              applicationCategory: 'UtilitiesApplication',
              operatingSystem: 'Any',
              offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
              featureList: 'Uppercase, Lowercase, Title Case, Sentence Case, Camel Case, Snake Case',
            })
          }}
        />
      </head>
      <body className="min-h-screen bg-slate-50">{children}</body>
    </html>
  )
}
