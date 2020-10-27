import React, { useState } from 'react'
import { connect } from 'react-redux'
import { createProject } from '../../store/actions/projectActions'
import {Redirect} from 'react-router-dom';
import {useForm} from 'react-hook-form';




const CreateProject = (props) => {
  console.log(props);

  const [project, setProject] = useState({});
  const { auth } = props;
  const { register, handleSubmit, watch, errors } = useForm();

  
  const handleChange = (e) => {
    project[e.target.id] = e.target.value;
    setProject(project);
  }
  
  const onSubmit = (e) => {
    console.log(e);
    e.preventDefault();
    console.log('Title: ' + project.title);
    console.log('Content: ' + project.content);
    props.createProject(project);
    props.history.push('/');
  }

  if (!auth.uid) {
    return (
      <Redirect to='/signin' />
    )
  }

  //          <input type="text" name='title' id='title' ref={register({required: 'Title is required', minLength: {value: 3, message: 'Minimum title length is 3'}})} onChange={handleChange} />

  //console.log(errors)
  return (
    <div className="container">
      <form className="white" onSubmit={onSubmit}>
        <h5 className="grey-text text-darken-3">Create a New Project</h5>
        <div className="input-field">
          <input className="validate" type="text" name='title' id='title' required minLength="3" onChange={handleChange} />
          <label htmlFor="title">Project Title</label>
          <span className="helper-text"></span>
        </div>
        <div className="input-field">
          <textarea name='content' id="content" className="materialize-textarea" ref={register({required: 'Project Content is required'})} onChange={handleChange} ></textarea>
          {errors.content && errors.content.message}

          <label htmlFor="content">Project Content</label>
        </div>
        <div className="input-field">
          <button className="btn pink lighten-1">Create</button>
        </div>
      </form>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth
  }
}
const mapDispatchToProps = dispatch => {
  return {
    createProject: (project) => dispatch(createProject(project))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateProject)