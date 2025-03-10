const router = require("express").Router();
const userRouter = require("./users");
const { login, createUser } = require("../controllers/users");
const { validateAuth, validateUserBody } = require("../middlewares/validation");
const NotFoundError = require("../errors/NotFoundError");

// Authentication Routes
router.post("/signin", validateAuth, login);
router.post("/signup", validateUserBody, createUser);

// Protected Routes
router.use("/users", userRouter);

// Handle 404
router.use((req, res, next) => {
  next(new NotFoundError("Requested resource not found"));
});

module.exports = router;
