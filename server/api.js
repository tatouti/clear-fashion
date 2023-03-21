const cors = require('cors');
const express = require('express');
const helmet = require('helmet');

const PORT = 8092;

const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const fs = require('fs');

function getClient() {
  const uri = "mongodb+srv://tatouti:MongoDB6@clusterclearfashion.iyacjoa.mongodb.net/test?retryWrites=true&w=majority";
  const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
  return client;
}

const app = express();

module.exports = app;

app.use(require('body-parser').json());
app.use(cors());
app.use(helmet());

app.options('*', cors());

/*app.get('/', (request, response) => {
  const client = get_Client();
  const MONGODB_DB_NAME = 'ClusterClearFashion';
  const db =  client.db(MONGODB_DB_NAME);
  const collection = db.collection(shopName);
  const result = collection.find(products);
  response.send(result);
});*/

app.get('/all', async (request, response) => {
  try{
    const client = getClient();
    const collection = client.db("ClusterClearFashion").collection("GENERAL");
    response.send({collection});
  }
  catch{
    response.send({error : "Couldn't fetch all"}); 
  }
});

app.get('/brands', async (request, response) => {
  try{
    const client = getClient();
    const collection = client.db("ClusterClearFashion").collection("GENERAL");
    const found = await collection.distinct('brand');
    response.send({brands: found});
  }
  catch{
    response.send({error : "Couldn't fetch brands"}); 
  }
});

app.get('/price', async (request, response) => {
  try{
    const client = getClient();
    const collection = client.db("ClusterClearFashion").collection("GENERAL");
    const found = await collection.distinct('price');
    response.send({result: found});
  }
  catch{
    response.send({error : "Couldn't fetch prices"}); 
  }
});

app.get('/products/:id', async (request, response) => {
  try{
    const productId = request.params.id;
    const script = {_id: ObjectId(productId)};
    const client = getClient();
    const collection = client.db("ClusterClearFashion").collection("GENERAL");
    const found = await collection.find(script).toArray();
    
    response.send({result: found});

  } catch(err) {
	  response.send({error : "ID not found"});  
  }
});

app.listen(PORT);

console.log(`📡 Running on port ${PORT}`);
