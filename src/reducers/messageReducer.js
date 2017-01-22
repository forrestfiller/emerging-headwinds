import constants from '../constants'

var initialState = {

}

export default (state = initialState, action) => {
	let updated = Object.assign({}, state)

	switch (action.type){

		case constants.MESSAGE_CREATED:
			console.log('MESSAGE_CREATED: '+JSON.stringify(updated))
			return updated

		default:

			return updated
	}

}
