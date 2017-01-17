import constants from '../constants'
import { APIManager } from '../utils'

const getRequest = (path, params, actionType) => {
	return (dispatch) =>
		APIManager.get(path, params)
		.then(response => {
//			console.log('GET: '+JSON.stringify(response))
			const payload = response.results || response.result || response.user

			dispatch({
				type: actionType,
				payload: payload,
				params: params
			})

		})
		.catch(err => {
			console.log('ERR: '+JSON.stringify(err))

		})
}

const postRequest = (path, params, actionType) => {
	return (dispatch) =>
		APIManager.post(path, params)
		.then(response => {
//			console.log('POST: '+JSON.stringify(response))
			const payload = response.results || response.result || response.user

			dispatch({
				type: actionType,
				payload: payload
			})

		})
		.catch(err => {
			console.log('ERR: '+JSON.stringify(err))

		})
}

export default {

	login: (credentials) => {
		return (dispatch) => {
			return dispatch(postRequest('/account/login', credentials, constants.USER_LOGGED_IN))
		}
	},

	register: (credentials) => {
		return (dispatch) => {
			return dispatch(postRequest('/account/register', credentials, constants.PROFILE_CREATED))
		}
	},

	selectCategory: (category) => {
		return {
			type: constants.CATEGORY_SELECTED,
			payload: category
		}
	},

	fetchTasks: (params) => {
		return (dispatch) => {
			return dispatch(getRequest('/api/task', params, constants.TASKS_RECEIVED))
		}
	},

	tasksReceived: (tasks) => {
		return {
			type: constants.TASKS_RECEIVED,
			payload: tasks
		}
	},

	submitTask: (params) => {
		return (dispatch) => {
			return dispatch(postRequest('/api/task', params, constants.TASK_CREATED))
		}
	}

}
