const { Router } = require('express');
const dogsRouter = require("./dogsRouter");
const tempRouter = require("./temperamentsRouter");



const router = Router(); //main router

router.use('/dogs', dogsRouter); 
router.use('/temperaments', tempRouter);


module.exports = router;
