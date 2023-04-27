const express = require('express')
const router = express.Router()

// by query

router.get('/', (req, res) => {
  const { limit, offset } = req.query
  if (limit && offset) {
    res.json({
      limit,
      offset,
    })
  }
  else {
    res.send('Not parameters found')
  }
})

module.exports = router
