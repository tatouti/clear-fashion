/* eslint-disable no-console, no-process-exit */
const dedicatedbrand = require('./eshops/dedicatedbrand');
const montlimartbrand = require('./eshops/montlimartbrand');
const circlebrand = require('./eshops/circlebrand');
const getCatD = require('./eshops/getCatD');
const getCatM = require('./eshops/getCatM');
const getCatC = require('./eshops/getCatC');
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
async function mongodbAdd (products,shopName){

    console.log('Mongo DB Server Part');
    const {MongoClient} = require('mongodb');
    const MONGODB_URI = 'mongodb+srv://tatouti:MongoDB6@clusterclearfashion.iyacjoa.mongodb.net/test?retryWrites=true&w=majority';
    const MONGODB_DB_NAME = 'ClusterClearFashion';
    const client = await MongoClient.connect(MONGODB_URI, {'useNewUrlParser': true});
    const db =  client.db(MONGODB_DB_NAME);
    const collection = db.collection(shopName);
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
      var finalProducts = [];
      var persoCategories = [];
      var cat =[];
      var newLink ='';

      if(eshop=='https://www.dedicatedbrand.com/en/'){
        console.log(`🕵️‍♀️  Browsing ${eshop} eshop`);

        cat = await getCatD.scrape(eshop);
        persoCategories = cat.slice(0,cat.length-6); //Get only the products and not the infos of the company

        for(let c=0;c<persoCategories.length;c++){
          newLink = eshop + persoCategories[c];
          console.log(`Browsing ${newLink} category`);
          products = await dedicatedbrand.scrape(newLink);
          finalProducts = finalProducts.concat(products);
        }
        console.log(finalProducts.length," products for Dedicated");
        writeFile(finalProducts,"dedicated");
        mongodbAdd(finalProducts,"dedicated");
        console.log('Done Dedicated');
      }
      else if(eshop=='https://www.montlimart.com/99-vetements'){
        console.log(`🕵️‍♀️  Browsing ${eshop} eshop`);

        persoCategories = await getCatM.scrape(eshop);

        for(let c=0;c<persoCategories.length;c++){
          newLink = persoCategories[c];
          console.log(`Browsing ${newLink} category`);
          products = await montlimartbrand.scrape(newLink);
          finalProducts = finalProducts.concat(products);
        }
        console.log(finalProducts.length," products for Montlimart");
        writeFile(finalProducts,"montlimart");
        mongodbAdd(finalProducts,"montlimart");
        console.log('Done Montlimart');
      }
      else if(eshop=='https://shop.circlesportswear.com'){
        console.log(`🕵️‍♀️  Browsing ${eshop} eshop`);

        cat = await getCatC.scrape(eshop);
        persoCategories = cat.slice(0,3);

        for(let c=0;c<persoCategories.length;c++){
          newLink = eshop + persoCategories[c];
          console.log(`Browsing ${newLink} category`);
          products = await circlebrand.scrape(newLink);
          finalProducts = finalProducts.concat(products);
        }
        console.log(finalProducts.length," products for CircleSportsWear");
        writeFile(finalProducts,"circle");
        mongodbAdd(finalProducts,"circle");
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

const listWebsites = ['https://www.dedicatedbrand.com/en/','https://www.montlimart.com/99-vetements','https://shop.circlesportswear.com'];
//allWebsites(listWebsites);

const val = [{'nom':'JAOUDET','prenom':'Theo'}];
mongodbAdd(val,"dedicated");
