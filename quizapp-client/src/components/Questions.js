//react
import React, { Component } from 'react'
import {Link} from 'react-router-dom'

//axios
import axios from 'axios'

//redux
import {connect} from 'react-redux';
import {loginUser} from '../redux/actions/userActions';

//material-ui
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/button'

import Typography from '@material-ui/core/Typography'
import withStyles from '@material-ui/core/styles/withStyles'
import Card  from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import FormControl from '@material-ui/core/FormControl'
import RadioGroup from '@material-ui/core/RadioGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import FormHelperText from '@material-ui/core/FormHelperText'

import Radio from '@material-ui/core/Radio'



//material-ui styles for component elements
const styles = {
    card: {
        display: 'flex',
        maxwidth: 200,
        marginBottom: 10 
    },
    content: {
        display: 'inline-block',
        
    },
    button: {
        margin: '20px auto auto auto',
        
    },
    customError:{
        color: 'red',
        fontSize: '0.8rem'
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

}


class Questions extends Component {

      state = {
        correct1: false,
        correct2: false,
        correct3: false,
        correct4: false,
        correct5: false,
        helperText1: "",
        helperText2: "",
        helperText3: "",
        helperText4: "",
        helperText5: "",
        A1: "",
        A2: "",
        A3: "",
        A4: "",
        A5: "",
        score: 0,
        result: ""
        
      };


    //called when form is sent 
    //will calculate score and then call the database
    submit = (e) => {
        e.preventDefault();
        let temp = 0; 
        //sets the helper text
        if(this.state.correct1 === false){
            this.setState({helperText1: "Wrong! Correct Answer: " + this.state.A1});
        } else {
            temp = temp + 20;
        }

        if(this.state.correct2 === false){
            this.setState({helperText2: "Wrong! Correct Answer: " + this.state.A2});
        } else {
            temp = temp + 20;
        }

        if(this.state.correct3 === false){
            this.setState({helperText3: "Wrong! Correct Answer: " + this.state.A3});
        } else {
            temp = temp + 20;
        }

        if(this.state.correct4 === false){
            this.setState({helperText4: "Wrong! Correct Answer: " + this.state.A4});
        } else {
            temp = temp + 20;
        }

        if(this.state.correct5 === false){
            this.setState({helperText5: "Wrong! Correct Answer: " + this.state.A5});
        } else {
            temp = temp + 20;
        }

        this.setState({score: temp});
        this.setState({result: "Score: " + temp})

        const newResult ={
            Name: this.props.user.userCredentials.handle,
            Score: temp,
            Title: this.props.quiz.Name,
            QuizId: this.props.quiz.Id
            
        };

        axios.post('/result', newResult)
        .then((res) =>{
            console.log(res.data)
            //this.props.history.push('/');
        }).catch((err) => {
            console.log(err.response.data)
        });
      };



    //Updates the state if the selected answer is correct or not
    handleChange1 = answer => (event) => {
        this.setState({A1: answer})
        if(answer == event.target.value){
            this.setState({correct1: true})
            
        }

    }
    handleChange2 = answer => (event) => {
        this.setState({A2: answer})
        if(answer == event.target.value){
            this.setState({correct2: true})
            
        }

    }
    handleChange3 = answer => (event) => {
        this.setState({A3: answer})
        if(answer == event.target.value){
            this.setState({correct3: true})
            
        }

    }
    handleChange4 = answer => (event) => {
        this.setState({A4: answer})
        if(answer == event.target.value){
            this.setState({correct4: true})
            
        }

    }
    handleChange5 = answer => (event) => {
        this.setState({A5: answer})
        console.log(answer +"=="+ event.target.value)
        if(answer == event.target.value){
            console.log("correct")
            this.setState({correct5: true})
            
        }

    }



    render() {
        const {classes, quiz: {Name, Question1, Question2, Question3, Question4, Question5, Id}} = this.props
        
        

        //Grids that hold textFields and buttons
        return (
    
            <form noValidate onSubmit={this.submit}>
            <Card className={classes.card}>
                <CardContent className={classes.content}>
                <Typography variant="h4">{Name}</Typography>
                </CardContent>
            </Card>
            
            <Card className={classes.card}>
                <CardContent className={classes.content}>
                    <Typography variant="h4">{Question1[0]}</Typography>

                    <FormControl component="fieldset" className={classes.formControl}>
                        <RadioGroup aria-label="quiz" name="quiz" onChange={this.handleChange1(Question1[1])}>
                            <FormControlLabel value={Question1[2]} control={<Radio />} label={Question1[2]} />
                            <FormControlLabel value={Question1[3]} control={<Radio />} label={Question1[3]} />
                            <FormControlLabel value={Question1[4]} control={<Radio />} label={Question1[4]} />
                            <FormControlLabel value={Question1[5]} control={<Radio />} label={Question1[5]} />
                         </RadioGroup>
                         <FormHelperText className={classes.customError}>{this.state.helperText1}</FormHelperText>
                    </FormControl>

                </CardContent>
            </Card>
            <Card className={classes.card}>
                <CardContent className={classes.content}>
                    <Typography variant="h4">{Question2[0]}</Typography>

                    <FormControl component="fieldset" className={classes.formControl}>
                        <RadioGroup aria-label="quiz" name="quiz" onChange={this.handleChange2(Question2[1])}>
                            <FormControlLabel value={Question2[2]} control={<Radio />} label={Question2[2]} />
                            <FormControlLabel value={Question2[3]} control={<Radio />} label={Question2[3]} />
                            <FormControlLabel value={Question2[4]} control={<Radio />} label={Question2[4]} />
                            <FormControlLabel value={Question2[5]} control={<Radio />} label={Question2[5]} />
                         </RadioGroup>
                         <FormHelperText className={classes.customError}>{this.state.helperText2}</FormHelperText>
                    </FormControl>

                </CardContent>
            </Card> 
            <Card className={classes.card}>
                <CardContent className={classes.content}>
                    <Typography variant="h4">{Question3[0]}</Typography>

                    <FormControl component="fieldset" className={classes.formControl}>
                        <RadioGroup aria-label="quiz" name="quiz" onChange={this.handleChange3(Question3[1])}>
                            <FormControlLabel value={Question3[2]} control={<Radio />} label={Question3[2]} />
                            <FormControlLabel value={Question3[3]} control={<Radio />} label={Question3[3]} />
                            <FormControlLabel value={Question3[4]} control={<Radio />} label={Question3[4]} />
                            <FormControlLabel value={Question3[5]} control={<Radio />} label={Question3[5]} />
                         </RadioGroup>
                         <FormHelperText className={classes.customError}>{this.state.helperText3}</FormHelperText>
                    </FormControl>

                </CardContent>
            </Card> 
            <Card className={classes.card}>
                <CardContent className={classes.content}>
                    <Typography variant="h4">{Question4[0]}</Typography>

                    <FormControl component="fieldset" className={classes.formControl}>
                        <RadioGroup aria-label="quiz" name="quiz" onChange={this.handleChange4(Question4[1])}>
                            <FormControlLabel value={Question4[2]} control={<Radio />} label={Question4[2]} />
                            <FormControlLabel value={Question4[3]} control={<Radio />} label={Question4[3]} />
                            <FormControlLabel value={Question4[4]} control={<Radio />} label={Question4[4]} />
                            <FormControlLabel value={Question4[5]} control={<Radio />} label={Question4[5]} />
                         </RadioGroup>
                         <FormHelperText className={classes.customError}>{this.state.helperText4}</FormHelperText>
                    </FormControl>

                </CardContent>
            </Card> 
            <Card className={classes.card}>
                <CardContent className={classes.content}>
                    <Typography variant="h4">{Question5[0]}</Typography>

                    <FormControl component="fieldset" className={classes.formControl}>
                        <RadioGroup aria-label="quiz" name="quiz" onChange={this.handleChange5(Question5[1])}>
                            <FormControlLabel value={Question5[2]} control={<Radio />} label={Question5[2]} />
                            <FormControlLabel value={Question5[3]} control={<Radio />} label={Question5[3]} />
                            <FormControlLabel value={Question5[4]} control={<Radio />} label={Question5[4]} />
                            <FormControlLabel value={Question5[5]} control={<Radio />} label={Question5[5]} />
                         </RadioGroup>
                         <FormHelperText className={classes.customError}>{this.state.helperText5}</FormHelperText>
                    </FormControl>

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
                            <Typography variant="h4" className={classes.textField}>{this.state.result}</Typography>
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

export default connect(mapStateToProps)(withStyles(styles)(Questions));
