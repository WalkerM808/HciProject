//react
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'

//redux
import {connect} from 'react-redux';
import {loginUser} from '../redux/actions/userActions';

//material-ui
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/button'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import withStyles from '@material-ui/core/styles/withStyles'
import Divider from '@material-ui/core/Divider'


//material-ui styles for component elements
const styles = {
    form: {
        textAlign: 'Left'
        
    },
    pageTitle: {
        margin: '300px auto auto auto'
    },
    textField: {
        margin: '5px auto 5px auto'
        
    },
    button: {
        margin: '20px auto auto auto'
    },
    customError:{
        color: 'red',
        fontSize: '0.8rem'
    },
}



class login extends Component {
    constructor() {
      super();
      this.state = {
        email: '',
        password: '',
        errors: {}
      };
    }
    componentWillReceiveProps(nextProps) {
      if (nextProps.UI.errors) {
        this.setState({ errors: nextProps.UI.errors });
      }
    }

    submit = (e) => {
        e.preventDefault();
        const userData = {
          email: this.state.email,
          password: this.state.password
        };
        this.props.loginUser(userData, this.props.history);
      };

    //updates the components state when the text fields are eddited
    setChanges = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    };


    render() {

        const {classes} = this.props;
        const {errors} = this.state;

        //Grids that hold textFields and buttons
        return (
            <Grid container className={classes.form}>
                <Grid item sm>
                    
                    <Typography variant="h3" className={classes.pageTitle}>
                        Login
                    </Typography>
                    <form noValidate onSubmit={this.submit}>
                        <TextField id="email" name="email" type="email" label="Email:" className={classes.textField} value={this.state.email} onChange={this.setChanges} helperText={errors.email} error={errors.email ? true : false} fullWidth/>
                        <TextField id="password" name="password" type="password" label="Password:" className={classes.textField} value={this.state.password} onChange={this.setChanges} helperText={errors.password} error={errors.password ? true : false} fullWidth/>
                        {errors.general && (
                            <Typography variant="body2" className={classes.customError}>
                                {errors.general}
                            </Typography>
                        )}
                        <Grid container className={classes.form}>
                            <Grid item sm>
                                <Button type="submit" variant="contained" colors="secondary" className={classes.button}>Login</Button>
                            </Grid>
                            <Grid item sm/>
                            
                            <Grid item sm/>
                            <Grid item sm>
                                <Button type="button" variant="contained" colors="secondary" className={classes.button} component={Link} to = "/Signup">Signup</Button>
                            </Grid>
                        </Grid>
                        
                        
                    </form>
                </Grid>
                <Grid item sm/>
                <Grid item sm>
                <Typography variant="h3" className={classes.pageTitle}> Quiz App</Typography>
                <Divider></Divider>
                <Typography variant="h6" colors="secondary" className={classes.textField}> Quiz App is a product designed to help students and professors teach and study. You can create 
                short quizzes that can help you gauge your knowledge on important subjects.</Typography>
                </Grid>

            </Grid>
        )
    }
}

login.propTypes = {
    classes: PropTypes.object.isRequired,
    loginUser: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
    UI: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    user: state.user,
    UI: state.UI
});

const mapActionsToProps = {
    loginUser
}

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(login))
