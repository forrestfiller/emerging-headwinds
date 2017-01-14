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
console.log('HEre is twilio: '+JSON.stringfiy(req.body))
	res.send('Hello Friend')
})

module.exports = router
