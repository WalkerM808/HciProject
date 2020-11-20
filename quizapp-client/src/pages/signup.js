//react
import React, { Component } from 'react';
import PropTypes from 'prop-types';

//material-ui
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';

//redux
import {connect} from 'react-redux';
import {signupUser} from '../redux/actions/userActions';


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



class signup extends Component {
    constructor(){
        super();
        //state to handle email, password, and errors from the server
        this.state = {
            email: '',
            password: '',
            confirmPassword: '',
            handle: '',
            errors: {}
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.UI.errors) {
          this.setState({ errors: nextProps.UI.errors });
        }
      }

    //makes call to the server with the users info to sign in
    submit = (e) => {
        e.preventDefault();

        const newUserData ={
            email: this.state.email,
            password: this.state.password,
            confirmPassword: this.state.confirmPassword,
            handle: this.state.handle
        };

        this.props.signupUser(newUserData, this.props.history);
        
        
    }

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
                        Signup
                    </Typography>
                    <form noValidate onSubmit={this.submit}>
                        <TextField id="email" name="email" type="email" label="Email:" className={classes.textField} value={this.state.email} onChange={this.setChanges} helperText={errors.email} error={errors.email ? true : false} fullWidth/>
                        <TextField id="password" name="password" type="password" label="Password:" className={classes.textField} value={this.state.password} onChange={this.setChanges} helperText={errors.password} error={errors.password ? true : false} fullWidth/>
                        <TextField id="confirmPassword" name="confirmPassword" type="password" label="Confirm Password:" className={classes.textField} value={this.state.confirmPassword} onChange={this.setChanges} helperText={errors.confirmPassword} error={errors.confirmPassword ? true : false} fullWidth/>
                        <TextField id="handle" name="handle" type="text" label="Username:" className={classes.textField} value={this.state.handle} onChange={this.setChanges} helperText={errors.handle} error={errors.handle ? true : false} fullWidth/>
                        {errors.general && (
                            <Typography variant="body2" className={classes.customError}>
                                {errors.general}
                            </Typography>
                        )}
                        <Grid container className={classes.form}>
                            <Grid item sm>
                                <Button type="submit" variant="contained" colors="secondary" className={classes.button}>signup</Button>
                            </Grid>
                            <Grid item sm/>
                            <Grid item sm/>
                            <Grid item sm>
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

signup.propTypes = {
    classes: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
    UI: PropTypes.object.isRequired,
    signupUser: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
    user:state.user,
    UI: state.UI
})

export default connect(mapStateToProps, {signupUser})(withStyles(styles)(signup));
