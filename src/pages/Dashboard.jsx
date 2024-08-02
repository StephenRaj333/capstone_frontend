import React, { useState, useEffect } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import Axios from 'axios';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

// Register the required components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Home = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [projects, setProjects] = useState([]);
    const [selectedProject, setSelectedProject] = useState(null);

    useEffect(() => {
        Axios.get("https://capstone-backend-xi.vercel.app/get")
            .then((res) => {
                setProjects(res.data);
            })
            .catch((err) => console.log("Error", err));
    }, []);

    const handleLogout = () => {
        sessionStorage.removeItem('token');
        navigate('/login');
    };

    const handleSelect = (projectId) => {
        const project = projects.find(p => p._id === projectId);
        setSelectedProject(project);
    };

    return (
        <div className='main-container'>
            <aside>
                <div className="sidebar">
                    <div className="dashboard-heading">
                        <h4> Dashboard </h4>
                    </div>
                    <Link className={location.pathname === "/dashboard/home" ? "active" : ""} to="home">Project Details</Link>
                    <div className="footer">
                        <a>Footer</a>
                    </div>
                </div>
            </aside>
            <div className='outlet'>
                <div className='bg-dark d-flex justify-content-between pt-3 pb-2 position-sticky top-0 p-4 text-white'>
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
                {location.pathname === "/dashboard/home" ? (
                    <Outlet />
                ) : (
                    <>
                                        <div>
                        <Dropdown onSelect={handleSelect}>
                            <Dropdown.Toggle variant="success" id="dropdown-basic">
                                {selectedProject ? selectedProject.projectname : 'Select a Project'}
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                                {projects.map(project => (
                                    <Dropdown.Item key={project._id} eventKey={project._id}>
                                        {project.projectname}
                                    </Dropdown.Item>
                                ))}
                            </Dropdown.Menu>
                        </Dropdown>
                    </div>
                        {selectedProject && (
                            <div>
                                <h5>Project Details</h5>
                                <p>Project Members: {selectedProject.projectMembers}</p>
                                <p>Status: {selectedProject.status}</p>
                                <p>Budget: ${selectedProject.budget}</p>
                                <div style={{ width: '100%', height: '400px' }}>
                                    <Bar
                                        data={{
                                            labels: ['Project Members', 'Budget'],
                                            datasets: [
                                                {
                                                    label: selectedProject.projectname,
                                                    data: [
                                                        selectedProject.projectMembers,
                                                        selectedProject.budget,
                                                    ],
                                                    backgroundColor: ['#36A2EB', '#FF6384'],
                                                },
                                            ],
                                        }}
                                        options={{
                                            responsive: true,   
                                            maintainAspectRatio: false,
                                            plugins: {
                                                legend: {
                                                    position: 'top',
                                                },
                                                title: {
                                                    display: true,
                                                    text: 'Project Overview',
                                                },
                                            },
                                        }}
                                    />
                                </div>
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
}

export default Home;
