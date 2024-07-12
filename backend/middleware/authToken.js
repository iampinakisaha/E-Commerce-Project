const jwt = require('jsonwebtoken');

async function authToken(req, res, next) {
  try{
    const token = req.cookies?.token;
    
    if(!token) {
      return res.status(401).json({
        message: "User not logged in",
        error: true,  
        success: false
      })
    }

    jwt.verify(token, process.env.TOKEN_SECRET_KEY, function(err, decoded) {
      // console.log(err)
      // console.log("decoded", decoded)

      if(err) {
        // console.log("error auth", err)
        res.clearCookie('token'); // Clear token cookie
        return res.status(401).json({
          message: "Invalid or expired token",
          error: true,
          success: false
        });
      }

      req.userId = decoded?._id

      next();
    });

 
  }catch(err) {
    res.status(50).json({
      message: err.message || err,
      data : [],
      error: true,
      success: false
    })
  }
}

module.exports = authToken