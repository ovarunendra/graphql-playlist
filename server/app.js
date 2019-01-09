const express = require('express');
const graphqlHTTP = require('express-graphql');
const schema = require('./schema/schema');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const app = express();

const axios = require('axios');
const URL = 'http://healthandwellnessprogram.us';
const Post = require('./models/post');

app.set('port', process.env.PORT || 8080);

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

app.get('/addPosts', function(req, res) {
  const page = req.query.page || 1;
  const url = `${URL}/wp-json/wp/v2/posts?page=${page}&per_page=20`;
  let promises = [];
  return axios.get(url).then((response) => {
    const { data } = response;
    data.forEach((post) => {
      const mediaUrl = post._links['wp:featuredmedia'][0].href;
      promises.push(axios.get(mediaUrl));
    });
    return Promise.all(promises).then((results) => {
      const output = data.map((value, index) => ({
        id: value.id,
        title: value.title.rendered,
        content: value.content.rendered,
        excerpt: value.excerpt.rendered,
        imageUri: results[index].data.guid.rendered,
      }));
      output.forEach((data) => {
        let post = new Post(data);
        console.log('uploading: ', data.id);
        post.save();
      });
      res.send('uploading');
      res.end();
    });
  });
});

app.use(
  '/graphql',
  graphqlHTTP({
    schema,
    graphiql: !process.env.IS_PROD,
  }),
);

app.get('/users', function(req, res) {
  const data = [
    {
      gender: 'male',
      email: 'test@example.com',
      name: 'test',
    },
  ];
  res.send(data);
  res.end();
});

app.listen(app.get('port'), () => {
  console.log(`now listenig for request on port ${app.get('port')}`);
});
