import React ,{useEffect, useState}from 'react'
import "./RowPost.css"
import {API_KEY, imageUrl} from '../../constants/constants'
import  axios from '../../axios'
import Youtube from 'react-youtube'
function RowPost(props) {

  const [movies,setMovies]=useState([])
  const[urlId,seturlId]=useState('') // here when user click image it give an image id when that id passes to this url https://api.themoviedb.org/3/movie/157336/videos?api_key=7a565dc3f1f77305d33f966bafd15af3 it give the result array in that it gives youtube is then that id should passes to youtube so it should store in the urlId 
  const[close,setClose]=useState(false)
  useEffect(()=>{
    axios.get(props.url)
      .then((response)=>{
        // console.log(response.data.results)
        setMovies(response.data.results)
        
      })
      .catch((error)=>{
        alert("Netwrok error")
      })
  },[])
  const opts = {
    height: '390',
    width: '100% ',
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 1,
    },
  };

  const handleMovie=(id)=>{
    console.log(id)
    axios.get(`/movie/${id}/videos?api_key=${API_KEY}&language=en-US`)
      .then((response)=>{
        if(response.data.results.length!==0)
        {
         
          seturlId(response.data.results[0])
          setClose(true)
          console.log(response.data.results[0])
         
        }
        
        else{
          alert("Trailer is not available")
        }
       
      })
      
  }
  const handleClose=()=>{
    seturlId("")
    setClose(false)
    
  }
  
  return (

    <div className='row'>
      <h2>{props.title}</h2>
      <div className='posters'>

        {movies.map((obj)=>{
          return(
            

      
          <img onClick={()=>handleMovie(obj.id)} className={props.isSmall?"smallposter":"poster"} alt="posters" src={`${imageUrl+obj.backdrop_path} `}/> //here we give 20 movies url ie backdrop_path
          
        )})}
        
        
      </div>
      <div className='closebutton'>
      {urlId && <Youtube opts={opts} videoId={urlId.key}/>}
      {close?(<button className='close' onClick={handleClose}type='button' style={{background:"red", color:"white", position:"absolute",right:"2px", top:"0px",padding:"5px", borderRadius:"15px"}}>Close</button>):" "}
      </div>
      
    </div>
  )
}

export default RowPost
