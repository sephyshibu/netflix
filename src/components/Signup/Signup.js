import React, { useContext, useState } from 'react';
import './Signup.css';
import { createUserWithEmailAndPassword, getAuth, updateProfile} from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '../../store/config';
// import { FirebaseContext } from '../../store/FirebaseContext';
const Signup = () => {
  const navigate = useNavigate()
  const[username,setusername]=useState('')
  const[phonenumber,setphonenumber]=useState('')
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // const{firebase}=useContext(FirebaseContext)
  const[err,seterror]=useState(null)

  const handleSignup = async (username,email,password,phonenumber) => {
    const auth=getAuth()
    try{
        
        const usercredential=await createUserWithEmailAndPassword(auth,email,password)
        const user=usercredential.user

        await updateProfile(user,{
            displayName:username,
        })

        await user.reload()
        const updateduser=auth.currentUser

        await setDoc(doc(db,"users",user.uid),{
            username:username,
            email:email,
            password:password,
            phonenumber:phonenumber,
            uid:user.uid,
        })
        console.log('User registered and additional info added to Firestore');
        navigate('/login')

    }
    catch(err){
        if (err.code === 'auth/email-already-in-use') {
            seterror('This email is already in use. Please use a different email.');
          }
        console.error('Error during signup or adding info to Firestore:', err);

    }
}

    const handleSubmit=async(e)=>{
            e.preventDefault()
            seterror(null)
            await handleSignup(username,email,password,phonenumber)
    }
    
    

  

  return (
    <div className="sign-page">
      <div className="sign-container">
        <h1>Sign In</h1>
        <form onSubmit={handleSubmit}>
        <div className="input-container">
            <input
              type="name"
              placeholder="Username"
              value={username}
              onChange={(e) => setusername(e.target.value)}
              required
            />
          </div>
          <div className="input-container">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="input-container">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="input-container">
            <input
              type="number"
              placeholder="Phone Number"
              value={phonenumber}
              onChange={(e) => setphonenumber(e.target.value)}
              required
            />
          </div>
         
               <button type="submit" className="sign-button">Sign up</button>
               {err && <p style={{ color: 'red' }}>{err}</p>}
          
         
        </form>
        <div className="login-now">
          <a href="/login">Login now</a>
        </div>
      </div>
    </div>
  );
};

export default Signup;
