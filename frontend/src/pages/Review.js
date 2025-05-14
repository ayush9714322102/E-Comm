import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import { Autoplay, Pagination } from "swiper/modules";
import { FaStar, FaStarHalf } from "react-icons/fa6";

export default function ProductCarousel() {
  const productData = [
    {
      id: 1,
      image: "https://cdn.shopify.com/s/files/1/0780/2116/5367/files/81a027cb-fb25-4fed-a2bc-cb4373a961c7.jpg?v=1735227335",
      title: "This white outfit made me feel like a princess.The elegant design with the cape is stunning and unique.",
      name: "Charmee Shah"
    },
    {
      id: 2,
      image: "https://cdn.shopify.com/s/files/1/0780/2116/5367/files/feb0e419-a458-4798-b579-e852887af986.jpg?v=1735226937",
      title: "This white outfit made me feel like a princess.The elegant design with the cape is stunning and unique.",
    },
    {
      id: 3,
      image: "https://cdn.shopify.com/s/files/1/0780/2116/5367/files/19a89a76-b1d0-4dcf-b37b-3c4717fc911e.jpg?v=1735227023",
      title: "This white outfit made me feel like a princess.The elegant design with the cape is stunning and unique.",
    },
    {
      id: 4,
      image: "https://cdn.shopify.com/s/files/1/0780/2116/5367/files/dde94883-7c5e-4ef0-a931-dde120cf7cdf.jpg?v=1735227041",
      title: "This white outfit made me feel like a princess.The elegant design with the cape is stunning and unique.",
    },
    {
      id: 5,
      image: "https://cdn.shopify.com/s/files/1/0780/2116/5367/files/73e14d0e-e4f4-47d1-b03f-0f502a42d09a.jpg?v=1735226969",
      title: "This white outfit made me feel like a princess.The elegant design with the cape is stunning and unique.",
      name: "Charmee Shah"
    },
  ];

  return (
    <section className="py-10 bg-white relative">
      <div className="container mx-auto px-6">
        <div className="flex justify-center my-12">
          <h1 className="text-3xl px-1 text-center text-white bg-pink-800 uppercase tracking-wider">Client Reviews</h1>
        </div>
        <Swiper
          slidesPerView={4}
          spaceBetween={20}
          loop={true}
          autoplay={{ delay: 2000, disableOnInteraction: false }}
          pagination={{ clickable: true }}
          modules={[Autoplay, Pagination]}
          className="w-full"
        >
          {productData.map((item) => (
            <SwiperSlide key={item.id}>
              <div className="p-2">
                <div className="h-full border border-gray-300 rounded-sm overflow-hidden shadow-md cursor-pointer">
                  <img className="w-full object-contain" src={item.image} alt={item.title} />
                  <div className="p-4">
                    <div className='flex gap-1 items-center justify-center text-xl text-yellow-600'>
                      <FaStar /><FaStar /><FaStar /><FaStar /><FaStarHalf />
                    </div>
                    <h1 className="text-md text-gray-900 mb-2 text-center mt-2">
                      {item.title}
                    </h1>
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
