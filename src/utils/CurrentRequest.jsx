import { BASE_URL, PARAMETERS_URL } from './API.js'
import HourlyRequest from './HourlyRequest.jsx'
import { CloudyIcon, Sun, SunAndCloud, Moon } from './TempState.jsx'

const CurrentRequest = async (
	cityValue,
	setWeatherState,
	setIsLoading,
	setDetailedWeatherStates,
	setShowCheckbox,
	setTempCelsius,
	setTempFar
) => {
	try {
		setWeatherState(null)
		setIsLoading(true)

		const response = await fetch(
			`${BASE_URL}${import.meta.env.VITE_API_KEY}&q=${encodeURIComponent(
				cityValue
			)}${PARAMETERS_URL}`
		)
		const data = await response.json()
		setTempCelsius(data.current.temp_c)
		setTempFar(data.current.temp_f)
		const cityName = document.querySelector('.general__name-city')
		const temperatureElement = document.querySelector('.general__temp-info')

		const datetime = new Date(data.location.localtime)

		const formattedTime = datetime.toLocaleTimeString('ru-RU', {
			hour: '2-digit',
			minute: '2-digit',
		})
		const formattedDate = datetime.toLocaleDateString('ru-RU', {
			year: 'numeric',
			month: 'long',
			day: 'numeric',
		})

		const timeDOM = document.querySelector('.day__info-time')
		const dateDOM = document.querySelector('.day__info-date')
		HourlyRequest(setDetailedWeatherStates, cityValue)
		if (timeDOM) {
			timeDOM.textContent = formattedTime
		}
		if (dateDOM) {
			dateDOM.textContent = formattedDate
		}
		if (data.location.name && data.location.name.length > 0) {
			cityName.textContent = `${data.location.name}`
			temperatureElement.textContent = `${data.current.temp_c}°C`

			if (data.current.cloud <= 50) {
				// Ясно
				if (formattedTime >= '06:00' && formattedTime < '18:00') {
					setWeatherState({ text: 'Ясно', icon: <Sun /> })
				} else {
					setWeatherState({ text: 'Ясно', icon: <Moon /> })
				}
			} else if (data.current.cloud >= 51 && data.current.cloud <= 80) {
				// Малооблачно
				if (formattedTime >= '06:00' && formattedTime < '18:00') {
					setWeatherState({ text: 'Малооблачно', icon: <SunAndCloud /> })
				} else {
					setWeatherState({ text: 'Малооблачно', icon: <Moon /> })
				}
			} else {
				// Облачно
				setWeatherState({ text: 'Облачно', icon: <CloudyIcon /> })
			}

			setShowCheckbox(true)
		} else {
			alert('Город не найден')
		}
	} catch (error) {
		console.error(`Ошибка: ${error.message}`)
	} finally {
		setIsLoading(false)
	}
}

export default CurrentRequest
