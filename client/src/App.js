import React, { Component } from 'react';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import { HashRouter as Router, Route } from 'react-router-dom';

import Home from './Home';
import Quizzer from './Quizzer';
import TechTalks from './TechTalks';

// apollo client setup
const client = new ApolloClient({
  uri: 'http://localhost:8080/graphql',
});

class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <Router>
          <div>
            <Route exact path="/" component={Home} />
            <Route path="/quizzer" component={Quizzer} />
            <Route path="/techtalks" component={TechTalks} />
          </div>
        </Router>
      </ApolloProvider>
    );
  }
}

export default App;
