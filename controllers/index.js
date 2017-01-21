var ProfileController = require('./ProfileController')
var TaskController = require('./TaskController')
var MessageController = require('./MessageController')
module.exports = {

	task: TaskController,
	profile: ProfileController,
	message: MessageController

}
