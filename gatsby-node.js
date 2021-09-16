exports.createPages = async ({graphql, actions}) => {
  const {data} = await graphql(`
    {
      allWpCollection {
        nodes {
          id
          slug
          categories {
            nodes {
              id
            }
          }
        }
      }
    }
  `);

  data.allWpCollection.nodes.forEach(collection =>
    actions.createPage({
      component: require.resolve('./src/templates/collection'),
      path: '/collection/' + collection.slug,
      context: {
        id: collection.id,
        categoryIds: collection.categories.nodes.map(category => category.id)
      }
    })
  );
};
