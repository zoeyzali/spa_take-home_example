const { chunk, find, pick } = require( 'lodash' );
const uuid = require( 'uuid/v4' );
const { LoremIpsum } = require( 'lorem-ipsum' );

const lorem = new LoremIpsum( {
  sentencesPerParagraph: {
    max: 6,
    min: 3
  },
  wordsPerSentence: {
    max: 16,
    min: 4
  }
} );

function product( name, description, price, salePrice, inStock, imageUrl ) {
  return {
    id: uuid(),
    name,
    description,
    price,
    salePrice,
    inStock,
    imageUrl
  };
}

const products = [
  product( 'Blazin Saddle XXX Hot Habanero Pepper Sauce Bottle', lorem.generateParagraphs( 2 ), 5.99, 4.99, true, '/images/products/Blazin-Saddle-XXX-Hot-Habanero-Pepper-Sauce-Bottle.jpg' ),
  product( 'Bull Snort Cowboy Cayenne Pepper Hot Sauce Bottle', lorem.generateParagraphs( 2 ), 7.99, 5.99, true, '/images/products/Bull-Snort-Cowboy-Cayenne-Pepper-Hot-Sauce-Bottle.jpg' ),
  product( 'Cafe Louisiane Sweet Cajun Blackening Sauce Bottle', lorem.generateParagraphs( 2 ), 8.99, null, true, '/images/products/Cafe-Louisiane-Sweet-Cajun-Blackening-Sauce-Bottle.jpeg' ),
  product( 'Cool Cayenne Pepper Hot Sauce Bottle', lorem.generateParagraphs( 2 ), 10.99, 7.99, true, '/images/products/Cool-Cayenne-Pepper-Hot-Sauce-Bottle.jpg' ),
  product( 'Day of the Dead Chipotle Hot Sauce Bottle', lorem.generateParagraphs( 2 ), 8.99, null, true, '/images/products/Day-of-the-Dead-Chipotle-Hot-Sauce-Bottle.jpeg' ),
  product( 'Day of the Dead Habenero Hot Sauce Bottle', lorem.generateParagraphs( 2 ), 8.99, null, true, '/images/products/Day-of-the-Dead-Habanero-Hot-Sauce-Bottle.jpeg' ),
  product( 'Day of the Dead Scotch Bonnet Hot Sauce Bottle', lorem.generateParagraphs( 2 ), 8.99, null, true, '/images/products/Day-of-the-Dead-Scotch-Bonnet-Hot-Sauce-Bottle.jpeg' ),
  product( 'Dr. Chilemeisters Insane Hot Sauce Bottle', lorem.generateParagraphs( 2 ), 11.99, null, true, '/images/products/Dr.-Chilemeisters-Insane-Hot-Sauce-Bottle.jpg' ),
  product( 'Green Ghost Bottle', lorem.generateParagraphs( 2 ), 9.99, null, true, '/images/products/Green-Ghost-Bottle.jpg' ),
  product( 'Hoppin\' Hot Sauce Bottle', lorem.generateParagraphs( 2 ), 8.99, 7.99, true, '/images/products/Hoppin-Hot-Sauce-Bottle.jpg' ),
  product( 'Sudden Death Sauce Bottle', lorem.generateParagraphs( 2 ), 7.99, 5.99, true, '/images/products/Sudden-Death-Sauce-Bottle.jpg' ),
  product( 'Sweet Death Sauce Bottle', lorem.generateParagraphs( 2 ), 8.99, null, true, '/images/products/Sweet-Death-Sauce-Bottle.jpg' )
];

function getPage( pageNumber, pageSize ) {
  const chunks = chunk( products, pageSize );
  const unpicked = chunks[pageNumber - 1];
  if ( !unpicked ) {
    return false;
  }

  const picked = unpicked.map( product => pick( product, ['id', 'name', 'price', 'salePrice', 'inStock', 'imageUrl'] ) );
  return {
    first: pageNumber === 1,
    last: pageNumber === chunks.length,
    pageNumber,
    pageSize,
    pageTotal: picked.length,
    total: products.length,
    content: picked
  };
}


function getProducts( req, res ) {
  let { pageNumber = 1, pageSize = 8 } = req.query;
  pageNumber = +pageNumber;
  pageSize = +pageSize;

  if ( pageNumber < 1 ) {
    res.status( 400 ).send( 'Page Number must be greater than one' );
    return;
  }

  const page = getPage( pageNumber, pageSize );

  if ( !page ) {
    res.status( 404 ).send( `No results found for this pageNumber: ${pageNumber}` );
    return;
  }

  res.send( page );
}

function getProduct( req, res ) {
  const { id } = req.params;
  const product = find( products, { id } );

  // validation
  if ( !product ) {
    res.status( 404 ).send( `No Product found with ID: ${id}` );
    return;
  }

  res.send( product );
}

module.exports = { getProducts, getProduct };
