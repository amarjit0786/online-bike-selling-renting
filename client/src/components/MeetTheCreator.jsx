import myImage from "../assets/myImage.png"
function MeetTheCreator(){
  return(

      <>
      <section className="py-20 bg-black text-white">
  <div className="container mx-auto px-6">
    <div className="grid lg:grid-cols-2 gap-12 items-center">
  {/* Left Side - Developer Image */}
  <div className="flex justify-center">
    <div className="relative">
      <div className="absolute inset-0 bg-yellow-500 blur-3xl opacity-20 rounded-full"></div>
      <img
        src={myImage}
        alt="Amarjit Singh"
        className="relative w-80 h-80 object-cover rounded-3xl border-4 border-yellow-500 shadow-2xl"
        />
    </div>
  </div>

  {/* Right Side - Project Info */}
  <div>
    <span className="bg-yellow-500 text-black px-4 py-2 rounded-full font-semibold">
      🚀 Meet The Creator
    </span>

    <h2 className="text-4xl md:text-5xl font-bold mt-6 leading-tight">
      Building The Future Of
      <span className="text-yellow-500"> Bike Trading & Rentals</span>
    </h2>

    <p className="text-gray-300 mt-6 text-lg leading-relaxed">
      CityGlide is a modern MERN Stack marketplace designed to simplify
      buying, selling, and renting motorcycles. The platform combines
      secure authentication, seller management, booking systems, and
      powerful admin controls to create a seamless experience for riders
      and sellers.
    </p>

    <div className="grid grid-cols-2 gap-4 mt-8">

      <div className="bg-zinc-900 p-4 rounded-xl border border-zinc-800">
        <h3 className="text-yellow-500 font-bold text-xl">
          JWT Auth
        </h3>
        <p className="text-gray-400 text-sm">
          Secure user authentication
        </p>
      </div>

      <div className="bg-zinc-900 p-4 rounded-xl border border-zinc-800">
        <h3 className="text-yellow-500 font-bold text-xl">
          Admin Panel
        </h3>
        <p className="text-gray-400 text-sm">
          Complete platform management
        </p>
      </div>

      <div className="bg-zinc-900 p-4 rounded-xl border border-zinc-800">
        <h3 className="text-yellow-500 font-bold text-xl">
          Bike Rentals
        </h3>
        <p className="text-gray-400 text-sm">
          Hassle-free booking system
        </p>
      </div>

      <div className="bg-zinc-900 p-4 rounded-xl border border-zinc-800">
        <h3 className="text-yellow-500 font-bold text-xl">
          Cloudinary
        </h3>
        <p className="text-gray-400 text-sm">
          Optimized image management
        </p>
      </div>

    </div>

    <div className="flex gap-4 mt-8 flex-wrap">

      <a
        href="/bikes"
        className="bg-yellow-500 text-black px-6 py-3 rounded-xl font-semibold hover:bg-yellow-400 transition"
        >
        Explore Bikes
      </a>

      <a
        href="https://github.com/amarjit0786/online-bike-selling-renting"
        target="_blank"
        rel="noreferrer"
        className="border border-yellow-500 text-yellow-500 px-6 py-3 rounded-xl font-semibold hover:bg-yellow-500 hover:text-black transition"
        >
        View Source Code
      </a>

    </div>
  </div>

</div>


  </div>
</section>

    </>
) 
}


export default MeetTheCreator;