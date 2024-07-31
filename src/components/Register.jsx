import React, { useState } from 'react';
import { Link ,useNavigate} from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';  
import Axios from 'axios';
import '../assets/login.css'; 

function Signup() {     
    const [signup,setSignup] = useState({
        email: "",
        pwd: ""
    });
    const [errorText,setErrorText]  = useState("");

    const Navigate = useNavigate()
    
    const handleChange = (e) => {
        setSignup({...signup,[e.target.name]: e.target.value});  
    }

    const handleSubmit = (e) => {    
        e.preventDefault(); 
        Axios.post("https://capstone-backend-psi-seven.vercel.app/signup",signup).then((res) => {  
            if(res.status === 201) {
                Navigate("/login");
            }
        }).catch((err) => {
            setErrorText(err.response.data);
        });  
    }   
  return (      
    <div className="login-container">           
                <ToastContainer />  
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
                <p className="for_pass">Already a user ? Login <Link to="/login">here</Link></p>   
                <p style={{color: "RED"}}>{errorText}</p>
            </form>     
        </div>          
    </div>
  );
}

export default Signup; 