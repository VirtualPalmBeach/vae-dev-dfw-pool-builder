import { getHomepage, getNavigation, getSiteSettings } from '@/lib/api';
import { notFound } from 'next/navigation';
import Hero from '@/components/Hero';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import Container from '@/components/Container';
import CallToAction from '@/components/CallToAction';

export const revalidate = 30; // Check for new content every 30 seconds

export default async function Home() {
  const homepage = await getHomepage();
  const navigation = await getNavigation();
  const siteSettings = await getSiteSettings();

  if (!homepage || !navigation) {
    notFound();
  }

  return (
    <>
      <Header navigation={navigation} siteSettings={siteSettings} />
      <main>
        {homepage.hero && <Hero hero={homepage.hero} />}
        {homepage.blocks?.map((block, index) => {
          // Add appropriate components based on block type
          switch (block.blockType) {
            case 'callToAction':
              return <CallToAction key={index} cta={block} />;
            default:
              return null;
          }
        })}
      </main>
      <Footer siteSettings={siteSettings} />
    </>
  );
}