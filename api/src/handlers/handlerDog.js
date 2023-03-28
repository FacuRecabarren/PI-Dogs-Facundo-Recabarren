const { getBreeds, getBreedsByName, getBreedById, createNewDog } = require("../controllers/dogsController")

// This function brings us all the dogs and can also bring us a dog that matches the name passed by query.
const getBreedsHandler= async (req, res)=> {
    const {name} = req.query;
    try {
        if(name){
            let result= await getBreedsByName(name);
            return res.status(200).json(result)
        }
        else{
            let result= await getBreeds();
            return res.status(200).json(result)
        }         
    } catch (error) {
        res.status(404).json({error: error.message})
    }
};

//This function fetches all dogs that match the id passed by params.
const getRazaByIdHandler= async (req, res)=> {
    const {idRaza} = req.params
    let origin= isNaN(idRaza) ? "db" : "api";
    
    try {
        let result= await getBreedById(idRaza, origin);

        if(result.error) throw new Error(result.error);

        res.status(200).json(result)    
    } catch (error) {
        res.status(400).json({error: error.message})
    }

};

// This function creates a new dog, receives the information by body and saves it in our db.

const createNewDogHandler= async (req, res)=> {
    let { weightMin, weightMax, height, name, life_span, image, temperaments, from_DB }= req.body;
    try {
        await createNewDog(weightMin, weightMax, height, name, life_span, image, temperaments)
        res.status(200).send("New dog successfully created")
    } catch (error) {
        res.status(400).json({error: error.message})
    }
};

module.exports= {
    getBreedsHandler,
    getRazaByIdHandler,
    createNewDogHandler
}