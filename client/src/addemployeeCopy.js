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

export default class AddEmployee extends Component {
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
        };

      this.onChoose = this.onChoose.bind(this);
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }
  // state = {
  //   selectedFile: null,
  //   firstname: '',
  //   lastname: '',
  //   dob: '',
  //   gender: '',
  //   department: '',
  //   role: '',
  //   phone: '',
  //   email: '',
  //   address: '',
  // }
  
    onChange (e) {
      this.setState({selectedFile: e.target.files[0]});
      
    }
    
    onChoose (e) {
      this.setState({[e.target.name]: e.target.value});
    }
    // cancelCourse = ()=> { 
     
    // }
    onSubmit (e) {
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
      axios.post('http://localhost:8000/notes', formData)
      .then(res =>{
        console.log(res);
      });
     
      
 
      // const post = {
      //   "firstname": this.state.firstname,
      //   "lastname": this.state.lastname,
      //   "dob":this.state.dob,
      //   "gender":this.state.gender,
      //   "department":this.state.department,
      //   "role":this.state.role,
      //   "phone":this.state.phone,
      //   "email":this.state.email,
      //   "address":this.state.address
       
      // }
    

      // fetch('http://localhost:8000/notes', {
      //   method: 'POST',
      //   headers: {
      //     'content-type': 'application/json'
      //   },
      //   body: JSON.stringify(post)
      // })
      // .then(res => res.json())
      // .then(data => console.log(data));

      

     
      // this.setState({
      //   firstname: "",
      //   lastname: "",
      //   dob: "",
      //   gender: "",
      //   avatar:"",
      //   department:"",
      //   role: "",
      //   phone:"",
      //   email:"",
      //   address:""

      // });
    }
  render () {
    return (
      <div style={{display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'space-around',
      overflow: 'hidden',
      backgroundColor: 'theme.palette.background.paper'}}>
     <Card style={{ width: 550, margin: '10px'}}>
        <CardContent>

             <form onSubmit={this.onSubmit}>
             <Typography variant="title" color="inherit" style={{flex:1, color:'#000', 'fontSize':'30px', padding:'5px'}} >
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
        
     

     
     
     <Button type="submit" variant="raised" color="secondary" style={{backgroundColor:'#3f51b5',margin:'10px', 'textAlign':'center', width: '100%'}}>
        Submit
      </Button>
    </form>
         
        </CardContent>
       
      </Card>
        
        </div>
    );
  }
}