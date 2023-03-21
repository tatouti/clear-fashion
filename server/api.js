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

app.get('/brand', async (request, response) => {
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
    response.send({prices: found});
  }
  catch{
    response.send({error : "Couldn't fetch prices"}); 
  }
});

app.get('/products/search', async (request, response) => {
  try{
    const client = getClient();
    const collection = client.db("ClusterClearFashion").collection("GENERAL");

    var script ={};
    var limit = request.params.limit;
    var price = request.params.price;
    const brand = request.params.brand;

    if(limit == undefined){
      limit = 12;
    }
    else{
      limit = parseInt(limit);
    }

    if(brand){
      script.brand_name = brand;
    }

    if(price){
      script.price = {$lte: parseInt(price)};
    }

    const result = await collection.find(script).limit(limit).toArray();
    response.send({result : result});
  }
  catch{
    response.send({error : "Couldn't fetch searchs"}); 
  }
});

app.get('/products/id', async (request, response) => {
  try{
    const productId = request.params.id;
    const script = {_id: ObjectId(productId)};
    const client = getClient();
    const collection = client.db("ClusterClearFashion").collection("GENERAL");
    const found = await collection.find(script).toArray();
    
    response.send({ids: found});

  } catch(err) {
	  response.send({error : "ID not found"});  
  }
});

app.listen(PORT);

console.log(`📡 Running on port ${PORT}`);
