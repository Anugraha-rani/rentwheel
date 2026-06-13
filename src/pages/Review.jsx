import React, { useEffect, useRef } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { Autoplay } from 'swiper/modules';
import { FaStar, FaUserCircle } from "react-icons/fa";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import gsap from 'gsap';



function Review() {
   const fourthText = useRef(null);
      const fifthText = useRef(null);
      useEffect(() => {
  const elements = [
    fourthText.current,
    fifthText.current,
    
  ];

  if (elements.some(el => !el)) return;

  elements.forEach((el) => {
    gsap.fromTo(
      el,
      {
        opacity: 0,
        y: 80,
        scale: 0.85,
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.8,
        ease: "back.out(1.7)",
        scrollTrigger: {
          trigger: el,
          start: "top 85%",
          end: "bottom 15%",
          toggleActions: "play reverse play reverse", 
          
        },
      }
    );
  });

  return () => {
    ScrollTrigger.getAll().forEach(t => t.kill());
  };
}, []);

    const reviews = [
  {
    name: "John Smith",
    date: "May 12, 2026",
    review:
      "Amazing service and a fantastic collection of luxury cars. Booking was smooth and hassle-free.",
  },
  {
    name: "Emma Wilson",
    date: "May 15, 2026",
    review:
      "The vehicle was in perfect condition and exceeded my expectations. Highly recommended.",
  },
  {
    name: "Michael Brown",
    date: "May 18, 2026",
    review:
      "Professional staff and excellent customer support throughout the rental process.",
  },
  {
    name: "Sophia Davis",
    date: "May 20, 2026",
     review:
      "A premium experience from start to finish. Will definitely rent again.",
  },
  {
    name: "Daniel Miller",
    date: "May 22, 2026",
    review:
      "Great pricing, luxury vehicles, and quick delivery. Couldn't ask for more.",
  },
  {
    name: "Olivia Taylor",
    date: "May 24, 2026",
    review:
      "One of the best car rental experiences I've had. Everything was seamless.",
  },
];

  return (
    <div className='px-4 sm:px-6 lg:px-10 py-8 sm:py-15'>
        <p ref={fourthText} className='text-blue-600 font-bold text-lg sm:text-2xl'>What People Says</p>
        <p ref={fifthText} className='text-2xl sm:text-3xl lg:text-5xl font-bold mt-3'>Don't Just Take Our Words</p>
       <Swiper
        autoplay={{
          delay: 3500,
          disableOnInteraction: false,
        }}
        breakpoints={{
          0: {
            slidesPerView: 1,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 2,
            spaceBetween: 25,
          },
          1024: {
            slidesPerView: 3,
            spaceBetween: 30,
          },
        }}
        modules={[Autoplay]}
        className="mt-10"
      >
        {reviews.map((item, index) => (
          <SwiperSlide key={index}>
            <div className="bg-gray-100 rounded-2xl p-4 sm:p-6 shadow-lg min-h-[210px] h-auto flex flex-col justify-between">
              
              
              <div className="flex gap-1  items-center justify-between">
                <div className='flex gap-1 text-yellow-400'>
                {[...Array(5)].map((_, i) => (
                  <FaStar key={i} />
                ))}
                </div>
                <div>
                <p className="text-sm text-gray-500 mt-2">
                {item.date}
              </p>
              </div>
              </div>
              
              

             
              <p className="text-gray-700 mt-3 leading-7 flex-1">
                "{item.review}"
              </p>
<div className="flex items-center gap-3 mt-1">
                <FaUserCircle size={45} className="text-gray-400" />
                <div>
                  <h4 className="font-bold">{item.name}</h4>
                  <p className="text-sm text-gray-500">
                    Verified Customer
                  </p>
                </div>
              </div>

            </div>
          </SwiperSlide>
        ))}
      </Swiper>
                  
     
    </div>
  )
}

export default Review
