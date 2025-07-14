import GetTime from './GetTime'
import { CloudyIcon, Moon, Sun, SunAndCloud } from './TempState'
import { OPEN_METEO_GENERAL_URL, OPEN_METEO_PARAMETERS_URL } from './API'
const sendCoordinates = async (
	cityValue,
	setWeatherState,
	rounderLat,
	rounderLon
) => {
	const temperatureElement = document.querySelector('.general__temp-info')

	try {
		const response = await fetch(
			`https://api.weatherapi.com/v1/current.json?key=a8d4dc46350d454d9b3202147251407&q=${encodeURIComponent(
				cityValue
			)}&aqi=no`
		)
		const data = await response.json()

		temperatureElement.textContent = `${data.current.temp_c}°C`

		const localTime = await GetTime(rounderLat, rounderLon)

		if (data.current.cloud_cover_low <= 50) {
			// Ясно
			if (localTime >= '06:00' && localTime < '18:00') {
				setWeatherState({ text: 'Ясно', icon: <Sun /> })
			} else {
				setWeatherState({ text: 'Ясно', icon: <Moon /> })
			}
		} else if (
			data.current.cloud_cover_low >= 51 &&
			data.current.cloud_cover_low <= 80
		) {
			// Малооблачно
			if (localTime >= '06:00' && localTime < '18:00') {
				setWeatherState({ text: 'Малооблачно', icon: <SunAndCloud /> })
			} else {
				setWeatherState({ text: 'Малооблачно', icon: <Moon /> })
			}
		} else {
			// Облачно
			setWeatherState({ text: 'Облачно', icon: <CloudyIcon /> })
		}
	} catch (error) {
		console.error('Ошибка:', error.message)
	}
}

export default sendCoordinates
