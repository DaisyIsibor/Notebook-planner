const router = require("express").Router();

// import routers file
const notesRoutes = require("./notesRoutes");
const homeRouter = require("./homeRoutes");

router.use("/notesRoutes", notesRoutes);
router.use("/homeRoutes", homeRouter);

module.exports = router;