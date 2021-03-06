//react
import React, { Component } from 'react'

//material-ui
import Grid from '@material-ui/core/Grid'

//axios
import axios from 'axios'

//components
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

class home extends Component {
    state = {
        quizzes: null,
        search: "",
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
    filterQuizzes = () => {
        

        let temp = this.state.search
        let result = [];
        var i;
        for (i = 0; i < this.state.quizzes.length; i++) {
            if(this.state.quizzes[i].Name.endsWith(temp, temp.length) ){
                result.push(<Quiz key = {this.state.quizzes[i].Id.Id} quiz= {this.state.quizzes[i]}/>);
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

        let recentQuizzesMarkup = this.state.quizzes ? this.filterQuizzes() : <p>Getting Data</p>
        return (
            <Grid container spacing={10}>
                <Grid item sm={8} xs={12}>
                    <Card className={classes.card}>
                        <CardContent className={classes.content}>
                            <Typography variant="h4">Welcome to Quiz App</Typography>
                            <TextField id="search"  type="text" label="Search:" className={classes.textField} onChange={this.setChanges} fullWidth/>
                
                        </CardContent>
                    </Card>
                    {recentQuizzesMarkup}
                </Grid>
                <Grid item sm={4} xs={12}>
                    <Profile/>
                </Grid>
            </Grid>


        )
    }
}

export default withStyles(styles)(home)
