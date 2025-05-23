import Image from 'next/image'

import Link from 'next/link'

import { getHomepage, getNavigation, getSiteSettings, getServices } from '@/lib/api'



export default async function Home() {

  // Fetch data from Payload CMS

  const homepage = await getHomepage()

  const navigation = await getNavigation()

  const siteSettings = await getSiteSettings()

  const services = await getServices()



  // Extract specific blocks from the homepage body

  const heroBlock = homepage?.body?.find((block: any) => block.blockType === 'hero')

  const callToActionBlock = homepage?.body?.find((block: any) => block.blockType === 'callToAction')

  

  // Helper function to safely get image URL from media relationship

  const getImageUrl = (mediaRelation: any) => {

    if (!mediaRelation) return null

    return mediaRelation?.cloudinary?.url || null

  }



  return (

    <div className="flex min-h-screen flex-col bg-white">

      {/* Header */}

      <header className="sticky top-0 z-50 bg-white shadow-md">

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

          <div className="flex h-16 items-center justify-between">

            <div className="flex-shrink-0">

              <Link href="/" className="text-2xl font-bold tracking-tight text-blue-600">

                {siteSettings?.siteTitle || 'DFW Pool Builder'}

              </Link>

            </div>

            <nav className="hidden md:block">

              <div className="flex space-x-8">

                {navigation?.menuItems?.map((item: any, index: number) => (

                  <Link

                    key={index}

                    href={item.href}

                    className="rounded-md px-3 py-2 text-sm font-medium text-gray-700 hover:bg-blue-50 hover:text-blue-600"

                  >

                    {item.label}

                  </Link>

                ))}

              </div>

            </nav>

          </div>

        </div>

      </header>



      {/* Main Content */}

      <main>

        {/* Hero Section */}

        <section className="relative bg-gradient-to-r from-blue-600 to-blue-700">

          <div className="mx-auto max-w-7xl px-4 py-16 sm:py-24 lg:py-32">

            <div className="grid lg:grid-cols-2 lg:gap-16 items-center">

              <div>

                <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">

                  {heroBlock?.heading || homepage?.title || 'Transform Your Backyard'}

                </h1>

                <p className="mt-6 text-xl text-blue-100">

                  {heroBlock?.subheading || 'Custom pools built for your life.'}

                </p>

                <div className="mt-10 flex gap-4">

                  <Link

                    href={homepage?.callToAction?.link || '/contact'}

                    className="inline-flex items-center rounded-full bg-white px-6 py-3 text-base font-medium text-blue-600 shadow-sm hover:bg-blue-50"

                  >

                    {homepage?.callToAction?.text || 'Get a Free Quote'}

                  </Link>

                </div>

              </div>

              <div className="mt-10 lg:mt-0">

                {(getImageUrl(heroBlock?.backgroundImage) || getImageUrl(homepage?.heroImage)) ? (

                  <Image

                    src={getImageUrl(heroBlock?.backgroundImage) || getImageUrl(homepage?.heroImage)}

                    alt={heroBlock?.backgroundImage?.alt || homepage?.heroImage?.alt || "Pool design"}

                    width={600}

                    height={400}

                    className="rounded-xl shadow-lg ring-1 ring-black ring-opacity-5 object-cover"

                  />

                ) : (

                  <div className="aspect-[4/3] w-full bg-blue-500 rounded-xl shadow-lg ring-1 ring-black ring-opacity-5" />

                )}

              </div>

            </div>

          </div>

        </section>



        {/* Content Blocks Section */}

        {homepage?.body?.map((block: any, index: number) => {

          // Handle content blocks

          if (block.blockType === 'content') {

            return (

              <section key={`content-${index}`} className="py-16 bg-white">

                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

                  <div className="prose prose-lg mx-auto">

                    <div dangerouslySetInnerHTML={{ __html: block.content }} />

                  </div>

                </div>

              </section>

            );

          }

          return null;

        })}



        {/* Services Section */}

        {services && services.length > 0 && (

          <section className="bg-gray-50 py-24">

            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

              <div className="text-center">

                <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">Our Services</h2>

                <p className="mx-auto mt-5 max-w-2xl text-xl text-gray-500">

                  Premium pool building and renovation services in DFW.

                </p>

              </div>

              <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">

                {services.map((service: any, index: number) => (

                  <div key={index} className="flex flex-col overflow-hidden rounded-lg shadow-lg">

                    <div className="flex-1 bg-white p-6 flex flex-col justify-between">

                      <h3 className="text-xl font-semibold text-gray-900">{service.title}</h3>

                      <p className="mt-3 text-base text-gray-500">{service.description}</p>

                      <div className="mt-6">

                        <Link

                          href={`/services/${service.slug}`}

                          className="text-base font-medium text-blue-600 hover:text-blue-500"

                        >

                          Learn more →

                        </Link>

                      </div>

                    </div>

                  </div>

                ))}

              </div>

            </div>

          </section>

        )}



        {/* Call to Action Section */}

        {callToActionBlock && (

          <section className="bg-blue-700 py-16">

            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

              <div className="text-center">

                <h2 className="text-3xl font-bold tracking-tight text-white">{callToActionBlock.heading}</h2>

                <p className="mt-4 text-lg leading-6 text-blue-100">{callToActionBlock.text}</p>

                <div className="mt-8 flex justify-center">

                  <Link

                    href={callToActionBlock.buttonLink || '/contact'}

                    className={`inline-flex items-center rounded-full px-6 py-3 text-base font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 ${

                      callToActionBlock.buttonStyle === 'primary'

                        ? 'bg-white text-blue-600 hover:bg-blue-50'

                        : 'border border-white bg-transparent text-white hover:bg-blue-800'

                    }`}

                  >

                    {callToActionBlock.buttonText || 'Contact Us Today'}

                  </Link>

                </div>

              </div>

            </div>

          </section>

        )}



        {/* Main Call to Action Section (from standalone field) */}

        {homepage?.callToAction && !callToActionBlock && (

          <section className="bg-blue-700 py-16">

            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

              <div className="text-center">

                <h2 className="text-3xl font-bold tracking-tight text-white">Ready to Get Started?</h2>

                <div className="mt-8 flex justify-center">

                  <Link

                    href={homepage.callToAction.link || '/contact'}

                    className={`inline-flex items-center rounded-full px-6 py-3 text-base font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 ${

                      homepage.callToAction.style === 'button'

                        ? 'bg-white text-blue-600 hover:bg-blue-50'

                        : homepage.callToAction.style === 'text'

                        ? 'border border-white bg-transparent text-white hover:bg-blue-800'

                        : 'bg-yellow-500 text-white hover:bg-yellow-600'

                    }`}

                  >

                    {homepage.callToAction.text || 'Contact Us Today'}

                  </Link>

                </div>

              </div>

            </div>

          </section>

        )}

      </main>



      {/* Footer */}

      <footer className="bg-gray-800">

        <div className="mx-auto max-w-7xl py-12 px-4 sm:px-6 lg:px-8">

          <div className="xl:grid xl:grid-cols-3 xl:gap-8">

            <div className="space-y-8 xl:col-span-1">

              <div className="text-xl font-bold text-white">

                {siteSettings?.siteTitle || 'DFW Pool Builder'}

              </div>

              <p className="text-base text-gray-300">

                Professional pool design and construction in DFW.

              </p>

              {/* Social Links */}

              <div className="flex space-x-6">

                {siteSettings?.contact?.facebookUrl && (

                  <a href={siteSettings.contact.facebookUrl} className="text-gray-400 hover:text-gray-300">

                    <span className="sr-only">Facebook</span>

                    <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">

                      <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />

                    </svg>

                  </a>

                )}

                {siteSettings?.contact?.instagramUrl && (

                  <a href={siteSettings.contact.instagramUrl} className="text-gray-400 hover:text-gray-300">

                    <span className="sr-only">Instagram</span>

                    <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">

                      <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />

                    </svg>

                  </a>

                )}

              </div>

            </div>

            <div className="mt-12 grid grid-cols-2 gap-8 xl:col-span-2 xl:mt-0">

              <div>

                <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-400">Quick Links</h3>

                <ul className="mt-4 space-y-4">

                  {siteSettings?.navigation?.footerNav?.map((item: any, index: number) => (

                    <li key={index}>

                      <Link href={item.href} className="text-base text-gray-300 hover:text-white">

                        {item.label}

                      </Link>

                    </li>

                  )) || 

                  navigation?.menuItems?.map((item: any, index: number) => (

                    <li key={index}>

                      <Link href={item.href} className="text-base text-gray-300 hover:text-white">

                        {item.label}

                      </Link>

                    </li>

                  ))}

                </ul>

              </div>

              <div>

                <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-400">Contact Information</h3>

                <ul className="mt-4 space-y-4">

                  <li className="text-base text-gray-300">Dallas-Fort Worth, TX</li>

                  <li className="text-base text-gray-300">

                    {siteSettings?.contact?.phoneNumber ? (

                      <a href={`tel:${siteSettings.contact.phoneNumber}`} className="hover:text-white">

                        {siteSettings.contact.phoneNumber}

                      </a>

                    ) : (

                      '(214) 555-1234'

                    )}

                  </li>

                  <li className="text-base text-gray-300">

                    {siteSettings?.contact?.emailAddress ? (

                      <a href={`mailto:${siteSettings.contact.emailAddress}`} className="hover:text-white">

                        {siteSettings.contact.emailAddress}

                      </a>

                    ) : (

                      'info@dfwpoolbuilder.com'

                    )}

                  </li>

                  {siteSettings?.contact?.mapLink && (

                    <li className="text-base text-gray-300">

                      <a href={siteSettings.contact.mapLink} className="hover:text-white" target="_blank" rel="noopener noreferrer">

                        View on Map

                      </a>

                    </li>

                  )}

                </ul>

              </div>

            </div>

          </div>

          <div className="mt-12 border-t border-gray-700 pt-8">

            <p className="text-base text-gray-400 xl:text-center">

              © {new Date().getFullYear()} {siteSettings?.siteTitle || 'DFW Pool Builder'}. All rights reserved.

            </p>

          </div>

        </div>

      </footer>

    </div>

  )

}