const fetch = require('node-fetch');
const cheerio = require('cheerio');

/**
 * Parse webpage e-shop
 * @param  {String} data - html response
 * @return {Array} products
 */
const parse = data => {
  const $ = cheerio.load(data);
  return $('.productList-container .productList')
    .map((i, element) => {
      const brand = "dedicated";
      const name = $(element)
        .find('.productList-title')
        .text()
        .trim()
        .replace(/\s/g, ' ');
      const price = parseFloat(
        $(element)
          .find('.productList-price')
          .text()
      );
      const caracteristique = $(element)
        .find('.productList-image-materialInfo')
        .text()
        .trim();
      var link = $(element)
      .find('.productList-link')
      .attr('href');
      link = "https://www.dedicatedbrand.com" + link;

      const photo=$(element)
      .find('img')
      .attr('data-src');
      
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
