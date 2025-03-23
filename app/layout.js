import { metadata } from './metadata'
import ClientLayout from './ClientLayout'
import Script from 'next/script'

export { metadata }

export default function RootLayout({ children }) {
  return (
    <>
      <ClientLayout>{children}</ClientLayout>
      
      {/* Structured Data for SEO */}
      <Script
        id="schema-org"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebSite',
            name: 'Malayalam Islamic History',
            url: 'https://www.islamichistory.in',
            potentialAction: {
              '@type': 'SearchAction',
              target: {
                '@type': 'EntryPoint',
                urlTemplate: 'https://www.islamichistory.in/search?q={search_term_string}'
              },
              'query-input': 'required name=search_term_string'
            },
            sameAs: [
              'https://facebook.com/malayalamislamic',
              'https://twitter.com/islamichistory',
              'https://instagram.com/malayalamislamic'
            ]
          })
        }}
      />
    </>
  )
} 