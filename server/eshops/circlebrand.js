const fetch = require('node-fetch');
const cheerio = require('cheerio');

/**
 * Parse webpage e-shop
 * @param  {String} data - html response
 * @return {Array} products
 */
const parse = data => {
  const $ = cheerio.load(data);
  return $('.product-grid-container .grid__item')
    .map((i, element) => {
      const brand = "circle";
      var name = $(element)
        .find('.full-unstyled-link')
        .text()
        .trim()
        .split('\n');
      name = name[0];
      var price = $(element)
      .find('.money')
      .text()
      .trim();
      price = parseFloat(price.slice(1,price.length/2));
      var caracteristique = $(element)
        .find('.card__characteristic')
        .text()
        .trim();
      caracteristique = caracteristique.slice(0,caracteristique.length/2);
      var link = $(element)
      .find('.full-unstyled-link')
      .attr('href');
      link = "https://shop.circlesportswear.com" +link;

      var img = $(element)
        .find('img')
        .attr('src');
      var photo = 'https:'+img;

      return {brand,caracteristique,name, price,link,photo};
    })
    .get();
};

/**
 * Scrape all the products for a given url page
 * @param  {[type]}  url
 * @return {Array|null}
 */
module.exports.scrape = async url => {
  try {
    const response = await fetch(url);

    if (response.ok) {
      const body = await response.text();

      return parse(body);
    }

    console.error(response);

    return null;
  } catch (error) {
    console.error(error);
    return null;
  }
};
