import { addCityAction } from "../store/cityReducer"

export const fetchCityInfo = (name) => {
	return function(dispatch) {
		fetch(`https://api.openweathermap.org/data/2.5/weather?q=${name}&appid=ab0a9d2f11bdf9e3aa824df29904fae5&units=metric&lang=ua`)
			.then((response) => {return response.json()})
			.then((data) => {
				if (data.message){
					alert(data.message + ', try again');
				} else {
					const myCity= {
						data : data,
						id:  Date.now(),
					  }
					dispatch(addCityAction(myCity))
				}
			});

	}
}

