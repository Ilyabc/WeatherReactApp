const defaultState = {
    cities: []
}
const ADD_CITY = 'ADD_CITY'
const REMOVE_CITY = 'REMOVE_CITY'
const REMOVE_ALL_CITIES = 'REMOVE_ALL_CITIES'

export const cityReducer = (state = defaultState, action) => {
    switch (action.type) {
        case ADD_CITY:
            return {
                ...state,
                cities: [...state.cities, action.payload]
        }
        case REMOVE_CITY:
            const restCities = state.cities.filter(city => city.id !== action.payload);
			return {
				...state,
				cities: [...restCities]
        }
        case REMOVE_ALL_CITIES:
            return {
				...state,
				cities: []
        }
        default:
            return state
    }
}

export const addCityAction = (payload) => ({type: ADD_CITY, payload})
export const removeCityAction = (payload) => ({type: REMOVE_CITY, payload})
export const removeAllCitiesAction = (payload) => ({type: REMOVE_ALL_CITIES, payload})