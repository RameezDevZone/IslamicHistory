import { metadata } from './metadata'
import RootLayout from './layout'

export { metadata }

export default function ServerLayout({ children }) {
  return <RootLayout>{children}</RootLayout>
} 