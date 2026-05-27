import BikeCard from "./BikeCard";

function FeaturedBikes() {

  const bikes = [
    {
      title: "Royal Enfield",
      brand: "Classic 350",
      price: 220000,
      image:
        "https://images.unsplash.com/photo-1694956792421-e946fff94564?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cm95YWwlMjBlbmZpZWxkJTIwY2xhc3NpYyUyMDM1MHxlbnwwfHwwfHx8MA%3D%3D",
    },

    {
      title: "Kawasaki Ninja",
      brand: "Ninja ZX",
      price: 450000,
      image:
        "https://images.unsplash.com/photo-1609630875171-b1321377ee65",
    },

    {
      title: "Hayabusa",
      brand: "Suzuki",
      price: 1600000,
      image:
        "https://images.unsplash.com/photo-1568772585407-9361f9bf3a87",
    },
  ];

  return (
    <section className="py-20 bg-gray-100">

      <div className="max-w-7xl mx-auto px-6">

        <h2 className="text-4xl font-bold text-center mb-12">
          Featured Bikes
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          {bikes.map((bike,index)=>{
           return <BikeCard key={index} bike={bike} />
          })}
        </div>
      </div>
    </section>
  );
}

export default FeaturedBikes;