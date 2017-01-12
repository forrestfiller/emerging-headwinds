import constants from '../constants'

var initialState = {

}

export default (state = initialState, action) => {

	switch (action.type){
		case constants.TASKS_RECEIVED:
			console.log('TASKS_RECEIVED: '+JSON.stringify(action.tasks))

			return updated

		default:
			return state
	}
}
