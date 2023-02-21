/* eslint-disable no-console, no-process-exit */
const dedicatedbrand = require('./eshops/dedicatedbrand');
const montlimartbrand = require('./eshops/montlimartbrand');
const circlebrand = require('./eshops/circlebrand');
const { json } = require('express');
const fs = require('fs');

async function sandbox (eshop = 'https://www.dedicatedbrand.com/en/men/news') {
  try {
    console.log(`🕵️‍♀️  Browsing ${eshop} eshop`);

    var products = await dedicatedbrand.scrape(eshop);

    console.log(products);
    console.log(products.length);
    var jsonData = JSON.stringify(products);
    fs.writeFileSync('./jsonFiles/dedicated.json', jsonData, err => {
      if (err) {
          console.log('Error writing file', err)
      } else {
          console.log('Successfully wrote file')
      }
    })
    console.log('done');

    eshop = "https://www.montlimart.com/99-vetements";
    console.log(`🕵️‍♀️  Browsing ${eshop} eshop`);

    products = await montlimartbrand.scrape(eshop);

    console.log(products);
    console.log(products.length);
    jsonData = JSON.stringify(products);
    fs.writeFileSync('./jsonFiles/montlimart.json', jsonData, err => {
      if (err) {
          console.log('Error writing file', err)
      } else {
          console.log('Successfully wrote file')
      }
    })
    console.log('done');

    eshop = "https://shop.circlesportswear.com/collections/collection-homme";
    console.log(`🕵️‍♀️  Browsing ${eshop} eshop`);

    products = await circlebrand.scrape(eshop);

    console.log(products);
    console.log(products.length);
    /*
    jsonData = JSON.stringify(products);
    fs.writeFileSync('./jsonFiles/circle.json', jsonData, err => {
      if (err) {
          console.log('Error writing file', err)
      } else {
          console.log('Successfully wrote file')
      }
    })
    console.log('done');
    process.exit(0);
    */
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
}

async function mongodbAdd (products){

    console.log('Mongo DB Server Part');
    const {MongoClient} = require('mongodb');
    const MONGODB_URI = 'mongodb+srv://tatouti:MongoDB6@clusterclearfashion.iyacjoa.mongodb.net/test';
    const MONGODB_DB_NAME = 'ClusterClearFashion';
    const client = await MongoClient.connect(MONGODB_URI, {'useNewUrlParser': true});
    const db =  client.db(MONGODB_DB_NAME);
    const collection = db.collection('products');
    const result = collection.insertMany(products);
    console.log(result);
    process.exit(0);

}

const [,, eshop] = process.argv;

async function sandboxD (eshop = 'https://www.dedicatedbrand.com/en/men/news') {
  try {
    console.log(`🕵️‍♀️  browsing ${eshop} eshop`);

    const products = await dedicatedbrand.scrape(eshop);

    //console.log(products);
    console.log('done d');
    process.exit(0);
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
}
async function sandboxM (eshop = 'https://www.montlimart.com/99-vetements') {
  try {
    console.log(`🕵️‍♀️  browsing ${eshop} eshop`);

    const products = await montlimartbrand.scrape(eshop);

    //console.log(products);
    console.log('done m');
    process.exit(0);
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
}
async function sandboxC (eshop = 'https://shop.circlesportswear.com/collections/collection-homme') {
  try {
    console.log(`🕵️‍♀️  browsing ${eshop} eshop`);

    const products = await circlebrand.scrape(eshop);

    //console.log(products);
    console.log('done c');
    process.exit(0);
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
}

async function AllScrape(){
  try{
    await sandboxD(eshop);
    await sandboxM(eshop);
    await sandboxC(eshop);
    console.log('ALL GOOD');
    process.exit(0);
  } catch(e){
    console.error(e);
    process.exit(1);
  }
}

AllScrape();


const val = [{'nom':'JAOUDET','prenom':'Theo'}];
//mongodbAdd(val);
