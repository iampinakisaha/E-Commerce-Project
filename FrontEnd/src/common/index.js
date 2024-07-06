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
}

export default SummaryApi

