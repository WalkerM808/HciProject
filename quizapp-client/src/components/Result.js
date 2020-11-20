//react
import React, { Component } from 'react'
import {Link} from 'react-router-dom'

//material-ui
import Card  from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/button'
import withStyles from '@material-ui/core/styles/withStyles'
import Divider from '@material-ui/core/Divider';

const styles = {
    card: {
        display: 'flex',
        maxwidth: 200,
        minwidth: 200,
        margin: '20px auto 20px auto'
    },
    content: {
        display: 'inline-block',
        
    },
}



//Card component that will hold quiz info
//display the name, the first problem, and a button to take the quiz
class Result extends Component {
    render() {
        const {classes, result: {Name, Score, Title}} = this.props
        //const [x] = this.props.Question1
        return (
            <Card className={classes.card}>
                <CardContent className={classes.content}>
                    <Typography variant="h4">{Title}</Typography>
                    <Divider />
                    <Typography variant="h6" color="textSecondary">Score: {Score}</Typography>
                    
                    
                    
                    
                </CardContent>
            </Card>
        )
    }
}

export default withStyles(styles)(Result);