import React, { useState, useEffect } from 'react';
import mike from '../images/Mike-tyson.png';
import axios from 'axios';
import '../App.css';
import { useNavigate } from 'react-router-dom';

function Card() {
    const [cameos, setCameos] = useState([]);

    const navigate = useNavigate()

    useEffect(() => {
        const fetchData = async () => {
            try {
                axios.get('https://s55-startling-cameos.onrender.com/cameo')
                    .then(response => {
                        setCameos(response.data);
                    })
                    .catch(error => {
                        console.error('Error fetching data:', error);
                    });
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, []);

  const handleDelete = (id) =>{
    axios.delete(`https://s55-startling-cameos.onrender.com/deleteEntity/${id}`)
    .then(()=>{
        window.location.reload()
    })
    .catch(err=> console.log(err))
  }
    return (
        <div className='main-div'>
            {cameos.map((el, index) => (
                <div className='mega-container' key={index}>
                    <div className='container'>
                        <div className='actors'>
                            <img src={el.img} alt='mike' id='mike' />
                        </div>
                        <div className='contents' key={el.ranking}>
                            <h2>{el.actor_name}</h2>
                            <h3>Movie: {el.movie_name}</h3>
                            <h4>Character: {el.character_name}</h4>
                            <h4>Duration: {el.duration}</h4>
                        </div>
                        <div className='buttons'>
                            <button id='update' onClick={()=>{navigate(`/updateEntity/${el._id}`)}}>Update</button>
                            <button id='delete' onClick={()=>{handleDelete(el._id)}}>Delete</button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default Card;
