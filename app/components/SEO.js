'use client'

import { useEffect } from 'react'
import Head from 'next/head'
import Script from 'next/script'

export default function SEO({ 
  title, 
  description, 
  keywords = '', 
  ogImage = '/images/islamic_history_logo.png',
  ogType = 'article',
  ogUrl = '',
  publishedDate = '',
  modifiedDate = '',
  author = 'Islamic History Team',
  category = 'Islamic Stories',
  tags = []
}) {
  // Prepare the full title with site name
  const fullTitle = title ? `${title} | Malayalam Islamic History` : 'Malayalam Islamic History'
  
  // Build the canonical URL
  const baseUrl = 'https://malayalamislamic.org'
  const canonicalUrl = ogUrl ? `${baseUrl}${ogUrl}` : baseUrl
  
  // Create schema.org structured data
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': ogType === 'article' ? 'Article' : 'WebPage',
    headline: title,
    description: description,
    image: ogImage.startsWith('http') ? ogImage : `${baseUrl}${ogImage}`,
    author: {
      '@type': 'Person',
      name: author
    },
    publisher: {
      '@type': 'Organization',
      name: 'Malayalam Islamic History',
      logo: {
        '@type': 'ImageObject',
        url: `${baseUrl}/images/islamic_history_logo.png`
      }
    },
    url: canonicalUrl,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': canonicalUrl
    }
  }
  
  // Add dates if provided
  if (publishedDate) {
    structuredData.datePublished = publishedDate
  }
  if (modifiedDate) {
    structuredData.dateModified = modifiedDate
  } else if (publishedDate) {
    structuredData.dateModified = publishedDate
  }
  
  // Add keywords and tags
  const allKeywords = [
    ...tags,
    ...keywords.split(',').map(k => k.trim())
  ].filter(Boolean).join(', ')
  
  return (
    <>
      <Script
        id="page-structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData)
        }}
      />
      
      {/* Additional meta tags for SEO that aren't handled by Next.js metadata */}
      <script
        dangerouslySetInnerHTML={{
          __html: `
            document.documentElement.lang = 'en';
            document.title = "${fullTitle}";
            
            // Update meta tags
            const metaTags = {
              'description': "${description}",
              'keywords': "${allKeywords}",
              'author': "${author}",
              'og:title': "${title}",
              'og:description': "${description}",
              'og:image': "${ogImage}",
              'og:url': "${canonicalUrl}",
              'og:type': "${ogType}",
              'twitter:title': "${title}",
              'twitter:description': "${description}",
              'twitter:image': "${ogImage}",
              'twitter:card': "summary_large_image"
            };
            
            // Update existing meta tags or create new ones
            Object.entries(metaTags).forEach(([name, content]) => {
              if (!content) return;
              
              // Handle og: and twitter: tags differently
              if (name.startsWith('og:') || name.startsWith('twitter:')) {
                const property = name;
                let meta = document.querySelector(\`meta[property="\${property}"]\`);
                if (!meta) {
                  meta = document.createElement('meta');
                  meta.setAttribute('property', property);
                  document.head.appendChild(meta);
                }
                meta.setAttribute('content', content);
              } else {
                let meta = document.querySelector(\`meta[name="\${name}"]\`);
                if (!meta) {
                  meta = document.createElement('meta');
                  meta.setAttribute('name', name);
                  document.head.appendChild(meta);
                }
                meta.setAttribute('content', content);
              }
            });
            
            // Add canonical link
            let canonicalLink = document.querySelector('link[rel="canonical"]');
            if (!canonicalLink) {
              canonicalLink = document.createElement('link');
              canonicalLink.setAttribute('rel', 'canonical');
              document.head.appendChild(canonicalLink);
            }
            canonicalLink.setAttribute('href', "${canonicalUrl}");
          `
        }}
      />
    </>
  )
} 