"use client"

const CTA = () => {
  return (
    <section className="py-24 bg-[#D4735E] text-white text-center relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10" />
      <div className="container mx-auto px-4 relative z-10">
        <h2 className="text-4xl md:text-5xl font-bold mb-6 font-['Outfit']">
          Ready to explore the authentic way?
        </h2>
        <p className="text-xl text-white/90 mb-10 max-w-2xl mx-auto">
          Join our community of curious travelers and passionate locals today.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="bg-white text-[#D4735E] px-8 py-4 rounded-full font-bold text-lg hover:bg-[#F5EFE6] transition-colors shadow-lg">
            Find a Guide
          </button>
          <button className="bg-[#3D2E2E] text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-[#2a2020] transition-colors shadow-lg">
            Become a Guide
          </button>
        </div>
      </div>
    </section>
  );
};

export default CTA;
