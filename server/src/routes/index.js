const { Router } = require("express");

const routerCountry = require('./routerCountry')
const routerActivity = require('./routerActivity')
const router = Router();


// -- acá van las dos rutas :) --

router.use('/countries', routerCountry)
router.use('/activities', routerActivity)


module.exports = router;
