import {useState, useEffect} from "react"
import { useDispatch, useSelector } from "react-redux"
import { createNewDog, getAllTemperaments } from "../../redux/actions";
import { Link } from "react-router-dom";
import validate from "./validate"
import style from "../DogCreate/dogCreate.module.css"

const DogCreate = () => {

  const dispatch = useDispatch();
  const temperaments = useSelector((state)=> state.temperaments) //global state

  const [inputs, setInputs]= useState({ //local state
      name: "",
			height: "",
			life_span: "",
			image: "",
			weightMin: "0",
			weightMax: "0",
      temperaments: [],
  })

  const [error, setErrors] = useState({})

  const handleInputs = (event)=> {
    setInputs({
      ...inputs,
      [event.target.name] : event.target.value
    })
    setErrors(validate({
      ...inputs,
      [event.target.name]: event.target.value
    }))
  }

  const handleTemperamentChoices = (event)=> {
    let { value }= event.target;
    if (inputs.temperaments.includes(value)) {
      return alert ("Temperaments can not be repeated")
    }
    setInputs({
      ...inputs,
      temperaments: [...inputs.temperaments, value]
    })
  }

  const handleDelete= (temp)=> {
    setInputs({
      ...inputs,
      temperaments: inputs.temperaments.filter( inst => inst !== temp)
    })
  }

  const handleSubmit= (event)=> {
    event.preventDefault();
    dispatch(createNewDog(inputs))
    console.log(inputs)
    alert ("Dog successfully added")
    setInputs({
      name: "",
			height: "",
			life_span: "",
			image: "",
			weightMin: "0",
			weightMax: "0",
      temperaments: [],
    })
  }
  
  useEffect(()=> {
    dispatch(getAllTemperaments())
  }, []);

  return(
    
    <div className={style.main}>

      <div className={style.divTitle}>
        <h3 className={style.title}>Create your favorite dog</h3>
        <Link to="/home">
          <button className={style.btnTitle}>Back Home</button>
        </Link>
      </div>

    <div className={style.formContainer}>

      <div>
        <form action="">

          <div className={style.bothSides}>

            <div className={style.leftSide}>

              <div className={style.name}>
                <label>Name</label>
                <input 
                type="text" 
                name="name"
                value={inputs.name}
                placeholder={"Choose a name"}
                onChange={(event)=>handleInputs(event)}/>
                {error.name && <strong>{error.name}</strong>}
              </div>

              <div className={style.image}>
                <label>Image</label>
                <input 
                type="text" 
                name="image"
                value={inputs.image}
                placeholder= {"Add an image"}
                onChange={(event)=>handleInputs(event)}/>
                {error.image && <strong>{error.image}</strong>}
              </div>

              <div className={style.life}>
                <label>Life expectancy</label>
                  <input 
                  type="text" 
                  name="life_span"
                  value={inputs.life_span}
                  placeholder={"For example: 10 - 15 years"}
                  onChange={(event)=>handleInputs(event)}/>
                  {error.life_span && <strong>{error.life_span}</strong>}
                
              </div>

            </div>

            <div className={style.rightSide}>

              <div className={style.min}>
                <label>Min</label> 
                <input 
                type="text" 
                name="weightMin"
                value={inputs.weightMin}
                // min= "1"
                // max= "100"
                onChange={(event)=>handleInputs(event)}/>
                {error.weightMin && <strong>{error.weightMin}</strong>}
              </div>

              <div className={style.max}>
                <label>Max</label>
                <input 
                type="text" 
                name="weightMax"
                value={inputs.weightMax}

                onChange={(event)=>handleInputs(event)}/>
                {error.weightMax && <strong>{error.weightMax}</strong>}
              </div>

              <div className={style.height}>
                <label>Height</label>
                  <input 
                  type="text" 
                  name="height"
                  value={inputs.height}
                  placeholder= {"For example: 55 - 67"}
                  onChange={(event)=>handleInputs(event)}/>
                  {error.height && <strong>{error.height}</strong>}
                  
                
              </div>

            </div>

          </div>

          <div className={style.temperamentSelect}>
              <label>Temperaments</label>
                <select value={temperaments} onChange={(event)=>handleTemperamentChoices(event)}>
                  <option value="all"></option>
                  {temperaments.map((temp)=> {
                    return(
                    <option value={temp} key={temp}>
                      {temp}
                    </option>
                    );
                  })}
                </select>
          </div>
          
          <div className={style.divTempForm}>
            <h5 className={style.myTemps}>My dog's temperaments</h5>

              <ul className={style.tempUl}>
                <li className={style.tempLi}>{inputs.temperaments.map(temp => temp + ", ")}</li>
              </ul>

              <button type="submit" onClick={(event)=>handleSubmit(event)} className={style.btnCreateDog} disabled= {
                error.name || error.image || error.weightMin || error.weightMax || error.height || error.life_span || error.temperaments || !inputs.name
              }>
                Create dog
              </button>

          </div>
          
        </form>
        <div className={style.divTemps}>
                {inputs.temperaments.map(temp =>
                  <div className={style.divAddTemps}>
                    <p className={style.textTemps}>{temp}</p>
                    <button
                    className={style.btnDelete}
                    onClick={()=>{handleDelete(temp)}}
                    >X</button>
                  </div>)
                }
        </div>
      </div>

    </div>

  </div>
  )
}

export default DogCreate;