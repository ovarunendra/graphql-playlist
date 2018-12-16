import React, { Component } from 'react';
import { graphql, compose } from 'react-apollo';
import { getCategoryQuery, addQuestionMutation } from './queries/queries';

let options = [];

class Quizzer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      difficulty: 'Easy',
      category: '',
      question: '',
      correctAnswer: '',
      answer1: '',
      answer2: '',
      answer3: '',
      answer4: '',
    };
  }
  displayCategory = () => {
    const { loading, quizViewer } = this.props.getCategoryQuery;
    if (loading) {
      return <option disabled>Loading Categories...</option>;
    }
    return quizViewer.categories.map(category => {
      return (
        <option key={category} value={category}>
          {category}
        </option>
      );
    });
  };
  submitForm(e) {
    e.preventDefault();
    const { addQuestionMutation } = this.props;
    options.length = 0;
    const {
      difficulty,
      category,
      question,
      correctAnswer,
      answer1,
      answer2,
      answer3,
      answer4,
    } = this.state;
    options.push(answer1, answer2, answer3, answer4);
    if (!(difficulty && category && question && options.length > 0)) {
      return alert('Provide Missing Fields');
    }
    addQuestionMutation({
      variables: {
        difficulty,
        category,
        question,
        correctAnswer: options[parseInt(correctAnswer) - 1] || '',
        options,
      },
    }).then(() => {
      this.setState({
        question: '',
        options: [],
        correctAnswer: '',
        answer1: '',
        answer2: '',
        answer3: '',
        answer4: '',
      });
    });
  }
  render() {
    const {
      category,
      question,
      correctAnswer,
      answer1,
      answer2,
      answer3,
      answer4,
    } = this.state;
    return (
      <form id="add-question" onSubmit={this.submitForm.bind(this)}>
        <div className="field">
          <label>Category:</label>
          <select
            value={category}
            onChange={e => this.setState({ category: e.target.value })}
          >
            <option>Select Category</option>
            {this.displayCategory()}
          </select>
        </div>

        <div className="field">
          <label>Question:</label>
          <textarea
            value={question}
            onChange={e => this.setState({ question: e.target.value })}
          />
        </div>

        <div className="field">
          <label>Options #1:</label>
          <input
            type="text"
            value={answer1}
            onChange={e => this.setState({ answer1: e.target.value })}
          />
        </div>

        <div className="field">
          <label>Options #2:</label>
          <input
            type="text"
            value={answer2}
            onChange={e => this.setState({ answer2: e.target.value })}
          />
        </div>

        <div className="field">
          <label>Options #3:</label>
          <input
            type="text"
            value={answer3}
            onChange={e => this.setState({ answer3: e.target.value })}
          />
        </div>

        <div className="field">
          <label>Options #4:</label>
          <input
            type="text"
            value={answer4}
            onChange={e => this.setState({ answer4: e.target.value })}
          />
        </div>

        <div className="field">
          <label>Correct Answer:</label>
          <select
            value={correctAnswer}
            onChange={e => this.setState({ correctAnswer: e.target.value })}
          >
            <option>Select Correct Answer</option>
            <option key={1} value={1}>
              1
            </option>
            <option key={2} value={2}>
              2
            </option>
            <option key={3} value={3}>
              3
            </option>
            <option key={4} value={4}>
              4
            </option>
          </select>
        </div>

        <button id="add-question-button">Add Question</button>
      </form>
    );
  }
}

export default compose(
  graphql(getCategoryQuery, { name: 'getCategoryQuery' }),
  graphql(addQuestionMutation, { name: 'addQuestionMutation' }),
)(Quizzer);
