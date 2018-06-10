import React, { Component } from 'react';
import { graphql, compose } from 'react-apollo';
import { getCategoryQuery, addQuestionMutation } from './queries/queries';

let incorrectAnswers = [];

class Quizzer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            difficulty: 'Easy',
            category: '',
            question: '',
            correctAnswer: '',
            incorrectAnswer1: '',
            incorrectAnswer2: '',
            incorrectAnswer3: '',
        };
    }
    displayCategory = () => {
        const { loading, quizViewer } = this.props.getCategoryQuery;
        if (loading) {
            return (
                <option disabled>Loading Categories...</option>
            );
        }
        return quizViewer.categories.map(category => {
            return (
                <option key={category} value={category}>{category}</option>
            );
        });
    };
    submitForm(e) {
        e.preventDefault();
        const { addQuestionMutation } = this.props;
        incorrectAnswers.length = 0;
        const { difficulty, category, question, correctAnswer, incorrectAnswer1, incorrectAnswer2, incorrectAnswer3 } = this.state;
        incorrectAnswers.push(incorrectAnswer1, incorrectAnswer2, incorrectAnswer3)
        if (!(difficulty && category && question && correctAnswer && incorrectAnswers.length > 0)) {
            return alert('Provide Missing Fields');
        }
        addQuestionMutation({
            variables: {
                difficulty, category, question, correctAnswer, incorrectAnswers
            }
        }).then(() => {
            this.setState({
                question: '',
                correctAnswer: '',
                incorrectAnswer1: '',
                incorrectAnswer2: '',
                incorrectAnswer3: ''
            });
        });
    }
    render() {
        const { category, question, correctAnswer, incorrectAnswer1, incorrectAnswer2, incorrectAnswer3 } = this.state;
        return (
            <form id="add-question" onSubmit={this.submitForm.bind(this)}>

                <div className="field">
                    <label>Category:</label>
                    <select value={category} onChange={(e) => this.setState({ category: e.target.value })}>
                        <option>Select Category</option>
                        {this.displayCategory()}
                    </select>
                </div>

                <div className="field">
                    <label>Question:</label>
                    <textarea value={question} onChange={(e) => this.setState({ question: e.target.value })}>
                    </textarea>
                </div>

                <div className="field">
                    <label>Correct Answer:</label>
                    <input type="text" value={correctAnswer} onChange={(e) => this.setState({ correctAnswer: e.target.value })} />
                </div>

                <div className="field">
                    <label>Wrong Options #1:</label>
                    <input type="text" value={incorrectAnswer1} onChange={(e) => this.setState({ incorrectAnswer1: e.target.value })} />
                </div>

                <div className="field">
                    <label>Wrong Options #2:</label>
                    <input type="text" value={incorrectAnswer2} onChange={(e) => this.setState({ incorrectAnswer2: e.target.value })} />
                </div>

                <div className="field">
                    <label>Wrong Options #3:</label>
                    <input type="text" value={incorrectAnswer3} onChange={(e) => this.setState({ incorrectAnswer3: e.target.value })} />
                </div>

                <button id="add-question-button">Add Question</button>
            </form>
        )
    }
}

export default compose(
    graphql(getCategoryQuery, {name: "getCategoryQuery"}),
    graphql(addQuestionMutation, {name: "addQuestionMutation"})
  )(Quizzer);

