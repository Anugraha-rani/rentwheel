import React, { useState } from 'react'
import { getAllCarsAPI } from '../services/allAPI';


function SideBar({
  selectedTypes,
  setSelectedTypes,
  selectedPrice,
  setSelectedPrice,
   sortOrder,
  setSortOrder
}) {
  

  const handleTypeChange = (type) => {
    setSelectedTypes((prev) =>
      prev.includes(type)
        ? prev.filter((item) => item !== type) 
        : [...prev, type] 
    );
  };
  const handlePriceChange = (priceRange) => {
  setSelectedPrice((prev) =>
    prev === priceRange ? null : priceRange
  );
};

  return (
    
<div className="bg-white rounded-xl  p-3 h-fit">

      <h3 className="font-semibold mb-2">Sort By</h3>

      <select value={sortOrder}
  onChange={(e) => setSortOrder(e.target.value)} className="w-full  rounded-lg p-2  mb-4 bg-stone-100">
        <option value="relevant">Relevant</option>
        <option value="lowToHigh">Low to High</option>
        <option value="highToLow">High to Low</option>
      </select>
<div className='bg-stone-100 p-3 rounded-md'>
      <h3 className="font-semibold mb-3">Car Type</h3>

      <div className="space-y-2">
        {[
          "Coupe",
          "SUV",
          "Sedan",
          "Convertible",
          "Hatchback",
        ].map((type) => (
          <label key={type} className="flex gap-2">
            <input
                type="checkbox"
                checked={selectedTypes.includes(type)}
                onChange={() => handleTypeChange(type)}
              />
            
            {type}
          </label>
        ))}
      </div>
</div>
      <div className='bg-stone-100 p-3 rounded-md mt-4'>
      <h3 className="font-semibold mt-8 mb-3">
        Price Range
      </h3>
      <div className="space-y-2">
        <label className="flex gap-2">
          <input type="checkbox" checked={selectedPrice === "10k-20k"}
    onChange={() => handlePriceChange("10k-20k")} name="price" />
          ₹10,000 - ₹20,000
        </label>

        <label className="flex gap-2">
          <input type="checkbox" checked={selectedPrice === "20k-40k"}
    onChange={() => handlePriceChange("20k-40k")} name="price" />
          ₹20,000 - ₹40,000
        </label>

        <label className="flex gap-2">
          <input type="checkbox" checked={selectedPrice === "40k+"}
    onChange={() => handlePriceChange("40k+")} name="price" />
          ₹40,000+
        </label>
      </div>
      </div>
      </div>
    
  );
}
   

export default SideBar