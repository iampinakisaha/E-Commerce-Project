import React from 'react'
import { Link } from 'react-router-dom'

const ContactUs = () => {
  return (
    <div className="h-[calc(100vh-180px)] bg-white shadow-md w-full m-4 mx-auto">
      <div className="grid justify-center items-center   h-[calc(100vh-600px)] pt-10">
        <div className="flex justify-center">
          <img
            src="src/assets/developer-image.png"
            className="active:scale-110 transition-all ease-out "
            style={{
              maxWidth: "200%",
              maxHeight: "200px",
              objectFit: "contain",
            }}
          />
        </div>
        <div className="grid justify-center items-center mt-2 gap-2">
          <span className="grid justify-center items-center text-lg font-semibold">
            This WebSite is Developed by @Pinaki Saha
          </span>
          <span className="grid justify-center items-center text-md text-gray-600">
           <span> for any query write to <a href='https://www.pinaki.saha93@gmail.com' target="_blank" rel="noopener noreferrer" className='underline'>pinaki.saha93@gmail.com</a></span>
          </span>
        </div>
        
      </div>
    </div>
  )
}

export default ContactUs