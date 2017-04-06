var twilio = require('twilio')
var Promise = require('bluebird')

module.exports = {

	sendSMS: function(recipient, message){
		return new Promise(function(resolve, reject){

			if (recipient.indexOf('+1') == -1)
				recipient = '+1'+recipient // add in country code for twilio

			var client = new twilio.RestClient(process.env.TWILIO_SID, process.env.TWILIO_AUTH_TOKEN)

			client.messages.create({
				body: message,
				to: recipient,
				from: process.env.TWILIO_FROM
			}, function(err, message){
				if (err){
					reject(err)
					return
				}

				resolve(message)
			})
		})
	}

}
