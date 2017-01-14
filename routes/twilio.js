var express = require('express')
var router = express.Router()

router.get('/task', function(req, res, next) {
  res.json({
		confirmation: 'success',
		message:'it worked'
	})
})

router.post('/task', function(req, res, next) {
	console.log('TWILIO'+JSON.stringify(req.body))

	var message = req.body['Body']
	var task = {
		title: 'Twilio Task',
		category: 'delivery',
		description: message
	}

	controllers.task.post(task, false)
	.then(function(result){
		console.log('SUCCESS'+JSON.stringify(result))
		res.send('Hello!')
	})
	.catch(function(err){
		console.log(err)
	})

	res.send('Hello!')
})

module.exports = router
