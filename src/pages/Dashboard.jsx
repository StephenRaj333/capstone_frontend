import React from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import { Link, Outlet, useLocation ,useNavigate} from 'react-router-dom';   


const Home = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const handleLogout = () => {
      sessionStorage.removeItem('token');
      navigate('/login');   
    };  

    return (
        <div className='main-container'>
            <aside>
                <div className="sidebar">
                    <div className="dashboard-heading">
                        <h4> Dashboard </h4>
                    </div>
                    <Link className={location.pathname === "/dashboard/home" ? "active" : ""} to="home">Project Details</Link>
                    {/* <Link className={location.pathname === "/dashboard/about" ? "active" : ""} to="about">About</Link>
                    <Link className={location.pathname === "/dashboard/contact" ? "active" : ""} to="contact">Contact</Link> */}
                    <div className="footer">  
                        <a>Footer</a> 
                    </div> 
                </div>
            </aside>
            <div className='outlet'>
                <div className='bg-dark d-flex justify-content-between pt-3 pb-2 position-sticky top-0 p-4 text-white '> 
                    <div>
                    <h4>Project Management Tool</h4>    
                    </div>
                    <div>
                        <Dropdown>
                            <Dropdown.Toggle variant="success" id="dropdown-basic">
                                Logout 
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                                <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>   
                            </Dropdown.Menu>
                        </Dropdown>
                    </div>
                </div>
               {location.pathname === "/dashboard/home" ? <Outlet /> : <h1>Dashboard</h1> } 
                
            </div>
        </div>
    );  
}       

export default Home;
