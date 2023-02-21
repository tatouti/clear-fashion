/* eslint-disable no-console, no-process-exit */
const dedicatedbrand = require('./eshops/dedicatedbrand');
const montlimartbrand = require('./eshops/montlimartbrand');
const circlebrand = require('./eshops/circlebrand');
const getCatD = require('./eshops/getCatD');
const { json } = require('express');
const fs = require('fs');

async function writeFile(products,nameFile){
  jsonData = JSON.stringify(products);
  var path = `./jsonFiles/${nameFile}.json`;
    fs.writeFileSync(path, jsonData, err => {
      if (err) {
          console.log('Error writing file', err)
      } else {
          console.log('Successfully wrote file')
      }
    })
    console.log('done');
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

async function allWebsites(links=[]){
  try{
    for(let i=0;i<links.length;i++){
      var eshop = links[i];
      var products = {};
      var persoCategories =[];
      if(eshop=='https://www.dedicatedbrand.com/en/men'){
        console.log(`🕵️‍♀️  Browsing ${eshop} eshop`);
        //persoCategories = ['allMen','news','t-shirts','basics','']
        products = await dedicatedbrand.scrape(eshop);
        writeFile(await products,"dedicated");
        //console.log(products);
        console.log('Done Dedicated');
      }
      else if(eshop=='https://www.montlimart.com/99-vetements'){
        console.log(`🕵️‍♀️  Browsing ${eshop} eshop`);
        products = await montlimartbrand.scrape(eshop);
        //console.log(products);
        writeFile(await products,"montlimart");
        console.log('Done Montlimart');
      }
      else if(eshop=='https://shop.circlesportswear.com/collections/collection-homme'){
        console.log(`🕵️‍♀️  Browsing ${eshop} eshop`);
        products = await circlebrand.scrape(eshop);
        //console.log(products);
        writeFile(await products,"circle");
        console.log('Done CircleSporstwear');
      }
    }
    console.log('Done ALL');
    process.exit(0);
  }
  catch(e){
    console.error(e);
    process.exit(1);
  }
}

async function testCategories (link='https://www.dedicatedbrand.com/en/men'){

  console.log('Affichage des categories');
  const cat = await getCatD.scrape(link);
  console.log(cat[0]);
}

const li = ['https://www.dedicatedbrand.com/en/men','https://www.montlimart.com/99-vetements','https://shop.circlesportswear.com/collections/collection-homme'];
//allWebsites(li);
testCategories();



const val = [{'nom':'JAOUDET','prenom':'Theo'}];
//mongodbAdd(val);
