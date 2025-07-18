import './WeatherInfo.css'
import { useState } from 'react'
import CurrentRequest from './Sections/Current/CurrentRequest.jsx'
import CurrentInfo from './Sections/CurrentInfo.jsx'
import HourlyInfo from './Sections/HourlyInfo.jsx'

function Body() {
	const [cityValue, setCityValue] = useState('')
	const [isLoading, setIsLoading] = useState(false)
	const [weatherState, setWeatherState] = useState(null)
	const [detailedWeatherStates, setDetailedWeatherStates] = useState({})
	const [showCheckbox, setShowCheckbox] = useState(false)
	const [tempCelsius, setTempCelsius] = useState('-')
	const [tempFar, setTempFar] = useState('-')

	const handleClearCityValue = e => {
		e.preventDefault()
		setCityValue('')
	}

	const handleSearchCity = e => {
		e.preventDefault()
		CurrentRequest(
			cityValue,
			setWeatherState,
			setIsLoading,
			setDetailedWeatherStates,
			setShowCheckbox,
			setTempCelsius,
			setTempFar
		)
	}

	return (
		<>
			<main className='main'>
				<img className='main__meteor' src='/src/assets/icons/meteor.png'></img>
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
					<img
						className='form__icon-moon'
						src='/src/assets/icons/moon (1).png'
					></img>
					<input
						value={cityValue}
						onChange={event => setCityValue(event.target.value)}
						className='main__container-input'
						type='text'
						placeholder='Введите город'
					/>
					<img className='form__icon-sun' src='/src/assets/icons/a.png'></img>
					<button
						onClick={handleSearchCity}
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
					<CurrentInfo
						showCheckbox={showCheckbox}
						isLoading={isLoading}
						weatherState={weatherState}
						tempCelsius={tempCelsius}
						tempFar={tempFar}
					/>
					{<HourlyInfo detailedWeatherStates={detailedWeatherStates} />}
				</div>
			</main>
		</>
	)
}

export default Body
