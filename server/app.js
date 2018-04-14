const express = require('express');

const app = express();

app.listen(4000, () => {
  console.log('now listenig for request on port 4000');
});
