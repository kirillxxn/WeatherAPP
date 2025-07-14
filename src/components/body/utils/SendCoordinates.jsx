import getTime from './GetTime'
import { CloudyIcon, Moon, Sun, SunAndCloud } from './TempState'
import { OPEN_METEO_GENERAL_URL, OPEN_METEO_PARAMETERS_URL } from './API'
const sendCoordinates = async (setWeatherState, rounderLat, rounderLon) => {
	const temperatureElement = document.querySelector('.general__temp-info')

	try {
		const response = await fetch(
			`${OPEN_METEO_GENERAL_URL}?latitude=${rounderLat}&longitude=${rounderLon}&current=${OPEN_METEO_PARAMETERS_URL}&timezone=auto`
		)
		const data = await response.json()

		temperatureElement.textContent = `${data.current.temperature_2m}°C`

		const localTime = await getTime(rounderLat, rounderLon)

		console.log(localTime)

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
