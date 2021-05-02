import React, {Component} from 'react'
import classes from './QuizLis.module.sass'
import {NavLink} from 'react-router-dom'
import axios from 'axios'

class QuizList extends Component {
    renderQuizes() {
        return [1,2,3].map((quiz,index) => {
            return (
                <li key={index}>
                    <NavLink to={'/quiz/' + quiz}>
                        Test {quiz}
                    </NavLink>
                </li>
            )
        })
    }

    componentDidMount() {
        axios.get('https://xtr-minin-react-quiz-default-rtdb.europe-west1.firebasedatabase.app/quiz.json')
            .then(response => {
                console.log(response)
            })
    }


    render() {
        return (
            <div className={classes.QuizList}>
                <div>
                    <h1>Tests list</h1>
                    <ul>
                        {this.renderQuizes()}
                    </ul>
                </div>
            </div>
        )
    }
}

export default QuizList