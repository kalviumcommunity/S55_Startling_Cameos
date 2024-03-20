import { useNavigate, useParams } from "react-router-dom";
import { useEffect , useState } from "react";
import axios from "axios";

function UpdateEntity(){
    
    const { id } = useParams();
    const [actor_name, setActorName] = useState("");
    const [movie_name, setMovieName] = useState("");
    const [character_name, setCharacterName] = useState("");
    const [duration, setDuration] = useState("");
    const [img, setImg] = useState("");
    const navigate = useNavigate();

    useEffect(()=>{

        const fetchData = async()=>{
            try{
                const response = await axios.get('https://s55-startling-cameos.onrender.com/add');
                const {actor_name, movie_name, character_name, duration, img } = response.data;
                setActorName(actor_name);
                setMovieName(movie_name);
                setCharacterName(character_name);
                setDuration(duration);
                setImg(img);
            }catch(err){
                console.log(err);
            }
        };
        fetchData();        
    },[id])

    const updateEntity = (e) =>{
        e.preventDefault();
        const updatedEntity = {
            actor_name: actor_name,
            movie_name: movie_name,
            character_name: character_name,
            duration: duration,
            img: img,
          };

          axios.put(`https://s55-startling-cameos.onrender.com/updateEntity/${id}`, updatedEntity)
          .then((result)=>{
            console.log(result);
            navigate('/')
          })
          .catch((err) => console.log(err))
          
    }
    return(
        <>
      <div id="form-cont">
        <form id="form" onSubmit={updateEntity}>
          <div>
            <label>Actor Name: </label>
            <br />
            <input
              type="text"
              name="actor_name"
              value={actor_name}
              onChange={(e) => setActorName(e.target.value)}
            />
          </div>
          <div>
            <label>Movie Name:</label>
            <br />
            <input
              type="text"
              name="movie_name"
              value={movie_name}
              onChange={(e) => setMovieName(e.target.value)}
            />
          </div>
          <div>
            <label>Character Name:</label>
            <br />
            <input
              type="text"
              name="characterName"
              value={character_name}
              onChange={(e) => setCharacterName(e.target.value)}
            />
          </div>
          <div>
            <label>Duration:</label>
            <br />
            <input
              type="text"
              name="duration"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
            />
          </div>
          <div>
            <label>Image URL:</label>
            <br />
            <input
              type="text"
              name="img"
              value={img}
              onChange={(e) => setImg(e.target.value)}
            />
          </div>
          <div>
            <button type="submit">UPDATE</button>
          </div>
        </form>
      </div>
    </>
  );
}

export default UpdateEntity