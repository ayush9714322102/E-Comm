import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination"; // Import pagination styles
import "swiper/css/autoplay";
import { Autoplay, Pagination } from "swiper/modules"; // Import Pagination module

export default function ProductCarousel() {
  const productData = [
    {
      id: 1,
      image: "https://cdn.shopify.com/s/files/1/0780/2116/5367/files/81a027cb-fb25-4fed-a2bc-cb4373a961c7.jpg?v=1735227335",
      title: "Hand Painted Blue Kaushalam Tea Pot in Aluminium",
      price: 150,
    },
    {
      id: 2,
      image: "https://cdn.shopify.com/s/files/1/0780/2116/5367/files/feb0e419-a458-4798-b579-e852887af986.jpg?v=1735226937",
      title: "Kaushalam kalash Copper Pot",
      price: 120,
    },
    {
      id: 3,
      image: "https://cdn.shopify.com/s/files/1/0780/2116/5367/files/19a89a76-b1d0-4dcf-b37b-3c4717fc911e.jpg?v=1735227023",
      title: "Hand Painted Blue Kaushalam Tea Pot in Aluminium",
      price: 130,
    },
    {
      id: 4,
      image: "https://cdn.shopify.com/s/files/1/0780/2116/5367/files/dde94883-7c5e-4ef0-a931-dde120cf7cdf.jpg?v=1735227041",
      title: "Hand Painted Blue Kaushalam Tea Pot in Aluminium",
      price: 120,
    },
    {
      id: 5,
      image: "https://cdn.shopify.com/s/files/1/0780/2116/5367/files/dde94883-7c5e-4ef0-a931-dde120cf7cdf.jpg?v=1735227041",
      title: "Hand Painted Blue Kaushalam Tea Pot in Aluminium",
      price: 120,
    },
  ];

  return (
    <section className="py-10 bg-white relative">
      <div className="container mx-auto px-6">
        <h1 className="text-center text-3xl font-semibold mb-6">Bestselling Products</h1>

        <Swiper
          slidesPerView={3} // Adjust number of slides shown at a time
          spaceBetween={20}
          loop={true}
          autoplay={{ delay: 2000, disableOnInteraction: false }}
          pagination={{ clickable: true }} // Enable dots pagination
          modules={[Autoplay, Pagination]} // Include Pagination module
          className="w-full"
        >
          {productData.map((item) => (
            <SwiperSlide key={item.id}>
              <div className="p-4">
                <div className="h-full border border-gray-300 rounded-xl overflow-hidden shadow-md cursor-pointer">
                  <img className="h-56 w-full object-cover" src={item.image} alt={item.title} />
                  <div className="p-4">
                    <h1 className="text-lg font-medium text-gray-900 mb-2">
                      {item.title.substring(0, 25)}...
                    </h1>
                    <h2 className="text-lg font-medium text-gray-900 mb-3">₹{item.price}</h2>
                    <button className="bg-pink-500 hover:bg-pink-600 w-full text-white py-2 rounded-lg font-bold">
                      Add To Cart
                    </button>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Custom Tailwind CSS for Pagination Dots */}
        <style jsx>{`
          .swiper-pagination-bullet {
            background-color: #d1d5db !important; /* Light Gray Dots */
            width: 10px !important;
            height: 10px !important;
            opacity: 1 !important;
            margin-top:250px !important;
          }
          .swiper-pagination-bullet-active {
            background-color: #9ca3af !important; /* Darker Gray Active Dot */
          }
        `}</style>
      </div>
    </section>
  );
}
