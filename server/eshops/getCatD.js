const fetch = require('node-fetch');
const cheerio = require('cheerio');
const { slice } = require('cheerio/lib/api/traversing');

/**
 * Parse webpage e-shop
 * @param  {String} data - html response
 * @return {Array} products
 */
const parse = data => {
  const $ = cheerio.load(data);
  console.log("Showing categories");
  return $('.mainNavigation-fixedContainer .mainNavigation-link-subMenu-link*')
    .map((i, element) => {
      var category = $(element)
      .find('a')
      .prop("href");

      return [category];
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
