import React, { useState } from "react";



 function Blog() {
  const [openBlog, setOpenBlog] = useState(null);
  const blogs = [
  {
    id: 1,
    category: "Travel Trends",
    title: "Top 10 Cities to Rent a Car in 2025",
    desc: "Find out the best cities where renting a car is affordable, convenient, and offers the best travel experience in 2025.",
    image:
      "https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=1200&auto=format&fit=crop",
      fullParagraph:"Travel trends in 2026 are focused on meaningful experiences, sustainability, and flexibility. More travelers are choosing eco-friendly destinations, solo adventures, wellness retreats, and work-from-anywhere trips that combine leisure with productivity. Digital booking platforms, AI-powered travel planning, and budget-friendly travel options are also making exploring the world easier than ever. From hidden local destinations to luxury escapes, modern travelers are seeking personalized journeys that create unforgettable memories while embracing culture, comfort, and convenience."
  },
  {
    id: 2,
    category: "Rental Guide",
    title: "How to Choose the Right Rental Car",
    desc: "A step-by-step guide to selecting the perfect rental car based on budget, trip type, and personal preferences.",
    image:
      "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?q=80&w=1200&auto=format&fit=crop",
      fullParagraph:"A rental guide helps tenants and property owners understand the complete process of renting a home or apartment. It covers important topics such as choosing the right property, understanding rental agreements, security deposits, monthly payments, maintenance responsibilities, and tenant rights. A good rental guide also provides tips for inspecting properties, communicating with landlords, and avoiding common rental mistakes, making the renting experience smoother, safer, and more convenient for everyone involved."
  },
  {
    id: 3,
    category: "Car Comparisons",
    title: "Luxury vs Economy Cars: Which One to Rent?",
    desc: "Explore the benefits of renting luxury cars versus economy options and decide which suits your journey best.",
    image:
      "https://images.unsplash.com/photo-1511919884226-fd3cad34687c?q=80&w=1200&auto=format&fit=crop",
      fullParagraph:"Compare top car models side by side to find the perfect match for your lifestyle and budget. Explore detailed insights on performance, fuel efficiency, safety features, pricing, and technology to make confident buying decisions. Whether you’re looking for a family SUV, a sporty sedan, or an eco-friendly electric vehicle, our car comparison tools help you evaluate every detail with ease."
  },
  {
    id: 4,
    category: "Beginner Tips",
    title: "First-Time Car Rental Tips You Must Know",
    desc: "Essential tips for first-time renters to avoid hidden fees, choose the right insurance, and get the best deals.",
    image:
      "https://images.unsplash.com/photo-1502877338535-766e1452684a?q=80&w=1200&auto=format&fit=crop",
      fullParagraph:"Starting something new can feel overwhelming, but the key is to stay consistent and keep learning step by step. Focus on understanding the basics before moving to advanced topics, practice regularly by building small projects, and don't be afraid to make mistakes because they help you improve faster. Use reliable resources, take notes while learning, and try to solve problems on your own before searching for answers. Most importantly, stay patient and enjoy the process — every expert was once a beginner."
  },
  {
    id: 5,
    category: "Money Saving",
    title: "Maximizing Savings on Long-Term Car Rentals",
    desc: "Learn smart ways to save money when booking long-term rental cars for business or vacations.",
    image:
      "https://images.unsplash.com/photo-1485291571150-772bcfc10da5?q=80&w=1200&auto=format&fit=crop",
      fullParagraph:"Save more on every trip with affordable and reliable car rental services designed to fit your budget. Whether you're planning a family vacation, business travel, weekend getaway, or daily commute, our cost-effective rental options help you travel comfortably without overspending. Enjoy competitive pricing, flexible rental plans, fuel-efficient vehicles, and zero hidden charges, making it easier to manage your travel expenses. With well-maintained cars, easy booking, and convenient pickup options, you can experience both comfort and savings in one smart choice."
  },
  {
    id: 6,
    category: "Travel Choices",
    title: "Self-Drive vs Chauffeur Cars: Which is Better?",
    desc: "Compare self-drive rentals and chauffeur services to determine which option suits your travel needs.",
    image:
      "https://images.unsplash.com/photo-1549924231-f129b911e442?q=80&w=1200&auto=format&fit=crop",
      fullParagraph:"**Travel Choices Car Rental** offers a reliable and comfortable way to explore your destination with ease. Whether you're planning a family vacation, business trip, weekend getaway, or airport transfer, we provide a wide range of well-maintained vehicles to suit every travel need and budget. Our service focuses on affordability, safety, and customer satisfaction, ensuring a smooth booking experience and flexible rental options. With professional support, clean vehicles, and convenient pickup and drop-off services, Travel Choices makes every journey more convenient, enjoyable, and stress-free."
  },
  {
    id: 7,
    category: "Road Trip Guide",
    title: "How to Book a Rental Car for Road Trips",
    desc: "Everything you need to know before booking a rental car for your next adventure road trip.",
    image:
      "https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?q=80&w=1200&auto=format&fit=crop",
      fullParagraph:"Planning a road trip has never been easier with reliable car rental services designed for comfort, convenience, and adventure. Whether you're exploring scenic highways, coastal routes, or mountain destinations, renting a car gives you the freedom to travel at your own pace and discover hidden gems along the way. Choose from a wide range of vehicles including compact cars, SUVs, luxury sedans, and family-friendly options to match your travel needs and budget. With flexible booking, affordable pricing, and well-maintained vehicles, car rentals make every journey smooth, safe, and memorable. Perfect for solo travelers, couples, or group vacations, a rental car turns every road trip into an unforgettable experience."
  },
  {
    id: 8,
    category: "Market Trends",
    title: "2025 Car Rental Industry Trends to Expect",
    desc: "A quick overview of the latest car rental industry trends and what customers can expect in the future.",
    image:
      "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?q=80&w=1200&auto=format&fit=crop",
      fullParagraph:"The car rental industry is experiencing rapid growth driven by increasing travel demand, urbanization, and the rising preference for convenient mobility solutions. Customers are increasingly choosing app-based rental services because of their affordability, flexibility, and ease of booking. The demand for electric and eco-friendly vehicles is also growing as consumers become more environmentally conscious. In addition, businesses are adopting AI-powered booking systems, contactless rentals, and real-time vehicle tracking to improve customer experience and operational efficiency. Subscription-based rentals and self-drive services are becoming popular among younger users who prefer temporary vehicle access over ownership. Overall, technological innovation, tourism growth, and changing consumer lifestyles continue to shape the future of the car rental market."
  },
];
  return (
    
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {blogs.map((blog) => (
          <div
            key={blog.id}
            className="bg-white rounded-2xl shadow-sm overflow-hidden hover:shadow-lg transition duration-300"
          >
            <img
              src={blog.image}
              alt={blog.title}
              className="w-full h-44 object-cover"
            />

            <div className="p-4">
              <p className="text-xs text-gray-500 mb-2">{blog.category}</p>
              <h2 className="text-lg font-semibold text-gray-900 leading-snug mb-2">
                {blog.title}
              </h2>

              <p className="text-sm text-gray-600 mb-4 line-clamp-3">
                {blog.desc}
              </p>

              <button
                onClick={() =>
                  setOpenBlog(openBlog === blog.id ? null : blog.id)
                }
                className="text-sm font-semibold text-black hover:underline"
              >
                {openBlog === blog.id
                  ? "show less"
                  : "continue reading"}
              </button>
               {openBlog === blog.id && (
                <div className="mt-4 text-sm text-gray-700 leading-6">
                  {blog.fullParagraph}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Blog