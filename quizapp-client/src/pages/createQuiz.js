//react
import React, { Component } from 'react'
import {Link} from 'react-router-dom'

//material-ui
import Grid from '@material-ui/core/Grid'

//axios
import axios from 'axios'

//redux
import {connect} from 'react-redux';

//components
import Quiz from '../components/Quiz'
import Profile from '../components/Profile'

import Card  from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import TextField from '@material-ui/core/TextField'

import Button from '@material-ui/core/button'
import Typography from '@material-ui/core/Typography'
import withStyles from '@material-ui/core/styles/withStyles'
import Divider from '@material-ui/core/Divider'

const styles = {
    card: {
        display: 'flex',
        maxwidth: 200,
        marginBottom: 10 
    },
    content: {
        display: 'inline-block',
        
    },
    answerField: {
        margin: '20px auto 5px auto'
    },
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
        marginLeft: 75,
        maxwidth: 200,
        marginBottom: 10 
    },
}

class createQuiz extends Component {
    state = {
        Id: Math.floor(Math.random() * Math.floor(100000000000)),
        Name: "",
        Handle: "",
        Avg: "0",
        Taken: "",
        Question1: ["","","","","","",],
        Question2: ["","","","","","",],
        Question3: ["","","","","","",],
        Question4: ["","","","","","",],
        Question5: ["","","","","","",],
        
    }

    

    //call to the database to get quizzes
    submit = (e) => {
        e.preventDefault();

        const newResult ={
            Id: this.state.Id,
            Name: this.state.Name,
            Question1: this.state.Question1,
            Question2: this.state.Question2,
            Question3: this.state.Question3,
            Question4: this.state.Question4,
            Question5: this.state.Question5,
            Handle: this.props.user.userCredentials.handle,
        };

        axios.post('/Quiz', newResult)
        .then((res) =>{
            console.log(res.data)
            this.props.history.push('/');
        }).catch((err) => {
            console.log(err.response.data)
        });
          

        
        //this.props.signupUser(newResult, this.props.history);
        
        
    }

    
    

    //changes the state when you edit the search bar
    setChanges = (e) => {
        this.setState({
            [e.target.name]: e.target.value
            
        });
    };

    //updates the question state whenever it is changed
    setChanges1 = (e) => {
        let temp = [...this.state.Question1];
        
        temp[e.target.name] = e.target.value
        this.setState({
            Question1: temp
            
        });
        
    };
    //updates the question state whenever it is changed
    setChanges2 = (e) => {
        let temp = [...this.state.Question2];
        
        temp[e.target.name] = e.target.value
        this.setState({
            Question2: temp
            
        });
        
    };
    //updates the question state whenever it is changed
    setChanges3 = (e) => {
        let temp = [...this.state.Question3];
        
        temp[e.target.name] = e.target.value
        this.setState({
            Question3: temp
            
        });
        
    };

    //updates the question state whenever it is changed
    setChanges4 = (e) => {
        let temp = [...this.state.Question4];
        
        temp[e.target.name] = e.target.value
        this.setState({
            Question4: temp
            
        });
        
    };

    //updates the question state whenever it is changed
    setChanges5 = (e) => {
        let temp = [...this.state.Question5];
        
        temp[e.target.name] = e.target.value
        this.setState({
            Question5: temp
            
        });
        
    };





