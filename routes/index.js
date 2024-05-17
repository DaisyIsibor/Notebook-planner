const router = require("express").Router();
const apiRoute = require('./apiRoutes');
const htmlRoutes = require('./htmlRoutes');

router.use('/html', htmlRoutes);
router.use('/api', apiRoute);

module.exports = router;