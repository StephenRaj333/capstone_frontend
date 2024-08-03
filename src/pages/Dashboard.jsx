import React, { useState, useEffect } from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { Dropdown } from 'react-bootstrap';
import Axios from 'axios';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, DoughnutController, ArcElement, Tooltip, Legend } from 'chart.js';
import Select from 'react-select';

// Register the required components
ChartJS.register(CategoryScale, LinearScale, DoughnutController, ArcElement, Tooltip, Legend);

const Dashboard = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [projects, setProjects] = useState([]);
    const [selectedProject, setSelectedProject] = useState(null);

    useEffect(() => {
        Axios.get("https://capstone-backend-xi.vercel.app/get")
            .then((res) => {
                const projectsData = res.data;
                setProjects(projectsData);
                if (projectsData.length > 0) {
                    setSelectedProject(projectsData[0]);
                }
            })
            .catch((err) => console.log("Error", err));
    }, []);

    const handleLogout = () => {
        sessionStorage.removeItem('token');
        navigate('/login');
    };

    const handleSelect = (selectedOption) => {
        const project = projects.find(p => p._id === selectedOption.value);
        setSelectedProject(project);
    };

    return (
        <div className='main-container'>
            <aside>
                <div className="sidebar">
                    <div className="dashboard-heading">
                        <Link className='m-0 p-0' to="/dashboard">  <h4 className='m-0 p-0'> Dashboard </h4></Link>
                    </div>
                    <Link className={location.pathname === "/dashboard/home" ? "active" : ""} to="home">
                        <img src="https://img.icons8.com/?size=100&id=99982&format=png&color=000000" alt="" />
                        Project Details</Link>
                    <div className="footer">
                        <a>Footer</a>
                    </div>
                </div>
            </aside>
            <div className='outlet'>
                <div className='bg-dark d-flex justify-content-between pt-4 pb-2 position-sticky top-0 p-4 text-white'>
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
                        <div className='p-5'>
                            <h3 className='text-primary'>Project Task Completion</h3>
                            <p className='text-success m-0'>Select Project</p>
                            <Select
                                className='select-container'
                                value={selectedProject ? { value: selectedProject._id, label: selectedProject.projectname } : null}
                                onChange={handleSelect}
                                options={projects.map(project => ({
                                    value: project._id,
                                    label: project.projectname
                                }))}
                                placeholder="Select a Project"
                            />
                        </div>
                        {selectedProject && (
                            <div>
                                <div className='chart-container'>
                                    <Doughnut
                                        data={{
                                            labels: ["Completed", 'Pending'],
                                            datasets: [
                                                {
                                                    label: 'Project Status',
                                                    data: [selectedProject.status, 100 - selectedProject.status],
                                                    backgroundColor: ['#37a2eb', '#ff6384'],
                                                },
                                            ],
                                        }}
                                        options={{
                                            responsive: true,
                                            maintainAspectRatio: false,
                                            cutout: '50%',
                                            plugins: {
                                                legend: {
                                                    display: true,
                                                },
                                                tooltip: {
                                                    callbacks: {
                                                        label: function (context) {
                                                            return `Status: ${context.raw}%`;
                                                        }
                                                    }
                                                }
                                            }
                                        }}
                                    />
                                    <div className="chart-center-text">
                                        <h4 className='text-success'>{selectedProject.status}%<br />Completed</h4>
                                    </div>
                                </div>
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
}

export default Dashboard;
