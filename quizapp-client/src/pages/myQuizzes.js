//react
import React, { Component } from 'react'
import {Link} from 'react-router-dom'

//material-ui
import Grid from '@material-ui/core/Grid'

//redux
import { connect } from 'react-redux'

//axios
import axios from 'axios'

//components
import MyQuiz from '../components/MyQuiz'
import Quiz from '../components/Quiz'
import Profile from '../components/Profile'

import Card  from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import TextField from '@material-ui/core/TextField'

import Button from '@material-ui/core/button'
import Typography from '@material-ui/core/Typography'
import withStyles from '@material-ui/core/styles/withStyles'

const styles = {
    card: {
        display: 'flex',
        maxwidth: 200,
        marginBottom: 10 
    },
    content: {
        display: 'inline-block',
        
    },
}

class myQuizzes extends Component {
    state = {
        quizzes: null,
    }

    

    //call to the database to get quizzes
    componentDidMount(){
        axios.get('/Quizzes')
            .then(res => {
                this.setState({
                    quizzes: res.data
                })
            })
            .catch(err => console.log(err));
    }

    //filters the quizzes using the search bar
    filterQuizzes = (userName) => {
        let result = [];
        var i;
        for (i = 0; i < this.state.quizzes.length; i++) {
            if(this.state.quizzes[i].Handle == userName.name){
                result.push(<MyQuiz key = {this.state.quizzes[i].Id.Id} quiz= {this.state.quizzes[i]}/>);
            }
        } 
        
        return result;
    };

    //changes the state when you edit the search bar
    setChanges = (e) => {
        this.setState({
            search: e.target.value
        });
    };


    render() {
        const {classes} = this.props

        
        let name = this.props.user.userCredentials ? this.props.user.userCredentials.handle : null
        let recentQuizzesMarkup;
        if({name}){
            
            recentQuizzesMarkup =  this.state.quizzes ? this.filterQuizzes({name}) : <p>Getting Data</p>
        }



        return (
            <Grid container spacing={10}>
                <Grid item sm={8} xs={12}>
                    <Card className={classes.card}>
                        <CardContent className={classes.content}>
                            <Typography variant="h4">Your Quizzes</Typography>
                        </CardContent>
                    </Card>
                    {recentQuizzesMarkup}
                    <Card className={classes.card}>
            <CardContent className={classes.content}>
            <Grid container spacing={10} >
                        <Grid item sm >
                        <Button type="button" variant="contained" color="primary" className={classes.button} component={Link} to = "/">Return</Button>
                        </Grid>
                        
                        <Grid item sm>
                            
                        </Grid>

                        <Grid item sm>
                            
                        </Grid>
                </Grid>
                
            </CardContent>
            </Card>
                </Grid>
                
                
            </Grid>


        )
    }
}

const mapStateToProps = (state) => ({
    user: state.user
  });

export default connect(mapStateToProps)(withStyles(styles)(myQuizzes));
