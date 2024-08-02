import React, { useState } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import ProjectDropdown from '../components/DropdownComponent';
import ProjectChart from '../components/ChartComponent';

const projects = [
    {
      _id: '66a5e88064b10f03a1e44a74',
      projectname: 'Gild ProjectS',
      budget: '50000',
      client: 'Gild Financials',
      deadlines: '02/08/2024',
      description: 'Credit Card Management',
      priority: 'High',
      projectMembers: '23',
      status: 'completed',
      technologies: 'HTML, CSS, JavaScript',
      chartData: {
        labels: ['Metric 1', 'Metric 2', 'Metric 3'],
        values: [10, 20, 30],
      },
    },
  ];
  

const Home = () => {
    const location = useLocation();
    const navigate = useNavigate();
  // Initialize state with the first project's chartData
  const [selectedProject, setSelectedProject] = useState(projects[0].chartData);
  const [selectedProjectId, setSelectedProjectId] = useState(projects[0]._id);

  const handleProjectSelect = (projectId) => {
    const project = projects.find((p) => p._id === projectId);
    setSelectedProject(project ? project.chartData : null);
    setSelectedProjectId(projectId);
  };

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
                {location.pathname === "/dashboard/home" ? <Outlet /> :
                    <>
                        <div>
                            <ProjectDropdown
                                projects={projects}
                                selectedProjectId={selectedProjectId} // Pass the default selected ID
                                onProjectSelect={handleProjectSelect}
                            />
                            <ProjectChart data={selectedProject} />
                        </div>
                    </>
                }

            </div>
        </div>
    );
}

export default Home;
