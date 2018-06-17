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
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import CircularProgress from '@material-ui/core/CircularProgress';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import PersonAdd from '@material-ui/icons/PersonAdd';
import user01 from './img/user01.png';
import { connect } from 'react-redux';
import { fetchEmployees, deleteEmployee, editEmployee } from './actions/postActions';
import PropTypes from 'prop-types';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Delete from '@material-ui/icons/Delete';
import Create from '@material-ui/icons/Create';
import Tooltip from '@material-ui/core/Tooltip';
import { BrowserRouter as Router, Redirect, Link, NavLink, Switch} from 'react-router-dom';

const ITEM_HEIGHT = 48;

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

class ViewEmployees extends Component {

  constructor (){
    super();
    this.state = {
      selectedFileEdit: null,
      firstnameEdit: '',
      lastnameEdit: '',
      dobEditEdit: '',
      genderEdit: '',
      departmentEdit: '',
      roleEdit: '',
      phoneEdit: '',
      emailEdit: '',
      addressEdit: '',
      id:''
      
    };

    this.onChoose = this.onChoose.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  
  }

  componentDidMount () {
    this.props.fetchEmployees();
  }

  onChange (e) {
    this.setState({selectedFileEdit: e.target.files[0]});
    
  }
  
  onChoose (e) {
    this.setState({[e.target.name]: e.target.value});
  }

  handleEditOpen = (employee) => {
    this.setState({openEditDialog: true,
      id:employee._id,
      firstnameEdit: employee.details.firstname,
      lastnameEdit: employee.details.lastname,
      dobEdit: employee.details.dob,
      genderEdit: employee.details.gender,
      departmentEdit: employee.details.department,
      roleEdit: employee.details.role,
      addressEdit: employee.details.address,
      // selectedFileEdit: employee.details.imgpath,
      phoneEdit: employee.details.phone,
      emailEdit: employee.details.email});
  };

  onSubmit(e){
    e.preventDefault();
    const id = this.state.id;
    console.log(id);
    const formEditData = new FormData();
    formEditData.append('firstname',this.state.firstnameEdit);
    formEditData.append('lastname',this.state.lastnameEdit);
    formEditData.append('gender',this.state.genderEdit);
    formEditData.append('dob',this.state.dobEdit);
    formEditData.append('department',this.state.departmentEdit);
    formEditData.append('role',this.state.roleEdit);
    formEditData.append('phone',this.state.phoneEdit);
    formEditData.append('email',this.state.emailEdit);
    formEditData.append('address',this.state.addressEdit);
    formEditData.append('avatar', this.state.selectedFileEdit);

    this.props.editEmployee(id, formEditData);

  }

  handleCloseEdit = () => {
    this.setState({ openEditDialog: false });
  };

  state = {
    open: false,
    anchorEl: null,
    isDelete: false,
    openEditDialog: false
  };

  handleClickOpen = (employee) => {
    this.setState({ open: true,
                    firstname: employee.details.firstname,
                    lastname: employee.details.lastname,
                    dob: employee.details.dob,
                    gender: employee.details.gender,
                    department: employee.details.department,
                    role: employee.details.role,
                    address: employee.details.address,
                    imgpath: employee.details.imgpath,
                    phone: employee.details.phone,
                    email: employee.details.email});
  };

