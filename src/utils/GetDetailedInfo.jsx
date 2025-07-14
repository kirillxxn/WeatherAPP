import { CloudyIcon, Moon, Sun, SunAndCloud } from './TempState'
import { OPEN_METEO_GENERAL_URL, OPEN_METEO_PARAMETERS_URL } from './API'
const getDetailedInfo = async (
	setDetailedWeatherStates,
	rounderLat,
	rounderLon
) => {
	try {
		const response = await fetch(
			`${OPEN_METEO_GENERAL_URL}?latitude=${rounderLat}&longitude=${rounderLon}&hourly=${OPEN_METEO_PARAMETERS_URL}&forecast_days=2`
		)
		const data = await response.json()
		const now = new Date()
		const currentHour = now.getHours()
		const detailedInfoIds = [
			'text0',
			'text6',
			'text10',
			'text14',
			'text18',
			'text22',
		]
		const states = {}

		detailedInfoIds.forEach(id => {
			const hourStr = id.replace('text', '')
			const slotHour = parseInt(hourStr)
			const dayShift = currentHour >= slotHour ? 1 : 0
			const indexInArray = dayShift * 24 + slotHour
			const tempElement = document.getElementById(`${id}_temp`)
			if (tempElement) {
				tempElement.textContent = `${data.hourly.temperature_2m[indexInArray]}°C`
			}

			const cloudCover = data.hourly.cloud_cover_low[indexInArray]
			const localTimeString = `${slotHour < 10 ? '0' + slotHour : slotHour}:00`

			if (cloudCover <= 50) {
				// Ясно
				if (localTimeString >= '06:00' && localTimeString < '18:00') {
					states[id] = {
						temperature: data.hourly.temperature_2m[indexInArray],
						icon: <Sun />,
					}
				} else {
					states[id] = {
						temperature: data.hourly.temperature_2m[indexInArray],
						icon: <Moon />,
					}
				}
			} else if (cloudCover >= 51 && cloudCover <= 80) {
				// Малооблачно
				if (localTimeString >= '06:00' && localTimeString < '18:00') {
					states[id] = {
						temperature: data.hourly.temperature_2m[indexInArray],
						icon: <SunAndCloud />,
					}
				} else {
					states[id] = {
						temperature: data.hourly.temperature_2m[indexInArray],
						icon: <Moon />,
					}
				}
			} else {
				// Облачно
				states[id] = {
					temperature: data.hourly.temperature_2m[indexInArray],
					icon: <CloudyIcon />,
				}
			}
		})

		setDetailedWeatherStates(states)
	} catch (error) {
		console.error(error)
	}
}

export default getDetailedInfo
