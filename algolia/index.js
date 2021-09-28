const {MetricsFetcher, METRICS} = require('apollo-algolia-transform');
const truncate = require('lodash/truncate');
const striptags = require('striptags');
const {decode} = require('he');

async function transformer({data}) {
  let allGAData = {};
  if (process.env.NODE_ENV !== 'test') {
    const metricsFetcher = new MetricsFetcher({viewId: '229672516'});
    allGAData = await metricsFetcher.fetchAll();
  }

  const {site, allWpCollection} = data;
  const {siteUrl} = site.siteMetadata;

  const records = allWpCollection.nodes.flatMap(collection => {
    // strip trailing slash off of collection.link, no trailing slashes in allGAData
    const collectionUrl = siteUrl + collection.link.replace(/\/$/, '');
    const pageviews = allGAData[collectionUrl]?.[METRICS.uniquePageViews];

    const collectionRecords = [
      collection,
      ...collection.collectionSettings.items
    ].map((item, index) => {
      const {id, title, date, excerpt, categories, internal} = item;
      const text = decode(striptags(excerpt));
      const isCollection = internal.type === 'WpCollection';

      return {
        objectID: `${id}_${index}`,
        id,
        index,
        title: collection.title, // will always be collection title
        sectionTitle: isCollection ? null : title, // collections don't get a sectionTitle
        date,
        slug: collection.slug, // slug used to deduplicate results from same page
        text,
        excerpt: truncate(text, {length: 100, separator: ' '}),
        categories: categories.nodes.map(node => node.name),
        url: collectionUrl,
        pageviews,
        type: 'devhub',
        ancestors: isCollection
          ? []
          : [{title: collection.title, url: collectionUrl}]
      };
    });

    return collectionRecords;
  });

  console.log('Created %s Algolia records', records.length);
  return records;
}

module.exports = {transformer};
