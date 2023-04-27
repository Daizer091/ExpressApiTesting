const express = require('express')

const productsRouter = require('./productsRouter.js')
const categories = require('./categoriesRouter.js')
const user = require('./userRouter.js')

function routerApi(app) {
  const router = express.Router();
  app.use('/api/v1', router)
  router.use('/products', productsRouter)
  router.use('/categories', categories)
  router.use('/user', user)
}

module.exports = routerApi
