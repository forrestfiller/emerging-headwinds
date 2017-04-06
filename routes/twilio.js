var express = require('express')
var router = express.Router()
var controllers = require('../controllers')
var utils = require('../utils')

router.get('/task', function(req, res, next) {
  res.json({
		confirmation: 'success',
		message: 'a check to show this route works.'
	})

})

router.get('/notify', function(req, res, next) {
// sendSMS: function(recipient, message)

	utils.TwilioHelper.sendSMS('2122039317','body: twilio are we working yet?')
	.then(function(message){
    console.log('/notify twilio: '+JSON.stringify(message))
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

		var msg = 'Someone just replied to your request here is their response:\n\n'+req.body.text

		return utils.TwilioHelper.sendSMS(profile.phone, msg)
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

	var message = req.body['Body']

	// Title. Category. Task description.
	// example: 'Package Pickup. Delivery. Please pick up my package from the post office.'
	var validCategories = ['delivery', 'house cleaning', 'dog walking', 'misc', 'jobs']

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

		var msg = 'Nice! Your wishes have been sent to server <3'

		return utils.TwilioHelper.sendSMS(from, msg)
	})

	.catch(function(err){
		console.log('ERROR: '+err.message)
	})
})

module.exports = router
