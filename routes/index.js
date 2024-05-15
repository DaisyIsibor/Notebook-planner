const router = require("express").Router();

// import routers file
const notesRoutes = require("./notesRoute");
const homeRouter = require("./homeRoutes");

router.use("/notesRoute", notesRoutes);
router.use("/homeRoutes", homeRouter);

module.exports = router;