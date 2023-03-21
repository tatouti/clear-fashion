const cors = require('cors');
const express = require('express');
const helmet = require('helmet');

const PORT = 8092;

const app = express();

module.exports = app;

app.use(require('body-parser').json());
app.use(cors());
app.use(helmet());

app.options('*', cors());

app.get('/', (request, response) => {
  const {MongoClient} = require('mongodb');
  const MONGODB_URI = 'mongodb+srv://tatouti:MongoDB6@clusterclearfashion.iyacjoa.mongodb.net/test?retryWrites=true&w=majority';
  const MONGODB_DB_NAME = 'ClusterClearFashion';
  const client = MongoClient.connect(MONGODB_URI, {'useNewUrlParser': true});
  const db =  client.db(MONGODB_DB_NAME);
  const collection = db.collection(shopName);
  const result = collection.find(products);
  response.send(result);
});

app.listen(PORT);

console.log(`📡 Running on port ${PORT}`);
