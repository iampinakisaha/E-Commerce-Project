const cloudinary = require('cloudinary').v2;
const multer = require('multer');
const upload = multer({ dest: 'uploads/' }); // Adjust as necessary for file storage

const uploadCloudinaryImageController = async (req, res) => {
  try {
    // Use multer to parse the multipart/form-data
    upload.single('file')(req, res, async (err) => {
      if (err) {
        return res.status(400).json({
          message: err.message,
          error: true,
          success: false,
        });
      }

      const { file, folder } = req.body;
      console.log(file)
      if (!req.file) {
        throw new Error("Missing required parameters - file or folder");
      }

      // Upload the image to Cloudinary
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: folder,
      });

      console.log("Cloudinary upload result:", result);

      // Check if upload was successful
      if (result && result.secure_url) {
        res.status(200).json({
          data: result,
          message: "Image Uploaded Successfully.",
          error: false,
          success: true,
        });
      } else {
        throw new Error("Image upload failed.");
      }
    });
  } catch (error) {
    console.error("Error uploading image:", error);
    res.status(400).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};

module.exports = uploadCloudinaryImageController;
