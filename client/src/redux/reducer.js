import { SET_CURRENT_PAGE, RESET_DETAIL, FILTER_BY_ORIGIN, GET_ALL_BREEDS, ORDER_BY_NAME, ORDER_BY_WEIGHT, FILTER_BY_TEMPER, GET_ALL_TEMPS, GET_DOGS_BY_NAME, GET_DOG_DETAIL, CREATE_DOG} from "../redux/action-types";


const initialState = {
    dogs: [], 
    dogDetail: {},
    temperaments: [],
    allDogs: [], 
    currentPage: 1,
}

const reducer = (state = initialState, action) => {
    let aux = []; 

    switch(action.type) {
        case GET_ALL_BREEDS:
            return {
                ...state,
                dogs: action.payload,
                allDogs: action.payload
            }

        case GET_ALL_TEMPS:
            return {
                ...state,
                temperaments: action.payload,
            }

        case ORDER_BY_NAME:
            let ordered= action.payload === "a-z" ? state.dogs.sort((a, b) => {
                if (a.name > b.name) {
                    return 1;
                }
                if (b.name > a.name) {
                    return -1;
                }
                return 0;
            }) : state.dogs.sort((a, b) => {
                if (a.name > b.name) {
                    return -1;
                }
                if (b.name > a.name) {
                    return 1;
                }
                return 0;
            })
            return {
                ...state,
                dogs: ordered
            }

        case ORDER_BY_WEIGHT: 
            if (action.payload === "minWeight") {
                aux = state.dogs.sort((dogA, dogB) => {
                    if(dogA.weightMin < dogB.weightMin) return -1;
                    if(dogA.weightMin > dogB.weightMin) return 1;
                    return 0;
                })
            } else if (action.payload === "maxWeight") {
                aux = state.dogs.sort((dogA, dogB) => {
                    if(dogA.weightMax > dogB.weightMax) return -1;
                    if(dogA.weightMax < dogB.weightMax) return 1;
                    return 0;
                })
            } else if (action.payload === "average"){
                aux = state.dogs.sort((dogA, dogB) => {
                    if(dogA.averageWeight < dogB.averageWeight) return -1;
                    if(dogA.averageWeight > dogB.averageWeight) return 1;
                    return 0;
                })
            } else if (action.payload === "average-max"){
                aux = state.dogs.sort((dogA, dogB) => {
                    if(dogA.averageWeight > dogB.averageWeight) return -1;
                    if(dogA.averageWeight < dogB.averageWeight) return 1;
                    return 0;
                })
            } else {
                console.log("error")
            }

            return{
                ...state,
                dogs: aux
            }

        case FILTER_BY_ORIGIN:
            const filteredOrigin = action.payload === "from_DB" ? state.allDogs.filter( dog => dog.from_DB) : state.allDogs.filter(dog => !dog.from_DB);
            return {
                ...state,
                dogs: action.payload === "All" ? state.allDogs : filteredOrigin
        }

        case FILTER_BY_TEMPER:
            let dogsWithChosenTemps =
                action.payload === "all"
                ? state.allDogs
                : state.allDogs?.filter((dog) =>{
                if (!dog.temperament) return undefined;
                else return dog.temperament.split(", ").includes(action.payload);
                });
            return {
                ...state,
                dogs: dogsWithChosenTemps,
        };

        
        case GET_DOGS_BY_NAME:
            return {
                ...state,
                dogs: action.payload
            }
        
        case GET_DOG_DETAIL:
            return {
                ...state,
                dogDetail: action.payload
            }
        case CREATE_DOG:
            return {
                ...state,
            }
        
        case RESET_DETAIL: 
            return {
                ...state,
                dogDetail: {}
            }
        case SET_CURRENT_PAGE: 
            return {
                ...state,
                currentPage: action.payload
            }
        default:
            return {
                ...state,
    }
}
}
export default reducer;