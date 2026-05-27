function Hero() {
  return (
    <section className="bg-gradient-to-r from-black via-gray-900 to-black text-white min-h-[90vh] flex items-center">

      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-10 items-center">

        {/* Left Content */}
        <div>
          <h1 className="text-5xl md:text-7xl font-extrabold leading-tight">
            Buy & Rent
            <span className="text-yellow-400"> Dream Bikes</span>
          </h1>

          <p className="text-gray-300 mt-6 text-lg leading-relaxed">
            Discover premium bikes for selling and renting.
            Ride the streets with power, speed, and style.
          </p>

          <div className="mt-8 flex gap-4">
            <button className="bg-yellow-400 text-black px-6 py-3 rounded-lg font-semibold hover:scale-105 transition">
              Explore Bikes
            </button>

            <button className="border border-yellow-400 px-6 py-3 rounded-lg hover:bg-yellow-400 hover:text-black transition">
              Start Renting
            </button>
          </div>
        </div>

        {/* Right Image */}
        <div>
          <img
            src="https://images.unsplash.com/photo-1558981806-ec527fa84c39"
            alt="bike"
            className="rounded-2xl shadow-2xl"
          />
        </div>
      </div>
    </section>
  );
}

export default Hero;