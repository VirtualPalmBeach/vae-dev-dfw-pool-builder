import Link from 'next/link'
import { Container } from '@/components/Container'

export function Header() {
  return (
    <header className="sticky top-0 z-50 bg-white shadow-md">
      <Container>
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <Link href="/" className="text-2xl font-bold tracking-tight text-blue-600">
              DFW Pool Builder
            </Link>
          </div>
          
          <nav className="hidden md:block">
            <ul className="flex space-x-8">
              <li>
                <Link href="/" className="text-gray-700 hover:text-blue-600">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-gray-700 hover:text-blue-600">
                  Services
                </Link>
              </li>
              <li>
                <Link href="/projects" className="text-gray-700 hover:text-blue-600">
                  Projects
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-700 hover:text-blue-600">
                  Contact
                </Link>
              </li>
            </ul>
          </nav>
          
          <div className="md:hidden">
            <button className="text-gray-500 hover:text-gray-700">
              <span className="sr-only">Open menu</span>
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </Container>
    </header>
  )
}