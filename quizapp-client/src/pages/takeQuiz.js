//react
import React, { Component } from 'react'
import {Link} from 'react-router-dom'

//axios
import axios from 'axios'

//material-ui
import Card  from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/button'
import withStyles from '@material-ui/core/styles/withStyles'
import Questions from '../components/Questions'


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
}



class takeQuiz extends Component {

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

    getCurrentQuiz = () => {
        var i;
        for (i = 0; i < this.state.quizzes.length; i++) {
            if(this.state.quizzes[i].Id == this.props.match.params.Id){
                
                return <Questions key = {this.state.quizzes[i].Id} quiz = {this.state.quizzes[i]}/>;
            }
        } 
        
        return <Questions key = {this.state.quizzes[0].Id} quiz = {this.state.quizzes[0]}/>;
    };

    render() {
        //console.log(this.state.quizzes.Id)
        // let recentQuizzesMarkup = this.state.quizzes && this.state.quizzes[0].Id === this.props.match.params.Id ?(
        //     this.state.quizzes.map(quiz => <Quiz key = {quiz.Id} quiz = {quiz}/>)
        //     ) : <p>Getting Data</p>

        let QuizMarkup = this.state.quizzes ? this.getCurrentQuiz() : <p>Getting Data</p>
        

        return (
            <h1>{QuizMarkup}</h1>
        )
    }
}

export default withStyles(styles)(takeQuiz);
