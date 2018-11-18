import React, { Component } from 'react';
import { graphql, compose } from 'react-apollo';
import { addTalkMutation } from './queries/mutations/addTalkMutation';

class TechTalks extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      author: '',
      imageUri: '',
      URL: '',
    };
  }

  submitForm(e) {
    e.preventDefault();
    const { addTalkMutation } = this.props;
    const { title, author, imageUri, URL } = this.state;

    if (!(title && author && imageUri && URL)) {
      return alert('Provide Missing Fields');
    }

    addTalkMutation({
      variables: {
        title,
        author,
        imageUri,
        URL,
      },
    }).then(() => {
      this.setState({
        title: '',
        author: '',
        imageUri: '',
        URL: '',
      });
    });
  }

  render() {
    const { title, author, imageUri, URL } = this.state;

    return (
      <form id="add-question" onSubmit={this.submitForm.bind(this)}>
        <div className="field">
          <label>Title:</label>
          <input
            type="text"
            value={title}
            onChange={e => this.setState({ title: e.target.value })}
          />
        </div>

        <div className="field">
          <label>Author:</label>
          <input
            type="text"
            value={author}
            onChange={e => this.setState({ author: e.target.value })}
          />
        </div>

        <div className="field">
          <label>Image URL:</label>
          <input
            type="text"
            value={imageUri}
            onChange={e => this.setState({ imageUri: e.target.value })}
          />
        </div>

        <div className="field">
          <label>YouTube URL:</label>
          <input
            type="text"
            value={URL}
            onChange={e => this.setState({ URL: e.target.value })}
          />
        </div>

        <button id="add-question-button">Add Talk</button>
      </form>
    );
  }
}

export default compose(graphql(addTalkMutation, { name: 'addTalkMutation' }))(
  TechTalks,
);
