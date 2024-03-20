import axios from "axios";
import { useEffect, useState } from "react";
import "./Form.css";
import { useNavigate } from "react-router-dom";

function Form() {
  const navigate = useNavigate();

  const [detail, setDetail] = useState({
    actor_name: "",
    movie_name: "",
    character_name: "",
    duration: "",
    img: "",
  });

  const [isFilled, setIsFilled] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setDetail((prevDetail) => ({
      ...prevDetail,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const {actor_name, movie_name, character_name, duration, img } = detail;
    
   
    if (!actor_name || !movie_name || !character_name || !duration || !img) {

   
      if (!actor_name) {
        alert("Actor's name is required!");
      }
      if (!movie_name) {
        alert("Movie's name is required!");
      }
      if (!character_name) {
        alert("Character's name is required!");
      }
      if (!duration) {
        alert("Duration of the cameo is required!");
      }
      if (!img) {
        alert("Image URL field is required!");
      }
    } else {
      
      axios.post("https://s55-startling-cameos.onrender.com/add", {
          "actor_name" : detail.actor_name,
          "movie_name":detail.movie_name,
          "character_name":detail.character_name,
          "duration":detail.duration,
          "img":detail.img,
        })
        .then((response) => {
          console.log(response.data);
          navigate("/");
          console.log(detail)
        })
        .catch((err) => {
          console.error(err);
        });
    }
  };

  return (
    <>
      <div id="form-cont">
        {console.log(detail)}
        <form onSubmit={handleSubmit} id="form">
          <div>
            <label>Actor Name </label>
            <br />
            <input
              type="text"
              
              onChange={handleChange}
              name="actor_name"
            />
          </div>
          <div>
            <label>Movie Name: </label>
            <br />
            <input
              type="text"
             
              onChange={handleChange}
              name="movie_name"
            />
          </div>
          <div>
            <label>Character Name</label>
            <br />
            <input
              type="text"
              onChange={handleChange}
              name="character_name"
            />
          </div>
          <div>
            <label>Duration</label>
            <br />
            <input
              type="text"
              onChange={handleChange}
              name="duration"
            />
          </div>
          <div>
            <label>Image URL</label>
            <br />
            <input
              type="text"
              onChange={handleChange}
              name="img"
            />
          </div>
          <div>
            <button id="submit" type="submit">Submit</button>
          </div>
        </form>
      </div>
    </>
  );
}

export default Form;