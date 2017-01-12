import constants from '../constants'
import { APIManager } from '../utils'

const getRequest = (path, params, actionType) => {
	return (dispatch) =>
		APIManager.get(path, params)
		.then(response => {
			console.log('GET: '+JSON.stringify(response))
			const payload = response.results || response.result

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

	fetchTasks: (params) => {
		return (dispatch) => {
			return dispatch(getRequest('/api/task', params, constants.TASKS_RECEIVED))
		}
	},

	tasksReceived: (tasks) => {
		return {
			type: constants.TASKS_RECEIVED,
			tasks: tasks
		}
	},

	taskCreated: (task) => {
		return {
			type: constants.TASK_CREATED,
			task: task
		}
	}
}
