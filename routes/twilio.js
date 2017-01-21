var express = require('express')
var router = express.Router()
var controllers = require('../controllers')
var utils = require('../utils')

router.get('/task', function(req, res, next) {
  res.json({
		confirmation: 'success',
		message:'it worked'
	})

})

router.get('/notify', function(req, res, next) {
// sendSMS: function(recipient, message, completion){
	utils.TwilioHelper.sendSMS('2122039317','xoxo are we working yet?')
	.then(function(message){

		res.json({
			confirmation: 'success',
			message: message
		})

	})

	.catch(function(err){

		res.json({
			confirmation: 'fail',
			message: err
		})

	})
})

router.post('/notify', function(req, res, next) {
	console.log(JSON.stringify(req.body))

	if (req.body.recipient == null){
		res.json({
			confirmation: 'fail',
			message: 'Please specify a recipient.'
		})

		return
	}

	if (req.body.text == null){
		res.json({
			confirmation: 'fail',
			message: 'Please include a message.'
		})

		return
	}

	controllers.profile
	.getById(req.body.recipient, false) // get the profile first
	.then(function(profile){

		var msg = 'Hooray! Someone replied to your request, here is their reply:\n\n'+req.body.text

		return utils.TwilioHelper.sendSMS(profile.phone, req.body.text)
	})

	.then(function(message){
		res.json({
			confirmation: 'success',
			message: message
		})

		return message
	})

	.catch(function(err){
		res.json({
			confirmation: 'fail',
			message: err
		})
	})
})

router.post('/task', function(req, res, next) {
	console.log('TWILIO'+JSON.stringify(req.body))
	// TWILIO{"ToCountry":"US","ToState":"CA","SmsMessageSid":"SM782378c72b15ae9ee84fefd686549702","NumMedia":"0","ToCity":"SAN FRANCISCO","FromZip":"08648","SmsSid":"SM782378c72b15ae9ee84fefd686549702","FromState":"NJ","SmsStatus":"received","FromCity":"LAWRENCEVILLE","Body":"Today's test","FromCountry":"US","To":"+14157670957","ToZip":"94108","AddOns":"{\"status\":\"successful\",\"message\":null,\"code\":null,\"results\":{\"twilio_caller_name\":{\"request_sid\":\"XR5c200184090a72c7c416ae1398600a50\",\"status\":\"successful\",\"message\":null,\"code\":null,\"result\":{\"caller_name\":{\"caller_name\":null,\"caller_type\":null,\"error_code\":null},\"phone_number\":\"+16095320258\"}}}}","NumSegments":"1","MessageSid":"SM782378c72b15ae9ee84fefd686549702","AccountSid":"ACfd09bf81057e7c0af0efd155ea708bad","From":"+16095320258","ApiVersion":"2010-04-01"}


	var message = req.body['Body']

	// Title. Category. Task description.
	// example: 'Package Pickup. Delivery. Please pick up my package from the post office.'
	var validCategories = ['delivery', 'house cleaning', 'dog walking', 'misc']

	var parts = message.split('.') // hopefully this is three parts

	var category = (parts.length == 1) ? 'misc' : parts[1].trim().toLowerCase()
	var description = null

	if (validCategories.indexOf(category) == -1){
		category = 'misc'
		if (parts.length == 2){
			description = parts[1].trim()
		}
		else {
			description = (parts[1].trim())+'.'+' '+(parts[2].trim()) // edge case not done!
		}
	}
	else {
		description = (parts.length < 3) ? '' : parts[2].trim()
	}

	var task = {
		title: parts[0],
		category: category,
		description: description
	}

	var from = req.body['From'].replace('+1','') // phone # of sender

	controllers.profile.get({phone: from}, false)
	.then(function(profiles){
		if (profiles.length == 0){
			throw new Error('Go away.')
			return
		}

		var profile = profiles[0]
		task['profile'] = {
			id: profile.id,
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
