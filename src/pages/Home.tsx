import React from 'react';
import { ResponsiveImage } from '../components/ResponsiveImage';

const Home: React.FC = () => {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] pt-24 overflow-hidden">
        <ResponsiveImage
          src="/images/hero/hero-beast.jpg"
          alt="RooBoy Hero"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70 flex flex-col items-center justify-center px-4">
          <h1 className="text-white text-4xl md:text-6xl font-bold text-center mb-4">
            Welcome to RoBoy
          </h1>
          <p className="text-white/90 text-lg md:text-xl text-center max-w-2xl">
            Exploring the intersection of art, technology, and human experience
          </p>
        </div>
      </section>

      {/* Projects Preview */}
      <section className="container mx-auto py-20 px-4 md:px-6">
        <h2 className="text-3xl md:text-4xl font-bold mb-8">Featured Projects</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Project cards will be added here with ResponsiveImage */}
        </div>
      </section>

      {/* Awards Section */}
      <section className="bg-gray-100 py-20">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="text-3xl md:text-4xl font-bold mb-8">Awards & Recognition</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Award items will be added here with ResponsiveImage */}
          </div>
        </div>
      </section>

      {/* Philanthropy Section */}
      <section className="container mx-auto py-20 px-4 md:px-6">
        <h2 className="text-3xl md:text-4xl font-bold mb-8">Giving Back</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Philanthropy items will be added here with ResponsiveImage */}
        </div>
      </section>
    </main>
  );
};

export default Home; 