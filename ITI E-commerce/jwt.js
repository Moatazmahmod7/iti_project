// make a jwt
const jwt = require("jsonwebtoken");
const token = jwt.sign(
  {
    name: "coco",
    age: 15,
  },
  "any thing"
);

// take back a jwt
const token2 = res.header("Authorization");

try {
  const data = jwt.verify(token2, secret_key);
} catch (error) {
  console.log(error);
}
