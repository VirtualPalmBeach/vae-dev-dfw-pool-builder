import Image from 'next/image'
import { Button } from '@/components/Button'
import { Container } from '@/components/Container'

export function Hero() {
  return (
    <div className="relative pt-10 pb-20 sm:py-24">
      <Container className="relative">
        <div className="mx-auto max-w-2xl lg:max-w-4xl lg:px-12">
          <h1 className="font-display text-5xl font-bold tracking-tighter text-blue-600 sm:text-7xl">
            DFW Pool Builder
          </h1>
          <div className="mt-6 space-y-6 text-lg text-gray-600">
            <p>
              Transform your backyard into a paradise with custom pool designs 
              that fit your lifestyle and budget.
            </p>
          </div>
          <Button href="/contact" className="mt-10">
            Get your free quote today
          </Button>
          
          <div className="mt-20 lg:mt-30">
            <p className="font-display text-base text-gray-600">
              Trusted by homeowners across the Dallas-Fort Worth area
            </p>
            <ul className="mt-8 flex items-center justify-center gap-x-8 sm:flex-col sm:gap-x-0 sm:gap-y-10 xl:flex-row xl:gap-x-12 xl:gap-y-0">
              {/* Replace logo elements with simple text */}
              <li className="flex font-semibold text-gray-700">Happy Client 1</li>
              <li className="flex font-semibold text-gray-700">Happy Client 2</li>
              <li className="flex font-semibold text-gray-700">Happy Client 3</li>
            </ul>
          </div>
        </div>
      </Container>
    </div>
  )
}