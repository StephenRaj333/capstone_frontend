import React from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';

const Home = () => {    
    const location = useLocation();     

    return (    
        <div className='main-container'>    
            <aside>     
                <div className="sidebar">   
                    <div className="dashboard-heading">     
                        <h4> Dashboard </h4>   
                    </div>  
                    <Link className={location.pathname === "/dashboard/home" ? "active" : ""} to="home">Project Details</Link> 
                    <Link className={location.pathname === "/dashboard/about" ? "active" : ""} to="about">About</Link>      
                    <Link className={location.pathname === "/dashboard/contact" ? "active" : ""} to="contact">Contact</Link>            
                    <div className="footer">            
                        <a>Footer</a>           
                    </div>              
                </div>      
            </aside>    
            <div className='outlet'>    
                <Outlet />
            </div>
        </div>
    );
}

export default Home;
