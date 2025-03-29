const jwt = require("jsonwebtoken");
const { JWT_KEY } = process.env;
const user = require("../models/UserSection");

exports.userAuth = async (req, res, next) => {
  try {

    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, JWT_KEY);

    console.log(decoded, 'decodeddecoded')
    let userData = await user.findOne({
      where: { email: decoded.email }
    });
    userData = JSON.parse(JSON.stringify(userData));

    if (!userData) {
      console.log("Token expired!", "unAuthorized")
      // logger.error(error);

    }

    req.userData = userData;
    next();
  } catch (error) {
    // logger.error(error);
    console.log(error)

    return next(error);
  }
};

