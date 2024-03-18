import React, { useState, useEffect } from 'react';
import mike from '../images/Mike-tyson.png';
import axios from 'axios';
import '../App.css';

function Card() {
    const [cameos, setCameos] = useState([]);


    useEffect(() => {
        const fetchData = async () => {
            try {
                axios.get('http://localhost:5175/cameo')
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
                    </div>
                </div>
            ))}
        </div>
    );
}

export default Card;
