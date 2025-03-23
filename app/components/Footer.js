'use client'

import Link from 'next/link'

export default function Footer() {
  const currentYear = new Date().getFullYear()
  
  return (
    <footer className="bg-gray-900 dark:bg-gray-950 text-white py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* About Section */}
          <div>
            <h3 className="text-lg font-semibold mb-4">About</h3>
            <p className="text-gray-300 text-sm">
              Malayalam Islamic History is a platform dedicated to sharing Islamic stories and history
              in the Malayalam language, making knowledge accessible for all.
            </p>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link 
                  href="/quran-stories" 
                  className="text-gray-300 hover:text-primary text-sm"
                >
                  Quran Stories
                </Link>
              </li>
              <li>
                <Link 
                  href="/prophet-stories" 
                  className="text-gray-300 hover:text-primary text-sm"
                >
                  Prophet Stories
                </Link>
              </li>
              <li>
                <Link 
                  href="/khaleefa-stories" 
                  className="text-gray-300 hover:text-primary text-sm"
                >
                  Khaleefa Stories
                </Link>
              </li>
              <li>
                <Link 
                  href="/swahabi-stories" 
                  className="text-gray-300 hover:text-primary text-sm"
                >
                  Swahabi Stories
                </Link>
              </li>
              <li>
                <Link 
                  href="/contact" 
                  className="text-gray-300 hover:text-primary text-sm"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>Email: info@islamichistory.in</li>
              <li>Phone: +91 854 747 2775</li>
              <li className="pt-4">
                <Link 
                  href="/contact" 
                  className="bg-primary text-white px-4 py-2 rounded hover:bg-primary-dark transition-colors"
                >
                  Get in Touch
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        {/* Copyright */}
        <div className="border-t border-gray-800 mt-8 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-400">
            &copy; {currentYear} DHIL Tech. All rights reserved.
          </p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <Link href="/privacy-policy" className="text-xs text-gray-400 hover:text-primary">
              Privacy Policy
            </Link>
            <Link href="/terms-of-service" className="text-xs text-gray-400 hover:text-primary">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
} 