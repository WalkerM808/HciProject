import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'

//material-ui
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/button'
import Paper from '@material-ui/core/Paper'
import withStyles from '@material-ui/core/styles/withStyles'
import Grid from '@material-ui/core/Grid'
import Divider from '@material-ui/core/Divider';
import Card from '@material-ui/core/Card';

//redux
import { connect } from 'react-redux'


//axios
import axios from 'axios'

//components
import Result from '../components/Result'




const styles = {
    form: {
        textAlign: 'Left'
        
    },
    pageTitle: {
        margin: '300px auto auto auto'
    },
    textField: {
        margin: '20px auto 5px auto'
        
    },
    button: {
        margin: '20px auto 20px auto'
    },
    customError:{
        color: 'red',
        fontSize: '0.8rem'
    },
    paper:{
        
        maxwidth: 200,
        marginBottom: 10 
    },
    profile: {

    },
    details: {
        marginLeft: 55,
        maxwidth: 200,
        marginBottom: 10 
    },
    
}




class Profile extends Component {
    constructor(props) {
        super(props);
        this.handleLogout = this.handleLogout.bind(this);
      }

    state = {
        results: null,
        
    }

    componentDidMount(){
        axios.get('/results')
            .then(res => {
                this.setState({
                    results: res.data
                })
            })
            .catch(err => console.log(err));
    }


    filterResults = (userName) => {
        
        let temp = [];
        var i;
        temp.push(<Typography variant="h4" >Your History</Typography>)
        for (i = 0; i < this.state.results.length; i++) {
            if(this.state.results[i].Name === userName.name){
                temp.push(<Result key = {Math.random()} result= {this.state.results[i]}/>);
            }
        } 
        
        return temp;
    };

    handleLogout(){
        console.log("ggggg")
        localStorage.removeItem('FBIdToken');
        delete axios.defaults.headers.common['Authorization'];
        window.location.reload(false);
    }




    render() {
        const {
            classes,
            user: {
              loading,
              authenticated
            }
          } = this.props;
          
          

          let name = this.props.user.userCredentials ? this.props.user.userCredentials.handle : null
          let resultMarkup;
          if({name}){
              
            resultMarkup = this.state.results ? this.filterResults({name}) : <p>Getting Data</p>
          }
          
          
          
        let profileMarkup = !loading ? (authenticated ? (
            <Card className ={classes.paper}>
                
                    <Grid container spacing={5}>      
                        <Typography variant="h4" className={classes.textField}>{name}</Typography>  
                          
                    </Grid>
                    
                    <Grid container spacing={5}>
                            
                        <Button type="button" variant="contained" colors="secondary" className={classes.button} component={Link} to = {'/users/'}>My Quizzes</Button>      
                    </Grid>
                    <Grid container spacing={5}>       
                        <Button type="button" variant="contained" colors="secondary" className={classes.button} component={Link} to = {'/create'}>Create a Quiz</Button>
                        
                    </Grid>
                    <Grid container spacing={5}>       
                        <Button type="button" variant="contained" colors="secondary" className={classes.button} onClick={this.handleLogout}>Logout</Button>
                        
                    </Grid>
                    
                    <Grid container spacing={5}>   
                    <Grid item  className ={classes.details}>    
                        <Divider/>
                          
                        {resultMarkup} 
                    </Grid>
                    
                    </Grid>
                    
                    
                
            </Card>
            

        ) : (
            <Paper className={classes.paper}>
                <Typography variant="h3" className={classes.textField}>
                        Please Login
                    </Typography>
            </Paper>
        )) : (<p>loading </p>)
        
        return profileMarkup;
        
    }
}


const mapStateToProps = (state) => ({
    user: state.user
  });

Profile.propTypes = {
    user: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired
}


export default connect(mapStateToProps)(withStyles(styles)(Profile));


