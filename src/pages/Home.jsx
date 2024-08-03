import React, { useEffect, useState } from 'react';
import {Link} from 'react-router-dom'
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import Modal from 'react-bootstrap/Modal';
import Axios from 'axios';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';


const Home = () => {
    const [tableData, setTableData] = useState([]);
    const [editIdx, setEditIdx] = useState(-1);
    const [editedRow, setEditedRow] = useState({});
    const [newProject, setNewProject] = useState({
        projectname: '',
        description: '',
        technologies: '',
        deadlines: '',
        projectMembers: '',
        status: '',
        client: '',
        budget: '',
        priority: ''
    });
    const [filterQuery, setFilterQuery] = useState(''); // New state for filter input
    const [show, setShow] = useState(false);
    const [view, setView] = useState([]);
    const handleClose = () => setShow(false);

    useEffect(() => {
        Axios.get("https://capstone-backend-xi.vercel.app/get")
            .then((res) => {
                setTableData(res.data);
                console.log(res.data)
            })
            .catch((err) => console.log("Error", err));
    }, [tableData]);

    const handleEdit = (idx) => {
        setEditIdx(idx);
        setEditedRow(tableData[idx]);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditedRow({ ...editedRow, [name]: value });
    };

    const handleSave = () => {
        Axios.put(`https://capstone-backend-xi.vercel.app/update/${editedRow.id}`, editedRow)
            .then((res) => {
                console.log(res.data);
                let updatedData = [...tableData];
                updatedData[editIdx] = editedRow;
                setTableData(updatedData);
                setEditIdx(-1);
            })
            .catch((err) => console.log("Error", err));
    };

    const handleDelete = (id) => {
        Axios.delete(`https://capstone-backend-xi.vercel.app/delete/${id}`)
            .then((res) => {
                console.log(res.data);
                setTableData(tableData.filter(item => item.id !== id));
            })
            .catch((err) => console.log("Error", err));
    };

    const handleNewProjectChange = (e) => {
        const { name, value } = e.target;
        setNewProject({ ...newProject, [name]: value });
    };

    const handleAddProject = () => {
        Axios.post("https://capstone-backend-xi.vercel.app/add", newProject)
            .then((res) => {
                console.log(res.data);
                setTableData([...tableData, newProject]);
                setNewProject({
                    projectname: '',
                    description: '',
                    technologies: '',
                    deadlines: '',
                    projectMembers: '',
                    status: '',
                    client: '',
                    budget: '',
                    priority: ''
                });
            })
            .catch((err) => console.log("Error", err));
    };

    const handleFilterChange = (e) => {
        setFilterQuery(e.target.value);
    };

    const filteredData = tableData.filter(item =>
        Object.values(item).some(value =>
            value.toString().toLowerCase().includes(filterQuery.toLowerCase())
        )
    );

    const handleShow = (idx) => {
        setShow(true);
        setView(idx);
        console.log(idx);
    }

    pdfMake.vfs = pdfFonts.pdfMake.vfs;

    const handleDownloadReport = () => {
        const docDefinition = {
            content: [
                { text: 'User Detail', style: 'header', margin: [0, 0, 0, 10] },
                {
                    table: {
                        headerRows: 1,
                        widths: ['*', '*'],
                        body: [
                            [{ text: 'Field', style: 'tableHeader' }, { text: 'Value', style: 'tableHeader' }],
                            ['Project Name', view.projectname || ''],
                            ['Description', view.description || ''],
                            ['Technologies', view.technologies || ''],
                            ['Deadlines', view.deadlines || ''],
                            ['Project Members', view.projectMembers || ''],
                            ['Status', view.status || ''],
                            ['Client', view.client || ''],
                            ['Budget', view.budget || ''],
                            ['Priority', view.priority || ''],
                        ]
                    },
                    layout: 'lightHorizontalLines' // Optional: to have horizontal lines
                }
            ],
            styles: {
                header: {
                    fontSize: 18,
                    bold: true,
                    padding: 20
                },
                tableHeader: {
                    bold: true,
                    fontSize: 13,
                    color: 'black'
                }
            }
        };

        pdfMake.createPdf(docDefinition).download('report.pdf');
    };

    return (
        <div className='home'>
            <div className='d-flex justify-content-between align-items-center w-100 pt-4 pb-4 bg-white'>    
                <nav aria-label="breadcrumb">   
                    <ol class="breadcrumb"> 
                        <li class="breadcrumb-item text-underline"><a href="#"> <Link to="/dashboard">Dashboard</Link> </a></li>   
                        <li class="breadcrumb-item active" aria-current="page">Project Details</li>  
                    </ol>   
                </nav>
            </div>
            <div className='d-flex justify-content-between align-items-center gap-3 flex-row w-100 bg-white pt-2 pb-3'>
                <div>
                    <button type="button" className="btn btn-success" data-bs-toggle="modal" data-bs-target="#exampleModal">Add Project</button>
                </div>
                <div className='d-flex align-items-center gap-3 bg-white'>
                    <h4 className='m-0'>Filter</h4>
                    <div>
                        <input
                            type="text"
                            placeholder="search ..."
                            className="form-control w-100 m-0"
                            value={filterQuery}
                            onChange={handleFilterChange}
                        />
                    </div>
                </div>
            </div>

            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>User Detail</Modal.Title>
                </Modal.Header>
                <Modal.Body className="modal-body">
                    <Table striped>
                        {[view]?.map((item, idx) => {
                            return (
                                <>
                                    <thead>
                                        <tr>
                                            <td>Project Name</td>
                                            <td>{item.projectname}</td>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>Description</td>
                                            <td>{item.description}</td>
                                        </tr>
                                        <tr>
                                            <td>Technologies</td>
                                            <td>{item.technologies}</td>
                                        </tr>
                                        <tr>
                                            <td>Deadlines</td>
                                            <td>{item.deadlines}</td>
                                        </tr>
                                        <tr>
                                            <td>Project Members</td>
                                            <td>{item.projectMembers}</td>
                                        </tr>
                                        <tr>
                                            <td>Status</td>
                                            <td>{item.status}</td>
                                        </tr>
                                        <tr>
                                            <td>Client</td>
                                            <td>{item.client}</td>
                                        </tr>
                                        <tr>
                                            <td>Budget</td>
                                            <td>{item.budget}</td>
                                        </tr>
                                        <tr>
                                            <td>Priority</td>
                                            <td>{item.priority}</td>
                                        </tr>
                                    </tbody>
                                </>
                            );
                        })}
                    </Table>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={handleDownloadReport}>Download Report</Button>
                    <Button variant="secondary" onClick={handleClose}>Close</Button>
                </Modal.Footer>
            </Modal>


            <div className='table-container'>
                <table className='table table-bordered'>
                    <thead>
                        <tr>
                            <td>S.no</td>
                            <td>Project Name</td>
                            <td>Description</td>
                            <td>Technologies</td>
                            <td>Deadlines</td>
                            <td>Project Members</td>
                            <td>Status</td>
                            <td>Client</td>
                            <td>Budget</td>
                            <td>Priority</td>
                            <td>Edit</td>
                            <td>Delete</td>
                            <td>View</td>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredData.map((item, idx) => {
                            return (
                                <tr key={idx}>
                                    {editIdx === idx ? (
                                        <>
                                            <td>{item.id}</td>
                                            <td><input name="projectname" value={editedRow.projectname} onChange={handleInputChange} /></td>
                                            <td><input name="description" value={editedRow.description} onChange={handleInputChange} /></td>
                                            <td><input name="technologies" value={editedRow.technologies} onChange={handleInputChange} /></td>
                                            <td><input name="deadlines" value={editedRow.deadlines} onChange={handleInputChange} /></td>
                                            <td><input name="projectMembers" value={editedRow.projectMembers} onChange={handleInputChange} /></td>
                                            <td><input name="status" value={editedRow.status} onChange={handleInputChange} /></td>
                                            <td><input name="client" value={editedRow.client} onChange={handleInputChange} /></td>
                                            <td><input name="budget" value={editedRow.budget} onChange={handleInputChange} /></td>
                                            <td><input name="priority" value={editedRow.priority} onChange={handleInputChange} /></td>
                                            <td><button className='btn btn-success' onClick={handleSave}>Save</button></td>
                                            <td><button className='btn btn-danger' onClick={() => setEditIdx(-1)}>Cancel</button></td>
                                        </>
                                    ) : (
                                        <>
                                            <td>{item.id}</td>
                                            <td>{item.projectname}</td>
                                            <td>{item.description}</td>
                                            <td>{item.technologies}</td>
                                            <td>{item.deadlines}</td>
                                            <td>{item.projectMembers}</td>
                                            <td>{item.status + "%"}</td>
                                            <td>{item.client}</td>
                                            <td>{item.budget}</td>
                                            <td>{item.priority}</td>
                                            <td><button className='btn btn-primary' onClick={() => handleEdit(idx)}>Edit</button></td>
                                            <td><button className='btn btn-danger' onClick={() => handleDelete(item.id)}>Delete</button></td>
                                            <td><button className='btn btn-info' onClick={() => handleShow(item)}>View</button></td>
                                        </>
                                    )}
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Add Project</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="row">
                                    <label htmlFor="projectname" className="col-sm-4 col-form-label">Project Name</label>
                                    <div className="col-sm-8">
                                        <input type="text" className="form-control" id="projectname" name="projectname" value={newProject.projectname} onChange={handleNewProjectChange} />
                                    </div>
                                </div>
                                <div className="row">
                                    <label htmlFor="description" className="col-sm-4 col-form-label">Description</label>
                                    <div className="col-sm-8">
                                        <input type="text" className="form-control" id="description" name="description" value={newProject.description} onChange={handleNewProjectChange} />
                                    </div>
                                </div>
                                <div className="row">
                                    <label htmlFor="technologies" className="col-sm-4 col-form-label">Technologies</label>
                                    <div className="col-sm-8">
                                        <input type="text" className="form-control" id="technologies" name="technologies" value={newProject.technologies} onChange={handleNewProjectChange} />
                                    </div>
                                </div>
                                <div className="row">
                                    <label htmlFor="deadlines" className="col-sm-4 col-form-label">Deadlines</label>
                                    <div className="col-sm-8 mb-1">
                                        <input type="date" className="form-control mb-4" id="deadlines" name="deadlines" value={newProject.deadlines} onChange={handleNewProjectChange} />
                                    </div>
                                </div>
                                <div className="row">
                                    <label htmlFor="projectMembers" className="col-sm-4 col-form-label">Project Members</label>
                                    <div className="col-sm-8">
                                        <input type="text" className="form-control" id="projectMembers" name="projectMembers" value={newProject.projectMembers} onChange={handleNewProjectChange} />
                                    </div>
                                </div>
                                <div className="row">
                                    <label htmlFor="status" className="col-sm-4 col-form-label">Status</label>
                                    <div className="col-sm-8">
                                        <input type="text" className="form-control" id="status" name="status" value={newProject.status} onChange={handleNewProjectChange} />
                                    </div>
                                </div>
                                <div className="row">
                                    <label htmlFor="client" className="col-sm-4 col-form-label">Client</label>
                                    <div className="col-sm-8">
                                        <input type="text" className="form-control" id="client" name="client" value={newProject.client} onChange={handleNewProjectChange} />
                                    </div>
                                </div>
                                <div className="row">
                                    <label htmlFor="budget" className="col-sm-4 col-form-label">Budget</label>
                                    <div className="col-sm-8">
                                        <input type="text" className="form-control" id="budget" name="budget" value={newProject.budget} onChange={handleNewProjectChange} />
                                    </div>
                                </div>
                                <div className="row">
                                    <label htmlFor="priority" className="col-sm-4 col-form-label">Priority</label>
                                    <div className="col-sm-8">
                                        <input type="text" className="form-control" id="priority" name="priority" value={newProject.priority} onChange={handleNewProjectChange} />
                                    </div>
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={handleAddProject}>Save changes</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;
