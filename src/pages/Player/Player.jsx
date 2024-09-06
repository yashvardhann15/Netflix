import React, { useEffect, useState } from 'react'
import './Player.css'
import back_arrow from '../../assets/back_arrow_icon.png'
import { useNavigate, useParams } from 'react-router-dom'

const Player = () => {

  const {id} = useParams();
  const navigate = useNavigate();

  const [apiData, setApiData] = useState({
    name: '',
    key: '',
    published_at: '',
    typeof: ''
  });

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhZWUxZWJmNjEzMjFiMzViNDU5YjgwMGNlNDRiNTg5MCIsIm5iZiI6MTcyNTU0MTA0MC41MzE0MjEsInN1YiI6IjY2ZDM2MzdlZGU3Yjg0MTRhOWFlMGMzMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.tqzSWl5lz_gG7-ZEEto5ecN09oDxOyrAf0r9mx3gPQM'
    }
  };
  
  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`, options)
    .then(response => response.json())
    .then(response => setApiData(response.results[0]))
    .catch(err => console.error(err));
  });




  return (
    <div className='player'>
      <img src={back_arrow} alt="" onClick={() => navigate(-2)}/>
      <iframe width='90%' height='90%' src={`https://www.youtube.com/embed/${apiData.key}?si=u-hh7ibkH3lrcTS_`} title='trailer' allowFullScreen frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin"></iframe>
      <div className="player-info">
        <p>{apiData.published_at.slice(0,10)}</p>
        <p>{apiData.name}</p>
        <p>{apiData.type}</p>
      </div>
    </div>
  )
}

export default Player