    render() {
        const {classes} = this.props

        let name = this.props.user.userCredentials ? this.props.user.userCredentials.handle : null
          if(name){
              
            console.log(name)
          }
        
        return (
            <form noValidate onSubmit={this.submit}>
            <Card className={classes.card}>
                <CardContent className={classes.content}>
                <TextField id="Name" name="Name" type="text" label="Quiz Name:" className={classes.textField} value={this.state.Name} onChange={this.setChanges} fullWidth/>
                    
                    
                </CardContent>
            </Card>
            <Card className={classes.card}>
            <CardContent className={classes.content}>
            <Typography variant="h6" color="textSecondary">Question 1</Typography>
            <TextField id="Problem" name="0" type="text" label="Question:" className={classes.textField} value={this.state.Question1[0]} onChange={this.setChanges1} fullWidth/>
            <TextField id="Option1" name="2" type="text" label="Option1:" className={classes.textField} value={this.state.Question1[2]} onChange={this.setChanges1} fullWidth/>
            <TextField id="Option2" name="3" type="text" label="Option2:" className={classes.textField} value={this.state.Question1[3]} onChange={this.setChanges1} fullWidth/>
            <TextField id="Option3" name="4" type="text" label="Option3:" className={classes.textField} value={this.state.Question1[4]} onChange={this.setChanges1} fullWidth/>
            <TextField id="Option4" name="5" type="text" label="Option4:" className={classes.textField} value={this.state.Question1[5]} onChange={this.setChanges1} fullWidth/>
            <TextField id="CorrectOption" name="1" type="text" label="Correct Answer:" className={classes.answerField} value={this.state.Question1[1]} onChange={this.setChanges1} fullWidth/>
                
            </CardContent>
            </Card>
            <Card className={classes.card}>
            <CardContent className={classes.content}>
            <Typography variant="h6" color="textSecondary">Question 2</Typography>
            <TextField id="Problem" name="0" type="text" label="Question:" className={classes.textField} value={this.state.Question2[0]} onChange={this.setChanges2} fullWidth/>
            <TextField id="Option1" name="2" type="text" label="Option1:" className={classes.textField} value={this.state.Question2[2]} onChange={this.setChanges2} fullWidth/>
            <TextField id="Option2" name="3" type="text" label="Option2:" className={classes.textField} value={this.state.Question2[3]} onChange={this.setChanges2} fullWidth/>
            <TextField id="Option3" name="4" type="text" label="Option3:" className={classes.textField} value={this.state.Question2[4]} onChange={this.setChanges2} fullWidth/>
            <TextField id="Option4" name="5" type="text" label="Option4:" className={classes.textField} value={this.state.Question2[5]} onChange={this.setChanges2} fullWidth/>
            <TextField id="CorrectOption" name="1" type="text" label="Correct Answer:" className={classes.answerField} value={this.state.Question2[1]} onChange={this.setChanges2} fullWidth/>
                
            </CardContent>
            </Card>
            <Card className={classes.card}>
            <CardContent className={classes.content}>
            <Typography variant="h6" color="textSecondary">Question 3</Typography>
            <TextField id="Problem" name="0" type="text" label="Question:" className={classes.textField} value={this.state.Question3[0]} onChange={this.setChanges3} fullWidth/>
            <TextField id="Option1" name="2" type="text" label="Option1:" className={classes.textField} value={this.state.Question3[2]} onChange={this.setChanges3} fullWidth/>
            <TextField id="Option2" name="3" type="text" label="Option2:" className={classes.textField} value={this.state.Question3[3]} onChange={this.setChanges3} fullWidth/>
            <TextField id="Option3" name="4" type="text" label="Option3:" className={classes.textField} value={this.state.Question3[4]} onChange={this.setChanges3} fullWidth/>
            <TextField id="Option4" name="5" type="text" label="Option4:" className={classes.textField} value={this.state.Question3[5]} onChange={this.setChanges3} fullWidth/>
            <TextField id="CorrectOption" name="1" type="text" label="Correct Answer:" className={classes.answerField} value={this.state.Question3[1]} onChange={this.setChanges3} fullWidth/>
                
            </CardContent>
            </Card>
            <Card className={classes.card}>
            <CardContent className={classes.content}>
            <Typography variant="h6" color="textSecondary">Question 4</Typography>
            <TextField id="Problem" name="0" type="text" label="Question:" className={classes.textField} value={this.state.Question4[0]} onChange={this.setChanges4} fullWidth/>
            <TextField id="Option1" name="2" type="text" label="Option1:" className={classes.textField} value={this.state.Question4[2]} onChange={this.setChanges4} fullWidth/>
            <TextField id="Option2" name="3" type="text" label="Option2:" className={classes.textField} value={this.state.Question4[3]} onChange={this.setChanges4} fullWidth/>
            <TextField id="Option3" name="4" type="text" label="Option3:" className={classes.textField} value={this.state.Question4[4]} onChange={this.setChanges4} fullWidth/>
            <TextField id="Option4" name="5" type="text" label="Option4:" className={classes.textField} value={this.state.Question4[5]} onChange={this.setChanges4} fullWidth/>
            <TextField id="CorrectOption" name="1" type="text" label="Correct Answer:" className={classes.answerField} value={this.state.Question4[1]} onChange={this.setChanges4} fullWidth/>
                
            </CardContent>
            </Card>
            <Card className={classes.card}>
            <CardContent className={classes.content}>
            <Typography variant="h6" color="textSecondary">Question 5</Typography>
            <TextField id="Problem" name="0" type="text" label="Question:" className={classes.textField} value={this.state.Question5[0]} onChange={this.setChanges5} fullWidth/>
            <TextField id="Option1" name="2" type="text" label="Option1:" className={classes.textField} value={this.state.Question5[2]} onChange={this.setChanges5} fullWidth/>
            <TextField id="Option2" name="3" type="text" label="Option2:" className={classes.textField} value={this.state.Question5[3]} onChange={this.setChanges5} fullWidth/>
            <TextField id="Option3" name="4" type="text" label="Option3:" className={classes.textField} value={this.state.Question5[4]} onChange={this.setChanges5} fullWidth/>
            <TextField id="Option4" name="5" type="text" label="Option4:" className={classes.textField} value={this.state.Question5[5]} onChange={this.setChanges5} fullWidth/>
            <TextField id="CorrectOption" name="1" type="text" label="Correct Answer:" className={classes.answerField} value={this.state.Question5[1]} onChange={this.setChanges5} fullWidth/>
                
            </CardContent>
            </Card>

            <Card className={classes.card}>
            <CardContent className={classes.content}>
            <Grid container spacing={10} >
                        <Grid item sm >
                            <Button type="submit" variant="contained" color="primary" className={classes.button}>Sumbit</Button>
                        </Grid>
                        
                        <Grid item sm>
                            <Button type="button" variant="contained" color="primary" className={classes.button} component={Link} to = "/">Return</Button>
                        </Grid>

                        <Grid item sm>
                            <Typography variant="h4">{this.state.result}</Typography>
                        </Grid>
                </Grid>
                
            </CardContent>
            </Card>

            
            </form>
            

        )
    }
}

const mapStateToProps = (state) => ({
    user: state.user
  });


export default connect(mapStateToProps)(withStyles(styles)(createQuiz));
