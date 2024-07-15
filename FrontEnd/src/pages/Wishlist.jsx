import React, { useEffect, useState } from 'react'
import { Link, Outlet } from 'react-router-dom'
import Navbar from "../components/home/Navbar"
import { useDispatch, useSelector } from 'react-redux';
import ItemCard from '../components/search/ItemCard';
import SummaryApi from '../common';
import EmptyCart from '../helpers/EmptyCart';
import { fetchAllWishlist } from '../store/wishListSlice';
const Wishlist = () => {
  const dispatch = useDispatch();
  const allSearchWishlistItems = useSelector((state) => state.wishlistData.data);
  const wishlistfetchStatus = useSelector((state) => state.wishlistData.fetchStatus);
  
  const [wishlist, setWishlist] = useState([]);
  const fetchAllProducts = async (criteria) => {
    try {
     
      const dataFetch = await fetch(SummaryApi.bag_item_search.url, {
        method: SummaryApi.bag_item_search.method,
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        
        body: JSON.stringify(criteria),
      });
      
      const dataResponse = await dataFetch.json();

      if (dataResponse.success) {
        
        setWishlist(dataResponse.data)
        // dispatch(setSearchProduct(dataResponse.data || []));
       
      }
    } catch (error) {
    
      // Handle error
    } 
  };
  
  useEffect (() => {
    fetchAllProducts(allSearchWishlistItems)
  },[allSearchWishlistItems])

  useEffect(() => {
    if(wishlistfetchStatus) {
      fetchAllProducts(allSearchWishlistItems)
      dispatch(fetchAllWishlist(false));
    }
  },[wishlistfetchStatus])

  return (
    <div>
      <nav>
        <Navbar />
      </nav>
      
      <div className="container mx-auto p-4">
      {wishlist.length === 0 ? (<EmptyCart item={"wishlist"}/>) : (
        <div className="min-h-[600px] flex flex-col lg:flex-row gap-4 bg-white shadow-md">
        

        {/* display section start */}
        <div className="container mx-auto p-4">
        <div className="flex flex-col lg:flex-row-reverse lg:flex-wrap justify-center items-center">
          
           { wishlist.map((item) => (
              <Link to={"/product-details/" + item?._id} key={item?._id}>
                <ItemCard item={item} />
              </Link>
            ))}
          
        </div>
        </div>
        {/* display section ends */}
      </div>
      )}
        
      </div>
    </div>
  )
}

export default Wishlist