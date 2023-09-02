const router = require("express").Router();
const adminController = require("../Controllers/admin-controller");
const { isAdmin } = require("./Guards/isAdmin");
const { check } = require("express-validator");



router.post(
  "/login",

  check("email").isEmail().withMessage("Invalid email"),

  adminController.login
);

router.get("/allProducts", isAdmin, adminController.all_products);
router.get("/oneProduct/:id", isAdmin, adminController.one_product);
router.post(
  "/product",
  isAdmin,

  adminController.add_product
);
router.patch("/product/:id", isAdmin, adminController.update_product);
router.delete(
  "/oneProduct/:id",

  isAdmin,
  adminController.deleteOne_product
);
router.delete(
  "/allProducts",
  isAdmin,
  adminController.deleteMany_product
);

router.get("/allUsers", isAdmin, adminController.all_users);
router.delete("/User/:id", isAdmin, adminController.delete_user);

module.exports = router;
