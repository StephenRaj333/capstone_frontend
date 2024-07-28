import React, { useEffect, useState } from 'react';
import Axios from 'axios';

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

    useEffect(() => {       
        Axios.get("http://localhost:3000/get")
            .then((res) => {    
                setTableData(res.data);
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
        Axios.put(`http://localhost:3000/update/${editedRow.id}`, editedRow)
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
        Axios.delete(`http://localhost:3000/delete/${id}`)
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
        Axios.post("http://localhost:3000/add", newProject) 
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

    return (
        <div className='home'>
            <div className='d-flex justify-content-between align-items-center w-100 pt-4 pb-4 position-sticky top-0 bg-white'>
                <h4>Project Management Tool</h4>
                <button type="button" className="btn btn-success" data-bs-toggle="modal" data-bs-target="#exampleModal">Add Project</button>
            </div>
            <div className='table-container'>
                <table className='table table-bordered'>
                    <thead> 
                        <tr>
                            <td>id</td>
                            <td>projectname:</td>
                            <td>description:</td>
                            <td>technologies:</td>
                            <td>deadlines:</td>
                            <td>projectMembers:</td>
                            <td>status:</td>
                            <td>client:</td>
                            <td>budget:</td>
                            <td>priority:</td>
                            <td>Edit</td>
                            <td>Delete</td>
                        </tr>
                    </thead>
                    <tbody>
                        {tableData.map((item, idx) => {
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
                                            <td>{item.status}</td>
                                            <td>{item.client}</td>
                                            <td>{item.budget}</td>
                                            <td>{item.priority}</td>
                                            <td><button className='btn btn-primary' onClick={() => handleEdit(idx)}>Edit</button></td>
                                            <td><button className='btn btn-danger' onClick={() => handleDelete(item.id)}>Delete</button></td>
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
