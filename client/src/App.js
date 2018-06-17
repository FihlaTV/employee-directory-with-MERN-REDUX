import React, { Component } from 'react';
import './App.css';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Input from '@material-ui/core/Input';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import StarIcon from '@material-ui/icons/Star';
import HomeIcon from '@material-ui/icons/Home';
import LibraryBooks from '@material-ui/icons/LibraryBooks';
import Smartphone from '@material-ui/icons/Smartphone';
import Business from '@material-ui/icons/Business';
import People from '@material-ui/icons/People';
import Tv from '@material-ui/icons/Tv';
import Apps from '@material-ui/icons/Apps';
import PersonAdd from '@material-ui/icons/PersonAdd';
import LocalDining from '@material-ui/icons/LocalDining';
import LocalHospital from '@material-ui/icons/LocalHospital';
import AirplanemodeActive from '@material-ui/icons/AirplanemodeActive';
import DirectionsRun from '@material-ui/icons/DirectionsRun';
import Pets from '@material-ui/icons/Pets';
import { BrowserRouter as Router, Redirect, Link, NavLink, Switch} from 'react-router-dom';
import Route from 'react-router-dom/Route';
import user01 from './img/user01.jpg';
import employ from './img/employ.png';
import user03 from './img/user03.png';
import user02 from './img/user02.jpg';
import AddEmployee from './AddEmployee.js';
import ViewEmployees from './ViewEmployee.js';
import { Provider } from 'react-redux';
import store from './store';
import Delete from '@material-ui/icons/Delete';
import Work from '@material-ui/icons/Work';
import CloudUpload from '@material-ui/icons/CloudUpload';



class Header extends Component {
  state = {
    top: false,
    left: false,
    bottom: false,
    right: false,
  };

  toggleDrawer = (side, open) => () => {
    this.setState({
      [side]: open,
    });
  };
  render () {

    const sideList = (
     
      <div style={{width:'250px'}}>
      <div style={{width: '100%',maxWidth: 360, backgroundColor: 'theme.palette.background.paper'}}>
      <List component="nav">

     
        <ListItem button>
          <ListItemIcon>
          <Apps style={{ margin: 'theme.spacing.unit * 2'}} color="action" />
          </ListItemIcon>
          <ListItemText inset primary='Navigation' />
        </ListItem>
        
        <Divider/>

      <Link to="/" style={{'textDecoration':'none'}} >
        <ListItem button>
          <ListItemIcon>
          <HomeIcon style={{ margin: 'theme.spacing.unit * 2'}} color="action" />
          </ListItemIcon>
          <ListItemText inset primary='Home' />
        </ListItem>
        </Link>

        <Link to="/AddEmployee" style={{'textDecoration':'none'}}>
        <ListItem button>
          <ListItemIcon>
          <PersonAdd style={{ margin: 'theme.spacing.unit * 2'}} color="action" />
          </ListItemIcon>
          <ListItemText inset primary="Add New Employee" />
        </ListItem>
        </Link>
        
        <Link to="/Employees" style={{'textDecoration':'none'}}>
        <ListItem button>
          <ListItemIcon>
          <Smartphone style={{ margin: 'theme.spacing.unit * 2'}} color="action" />
          </ListItemIcon>
          <ListItemText inset primary="View Employees" />
        </ListItem>
        </Link>

      </List>
    </div>
      </div>
      
      
    );

    const fullList = (
      <div style={{width:'auto'}}>
        <List></List>
        <Divider />
        <List></List>
      </div>
    );

    return (

    <div>
      <header className="header" style={{flexGrow: '1'}}>

        <AppBar position="static" style={{'backgroundColor':"#fff"}}>
          <Toolbar>
            <IconButton style={{marginLeft: '-12', marginRight:'20'}} color="inherit" aria-label="Menu">
              <MenuIcon onClick={this.toggleDrawer('left', true)} style={{color:'#606060'}}/>
            </IconButton>
           <Typography variant="title" color="inherit" style={{flex:1, color:'#606060'}} >
               Employee Directory
           </Typography>
            <Link to="/AddEmployee" style={{'textDecoration':'none'}}>
            <Button variant="outlined" color="primary" style={{border:'1px solid #0D47A1',color:'#0D47A1',
             margin: 'theme.spacing.unit', 'backgroundColor':'#fff'}}>
            <PersonAdd />
            </Button>
            </Link>
          </Toolbar>
        </AppBar>
     
        <SwipeableDrawer
          open={this.state.left}
          onClose={this.toggleDrawer('left', false)}
          onOpen={this.toggleDrawer('left', true)}
        >
          <div
            tabIndex={0}
            role="button"
            onClick={this.toggleDrawer('left', false)}
            onKeyDown={this.toggleDrawer('left', false)}
          >
            {sideList}
          </div>
        </SwipeableDrawer>
      </header>
      </div>

);
}
}

class Main extends Component {
  render () {
    return (
      <div>
      <Route  path = "/" exact strict component={Home}/>
        <Route path="/AddEmployee" exact strict component={AddEmployee}/>
        <Route path="/Employees" exact strict component={ViewEmployees}/>
        </div>
    );
  }
}

class Home extends Component {
  render () {
    return (
      <div style={{display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'space-around',
      overflow: 'hidden',
      backgroundColor: 'theme.palette.background.paper'}}>
          <div>
             <img src={user01} style={{width:'100%',height:'100%'}} />
          </div>

          
          <Card style={{width: 1400,height:300, margin: '10px',display:'inline-block', backgroundColor:'#0D47A1'}} >
          <div align = "center">
           <CardContent>
             <Typography gutterBottom variant="headline" component="h2" style={{color:'#fff',textAlign:'center',
             marginTop:'7%', fontSize:'35px'}}>
            All your employees' data, stored in one place.
             </Typography>
             <Button variant="outlined" color="primary" style={{color:'#0D47A1', margin: 'theme.spacing.unit', 'backgroundColor':'#fff'}}>
            Get Started
            </Button>
           </CardContent>
           </div>
         </Card>
    
          
    </div>
  
    );
  }
}

class App extends Component {
  render() {
    return (
      <Provider store={store}>
      <Router>
      <div className="App">
        <Header/>
        <Main/>
      </div>
      </Router>
      </Provider>
    );
  }
}

export default App;