  handleDelete = (employee) => {
      const id = employee._id;
    const formData = new FormData();
    formData.append('_id',employee._id);
    formData.append('firstname',employee.details.firstname);
    formData.append('lastname',employee.details.lastname);
    formData.append('dob',employee.details.dob);
    formData.append('gender',employee.details.gender);
    formData.append('department',employee.details.department);
    formData.append('role',employee.details.role);
    formData.append('email',employee.details.email);
    formData.append('phone',employee.details.phone);
    formData.append('address',employee.details.address);
    formData.append('imgpath',employee.details.imgpath);

  this.props.deleteEmployee(id,formData);

  this.setState({isDelete: true});
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render () {
    const { anchorEl } = this.state;
  if(this.state.isDelete === true){
    window.location.reload();
  }
    
    return (
        <div style ={{display: 'fle',
        flexWrap: 'wra',
        justifyContent: 'space-aroun',
        overflow: 'hidde', marginTop:'0px', marginLeft:'30px'}}>


          <Dialog
            open={this.state.open}
            onClose={this.handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description">
            
                <DialogTitle id="alert-dialog-title"><img src={process.env.PUBLIC_URL + this.state.imgpath}
                    style={{borderRadius:"50%", width:'300px', height:'auto'}} />
                </DialogTitle>
          
          <DialogContent>
                <DialogContentText id="alert-title" variant="headline" component="h2" 
                style={{fontSize:'35px', color:'#202020'}}>
                {this.state.firstname + ' ' + this.state.lastname}
                </DialogContentText>

                <DialogContentText id="alert-title"
                style={{fontSize:''}}>
                {this.state.role}
                </DialogContentText>

                <Divider style={{marginTop: '10px', marginBottom:'10px'}}/>

                <DialogContentText id="alert-title" 
                style={{fontSize:''}}>
                {"Department:" + '   ' + this.state.department}
                </DialogContentText>

                <DialogContentText id="alert-title" 
                style={{fontSize:''}}>
                {"Gender:" + '   ' + this.state.gender}
                </DialogContentText>

                  <DialogContentText id="alert-title" 
                style={{fontSize:''}}>
                {"Date Of Birth:" + '   ' + this.state.dob}
                </DialogContentText>

                <DialogContentText id="alert-title" 
                style={{fontSize:''}}>
                {"Email:" + '   ' + this.state.email}
                </DialogContentText>

                <DialogContentText id="alert-title" 
                style={{fontSize:''}}>
                {"Phone:" + '   ' + this.state.phone}
                </DialogContentText>

                <DialogContentText id="alert-title" 
                style={{fontSize:''}}>
                {"Address:" + '   ' + this.state.address}
                </DialogContentText>

          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary" autoFocus>
              Close
            </Button>
          </DialogActions>
        </Dialog>

    {/* Edit Dialog Goes Here */}

                <Dialog
          fullScreen
          open={this.state.openEditDialog}
          onClose={this.handleCloseEdit}
          TransitionComponent={Transition}
        >
          <AppBar style={{position: 'relative', backgroundColor:'#fff'}}>
            <Toolbar>
              <IconButton color="inherit" onClick={this.handleCloseEdit} aria-label="Close">
                <CloseIcon style={{color:'#606060'}} />
              </IconButton>
              <Typography variant="title" color="inherit" style={{flex: 1, color:'#606060'}}>
                Edit Employee Details
              </Typography>
              <Button color="inherit" onClick={this.handleCloseEdit} style={{border:'1px solid #0D47A1',color:'#0D47A1'}}>
                Close
              </Button>
            </Toolbar>
          </AppBar>
          <div style={{display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'space-around',
      overflow: 'hidden',
      backgroundColor: 'theme.palette.background.paper'}}>
    
   
     <Card style={{ width: 550, margin: '10px', marginTop:'20px'}}>
        <CardContent>

             <form onSubmit={this.onSubmit}>
            
        <TextField
        style={{ width: '43%', margin: '10px'}}
        id="input-with-icon-textfield"
        label="Firstname"
        type="text"
        onChange={this.onChoose}
        name="firstnameEdit"
        value={this.state.firstnameEdit}
       
      />

       <TextField
        style={{ width: '43%', margin: '10px'}}
        id="input-with-icon-textfield"
        label="Lastname"
        type="text"
        onChange={this.onChoose}
        name="lastnameEdit"
        value={this.state.lastnameEdit}
       
      />

        <TextField
        style={{ width: '43%', margin: '10px'}}
        id="input-with-icon-textfield"
        label="DOB (dd/mm/yyyy)"
        onChange={this.onChoose}
        name="dobEdit"
        value={this.state.dobEdit}
        
      />

       <TextField
        style={{ width: '43%', margin: '10px'}}
        id="input-with-icon-textfield"
        label="Gender (M/F)"
        onChange={this.onChoose}
        name="genderEdit"
        value={this.state.genderEdit}
      
      />  

        <TextField
        style={{ width: '90%', margin: '10px'}}
        id="input-with-icon-textfield"
        label="Avatar"
        type="file"
        name="avatar"
        onChange={this.onChange}
        
        
        /> 

            <TextField
        style={{ width: '43%', margin: '10px'}}
        id="input-with-icon-textfield"
        label="Department"
        name="departmentEdit"
        onChange={this.onChoose}
        value={this.state.departmentEdit}
      
      />

      <TextField
        style={{ width: '43%', margin: '10px'}}
        id="input-with-icon-textfield"
        label="Role"
        name="roleEdit"
        onChange={this.onChoose}
        value={this.state.roleEdit}
       
      />

       <TextField
        style={{ width: '43%', margin: '10px'}}
        id="input-with-icon-textfield"
        label="Phone Number"
        name="phoneEdit"
        onChange={this.onChoose}
        value={this.state.phoneEdit}
       
      />

       <TextField
        style={{ width: '43%', margin: '10px'}}
        id="input-with-icon-textfield"
        label="E-mail"
        onChange={this.onChoose}
        name="emailEdit"
        value={this.state.emailEdit}
        
      />

       <TextField
        style={{ width: '90%', margin: '10px'}}
        id="input-with-icon-textfield"
        label="Address"
        onChange={this.onChoose}
        name="addressEdit"
        value={this.state.addressEdit}
        
      />  
    
        <Button type="submit" variant="raised" color="secondary" 
        style={{backgroundColor:'#fff',margin:'10px',
        border:'1px solid #0D47A1',color:'#0D47A1', 'textAlign':'center', width: '90%'}}>
          Save
        </Button>
      </form>
    </CardContent>
  </Card>
 </div>
        </Dialog>

        {/*End of Edit Dialog*/}

          {this.props.posts.item ? this.props.posts.item.map(employee => 
        <Card key={employee._id} 
             style={{width: 300, margin: '10px', display:'inline-block',marginTop:'20px'}}>

              <img style={{width:'100%', height:'auto'}} 
              src={employee.details.imgpath}/>
         
          <CardContent>
                <Typography gutterBottom variant="headline" component="h2">
                  {employee.details.firstname + ' ' + employee.details.lastname}
                </Typography>
                <Typography component="p">
                  {employee.details.role}
                </Typography>
          </CardContent>
          <CardActions>
           
              <Button size="small" color="primary" style={{color:'#0D47A1'}} onClick={this.handleClickOpen.bind(this,employee)}>
                View Employee
              </Button>
            
           <div align="right" style={{marginLeft:'25%'}}>
           <Tooltip id="tooltip-icon" title="Edit">
              <Create className="edit" style={{color:'#bbb',cursor:'pointer' }} 
              onClick={this.handleEditOpen.bind(this,employee)}/>
            </Tooltip> 
            <Tooltip id="tooltip-icon" title="Delete">
              <Delete className="delete" style={{color:'#bbb',cursor:'pointer'}} onClick={this.handleDelete.bind(this,employee)}/>
            </Tooltip>
              </div>
          
          </CardActions>
        </Card>
          ): <div align="center"><CircularProgress style={{margin: 'theme.spacing.unit * 2',marginTop:'100px', color:'#0D47A1'}} color="secondary" /></div>
          } 
      </div>
    );
  }
}

const mapStateToProps = state => ({
  posts: state.posts.items
});

export default connect (mapStateToProps, { fetchEmployees,deleteEmployee,editEmployee })(ViewEmployees);
