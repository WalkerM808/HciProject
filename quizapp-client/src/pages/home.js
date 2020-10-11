//react
import React, { Component } from 'react'

//material-ui
import Grid from '@material-ui/core/Grid'

//axios
import axios from 'axios'

//components
import Quiz from '../components/Quiz'

class home extends Component {
    state = {
        quizzes: null
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
    render() {
        //check if there are quizzes and if so map to a new array of quiz components
        let recentQuizzesMarkup = this.state.quizzes ?(
        this.state.quizzes.map(quiz => <Quiz key = {quiz.Id} quiz= {quiz}/>)
        ) : <p>Getting Data</p>
        return (
            <Grid container spacing={10}>
                <Grid item sm={8} xs={12}>
                    {recentQuizzesMarkup}
                </Grid>
                <Grid item sm={4} xs={12}>
                    <p>name</p>
                </Grid>
            </Grid>


        )
    }
}

export default home
