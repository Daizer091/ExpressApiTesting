const express = require('express')
const ProductsService = require('./../services/productService.js')
const validatorHandler = require('./../middlewares/validatorHandler.js')
const { createProductSchema, updateProductSchema, getProductSchema } = require('./../schemas/productSchemas.js')

const router = express.Router()
const service = new ProductsService()


// similar addresses error solution = cascading solution, the order of execution is important

router.get('/filter', (req, res) => {
  res.send('It`s filter')
})

// by rest url

router.get('/:id',
  validatorHandler(getProductSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params
      const product = await service.findOne(id)
      res.status(200).json(product)
    } catch (error) {
      next(error)
    }
  }
)

// query with faker products

router.get('/', async (req, res) => {
  const products = await service.find()
  res.status(200).json(products)
})

router.post('/',
  validatorHandler(createProductSchema, 'body'),
  async (req, res) => {
    const body = req.body
    const newProduct = await service.create(body)
    res.status(201).json({ newProduct })
  })

router.patch('/:id',
  validatorHandler(getProductSchema, 'params'),
  validatorHandler(updateProductSchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params
      const body = req.body
      const product = await service.update(id, body)
      res.json({ product })
    } catch (error) {
      next(error)
    }

  })

router.delete('/:id', async (req, res, next) => {
  try {
    const { id } = req.params
    const rta = await service.delete(id)
    res.json({ rta })
  } catch (error) {
    next(error)
  }
})

module.exports = router
