# Broadleaf Front End SPA Project

## Your Mission

Your mission is to carve out 2 hours and create a single page application in React using the provided product API defined below. We hope you can spend about two hours on this project, and if you can finish faster -- great! Please, do not spend much longer than 2 hours max.

## Your Tasks

* Be creative. We want to see a functional app that uses the api. _Functionality is more important than the look and feel_, but if you finish early, feel free to spruce things up. If you are unsure about anything, make an executive decision.
* The home page of the app should show a list of products to purchase. You decide how these products are displayed and how they are styled.
* The API below supports pagination, so be sure the user is able to paginate in some manner. It is up to you how you want to allow the user to paginate.
* A user should be able to click on a product and be taken to a product details view. This view should show details about the product, including it's description. Style as you please.
* Your solution should include a README with whatever steps are necessary to get things running.
* Once finished, send your solution files to ncrum@broadleafcommerce.com.

## Tips

* This repository provides the products API to be used by the application. You are welcome to roll whatever setup you'd like for your SPA, as long as it queries against this API and uses React.
* Use any libraries you'd like. Redux or no Redux. Fetch or Axios. Hooks or no hooks.
* Don't forget to write tests!
* Assume modern browser support is all that's necessary.
* Feel free to copy and expose the Product images from your application server if more convenient.

## Products API

All API requests are made to `http://localhost:4000/api/*`. Product images are exposed under `http://localhost:4000/static/*`.

### GET Products

List a page of Product summaries

```
GET /api/products
```

### GET Product

Get Product details by ID

```
GET /api/products/:id
```

### GET Image

Get the Product image

```
GET /static/:imageUrl
```

## Available Scripts

### `yarn start:api`

Runs the mock Products API on [http://localhost:4000](http://localhost:4000).
