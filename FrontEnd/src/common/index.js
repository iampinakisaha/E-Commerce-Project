const backendDomain = 'http://localhost:8080'

const SummaryApi = {
  signUP : {
    url : `${backendDomain}/api/signup`,
    method: "post"
  },
  LogIn : {
    url : `${backendDomain}/api/login`,
    method: "post"
  },
  current_user : {
    url : `${backendDomain}/api/user-details`,
    method: "get"
  },
  logout_user : {
    url : `${backendDomain}/api/userLogout`,
    method: "get"
  },
  all_user : {
    url : `${backendDomain}/api/alluser`,
    method: "get"
  },
  update_user : {
    url : `${backendDomain}/api/update-user`,
    method: "post"
  },
  upload_product : {
    url : `${backendDomain}/api/upload-product`,
    method: "post"
  },
  all_products : {
    url : `${backendDomain}/api/allProducts`,
    method: "get"
  },
  update_product : {
    url : `${backendDomain}/api/update-product`,
    method: "post"
  },
  delete_product : {
    url : `${backendDomain}/api/delete-product`,
    method: "post"
  },

  upload_product_catagory : {
    url : `${backendDomain}/api/upload-product-catagory`,
    method: "post"
  },
  all_catagory : {
    url : `${backendDomain}/api/allCatagory`,
    method: "get"
  },
  delete_catagory : {
    url : `${backendDomain}/api/delete-catagory`,
    method: "post"
  },
  update_catagory : {
    url : `${backendDomain}/api/update-product-catagory`,
    method: "post"
  },

  // search product for all

  search_products : {
    url : `${backendDomain}/api/searchProducts`,
    method: "post"
  },

  // user profile edit by user
  user_profile_update : {
    url : `${backendDomain}/api/user-profile-update`,
    method: "post"
  },

  // delete image cloudinary
  delete_image_cloudinary : {
    url : `${backendDomain}/api/delete-image-cloudinary`,
    method: "post"
  },
  // upload image cloudinary
  upload_image_cloudinary : {
    url : `${backendDomain}/api/upload-image-cloudinary/`,
    method: "post"
  },

  // bag item search
  bag_item_search : {
    url : `${backendDomain}/api/bag-item-search/`,
    method: "post"
  },

  // user password reset
  user_otp_verify : {
    url : `${backendDomain}/api/user-otp-verify/`,
    method: "post"
  },
  user_otp_confirm : {
    url : `${backendDomain}/api/user-otp-confirm/`,
    method: "post"
  },
  user_password_confirm : {
    url : `${backendDomain}/api/user-password-confirm/`,
    method: "post"
  },
 
}

export default SummaryApi

