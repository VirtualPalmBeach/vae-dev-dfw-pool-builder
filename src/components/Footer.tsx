import Link from 'next/link'
import { Container } from '@/components/Container'

const navigation = {
  main: [
    { name: 'Home', href: '/' },
    { name: 'Services', href: '/services' },
    { name: 'Projects', href: '/projects' },
    { name: 'Contact', href: '/contact' },
  ],
}

export function Footer() {
  return (
    <footer className="bg-gray-800">
      <Container>
        <div className="py-12 md:flex md:items-center md:justify-between">
          <div className="text-center md:text-left">
            <p className="text-base text-gray-400">
              &copy; {new Date().getFullYear()} DFW Pool Builder. All rights reserved.
            </p>
          </div>
          <div className="mt-8 flex justify-center md:mt-0">
            <div className="flex space-x-6">
              <nav className="flex space-x-8">
                {navigation.main.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="text-base text-gray-300 hover:text-white"
                  >
                    {item.name}
                  </Link>
                ))}
              </nav>
            </div>
          </div>
        </div>
      </Container>
    </footer>
  )
}