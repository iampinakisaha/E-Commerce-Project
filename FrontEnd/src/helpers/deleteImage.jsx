import { toast } from "react-toastify";
import SummaryApi from "../common";

const deleteImage = async (url) => {

  
  try {

    const public_id = extractPublicId(url);

    console.log("public id is ",public_id)
    const response = await fetch(SummaryApi.delete_image_cloudinary.url, {
      method: SummaryApi.delete_image_cloudinary.method,
      credentials: "include",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ public_id }),
      mode: 'cors', // Ensure CORS mode
      
    });
  
    const dataApi = await response.json();
    
    if (dataApi.success) {
      return dataApi
    } else {
      throw new Error("Image deletion failed");
    }
  } catch (error) {
    console.error("Error deleting image:", error);
    toast.error("Failed to delete image");
  }
};


function extractPublicId(url) {
  console.log(url)
  const uploadPath = '/mernproduct/';
  const uploadIndex = url.indexOf(uploadPath);
  if (uploadIndex === -1) {
    throw new Error('Invalid Cloudinary URL');
  }
  
  let publicIdWithExtension = url.slice(uploadIndex); // Extract after '/upload/'
        publicIdWithExtension = publicIdWithExtension.substring(1);
  const publicId = publicIdWithExtension.split('.')[0]; // Remove file extension
  console.log("public id return",publicId)
  return publicId;
}


export default deleteImage;





