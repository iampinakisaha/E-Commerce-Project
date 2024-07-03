const express = require("express");

const router = express.Router();

const userSignUpController = require("..//controller/userSignUp");
const userSignInController = require("..//controller/userSignIn");
const userDetailsController = require("../controller/userDetails");
const authToken = require("../middleware/authToken");
const userLogoutController = require("../controller/userLogout");

const allUserDetailsController = require("../controller/allUsers");
const updateUserDetailsController = require("../controller/updateUser");
const uploadProductController = require("../controller/uploadProduct");
const getAllProductController = require("../controller/getProduct");
const updateProductController = require("../controller/updateProduct");


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
module.exports = router;
