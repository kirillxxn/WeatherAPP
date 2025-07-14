import './Body.css'
import { useState } from 'react'
import DetailedInfo from './Sections/DetailedInfo.jsx'
import GeneralInfo from './Sections/GeneralInfo.jsx'
import GetCoordinates from '../../utils/GetCoordinates.jsx'

function Body() {
	const [cityValue, setCityValue] = useState('')
	const [isLoading, setIsLoading] = useState(false)
	const [weatherState, setWeatherState] = useState(null)
	const [detailedWeatherStates, setDetailedWeatherStates] = useState({})

	const handleClearCityValue = e => {
		e.preventDefault()
		setCityValue('')
	}
	const handleSearchCity = e => {
		e.preventDefault()
		GetCoordinates(
			cityValue,
			setWeatherState,
			setIsLoading,
			setDetailedWeatherStates
		)
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
					<GeneralInfo isLoading={isLoading} weatherState={weatherState} />
					<DetailedInfo detailedWeatherStates={detailedWeatherStates} />
				</div>
			</main>
		</>
	)
}

export default Body
