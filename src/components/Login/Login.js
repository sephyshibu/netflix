// Login.js
import React, { useState } from 'react';
import './Login.css';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { getDoc } from 'firebase/firestore';
import { doc } from 'firebase/firestore';
import { db } from '../../store/config';

const Login = () => {
  const navigate = useNavigate()
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const[err,seterror]=useState(null)

  const handleLogin = async (e) => {
    e.preventDefault();
    seterror(null)
    console.log('Logging in with', email, password);
    try{
        const auth=getAuth()
        const usercrededntial=await signInWithEmailAndPassword(auth,email,password)
        const user=usercrededntial.user

        //check firestore for user document
        const userdocref=doc(db,"users",user.uid)
        const userdoc=await getDoc(userdocref)
        console.log("checked in the firestore")
        if(userdoc.exists())
        {

          console.log("home page")
          navigate("/")

        }
        else{
          console.log("condition get false")
          navigate("/signup")
        }



     

    }
    catch(err){
        if(err.code==='auth/user-not-found')
        {
            seterror('User is not found. Please Sign up');
        }
        if (err.code === 'auth/user-mismatch') {
            seterror('Mismatch User');
          }
      
          seterror('Login failed' );

    }
    

  };

  return (
    <div className="login-page">
      <div className="login-container">
        <h1>Login In</h1>
        <form onSubmit={handleLogin}>
          <div className="input-container">
            <input
              type="email"
              placeholder="Registered Email"
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
          
            <button type="submit" className="login-button">Sign In</button>
            {err && <p style={{ color: 'red' }}>{err}</p>}
          
          <div className="helper">
            <div>
              <input type="checkbox" id="remember" />
              <label htmlFor="remember">Remember me</label>
            </div>
            <a href="#">Need help?</a>
          </div>
        </form>
        <div className="signup-now">
          <p>New to Netflix? <a href="/signup">Sign up now</a>.</p>
        </div>
      </div>
    </div>
  );
};

export default Login;
