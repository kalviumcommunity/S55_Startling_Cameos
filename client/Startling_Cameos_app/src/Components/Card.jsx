import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../App.css';

function Card({ filteredCameos }) { 

    const navigate = useNavigate();

    const handleDelete = (id) => {
        axios.delete(`https://s55-startling-cameos.onrender.com/deleteEntity/${id}`)
            .then(() => {
                
                const updatedCameos = filteredCameos.filter(cameo => cameo._id !== id);
                
                setCameos(updatedCameos);
            })
            .catch(err => console.log(err));
    };


    return (
        <div className='main-div'>
            {/* Iterate over filteredCameos passed as prop */}
            {filteredCameos.map((el, index) => (
                <div className='mega-container' key={index}>
                    <div className='container'>
                        <div className='actors'>
                            <img src={el.img} alt='actor' id='ent-img' />
                        </div>
                        <div className='contents'>
                            <h2>{el.actor_name}</h2>
                            <h3>Movie: {el.movie_name}</h3>
                            <h4>Character: {el.character_name}</h4>
                            <h4>Duration: {el.duration}</h4>
                        </div>
                        <div className='buttons'>
                            <button id='update' onClick={() => navigate(`/updateEntity/${el._id}`)}>Update</button>
                            <button id='delete' onClick={() => handleDelete(el._id)}>Delete</button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default Card;
