const router = require("express").Router();
const userController = require("../Controllers/user-controller");
const {isAuth} = require("./Guards/isAuth");

router.get("/allProducts", isAuth, userController.all_products);
router.get("/cart", isAuth, userController.get_cart);
router.post("/add-to-cart/:id", isAuth, userController.add_to_cart);

router.delete("/oneCart/:id", isAuth, userController.deleteOne_cart);

router.delete("/allCarts/:id", isAuth, userController.deleteMany_cart);

module.exports = router;
