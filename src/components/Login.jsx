import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Axios from 'axios';
import { useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../assets/login.css';


function Login() {
    const navigate = useNavigate();
    const [helperText, setHelperText] = useState("");
    const [formData, setFormData] = useState({
        email: "",
        pwd: ""
    })

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleSubmit = () => {
        Axios.post("https://capstone-backend-xi.vercel.app/login", formData).then((res) => {
            if (res.data.token) {
                sessionStorage.setItem("token", res.data.token);
                setHelperText("Login Successfull");
                navigate("/dashboard");
            }
        }).catch((err) => {
            console.log("Error", err);  
            setHelperText(err.response.data);
        });
    }

    return (
        <div className="login-container">   
            {/* Same as */}
            <ToastContainer />      
            <div className="container">
                <img src="https://res.cloudinary.com/dejzo3x6l/image/upload/v1462601844/login%20page%20design/3.png" alt="Profile-pic" />
                <div className="input_box">
                    <input type="text" name="email" placeholder="User Name" value={formData.email} onChange={handleChange} />
                </div>
                <div className="input_box">
                    <input type="password" name="pwd" placeholder="Password" value={formData.pwd} onChange={handleChange} />
                </div>
                <button onClick={handleSubmit} className="submit_btn">Login</button>
                {helperText ? <h5 className='text-danger'>{helperText}</h5> : ""}
                <p className='for_pass'>Dont Have an Account ? Sign up <Link to="/signup">Here</Link> </p>
            </div>
        </div>
    );
}

export default Login; 