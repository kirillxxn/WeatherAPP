import { useState } from 'react'

const CurrentInfo = ({
	isLoading,
	weatherState,
	tempCelsius,
	tempFar,
	showCheckbox,
}) => {
	const [isActive, setIsActive] = useState(false)
	const handleCheckbox = () => {
		setIsActive(!isActive)
	}

	let currentTemperature
	if (!isActive) {
		currentTemperature = tempCelsius !== '-' ? `${tempCelsius} °C` : ''
	} else {
		currentTemperature = tempFar !== '-' ? `${tempFar} ℉` : ''
	}

	return (
		<>
			<section className='section__general-info'>
				{isLoading ? (
					<div className='load-circle'>
						<p className='loading-text'>Загрузка...</p>
						<div className='windows8'>
							<div className='wBall' id='wBall_1'>
								<div className='wInnerBall'></div>
							</div>
							<div className='wBall' id='wBall_2'>
								<div className='wInnerBall'></div>
							</div>
							<div className='wBall' id='wBall_3'>
								<div className='wInnerBall'></div>
							</div>
							<div className='wBall' id='wBall_4'>
								<div className='wInnerBall'></div>
							</div>
							<div className='wBall' id='wBall_5'>
								<div className='wInnerBall'></div>
							</div>
						</div>
					</div>
				) : null}
				<h2 className='general__name-city'></h2>
				<span className='general__day-info'>
					<p className='day__info-time'></p>
					<p className='day__info-date'></p>
				</span>
				<p className='general__temp-info'>{currentTemperature || ''}</p>
				{showCheckbox && (
					<button
						onClick={handleCheckbox}
						className={`switch-btn ${isActive ? 'switch-on' : ''}`}
					>
						<span className='celsius'>°C</span>
						<span className='fahrenheit'>℉</span>
					</button>
				)}
				<p className='general__temp-state'>
					{weatherState?.text}
					{weatherState && weatherState.icon}
				</p>
			</section>
		</>
	)
}

export default CurrentInfo
