const express = require('express');
const graphqlHTTP = require('express-graphql');
const schema = require('./schema/schema');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const app = express();

app.set('port', (process.env.PORT || 8080));

// allow cross-origin request
app.use(cors());
app.use(express.static(path.join(__dirname, '../client/build')));

mongoose.connect(process.env.MONGOLAB_URI);
mongoose.connection.once('open', () => {
  console.log('connected to db');
});

// app.get('/', function(request, response) {
//   response.send('up and running!');
//   response.end();
// });

app.use('/graphql', graphqlHTTP({
  schema,
  graphiql: !process.env.IS_PROD,
}));

app.listen(app.get('port'), () => {
  console.log(`now listenig for request on port ${app.get('port')}`);
});
