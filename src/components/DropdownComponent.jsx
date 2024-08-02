import React from 'react';

const ProjectDropdown = ({ projects, onProjectSelect }) => {
  const handleChange = (event) => {
    onProjectSelect(event.target.value);
  };

  return (
    <select onChange={handleChange}>
      <option value="">Select a project</option>  
      {projects.map((project) => (
        <option key={project.id} value={project.id}>
          {project.title}
        </option>
      ))}
    </select>
  );
};

export default ProjectDropdown;
