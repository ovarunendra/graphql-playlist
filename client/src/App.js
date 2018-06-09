import React, { Component } from 'react';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom';

import Home from './Home';
import Quizzer from './Quizzer';

// apollo client setup
const client = new ApolloClient({
  uri: '/graphql'
});

class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <Router>
          <div>
            <Route exact path="/" component={Home} />
            <Route path="/quizzer" component={Quizzer} />
          </div>
        </Router>
      </ApolloProvider>
    );
  }
}

export default App;
