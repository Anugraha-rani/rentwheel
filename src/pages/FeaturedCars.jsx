import React, { useState , useEffect, useRef} from 'react'
import { Link } from 'react-router-dom'
import { FaListAlt } from "react-icons/fa";
import gsap from 'gsap';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { Autoplay } from 'swiper/modules';
import { getFeaturedCarAPI } from '../services/allAPI';
import Item from './Item';
import { ScrollTrigger } from "gsap/ScrollTrigger";




function FeaturedCars() {

  const[featured,setFeatured] = useState([])
  
    
     const fourthText = useRef(null);
      const fifthText = useRef(null);
  console.log(featured)

  useEffect(()=>{
    featuredCars()
  },[])

  const featuredCars = async()=>{
    const result = await getFeaturedCarAPI()
    setFeatured(result.data)
  }
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


  return (
    <section className='px-4 sm:px-6 lg:px-10 py-5'>
      <div>
        <p ref={fourthText} className='text-blue-600 font-bold text-lg sm:text-2xl'>Your Next Car Awaits</p>
        <p ref={fifthText} className='text-2xl sm:text-3xl lg:text-5xl font-bold mt-3'>Start Driving With Ease</p>
        </div>
        <div className='flex flex-col sm:flex-row sm:justify-between gap-2'>
          <p className='font-bold mt-6 sm:mt-10 text-sm sm:text-base'>Displaying 1-8 from 3k listings</p>
        <Link to={'/lists'} className='text-blue-600 text-2xl mt-2 sm:mt-10'><FaListAlt /></Link>
        </div>
     
      {/* container */}

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
          600:{
            slidesPerView:2,
            spaceBetween:30,
          },
          1124:{
            slidesPerView:3,
            spaceBetween:30,
          },
          1300:{
            slidesPerView:4,
            spaceBetween:30,
          },

        }}
        modules={[Autoplay]}
        className="h-[488px] md:h-[533px] xl:h-[422px] mt-5"
      > 
         {featured?.map(car=>(
         <SwiperSlide key={car?._id}>
         <Item car={car}/>
          </SwiperSlide>
         ))
        
         }
        
        
      </Swiper>

    </section>
  )
}

export default FeaturedCars