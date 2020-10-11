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
    // submit = (e) => {
    //     e.preventDefault();

    //     const userData ={
    //         email: this.state.email,
    //         password: this.state.password
    //     };
    //     this.props.loginUser(userData, this.props.history);
        
    // }

    handleSubmit = (event) => {
        event.preventDefault();
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
                                <Button type="button" variant="contained" colors="secondary" className={classes.button} component={Link} to = "/signup">Signup</Button>
                            </Grid>
                        </Grid>
                        
                        
                    </form>
                </Grid>
                <Grid item sm/>
                <Grid item sm/>

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
