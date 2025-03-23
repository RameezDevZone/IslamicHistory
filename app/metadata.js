export const metadata = {
  title: 'Malayalam Islamic History',
  description: 'Explore the rich Islamic history through stories from Quran, Prophet, and Khaleefa',
  keywords: 'Islamic stories, Quran stories, Prophet Muhammad, Khaleefa stories, Islamic history, Malayalam, Muslim history, Islam',
  generator: 'Next.js',
  applicationName: 'Malayalam Islamic History',
  referrer: 'origin-when-cross-origin',
  authors: [
    { name: 'Islamic History Team' }
  ],
  creator: 'Islamic History Team',
  publisher: 'Islamic History Team',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://www.islamichistory.in'),
  alternates: {
    canonical: '/',
    languages: {
      'en-US': '/en-US',
      'ml-IN': '/ml-IN',
    },
  },
  openGraph: {
    title: 'Malayalam Islamic History',
    description: 'Explore the rich Islamic history through stories from Quran, Prophet, and Khaleefa',
    url: 'https://www.islamichistory.in',
    siteName: 'Islamic History',
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
      }
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Malayalam Islamic History',
    description: 'Explore the rich Islamic history through stories from Quran, Prophet, and Khaleefa',
    images: ['/images/og-image.jpg'],
    creator: '@islamichistory',
    site: '@islamichistory',
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/favicon.ico',
    other: {
      rel: 'apple-touch-icon',
      url: '/favicon.ico',
    },
  },
  verification: {
    google: 'google-site-verification-code',
    yandex: 'yandex-verification-code',
    bing: 'bing-verification-code',
  },
  robots: {
    index: true,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export const viewport = {
  colorScheme: 'dark light',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#000000' },
  ],
} 