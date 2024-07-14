const express = require("express");

const router = express.Router();

const userSignUpController = require("..//controller/user/userSignUp");
const userSignInController = require("..//controller/user/userSignIn");
const userDetailsController = require("../controller/user/userDetails");
const authToken = require("../middleware/authToken");
const userLogoutController = require("../controller/user/userLogout");

const allUserDetailsController = require("../controller/user/allUsers");
const updateUserDetailsController = require("../controller/user/updateUser");
const uploadProductController = require("../controller/product/uploadProduct");
const getAllProductController = require("../controller/product/getProduct");
const updateProductController = require("../controller/product/updateProduct");
const deleteProductController = require("../controller/product/deleteProduct");
const uploadProductCatagoryController = require("../controller/product/uploadProductCatagory");
const getAllCatagoryController = require("../controller/product/getProductCatagory");
const updateProductCatagoryController = require("../controller/product/updateProductCatagory");
const deleteCatagoryController = require("../controller/product/deleteCatagory");

const searchProductController = require("../controller/search/searchProduct");
const userProfileEditController = require("../controller/user/userProfileEdit");
const deleteCloudinaryImageController = require("../controller/cloudinary/cloudinaryImageDelete");
const uploadCloudinaryImageController = require("../controller/cloudinary/cloudinaryImageUpload");
const bagItemSearchController = require("../controller/search/bagItemSearch");
const userEmailVerifyController = require("../controller/user/passwordReset/emailVerify");


router.post("/signup", userSignUpController);
router.post("/login", userSignInController);
router.get("/user-details", authToken, userDetailsController);
router.get("/userLogout", authToken, userLogoutController);

// for admin panel
router.get("/alluser", authToken, allUserDetailsController);
router.post("/update-user", authToken, updateUserDetailsController);
router.post("/upload-product", authToken, uploadProductController);
router.get("/allProducts", authToken, getAllProductController);
router.post("/update-product", authToken, updateProductController);
router.post("/delete-product", authToken, deleteProductController);

router.post("/upload-product-catagory", authToken, uploadProductCatagoryController);
router.get("/allCatagory",  getAllCatagoryController);
router.post("/update-product-catagory", authToken, updateProductCatagoryController);
router.post("/delete-catagory", authToken, deleteCatagoryController);


router.post("/searchProducts", searchProductController);

// for user
router.post("/user-profile-update", authToken, userProfileEditController);

//delete/upload image cloudinary
router.post("/delete-image-cloudinary", authToken, deleteCloudinaryImageController);
router.post("/upload-image-cloudinary", authToken, uploadCloudinaryImageController);


// bag item search
router.post("/bag-item-search", authToken, bagItemSearchController);

// user password reset
router.post("/user-email-verify", userEmailVerifyController);



module.exports = router;
