import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Axios from 'axios';
import '../assets/login.css'; 

function Signup() {     
    const [signup,setSignup] = useState({
        email: "",
        pwd: ""
    });
    
    const handleChange = (e) => {
        setSignup({...signup,[e.target.name]: e.target.value});  
    }

    const handleSubmit = (e) => {    
        e.preventDefault();
        console.log(signup);    
        Axios.post("http://localhost:3000/signup",signup).then((res) => {   
            console.log(res);  
            navigate("/login")
        }).catch((err) => console.log("Error",err));  
    }   
  return (      
    <div className="login-container">           
        <div className="container"> 
            <form onSubmit={handleSubmit}>
                <img src="https://res.cloudinary.com/dejzo3x6l/image/upload/v1462601844/login%20page%20design/3.png" 
                alt="Profile-pic" />    
                <div className="input_box">
                    <input type="email" name="email" value={signup.email} onChange={handleChange} placeholder="Email" />
                </div>
                <div className="input_box"> 
                    <input type="password" name="pwd" value={signup.pwd} onChange={handleChange} placeholder="Password" />
                </div>
                <button className="submit_btn">Submit</button>  
                <br />
                <p className="for_pass">Already a user ? <Link to="/login">SIgn In Here ?</Link></p>   
            </form>     
        </div>          
    </div>
  );
}

export default Signup; 