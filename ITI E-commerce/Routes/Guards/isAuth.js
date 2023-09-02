const jwt = require("jsonwebtoken");

// take back a jwt
exports.isAuth = async (req, res, next) => {
  const token = req.header("Authorization");

  try {
    let data = jwt.verify(token, "any thing");
    exports.id = data.id

    if (data.isAuth) {
      next();
    } else res.json("Access Denied - Not user");
  } catch (error) {
    res.json("Access Denied - Not Auth")
  }
};

