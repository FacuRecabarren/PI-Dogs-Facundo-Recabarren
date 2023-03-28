const { Router } =  require ("express");

const { getAllTempHandlers } = require("../handlers/handlerTemp")


const tempRouter = Router();

tempRouter.get("/", getAllTempHandlers);

module.exports = tempRouter;


