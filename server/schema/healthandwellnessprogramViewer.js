const graphql = require('graphql');
const axios = require('axios');
const {
  GraphQLObjectType,
  GraphQLList,
} = graphql;

const { PostType } = require('./types');

const HealthandwellnessprogramViewerType = new GraphQLObjectType({
  name: 'HealthandwellnessprogramViewer',
  fields: () => ({
    posts: {
      type: new GraphQLList(PostType),
      resolve(parent, args) {
        const url = 'http://healthandwellnessprogram.us/wp-json/wp/v2/posts';
        let promises = [];
        return axios.get(url).then(response => {
          const { data } = response;
          data.forEach((post) => {
            const mediaUrl = post._links['wp:featuredmedia'][0].href;
            promises.push(axios.get(mediaUrl));
          });
          return Promise.all(promises).then(results => {
            const output = data.map((value, index) => ({
              id: value.id,
              title: value.title.rendered,
              content: value.content.rendered,
              excerpt: value.excerpt.rendered,
              imageUri: results[index].data.guid.rendered
            }));
            return output;
          })
        });
      }
    }
  })
});

module.exports = HealthandwellnessprogramViewerType;
