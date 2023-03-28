const fetch = require('node-fetch');
const cheerio = require('cheerio');

/**
 * Parse webpage e-shop
 * @param  {String} data - html response
 * @return {Array} products
 */
const parse = data => {
  const $ = cheerio.load(data);
  return $('.products-list .products-list__block*')
    .map((i, element) => {
      const brand = "montlimart";
      const name = $(element)
        .find('.text-reset')
        .text()
        .trim();
      const price = parseInt(
        $(element)
          .find('.price')
          .text()
      );
      const caracteristique = $(element)
        .find('.product-miniature__color')
        .text()
        .trim();
      return {brand,caracteristique,name,price};
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

