import { FETCH_EMPLOYEES, ADD_EMPLOYEE, EDIT_EMPLOYEE, DELETE_EMPLOYEE } from './types';
import axios from 'axios';

export const fetchEmployees = () => dispatch => {
        fetch('/notes')
        .then(res => res.json())
        .then(posts => dispatch({
            type: FETCH_EMPLOYEES,
            payload: posts
        }));
}

export const addEmployee = (formData) => dispatch => {
    console.log('Action Called');
    axios.post('/notes', formData)
    .then(post => dispatch({
        type: ADD_EMPLOYEE,
        payload: post
    }));

}

export const deleteEmployee = (id, formData) => dispatch => {
    fetch('/notes/'+id,{
        method: 'DELETE',
        body: formData
      })
      .then(post => dispatch({
        type: DELETE_EMPLOYEE,
        payload: post
    }));

}

export const editEmployee = (id, formEditData) => dispatch => {
    fetch('/notes/'+id, {
        method: 'PUT',
        body:formEditData
      })
      .then(post => dispatch({
        type: EDIT_EMPLOYEE,
        payload: post
    }));

}




