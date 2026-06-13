import gsap from 'gsap';
import React, { useEffect, useRef, useState } from 'react'
import { CiLocationOn } from "react-icons/ci";
import { CiCalendarDate } from "react-icons/ci";
import { FaSearch } from "react-icons/fa";
import homecar from '../assets/homecar.png'
import { ScrollTrigger } from "gsap/ScrollTrigger";
import bluecar from '../assets/homebluecar.png'
import whitecar from '../assets/whitecar.png'
import FeaturedCars from './FeaturedCars';
import Explore from './Explore';
import Review from './Review';
import { useNavigate } from 'react-router-dom';



gsap.registerPlugin(ScrollTrigger);



function Home() {
  const navigate = useNavigate()
  const headingRef = useRef(null);
  const carRef = useRef(null);
  const aboutRef = useRef(null);
  const firstText = useRef(null);
  const secondText = useRef(null);
  const thirdText = useRef(null);
   const fourthText = useRef(null);
    const fifthText = useRef(null);
    const sixthText = useRef(null);
    const seventhText = useRef(null);
    const eighthText = useRef(null);
    const ninthText = useRef(null);
  const [destination, setDestination] = useState("");
const [pickUpDate, setPickUpDate] = useState("");
const [dropOffDate, setDropOffDate] = useState("");


  useEffect(() => {
  gsap.registerPlugin(ScrollTrigger);

  // CAR INITIAL STATE
  gsap.set(carRef.current, {
    opacity: 0,
    x: 300,
    rotation: 0,
    transformOrigin: "center center",
  });

  // CAR ANIMATION
  const carTl = gsap.timeline({
    scrollTrigger: {
      trigger: carRef.current,
      start: "top 80%",
      end: "bottom 20%",
      toggleActions: "play reverse play reverse",
      // markers: true,
    },
  });

  carTl
    .to(carRef.current, {
      opacity: 1,
      duration: 0.5,
    })

    // Move forward
    .to(carRef.current, {
      x: 100,
      duration: 5,
      ease: "power2.inOut",
    })

    // Reverse slightly
    .to(carRef.current, {
      x: 130,
      
      duration: 2,
      ease: "power1.inOut",
    })

    // Return to stop position
    .to(carRef.current, {
      x: 100,
      rotation: 0,
      duration: 2,
      ease: "power1.inOut",
    });

  // HEADING ANIMATION
  gsap.fromTo(
    headingRef.current,
    {
      x: -300,
      opacity: 0,
    },
    {
      x: 0,
      opacity: 1,
      duration: 2,
      ease: "power3.out",
      scrollTrigger: {
        trigger: headingRef.current,
        start: "top 80%",
        end: "bottom 20%",
        toggleActions: "play reverse play reverse",
        // markers: true,
      },
    }
  );

  return () => {
    ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
  };
}, []);

const handleSearch = (e) => {
  e.preventDefault();

  navigate("/lists", {
    state: {
      destination,
      pickUpDate,
      dropOffDate,
    },
  });
};

useEffect(() => {
  gsap.registerPlugin(ScrollTrigger);

  
  gsap.set(carRef.current, {
    opacity: 0,
    x: -300,
  });

  const carTl = gsap.timeline({
    scrollTrigger: {
      trigger: carRef.current,
      start: "top 80%",
      toggleActions: "play reverse play reverse",
    },
  });

  carTl
   
    .to(carRef.current, {
      opacity: 1,
      duration: 0.5,
    })

    
    .to(carRef.current, {
      x: 150,
      duration: 1.5,
      ease: "power2.inOut",
    })

    
    .to(carRef.current, {
      x: 80,
      duration: 1.5,
      ease: "power1.inOut",
    })

    
    .to(carRef.current, {
      x: 0,
      duration: 1.5,
      ease: "power2.out",
    });

  return () => {
    ScrollTrigger.getAll().forEach((t) => t.kill());
  };
}, []);

useEffect(() => {
    const texts = [firstText.current, secondText.current, thirdText.current,];
    if (!texts.every(Boolean) || !aboutRef.current) return;

    gsap.set(texts, { opacity: 0, y: -50 });

    const revealFrom = (fromY) => {
      gsap.killTweensOf(texts);
      gsap.set(texts, { opacity: 0, y: fromY });
      gsap.to(texts, {
        y: 0,
        opacity: 1,
        duration: 0.9,
        ease: "power3.out",
        stagger: 0.25,
      });
    };

    const hideTo = (toY) => {
      gsap.killTweensOf(texts);
      gsap.to(texts, {
        y: toY,
        opacity: 0,
        duration: 0.5,
        ease: "power2.in",
        stagger: 0.15,
      });
    };

    const aboutScroll = ScrollTrigger.create({
      trigger: aboutRef.current,
      start: "top 80%",
      end: "bottom 20%",
      onEnter: () => revealFrom(-50),
      onLeave: () => hideTo(-50),
      onEnterBack: () => revealFrom(50),
      onLeaveBack: () => hideTo(50),
    });

    return () => {
      aboutScroll.kill();
      gsap.killTweensOf(texts);
    };
  }, []);

 useEffect(() => {
  const elements = [
    fourthText.current,
    fifthText.current,
    sixthText.current,
    seventhText.current,
    eighthText.current,
    ninthText.current,
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



return(
  <>
   {/* hero */}
   <section className='bg-gray-100 p-4 sm:p-5'>
    <div>
      <h1 ref={headingRef} className='mt-10 sm:mt-20 text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-center px-2'>Explore <span className='bg-gradient-to-r from-blue-600 to-white p-1 rounded-md'> Premium Vehicles</span> Available In Exciting <span className='mt-2 sm:mt-5 block'>Destinations</span> </h1>
      
      </div>
      <div className='flex items-center justify-center mt-6 sm:mt-10 px-2'>
      <form onSubmit={handleSearch} className='bg-white text-gray-500 rounded-md md:rounded-full px-4 sm:px-6 md:pl-12 py-4 flex flex-col md:flex-row gap-4 lg:gap-x-8 w-full max-w-md md:max-w-4xl ring-1 ring-slate-900/5 relative'>
       <div>
        <div className='flex items-center'>
          <CiLocationOn className='text-xl'/>
          <p className='ms-1'>Destination</p>
        </div>
        <input value={destination}
            onChange={(e) => setDestination(e.target.value)} type="text" placeholder='Type here....' className='mt-3 w-full px-4 py-2 border border-gray-300 rounded-md outline-none ' />
       </div>
       <div>
        <div className='flex items-center'>
          <CiCalendarDate className='text-xl'/>
          <p className='ms-1'>Pick Up</p>
        </div>
        <input value={pickUpDate}
  onChange={(e) => setPickUpDate(e.target.value)} type="date"  className='mt-3 w-full px-4 py-2 border border-gray-300 rounded-md outline-none ' />
       </div>
       <div>
        <div className='flex items-center'>
          <CiCalendarDate className='text-xl'/>
          <p className='ms-1'>Drop Off</p>
        </div>
        <input value={dropOffDate}
  onChange={(e) => setDropOffDate(e.target.value)} type="date"  className='mt-3 w-full px-4 py-2 border border-gray-300 rounded-md outline-none ' />
       </div>
       <button type="submit" className="flex items-center justify-center bg-blue-600 text-white rounded-full px-6 py-2 h-12 min-w-[140px] gap-2 font-medium mt-2 md:mt-4 md:self-center">
  <FaSearch className="text-lg" />
  <span>Search</span>
</button>
      </form>
      
      </div>
      <div className='mt-7 flex justify-center px-2'>
        <img ref={carRef} src={homecar} alt="Premium rental car" className='w-full max-w-4xl mx-auto' />
      </div>
    
   </section>


{/* about */}

<section ref={aboutRef}>
        <div className='grid grid-cols-1 lg:grid-cols-2 py-8 sm:py-15 px-4 sm:px-6 lg:px-10 gap-8 lg:gap-5'>
          <div className='overflow-hidden'>
          <p  ref={firstText} className='text-blue-600 font-bold text-lg sm:text-2xl'>Your Reliable Ride Partner</p>
          <p  ref={secondText} className='text-2xl sm:text-3xl lg:text-5xl font-bold mt-3'>Helping You Every Step Of The Way</p>
          <p  ref={thirdText} className='mt-6 sm:mt-10 text-sm sm:text-base'>Find reusable car with transparent pricing, verified inspections, flexible pricing and delivery options, and 24/7 customer support for a smooth rental or buying experience.</p>
          <div className='grid grid-cols-1 sm:grid-cols-2 mt-6 sm:mt-10 gap-4 sm:gap-5' >
             <div className='p-5 bg-amber-100 rounded-sm' ref={fourthText}>
              <p className='text-xl font-bold'>Quick Service</p>
              <p>Book in seconds with instant confirmations and flexible pickup options, so you get on the road fast without waiting.</p>
             </div>
             <div className='p-5 bg-gray-100 rounded-sm'  ref={fifthText}>
              <p className='text-xl font-bold'>Wide Vehicle Selection</p>
              <p>Choose from economy to luxury models, regularly maintained and verified,giving you reliable performance and the perfect car for every trip. </p>
             </div>
          </div>
          <div className='grid grid-cols-1 sm:grid-cols-2 mt-4 sm:mt-5 gap-4 sm:gap-5' ref={sixthText}>
            <div className='p-5 bg-blue-100 rounded-sm'>
              <p className='text-xl font-bold'>Transparent Pricing</p>
              <p>Upfront rates with no hidden fees, clear breakdowns for insurance and extras, so pricing stays predictable and easy to understand before booking.</p>
            </div>
            <div className='p-5 bg-amber-100 rounded-sm' ref={seventhText}>
              <p className='text-xl font-bold'>24/7 Support</p>
              <p>Around the clock customer support via chat and phone, resolving issues quickly and helping with changes, extensions or roadside assistance anytime you need.</p>
            </div>
          </div>
          </div>
          <div className='grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5'>
          <div className='mt-4 sm:mt-15' ref={eighthText}>
            <img className='rounded-sm w-full' src={bluecar} alt="Blue car" />
          </div>
          <div className='mt-4 sm:mt-20 lg:mt-40' ref={ninthText}>
            <img className='rounded-sm w-full' src={whitecar} alt="White car" />
          </div>
          </div>

        </div>
      </section> 

      {/* featured cars */}
<FeaturedCars/>
{/* explore */}
<Explore/>
{/* review */}
<Review/>

  </>
)
}

export default Home
