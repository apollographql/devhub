const {MetricsFetcher, METRICS} = require('apollo-algolia-transform');
const truncate = require('lodash/truncate');
const {getNodeMeta} = require('../src/utils');
const striptags = require('striptags');
const {decode} = require('he');
// index Collections
// use gatsby-plugin-algolia to query data
// what info do we want?
// make a record for each collection and each item in a collection?
// items in a collection will have 1 ancestor == collection title
// get pageviews data from google analytics like in blog?

// docs records structure
// {
//     objectID
//     title
//     sectionTitle
//     slug
//     categories
//     text
//     pageviews
//     index
//     docset // (not applicable for devhub)
//     type
//     excerpt
//     ancestors
//     url
// }

async function transformer({data}) {
  let allGAData = {};
  if (process.env.NODE_ENV !== 'test') {
    const metricsFetcher = new MetricsFetcher({viewId: '154056458'});
    allGAData = await metricsFetcher.fetchAll();
  }

  const {site, allWpCollection} = data;
  const {siteUrl} = site.siteMetadata;

  //   get collection item urls from --> const {url} = getNodeMeta(collectionItem);

  const records = allWpCollection.nodes.flatMap((collection, index) => {
    const {id, title, excerpt, slug, date} = collection;
    const categories = collection.categories.nodes.map(node => node.name);
    const collectionUrl = `${siteUrl}/${collection.link}`;

    const pageviews = allGAData[collectionUrl]?.[METRICS.uniquePageViews];

    const mainCollectionRecord = {
      objectID: `${id}_${index}`,
      id,
      index,
      title,
      date,
      url: collectionUrl,
      slug,
      categories,
      text: excerpt,
      excerpt: truncate(excerpt, {length: 100, separator: ' '}),
      ancestors: [],
      type: 'devhub',
      pageviews
    };

    const recordsToIndex = [mainCollectionRecord];

    collection.collectionSettings.items.forEach(item => {
      const {id, title, slug, date} = item;
      const {url} = getNodeMeta(item);
      const text = decode(striptags(item.excerpt));
      const categories = item.categories.nodes.map(node => node.name);

      recordsToIndex.push({
        objectID: `${id}_${index}`,
        id,
        index,
        title: collection.title,
        sectionTitle: title,
        url,
        date,
        slug: `collection/${slug}`,
        categories,
        text,
        excerpt: truncate(text, {length: 100, separator: ' '}),
        ancestors: [{title: collection.title, url: collectionUrl}],
        type: 'devhub',
        pageviews
      });
    });

    return recordsToIndex;
  });

  console.log('Created %s Algolia records', records.length);
  return records;
}

module.exports = {transformer};
