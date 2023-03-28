require('dotenv').config();
const axios = require ("axios");
const {Dog}= require ("../db");
const {Temperament}= require ("../db");
const {API_KEY} = process.env

// This function brings us all the information of the dog API. This information has the same structure as the body to create a new dog.

const getBreedsFromApi= async()=> {
    let apiData= await axios(`https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`);
    
        let fromApi= await apiData.data.map((dog)=>{
            let weightMin = parseInt(dog.weight.metric.slice(0, 2).trim()); 
            let weightMax = parseInt(dog.weight.metric.slice(4).trim());
            let averageWeight = weightMax + weightMin;
        
            if (weightMin && weightMax) {
                averageWeight = averageWeight / 2;

            } else if (weightMin && !weightMax) {
                weightMax = weightMin;
                averageWeight = averageWeight / 2;

            } else if (!weightMin && weightMax) {
                weightMin = weightMax;
                averageWeight= averageWeight / 2;

            } else {
                weightMin = 20;
                weightMax = 30;
                averageWeight= ((weightMax) + (weightMin)) / 2;
            }
            

        return {
        id: dog.id,
        weightMin: weightMin,
        weightMax: weightMax,
        averageWeight: averageWeight,
        height: dog.height,
        name: dog.name,
        life_span: dog.life_span,
        image: dog.image.url,
        temperament: dog.temperament
        }
    });
    return fromApi;
}

// This function will fetch all the data from the db.

const getBreedsFromDb= async()=> {
    let dbData= await Dog.findAll({
    include: [{
        model: Temperament,
        attributes: ["name"],
        through:{attributes: []},
       }],
    });

    let fromDb= dbData.map((dog)=>{
        return {
        id: dog.id,
        weightMax: dog.weightMax,
        weightMin: dog.weightMin,
        averageWeight: (Number(dog.weightMax) + Number(dog.weightMin))/2,
        height: dog.height,
        name: dog.name,
        life_span: dog.life_span,
        image: dog.image,
        temperament: dog.temperaments? dog.temperaments.map (el=> el.name).join(", "):"Happy",
        from_DB: true,
        }
    });
    console.log(dbData)
    return fromDb;
    
};

// We concatenate the api info with the database info

const getBreeds= async() => {
    let breedsApi= await getBreedsFromApi();
    let breedsDb= await getBreedsFromDb();
    let breeds= breedsDb? [...breedsApi, ...breedsDb] : breedsApi;
    return breeds;
}

// This function will display the information that matches the requested name. If the name does not match, we respond with an error.

const getBreedsByName= async (name)=>{
    
    let name2= name.toLowerCase();
    let breeds = await getBreeds();
    let result= await breeds.filter((inst)=> inst.name.toLowerCase().includes(name2));
        
    if(result.length){
        return result
    }
    else {
        throw new Error("This breed does not exist")
    }
};

// This function will display the information that matches the requested id. If the name does not match, we respond with an error.

const getBreedById = async (id, origin) => {
	try {
		if (origin === 'db') {
			let dogDB = await Dog.findOne({
				where: {
					id: id,
				},
				include: [{
					model: Temperament,
					attributes: ['name'],
					through: { attributes: [] },
				}],
			});

			if (dogDB) {
				return {
					id: dogDB.id,
					weightMax: dogDB.weightMax,
					weightMin: dogDB.weightMin,
                    averageWeight: (Number(dogDB.weightMax) + Number(dogDB.weightMin)) /2,
					height: dogDB.height,
					name: dogDB.name,
					life_span: dogDB.life_span,
					image: dogDB.image,
					temperament: dogDB.temperaments
						? dogDB.temperaments.map((el) => el.name).join(', ')
						: 'Happy',
					from_DB: true,
				};
			}
		} else {

			let result = await axios(
				`https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`,
			);

            let dogg = result.data.find(el=> el.id === Number(id) );

				let weightMin = parseInt(dogg.weight.metric.slice(0, 2).trim());

				let weightMax = parseInt(dogg.weight.metric.slice(4).trim());

				let averageWeight = weightMax + weightMin;

				if (weightMin && weightMax) {
					averageWeight = averageWeight / 2;
				} else if (weightMin && !weightMax) {
					weightMax = weightMin;
					averageWeight = weightMin;
				} else if (!weightMin && weightMax) {
					weightMin = weightMax;
					averageWeight = weightMax;
				} else {
					weightMin = 20;
					weightMax = 30;
					averageWeight = (weightMax + weightMin) / 2;
				}

				let dogDetail = {
					id: dogg.id,
					name: dogg.name,
					height: dogg.height.metric,
					life_span: dogg.life_span,
					image: dogg.image ? dogg.image.url : " ",
					temperament: dogg.temperament,
					weightMin: weightMin,
					weightMax: weightMax,
					averageWeight: averageWeight,
				};

				return dogDetail;
			}
		
	} catch (error) {
		return { error: `The dog with id ${id} does not exist` };
	}
};


// Create a new dog in my Db 

const createNewDog = async ( weightMin, weightMax, height, name, life_span, image, temperament, from_DB) =>{
    if (!weightMin || !weightMax || !height || !name || !life_span || !image || !temperament){
    throw new Error("Missing information. Please, complete all the required data.")
    }
    else{
        let newDog = await Dog.create({
            name: name,
			height: height,
			life_span: life_span,
			image: image,
			weightMin: weightMin,
			weightMax: weightMax,
            averageWeight: (weightMax + weightMin) / 2,
        })
        let temper = await Temperament.findAll({
            where: {
                name: temperament
            }
        })
        await newDog.addTemperament(temper);
    }
    // return newDog
};

module.exports = {
    getBreeds,
    getBreedsByName,
    getBreedById,
    createNewDog,
}

