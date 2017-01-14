var express = require('express')
var router = express.Router()

router.get('/task', function(req, res, next) {
  res.json({
		confirmation: 'success',
		message:'it worked'
	})
})

router.post('/task', function(req, res, next) {
	console.log('test'+JSON.stringify(req.body))

	res.send('Hello Friend')
})

module.exports = router
