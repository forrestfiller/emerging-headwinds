var Task = require('../models/Task')
var Promise = require('bluebird')

module.exports = {

	get: function(params, isRaw){
		return new Promise(function(resolve, reject){

			Task.find(params, function(err, tasks){
				if (err){
					reject(err)
					return
				}

				if (isRaw == true)
					resolve(tasks)
				else {
					var list = []
					tasks.forEach(function(task, i){
						list.push(task.summary())
					})

					resolve(list)
				}
			})
		})
	},

	getById: function(id, isRaw){
		return new Promise(function(resolve, reject){
			Task.findById(id, function(err, task){
				if (err){
					reject(err)
					return
				}

				if (isRaw == true)
					resolve(task)
				else
					resolve(task.summary())
			})
		})
	},

	post: function(params, isRaw){
		return new Promise(function(resolve, reject){
			Task.create(params, function(err, task){
				if (err){
					reject(err)
					return
				}

				if (isRaw == true)
					resolve(task)
				else
					resolve(task.summary())
			})
		})
	}
}
