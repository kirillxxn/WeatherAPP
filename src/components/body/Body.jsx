import { useState } from 'react'
import './Body.css'
import sendCoordinates from './utils/SendCoordinates'
import getDetailedInfo from './utils/GetDetailedInfo'
import DetailedInfo from './sections/DetailedInfo'
import GeneralInfo from './sections/GeneralInfo'
import { BASE_URL } from './utils/API'
function Body() {
	const [cityValue, setCityValue] = useState('')
	const [isLoading, setIsLoading] = useState(false)
	const [weatherState, setWeatherState] = useState(null) // Основное состояние погоды
	const [detailedWeatherStates, setDetailedWeatherStates] = useState({}) // Индивидуальное состояние для каждого временного отрезка

	const handleClearCityValue = e => {
		e.preventDefault()
		setCityValue('')
	}

	const getCoordinates = async e => {
		e.preventDefault()
		setIsLoading(true)

		try {
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
				await getDetailedInfo(setDetailedWeatherStates, rounderLat, rounderLon) // Используем новое состояние
			} else {
				alert('Город не найден')
			}
		} catch (error) {
			console.error(`Ошибка: ${error.message}`)
		} finally {
			setIsLoading(false)
		}
	}

	return (
		<>
			<main className='main'>
				<form className='main__container-form'>
					<button
						type='reset'
						onClick={handleClearCityValue}
						className='form__clear-btn'
					>
						<svg
							width='24'
							height='24'
							viewBox='0 0 24 24'
							fill='none'
							xmlns='http://www.w3.org/2000/svg'
						>
							<line x1='5' y1='5' x2='19' y2='19' stroke='#000' />
							<line x1='19' y1='5' x2='5' y2='19' stroke='#000' />
						</svg>
					</button>
					<input
						value={cityValue}
						onChange={event => setCityValue(event.target.value)}
						className='main__container-input'
						type='text'
						placeholder='Введите город'
					></input>
					<button
						onClick={getCoordinates}
						type='submit'
						className='form__search-btn'
					>
						<svg
							width='24'
							height='24'
							viewBox='0 0 24 24'
							fill='none'
							xmlns='http://www.w3.org/2000/svg'
						>
							<circle cx='10' cy='10' r='8' stroke='#000' />
							<path d='M17 17 L21 21' stroke='#000' />
						</svg>
					</button>
				</form>
				<div className='container'>
					<GeneralInfo isLoading={isLoading} weatherState={weatherState} />
					<DetailedInfo detailedWeatherStates={detailedWeatherStates} />
				</div>
			</main>
		</>
	)
}

export default Body
