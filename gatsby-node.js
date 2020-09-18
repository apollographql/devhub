exports.createPages = async ({graphql, actions}) => {
  const {data} = await graphql(`
    {
      allWpCollection {
        nodes {
          id
          slug
        }
      }
    }
  `);

  const component = require.resolve('./src/templates/collection');
  data.allWpCollection.nodes.forEach(collection =>
    actions.createPage({
      component,
      path: '/collection/' + collection.slug,
      context: {
        id: collection.id
      }
    })
  );
};
