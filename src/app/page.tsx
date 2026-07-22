'use client';

import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Hero from '@/components/home/Hero';
import FeaturedCategories from '@/components/home/FeaturedCategories';
import TrendingProducts from '@/components/home/TrendingProducts';
import NewCollection from '@/components/home/NewCollection';
import PromoBanner from '@/components/home/PromoBanner';
import WhyChooseUs from '@/components/home/WhyChooseUs';
import BrandPartners from '@/components/home/BrandPartners';
import Testimonials from '@/components/home/Testimonials';
import Newsletter from '@/components/home/Newsletter';

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <FeaturedCategories />
        <TrendingProducts />
        <NewCollection />
        <PromoBanner />
        <WhyChooseUs />
        <BrandPartners />
        <Testimonials />
        <Newsletter />
      </main>
      <Footer />
    </>
  );
}
