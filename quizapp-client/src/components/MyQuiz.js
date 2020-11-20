//react
import React, { Component } from 'react'
import {Link} from 'react-router-dom'

//axios
import axios from 'axios'

//redux
import { connect } from 'react-redux'

//material-ui
import Card  from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/button'
import withStyles from '@material-ui/core/styles/withStyles'
import Divider from '@material-ui/core/Divider'
import { Input } from '@material-ui/core'

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





//Card component that will hold quiz info
//display the name, the first problem, and a button to take the quiz
class MyQuiz extends Component {

    state = {
        quizzes: null,
        
    }

    componentDidMount(){
        axios.get('/results')
            .then(res => {
                this.setState({
                    quizzes: res.data
                })
            })
            .catch(err => console.log(err));
    }


    getTaken = (input) => {
        let num = 0;
        var i;
        for (i = 0; i < this.state.quizzes.length; i++) {
            if(this.state.quizzes[i].QuizId == input.Id){
                num = num+1;
            }
        } 
        
        return num;
    }

    getAvg = (input) => {
        let num = 0;
        let total = 0;
        let i = 0
        for (i = 0; i < this.state.quizzes.length; i++) {
            if(this.state.quizzes[i].QuizId == input.Id){
                num = num+1;
                total = total + this.state.quizzes[i].Score;
                
            }
        } 

        if(total == 0){
            return 0;
        } else {
            return Math.floor(total/num);
            //return total/num
            
            
        }
        
    }



    render() {

        const {classes, quiz: {Name, Question1, Id}} = this.props
        let Taken;
        let Avg;
        if(this.state.quizzes != null){
            Avg = this.getAvg({Id});
            Taken = this.getTaken({Id});
            
        }
        

        
        //const [x] = this.props.Question1
        return (
            <Card className={classes.card}>
                <CardContent className={classes.content}>
                    <Typography variant="h4">{Name}</Typography>
                    <Divider/>
                    <Typography variant="h6" >Times Taken: {Taken}</Typography>
                    <Typography variant="h6" >Average Score: {Avg}</Typography>
                    
                    
                </CardContent>
            </Card>
        )
    }
}
const mapStateToProps = (state) => ({
    user: state.user
  });

export default connect(mapStateToProps)(withStyles(styles)(MyQuiz));
