const { sign_up, log_in } = require("../Controllers/home-controller");
const router = require("express").Router();
const { check } = require("express-validator");

router.get("/", (req, res, next) => {
  res.json("Welcome from home page");
});

router.post(
  "/signup",

  check(["firstName", "lastName", "userName"])
    .isLength({ min: 3 })
    .withMessage("Name lenght must be at least 3 characters")
    .not()
    .isNumeric()
    .withMessage("User Name must be a word not number"),

  check("userName")
    .not()
    .isNumeric()
    .withMessage("User Name must be a word not number"),

  check("email").isEmail().withMessage("Invalid email"),

  check("password")
    .matches(/^(?=.*\d)(?=.*[a-zA-Z])[a-zA-Z0-9]{7,}$/)
    .withMessage(
      "Password: should contain at least one digit should contain at least one lower case should contain at least one upper case length should be at least 8 characters and digits"
    ),
  check("phoneNumber")
    .isLength({ min: 11 })
    .withMessage("phoneNumber must be 11 characters"),

  sign_up
);
router.post(
  "/login",
  check("email").isEmail().withMessage("Invalid email"),
  log_in
);

module.exports = router;
