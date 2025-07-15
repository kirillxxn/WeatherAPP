import { CloudyIcon, Sun, SunAndCloud, Moon } from './TempState'
import { BASE_URL, PARAMETERS_URL } from './API'
const HourlyRequest = (setDetailedWeatherStates, cityValue) => {
	fetch(
		`${BASE_URL}${import.meta.env.VITE_API_KEY}&q=${encodeURIComponent(
			cityValue
		)}${PARAMETERS_URL}`
	)
		.then(response => response.json())
		.then(data => {
			const detailedInfoIds = [
				'text0',
				'text6',
				'text10',
				'text14',
				'text18',
				'text22',
			]
			const states = {}

			const now = new Date()
			const currentHour = now.getHours()

			detailedInfoIds.forEach(id => {
				const hourStr = id.replace('text', '')
				const slotHour = parseInt(hourStr)
				const dayIndex = Math.floor(currentHour / 24)
				const forecastData = data.forecast.forecastday[dayIndex].hour[slotHour]

				const tempElement = document.getElementById(`${id}_temp`)
				if (tempElement) {
					tempElement.textContent = `${forecastData.temp_c}°C`
				}

				const cloudCover = forecastData.cloud
				const localTimeString = `${
					slotHour < 10 ? '0' + slotHour : slotHour
				}:00`

				if (cloudCover <= 50) {
					if (localTimeString >= '06:00' && localTimeString < '18:00') {
						states[id] = {
							temperature: forecastData.temp_c,
							icon: <Sun />,
						}
					} else {
						states[id] = {
							temperature: forecastData.temp_c,
							icon: <Moon />,
						}
					}
				} else if (cloudCover >= 51 && cloudCover <= 80) {
					if (localTimeString >= '06:00' && localTimeString < '18:00') {
						states[id] = {
							temperature: forecastData.temp_c,
							icon: <SunAndCloud />,
						}
					} else {
						states[id] = {
							temperature: forecastData.temp_c,
							icon: <Moon />,
						}
					}
				} else {
					states[id] = {
						temperature: forecastData.temp_c,
						icon: <CloudyIcon />,
					}
				}
			})

			setDetailedWeatherStates(states)
		})
}
export default HourlyRequest
