import { toast } from "react-toastify";
import SummaryApi from "../common";

const uploadImage = async (image, folder) => {
  const formData = new FormData();
  formData.append("file", image);
  formData.append("upload_preset", "mern_product");
  formData.append("folder", folder);

 

  try {
    const response = await fetch(SummaryApi.upload_image_cloudinary.url, {
      method: SummaryApi.upload_image_cloudinary.method,
      credentials: "include",
      body: formData,
    });

    const dataApi = await response.json();
   

    if (dataApi.success) {
      return dataApi;
    } else {
      throw new Error("Image upload failed");
    }
  } catch (error) {
  
    toast.error("Failed to upload image");
    throw error; // Propagate the error further if needed
  }
};

export default uploadImage;
