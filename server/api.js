const cors = require('cors');
const express = require('express');
const helmet = require('helmet');

const PORT = 8092;

function get_Client()
{
  const {MongoClient} = require('mongodb');
  const MONGODB_URI = 'mongodb+srv://tatouti:MongoDB6@clusterclearfashion.iyacjoa.mongodb.net/test?retryWrites=true&w=majority';
  const client = MongoClient.connect(MONGODB_URI, {'useNewUrlParser': true});
  return client;
}

const app = express();

module.exports = app;

app.use(require('body-parser').json());
app.use(cors());
app.use(helmet());

app.options('*', cors());

app.get('/', (request, response) => {
  const client = get_Client();
  const MONGODB_DB_NAME = 'ClusterClearFashion';
  const db =  client.db(MONGODB_DB_NAME);
  const collection = db.collection(shopName);
  const result = collection.find(products);
  response.send(result);
});

app.listen(PORT);

console.log(`📡 Running on port ${PORT}`);
