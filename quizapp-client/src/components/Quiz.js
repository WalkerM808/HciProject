//react
import React, { Component } from 'react'
import {Link} from 'react-router-dom'

//material-ui
import Card  from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/button'
import withStyles from '@material-ui/core/styles/withStyles'

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
class Quiz extends Component {
    render() {
        const {classes, quiz: {Name, Question1, Id}} = this.props
        
        //const [x] = this.props.Question1
        return (
            <Card className={classes.card}>
                <CardContent className={classes.content}>
                    <Typography variant="h4">{Name}</Typography>
                    <Typography variant="h6" color="textSecondary">{Question1[0]}</Typography>
                    <Button type="button" variant="contained" colors="secondary" className={classes.content} component={Link} to ={'/takeQuiz/'+ {Id}.Id}>Take Quiz</Button>
                    
                    
                </CardContent>
            </Card>
        )
    }
}

export default withStyles(styles)(Quiz);
