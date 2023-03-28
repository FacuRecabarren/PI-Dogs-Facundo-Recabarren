const { Router } =  require ("express");

const { getBreedsHandler, getRazaByIdHandler, createNewDogHandler } = require ("../handlers/handlerDog")

const dogsRouter = Router();

dogsRouter.get("/", getBreedsHandler);
dogsRouter.get("/:idRaza", getRazaByIdHandler); 
dogsRouter.post("/", createNewDogHandler);

module.exports = dogsRouter;


