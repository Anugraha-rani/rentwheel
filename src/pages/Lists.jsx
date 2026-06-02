import React, { useEffect, useState } from 'react'
import CarCard from '../components/CarCard'
import SideBar from '../components/SideBar'
import Pagination from '../components/Pagination'
import { getAllCarsAPI } from '../services/allAPI';
import { useLocation } from 'react-router-dom';



function Lists() {
  const location = useLocation()
  const [currentPage, setCurrentPage] = useState(1);

  const [allCars,setAllCars] = useState([])
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [selectedPrice, setSelectedPrice] = useState(null);
  const [sortOrder, setSortOrder] = useState("relevant");
  console.log(allCars)
  const destination = location.state?.destination || "";
  const searchQuery = location.state?.search || "";

  
  
  const filteredCars = allCars.filter((car) => {
  const typeMatch =
    selectedTypes.length === 0 ||
    selectedTypes.includes(car.bodyType);

  let priceMatch = true;

  if (selectedPrice === "10k-20k") {
    priceMatch = car.priceRent >= 10000 && car.priceRent <= 20000;
  } else if (selectedPrice === "20k-40k") {
    priceMatch = car.priceRent > 20000 && car.priceRent <= 40000;
  } else if (selectedPrice === "40k+") {
    priceMatch = car.priceRent > 40000;
  }

  const cityMatch = destination === "" ||
    car.city.toLowerCase().includes(destination.toLowerCase());

    const searchMatch =searchQuery === "" ||
    car.title?.toLowerCase().includes(searchQuery.toLowerCase());

  return typeMatch && priceMatch && cityMatch && searchMatch;
});

const sortedCars = [...filteredCars];

if (sortOrder === "lowToHigh") {
  sortedCars.sort((a, b) => a.priceSale - b.priceSale);
} else if (sortOrder === "highToLow") {
  sortedCars.sort((a, b) => b.priceSale - a.priceSale);
}

  const carsPerPage = 6;

  const lastIndex = currentPage * carsPerPage;
  const firstIndex = lastIndex - carsPerPage;

  
  //  const currentCars = filteredCars.slice(firstIndex, lastIndex);
  const currentCars = sortedCars.slice(firstIndex, lastIndex);

  useEffect(()=>{
   getAllCars()
  },[])

  const getAllCars = async()=>{
    const result = await getAllCarsAPI()
    setAllCars(result.data)
  }

  return (
    <>
    <div className=" mx-auto px-8 py-4 bg-gray-100 ">
      <div className="grid lg:grid-cols-[250px_1fr] gap-6">

        <SideBar selectedTypes={selectedTypes}
  setSelectedTypes={setSelectedTypes}
  selectedPrice={selectedPrice}
  setSelectedPrice={setSelectedPrice}
  sortOrder={sortOrder}
  setSortOrder={setSortOrder}
  />

        <div>
          <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-6">
            {currentCars.map((car) => (
              <CarCard key={car._id} car={car} />
            ))}
          </div>

          <Pagination
            totalItems={allCars.length}
            itemsPerPage={carsPerPage}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        </div>

      </div>
    </div>
    </>
  )
}

export default Lists