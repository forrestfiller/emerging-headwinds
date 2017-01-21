var Message = require('../models/Message')
var Promise = require('bluebird')
var bcrypt = require('bcryptjs')

module.exports = {
	get: function(params, isRaw){
		return new Promise(function(resolve, reject){
			Message.find(params, function(err, messages){
				if (err){
					reject(err)
					return
				}

				if (isRaw == true)
					resolve(messages)
				else {
					var list = []
					messages.forEach(function(message, i){
						list.push(message.summary())
					})

					resolve(list)
				}
			})
		})
	},

	getById: function(id, isRaw){
		return new Promise(function(resolve, reject){
			Message.findById(id, function(err, message){
				if (err){
					reject(err)
					return
				}

				if (isRaw == true)
					resolve(message)
				else
					resolve(message.summary())
			})
		})
	},

	post: function(params, isRaw){
		return new Promise(function(resolve, reject){
			
			Message.create(params, function(err, message){
				if (err){
					reject(err)
					return
				}

				if (isRaw == true)
					resolve(message)
				else
					resolve(message.summary())
			})
		})
	}
}
