var mongoose = require('mongoose')

var MessageSchema = new mongoose.Schema({
	task: {type:String, default:''},// id number of task
	profile: {type:mongoose.Schema.Types.Mixed, default:{id:'', username:''}},
	text: {type:String, default:''},
	timestamp: {type:Date, default: Date.now}
})

MessageSchema.methods.summary = function(){
	var summary = {
		profile: this.profile,
		task: this.task,
		text: this.text,
		timestamp: this.timestamp,
		id: this._id.toString()
	}

	return summary
}


module.exports = mongoose.model('MessageSchema', MessageSchema)

// (timestamp, text, profile: (id and username)
