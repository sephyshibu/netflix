import Navbar from 'D:/netflixapi/netflix/src/components/Navbar/Navbar';
import React, { useEffect, useState } from 'react';
import{auth, db} from 'D:/netflixapi/netflix/src/store/config.jsx'
import { actions, originals,comedy, horror, romantic, documentry } from 'D:/netflixapi/netflix/src/urls.js'
import Banner from 'D:/netflixapi/netflix/src/components/Banner/Banner';
import RowPost from 'D:/netflixapi/netflix/src/components/RowPost/RowPost';
import { doc,getDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
function Home() {
    const[userdetails,setUserdetails]=useState('')//whenever auth state changes the use effect will runs
    const navigate = useNavigate();

    useEffect(()=>{
        const unsubscribe= auth.onAuthStateChanged(async(user)=>{
            if(user)
            {
                console.log(user)
                const docref=doc(db,"users",user.uid)
                const docsnap=await getDoc(docref)

                if(docsnap.exists())
                {
                
                    setUserdetails(docsnap.data().username)
                    console.log(docsnap.data().username)
                }
            }
                else{
                    console.log("Not logged in")
                }
            });

             // Detect back navigation
            const handlePopState = async () => {
                await auth.signOut();
                setUserdetails(''); // Reset user details on sign out
                navigate('/'); // Redirect to home page
            };

            // Listen to popstate (back navigation)
            window.addEventListener('popstate', handlePopState);

            return () =>{
                unsubscribe(); // Cleanup the listener on component unmount
            
                
            } 
  }, [navigate]);
            
    
  
  return (
    <div className="App">
    
     <Navbar username={userdetails}/>
     <Banner/>
     <RowPost  url={originals} title="Netflix Originals"/>
     <RowPost url={actions} title="Action Movies" isSmall/>
     <RowPost url={comedy} title="Comedy Movies" isSmall/>
     <RowPost url={horror} title="Horror Movies" isSmall/>
     <RowPost url={romantic} title="Romantic Movies" isSmall/>
     
    </div>
  );
}

export default Home;

 

























