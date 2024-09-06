import React, { useEffect, useRef, useState } from 'react';
import './TitleCards.css';
import { Link } from 'react-router-dom';

const TitleCards = ({ title, category }) => {
  const [apiData, setApiData] = useState([]);
  const cardsRef = useRef();

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhZWUxZWJmNjEzMjFiMzViNDU5YjgwMGNlNDRiNTg5MCIsIm5iZiI6MTcyNTE4MjUwOC4wMjk3NjksInN1YiI6IjY2ZDM2MzdlZGU3Yjg0MTRhOWFlMGMzMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.fceB_fFiDi6Ewzpo2I-PRXz2uLT0QkYA5GiPlpVhYLo'
    }
  };

  const handleWheel = (e) => {
    e.preventDefault(); // Prevent the page from scrolling vertically when pointer is over the cards
    cardsRef.current.scrollLeft += e.deltaY;
  };

  useEffect(() => {
    console.log(`Fetching data for category: ${category}...`);
    fetch(`https://api.themoviedb.org/3/movie/${category? category : "now_playing"}
      `, options)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok ' + response.statusText);
        }
        return response.json();
      })
      .then(data => {
        console.log('API Response:', data);
        setApiData(data.results);
      })
      .catch(err => console.error('Fetch error:', err));

    const currentRef = cardsRef.current;
    currentRef.addEventListener('wheel', handleWheel);

    return () => {
      currentRef.removeEventListener('wheel', handleWheel);
    };
  }, [category]);

  useEffect(() => {
    console.log('apiData state updated:', apiData);
  }, [apiData]);

  return (
    <div className='title-cards'>
      <h2>{title ? title : 'Popular on Netflix'}</h2>
      <div className='card-list' ref={cardsRef}>
        {apiData.map((card, index) => (
          <Link to={`/player/${card.id}`} className='card' key={index}>
            <img src={`https://image.tmdb.org/t/p/w500${card.backdrop_path}`} alt='' />
            <p>{card.original_title}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default TitleCards;