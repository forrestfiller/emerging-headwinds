var express = require('express')
var router = express.Router()

router.get('/task', function(req, res, next) {
  res.json({
		confirmation: 'success',
		message:'it worked'
	})
})

router.post('/task', function(req, res, next) {
//  res.render('index', { title: 'twilio' })
	res.send('Hello Friend! It is I, Twilio')
})

module.exports = router
