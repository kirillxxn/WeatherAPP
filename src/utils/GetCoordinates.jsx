import sendCoordinates from './SendCoordinates.jsx'
import getDetailedInfo from './GetDetailedInfo.jsx'
import { BASE_URL } from './API.js'
const GetCoordinates = async (
	cityValue,
	setWeatherState,
	setIsLoading,
	setDetailedWeatherStates,
	setCheckbox
) => {
	try {
		setIsLoading(true)

		const response = await fetch(
			`${BASE_URL}${encodeURIComponent(
				cityValue
			)}&count=1&language=ru&format=json`
		)
		const data = await response.json()

		if (data.results && data.results.length > 0) {
			const cityName = document.querySelector('.general__name-city')
			cityName.textContent = `${data.results[0].name}`

			const lat = data.results[0].latitude
			const lon = data.results[0].longitude
			const parseLat = parseFloat(lat)
			const parseLon = parseFloat(lon)
			const rounderLat = parseLat.toFixed(5)
			const rounderLon = parseLon.toFixed(5)

			setWeatherState(null)
			await sendCoordinates(setWeatherState, rounderLat, rounderLon)
			setCheckbox(true)
			await getDetailedInfo(setDetailedWeatherStates, rounderLat, rounderLon)
		} else {
			alert('Город не найден')
		}
	} catch (error) {
		console.error(`Ошибка: ${error.message}`)
	} finally {
		setIsLoading(false)
	}
}

export default GetCoordinates
