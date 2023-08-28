import {useState, useEffect} from 'react'
import axios from 'axios'
import { useProjectsContext } from '../hooks/useProjectsContext'

// react-icons
import {IoMdArrowRoundBack} from 'react-icons/io'

const ProjectDetails = ({project}) => {
  const {dispatch} = useProjectsContext()

  // Editing State
  const [isEditing, setIsEditing] = useState(false)
  //state for our edit form:
  const [editTitle, setEditTitle] = useState(project.title)
  const [editImage, setEditImage] = useState(project.image)
  const [editPrototype_url, setEditPrototype_url] = useState(project.prototype_url)
  const [editDescription, setEditDescription] = useState(project.description)

  const handleEdit = () => {
    setIsEditing(true)
  }

  const handleCancelEdit = () => {
    setEditTitle(project.title)
    setEditImage(project.image)
    setEditPrototype_url(project.prototype_url)
    setEditDescription(project.description)
    setIsEditing(false)
  }

  const handleSubmitEdit = async() => {
    const updateProject = {
      title: editTitle,
      image: editImage,
      prototype_url: editPrototype_url,
      description: editDescription
    }

    try {
      const response = await axios.patch(
        `http://localhost:4000/api/projects/${project._id}`,
        updateProject
      )
      const updatedData = response.data

      if (response.status === 200) {
        console.log(updateProject);
        dispatch({type: 'UPDATE_PROJECT', payload: updatedData})
        setIsEditing(false)
      }
    } catch (error) {
      console.error('Error updating project:',error);
    }
  }

  const handleDelete = async() => {
    const response = await axios.delete(`http://localhost:4000/api/projects/${project._id}`)
    const json = await response.data
    
    if(response.status === 200) {
      console.log(json, 'is deleted');
      dispatch({type: 'DELETE_PROJECT', payload: json})
    }
  }

  const user = JSON.parse(localStorage.getItem('user'))
  const user_id = user.username

  return (
    <div>
      {isEditing ? (
        <div className='edit-detail'>

          <label>Edit Title</label>
          <input
            type='text'
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
          />

          <label>Edit Image</label>
          <input
            type='file'
            accept='image/*'
            onChange={(e) => setEditImage(e.target.files[0])}
          />

          <label>Link to Prototype</label>
          <input
            type='text'
            value={editPrototype_url}
            onChange={(e) => setEditPrototype_url(e.target.value)}
          />

          <label>Project Description</label>
          <input
            type='text'
            value={editDescription}
            onChange={(e) => setEditDescription(e.target.value)}
          />

          <button className='save-edit' onClick={handleSubmitEdit}>Save</button>
          <button className='cancel-edit' onClick={handleCancelEdit}>Cancel</button>

        </div>
        ) : (
        <div className='detail-page'>
          <h3>{project.title}</h3>
          <p>Project Owner: {project.user_id}</p>
          {project.image && (
            <img
              src = {`http://localhost:4000/public/uploads/${project.image}`}
              alt = {project.title}
            />
          )}

          <p>{project.description}</p>
          <h5>Prototype</h5>
          <p>{project.prototype_url}</p>
          {project.user_id === user_id &&
          <>
            <p>
              <span className='edit' onClick ={handleDelete}>
              Edit 
              </span>
              |
              <span className='delete' onClick={handleEdit}> 
                Delete
              </span>
              </p>
          </>
          }
          <div>
            <IoMdArrowRoundBack/>
            <span>Go Back</span>
          </div>

        </div>
      )}
    </div>
  )
}

export default ProjectDetails
