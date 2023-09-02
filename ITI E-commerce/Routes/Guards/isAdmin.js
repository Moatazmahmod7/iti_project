const jwt = require("jsonwebtoken");

// take back a jwt
exports.isAdmin = async (req, res, next) => {
  const token = req.header("Authorization");

  try {
    let data = jwt.verify(token, "many things");
    exports.id = data.id

    console.log(data.isAdmin);

    if (data.isAdmin) {
      next();
    } else res.json("Access Denied - Not admin");
  } catch (error) {
    res.json("Access Denied - Not admin")
  }
};