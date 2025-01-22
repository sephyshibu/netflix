import React from 'react'
import "./navbar.css"
import { auth } from '../../store/config'
import { getAuth, signOut } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'

function Navbar(props) {
  
  const navigate=useNavigate();

const handlelogout=async ()=>{
  const auth=getAuth()
  try{

    await signOut(auth);
 
    navigate('/login')
  }
  catch(error)
  {
    console.log(error.message)
  }
 
  }

const handleLogin=()=>{
  const auth=getAuth()
  try{
    navigate('/login')
  }
  catch(error)
  {
    console.log(error.message)
  }
}
  return (
    <div className='navbar'>
      <img className='logo' src='https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/1920px-Netflix_2015_logo.svg.png' alt='Logo of Netflix'></img>
      <div className='icons'>
        <ul className='lists'>
          <li>Home</li>
          <li>TVShows</li>
          <li>Movies</li>
          <li>New & Popular</li>
          <li>My Lists</li>
          <li>Browse by Language</li>
        </ul>
      </div>
      {props.username?(<button className="logout" onClick={handlelogout} type='button'>Logout</button>):(<button className="logout" onClick={handleLogin} type='button'>Login</button>)}
      
      <div className='Welcometext'>
        <p>Welcome,{props.username}</p>
      </div>
      <img className='avatar' src='https://i.pinimg.com/originals/0d/dc/ca/0ddccae723d85a703b798a5e682c23c1.png' alt='Avatar'/>
    </div>
  )
}

export default Navbar
