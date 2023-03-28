import {useState, useEffect} from "react"
import { useDispatch, useSelector } from "react-redux"
import { createNewDog, getAllTemperaments } from "../../redux/actions";
import { Link } from "react-router-dom";
import validate from "./validate"
import style from "../DogCreate/dogCreate.module.css"

const DogCreate = () => {

  const dispatch = useDispatch();
  const temperaments = useSelector((state)=> state.temperaments) 

  const [inputs, setInputs]= useState({ 
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
    let { value } = event.target;
    if (inputs.temperaments.includes(value)) {
      return alert ("Temperaments cannot be repeated")
    }
    setInputs({
      ...inputs,
      temperaments: [...inputs.temperaments, value]
    })
  }

  const handleDelete= (temp)=> {
    setInputs({
      ...inputs,
      temperaments: inputs.temperaments.filter( elem => elem !== temp)
    })
  }

  const handleSubmit= (event)=> {
    event.preventDefault();
    dispatch(createNewDog(inputs))
    console.log(inputs)
    alert ("The dog was created correctly!")
    setInputs({
      name: "",
			height: "",
			life_span: "",
			image: "",
			weightMin: "0",
			weightMax: "0",
      temperaments: [],
    }) // Reload the data after submitting
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

          <div className={style.sectionsDiv}>

            <section className={style.leftSection}>

              <div className={style.allTitles}>
                <label className={style.labels}>Name</label>
                <input 
                className={style.allInputs}
                type="text" 
                name="name"
                value={inputs.name}
                placeholder={"Choose a name"}
                onChange={(event)=>handleInputs(event)}/>
                {error.name && <strong>{error.name}</strong>}
              </div>

              <div className={style.allTitles}>
                <label className={style.labels}>Image</label>
                <input 
                className={style.allInputs}
                type="text" 
                name="image"
                value={inputs.image}
                placeholder= {"Add url"}
                onChange={(event)=>handleInputs(event)}/>
                {error.image && <strong>{error.image}</strong>}
              </div>

              <div className={style.allTitles}>
                <label className={style.labels}>Life expectancy</label>
                  <input 
                  className={style.allInputs}
                  type="text" 
                  name="life_span"
                  value={inputs.life_span}
                  placeholder={"For example: 12 - 15 years"}
                  onChange={(event)=>handleInputs(event)}/>
                  {error.life_span && <strong>{error.life_span}</strong>}
                
              </div>

            </section>

            <section className={style.rightSection}>

              <div className={style.allTitles}>
                <label className={style.labels}>Min Weight (kg)</label> 
                <input 
                className={style.allInputs}
                type="text" 
                name="weightMin"
                value={inputs.weightMin}
                onChange={(event)=>handleInputs(event)}/>
                {error.weightMin && <strong>{error.weightMin}</strong>}
              </div>

              <div className={style.allTitles}>
                <label className={style.labels}>Max Weight (kg)</label>
                <input 
                className={style.allInputs}
                type="text" 
                name="weightMax"
                value={inputs.weightMax}

                onChange={(event)=>handleInputs(event)}/>
                {error.weightMax && <strong>{error.weightMax}</strong>}
              </div>

              <div className={style.allTitles}>
                <label className={style.labels}>Height (cm)</label>
                  <input
                  className={style.allInputs} 
                  type="text" 
                  name="height"
                  value={inputs.height}
                  placeholder= {"For example: 67 - 80"}
                  onChange={(event)=>handleInputs(event)}/>
                  {error.height && <strong>{error.height}</strong>}
                          
              </div>

            </section>

          </div>

          <div className={style.temperamentSelect}>
              <label className={style.labels}>Temperaments</label>
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