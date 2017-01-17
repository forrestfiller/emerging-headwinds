var express = require('express')
var router = express.Router()
var controllers = require('../controllers')

router.get('/task', function(req, res, next) {
  res.json({
		confirmation: 'success',
		message:'it worked'
	})
})

router.post('/task', function(req, res, next) {
	console.log('TWILIO'+JSON.stringify(req.body))
	// TWILIO{"ToCountry":"US","ToState":"CA","SmsMessageSid":"SM782378c72b15ae9ee84fefd686549702","NumMedia":"0","ToCity":"SAN FRANCISCO","FromZip":"08648","SmsSid":"SM782378c72b15ae9ee84fefd686549702","FromState":"NJ","SmsStatus":"received","FromCity":"LAWRENCEVILLE","Body":"Today's test","FromCountry":"US","To":"+14157670957","ToZip":"94108","AddOns":"{\"status\":\"successful\",\"message\":null,\"code\":null,\"results\":{\"twilio_caller_name\":{\"request_sid\":\"XR5c200184090a72c7c416ae1398600a50\",\"status\":\"successful\",\"message\":null,\"code\":null,\"result\":{\"caller_name\":{\"caller_name\":null,\"caller_type\":null,\"error_code\":null},\"phone_number\":\"+16095320258\"}}}}","NumSegments":"1","MessageSid":"SM782378c72b15ae9ee84fefd686549702","AccountSid":"ACfd09bf81057e7c0af0efd155ea708bad","From":"+16095320258","ApiVersion":"2010-04-01"}


	var message = req.body['Body']
	var task = {
		title: 'Twilio Task',
		category: 'delivery',
		description: message
	}

	var from = req.body['From'].replace('+1','') // phone # of sender
	
	controllers.get({phone: from}, false)

	.then(function(profiles){
		if (profiles.length == 0){
			throw new Error('Go away.')
			return
		}

		profile = profiles[0]
		task['profile'] = {
			id: prodile.id,
			username: profile.username
		}

		return 	controllers.task.post(task, false)
	})
	.then(function(result){
		console.log('SUCCESS'+JSON.stringify(result))
		res.send('Hello!')
	})
	.catch(function(err){
		console.log('ERROR: '+err.message)
	})
})

module.exports = router
