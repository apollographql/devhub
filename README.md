# Welcome to DevHub

DevHub is a place for developers to explore the latest resources for building apps with Apollo. It allows us to organize the best resources—blogs, videos, docs, and more—about a particular subject into hand-picked collections. This document explains how to update the website and create new collections.

- [Developing locally](#developing-locally)
- [Running Wordpress](#running-wordpress)
  - [Recommended method](#recommended-method)
- [In this repo](#in-this-repo)
- [In Wordpress](#in-wordpress)
  - [Feed items](#feed-items)
  - [Collections](#collections)

## Developing locally

To run this website locally, first clone the repo into a new directory and install its dependencies:

```bash
git clone https://github.com/apollographql/devhub.git
cd devhub
npm install
```

Next, install the [Netlify CLI](https://docs.netlify.com/cli/get-started/) if you don't already have it installed on your computer, and run `netlify init`. Select the options **Connect this directory to an existing Netlify site** and **Use current git remote origin** to connect your local environment with the appropriate Netlify site automatically.

We use `netlify dev` to start the local development server with important environment variables automatically injected into the build.

```bash
npm install -g netlify-cli # if you don't have it already
netlify login # if you just installed the CLI
netlify init # only required for newly-cloned repos
netlify dev # use this instead of `npm start`
```

By default, this will run the website locally with data sourced from our production Wordpress instance. Don't worry, you can't write any new data to the prod instance from here. 😅

## Running Wordpress

If you want to load your data from a local Wordpress instance, simply supply a `WORDPRESS_URL_DEV` environment variable when you start the local development environment. You could do this by writing it inline before `netlify dev`:

```bash
WORDPRESS_URL_DEV=http://localhost:10000/graphql netlify dev
```

Or you could create a `.env` file in the project root with a `WORDPRESS_URL_DEV` environment variable set. Just run `netlify dev` and the variable will be loaded automatically. 

```bash
WORDPRESS_URL_DEV=http://localhost:10000/graphql
```

### Recommended method

The easiset way to run Wordpress locally is through the [Local](https://localwp.com/) app. It works on all platforms and makes provisioning Wordpress instances and keeping them updated with your production instances easy.

Our production Wordpress instance is hosted on WP Engine. To pull its data down to your local instance, you can follow [this guide](https://wpengine.com/support/local/#Pull_to_Local_From_WP_Engine) on the subject. The WP Engine login credentials are stored in 1Password.

Once you have your Wordpress instance running, you should see its address and port in the Local UI. Your `WORDPRESS_DEV_URL` should be this address and port, followed by the path `/graphql`. For example, http://localhost:10000/graphql.

## In this repo

This repo contains the code responsible for sourcing data and rendering it on the page. It also contains things like titles and static page content, like the home page title and description.

It uses [Chakra UI](https://github.com/chakra-ui/chakra-ui) components and CSS solution with a custom theme made with colors from [Space Kit](https://github.com/apollographql/space-kit). Chakra helps us build layouts quickly and consistently using their convenient style props system and a theme for adhering to a set of spacing units, color palettes, and component styles. You can learn more about writing CSS with Chakra by [reading this docs article](https://next.chakra-ui.com/docs/features/style-props).

The dynamic data in this website is sourced from a Wordpress instance using [`gatsby-source-wordpress-experimental`](https://github.com/gatsbyjs/gatsby-source-wordpress-experimental). This makes all of the data in Wordpress available to be queried using static GraphQL queries. These queries are usually expressed as [Gatsby page queries](https://www.gatsbyjs.com/docs/page-query/) defined as named exports at the bottom of a file. See the [collections page](./src/pages/collections.js) for example.

## In Wordpress

### Feed items

### Collections

#### Unlisted collections
