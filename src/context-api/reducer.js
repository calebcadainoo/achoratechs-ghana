export const initialState = {
	BASE_URL: 'https://test.anchoratechs.com',
	categories: undefined,
}

export const actionTypes = {
	SET_CATEGORIES: 'SET_CATEGORIES',
}

const reducer = (state, action) => {
	console.log(action)

	switch (action.type) {
		case actionTypes.SET_CATEGORIES:
			return {
				...state,
				categories: action.categories,
			}
		default:
			return state
	}
}

export default reducer 