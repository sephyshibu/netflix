import React, { useEffect, useState } from 'react'
import {API_KEY,imageUrl} from '../../constants/constants'
import './Banner.css'
import axios from '../../axios'
// import YouTube from 'react-youtube'

function Banner() {
  const[movie,setMovie]=useState()
  // const[urlId,seturlId]=useState('')

  useEffect(()=>{
    axios.get(`trending/all/week?api_key=${API_KEY}&language=en-US`)
      .then((response)=>{
        console.log(response.data.results)//in here banner will show 1st image so it put result[0]
        const movies = response.data.results;

        // Shuffle the array and pick the first movie
        const shuffledMovies = movies.sort(() => 0.5 - Math.random());
        setMovie(shuffledMovies[0]);

      })
  },[])
  // const opts = {
  //   height: '390',
  //   width: '100% ',
  //   playerVars: {
      
  //     autoplay: 0,
  //   },
  // };
  // const handleMovie=(id)=>{
  //   console.log(id)
  //   axios.get(`/movie/${id}/videos?api_key=${API_KEY}&language=en-US`)
  //     .then((response)=>{
  //       if(response.data.results.length!==0)
  //       {
  //         seturlId(response.data.results[0])
  //       }
  //       else{
  //         alert("Trailer is not available")
  //       }
  //     })
  // }
 
  return (
    <div className='banner'  style={{backgroundImage:`url(${movie? imageUrl+movie.backdrop_path:""})`}}>
      
      <div className='content'>

        <h1 className='title'>
             {movie?movie.original_title:""}
        </h1>

        <div className='banner-buttons'>
            <button className='button' >Play</button>

            <button className='button'>My list</button>
        </div>
       

        <h1 className='decription'>
            {movie?movie.overview:""}
        </h1>
      </div>

      <div className='fade_bottom'>

      </div>
      
    </div>
  )
}

export default Banner
