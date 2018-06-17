import React, { Component } from 'react';
import './App.css';
import { withStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import AccountCircle from '@material-ui/icons/AccountCircle';
import FormControl from '@material-ui/core/FormControl';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import PersonAdd from '@material-ui/icons/PersonAdd';
import axios from 'axios';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addEmployee } from './actions/postActions';

class AddEmployee extends Component {
    constructor () {
        super ();
        this.state = {
          selectedFile: null,
            firstname: '',
            lastname: '',
            dob: '',
            gender: '',
            department: '',
            role: '',
            phone: '',
            email: '',
            address: '',
            isSubmitted: false
            
        };

      this.onChoose = this.onChoose.bind(this);
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }
 
    onChange (e) {
      this.setState({selectedFile: e.target.files[0]});
      
    }
    
    onChoose (e) {
      this.setState({[e.target.name]: e.target.value});
    }
  
    onSubmit (e) {

      if(this.state.firstname === '' ||
      this.state.lastname === '' ||
      this.state.dob === '' ||
      this.state.gender === '' ||
      this.state.role === '' ||
      this.state.department === '' ||
      this.state.email === '' ||
      this.state.phone === '' ||
      this.state.address === '' ||
      this.state.selectedFile === null  )
      {
        alert('Please fill all fields');
        
      } else {
        e.preventDefault();
        const formData = new FormData();
       formData.append('avatar', this.state.selectedFile);
        formData.append("firstname", this.state.firstname);
        formData.append("lastname", this.state.lastname);
        formData.append("dob", this.state.dob);
        formData.append("gender", this.state.gender);
        formData.append("department", this.state.department);
        formData.append("role", this.state.role);
        formData.append("phone", this.state.phone);
        formData.append("email", this.state.email);
        formData.append("address", this.state.address);
  
        this.props.addEmployee(formData);
       
        this.setState({isSubmitted: true});

       }
       return false;
      }

  render () {

    if(this.state.isSubmitted === true){
      window.location.reload();
    }
    return (
      <div style={{display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'space-around',
      overflow: 'hidden',
      backgroundColor: 'theme.palette.background.paper'}}>
    
   
     <Card style={{ width: 550, margin: '10px', marginTop:'20px'}}>
        <CardContent>

             <form onSubmit={this.onSubmit}>
             <Typography variant="title" color="inherit" style={{flex:1, color:'#606060', 'fontSize':'25px', padding:'5px'}} >
             <PersonAdd />
               Add Employee
           </Typography>
           <Divider/>
     
        <TextField
        style={{ width: 500, margin: '10px'}}
        id="input-with-icon-textfield"
        label="Firstname"
        type="text"
        onChange={this.onChoose}
        name="firstname"
        value={this.state.firstname}
       
      />

       <TextField
        style={{ width: 500, margin: '10px'}}
        id="input-with-icon-textfield"
        label="Lastname"
        type="text"
        onChange={this.onChoose}
        name="lastname"
        value={this.state.lastname}
       
      />

        <TextField
        style={{ width: 500, margin: '10px'}}
        id="input-with-icon-textfield"
        label="Date Of Birth (dd/mm/yyyy)"
        onChange={this.onChoose}
        name="dob"
        value={this.state.dob}
        
      />

       <TextField
        style={{ width: 500, margin: '10px'}}
        id="input-with-icon-textfield"
        label="Gender (Male/Female)"
        onChange={this.onChoose}
        name="gender"
        value={this.state.gender}
      
      />  

        <TextField
        style={{ width: 500, margin: '10px'}}
        id="input-with-icon-textfield"
        label="Avatar"
        type="file"
        name="avatar"
        onChange={this.onChange}
        
        /> 

            <TextField
        style={{ width: 500, margin: '10px'}}
        id="input-with-icon-textfield"
        label="Department"
        name="department"
        onChange={this.onChoose}
        value={this.state.department}
      
      />

      <TextField
        style={{ width: 500, margin: '10px'}}
        id="input-with-icon-textfield"
        label="Role"
        name="role"
        onChange={this.onChoose}
        value={this.state.role}
       
      />

       <TextField
        style={{ width: 500, margin: '10px'}}
        id="input-with-icon-textfield"
        label="Phone Number"
        name="phone"
        onChange={this.onChoose}
        value={this.state.phone}
       
      />

       <TextField
        style={{ width: 500, margin: '10px'}}
        id="input-with-icon-textfield"
        label="E-mail"
        onChange={this.onChoose}
        name="email"
        value={this.state.email}
        
      />

       <TextField
        style={{ width: 500, margin: '10px'}}
        id="input-with-icon-textfield"
        label="Address"
        onChange={this.onChoose}
        name="address"
        value={this.state.address}
        
      />  
    
        <Button type="submit" variant="raised" color="secondary" style={{backgroundColor:'#0D47A1',margin:'10px', 'textAlign':'center', width: '100%'}}>
          Submit
        </Button>
      </form>
    </CardContent>
  </Card>
 </div>
    );
  }
}
AddEmployee.propTypes = {
  addEmployee: PropTypes.func.isRequired
}

export default connect (null, { addEmployee })(AddEmployee);