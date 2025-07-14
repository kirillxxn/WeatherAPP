const GeneralInfo = ({ isLoading, weatherState }) => {
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
				) : (
					''
				)}
				<h2 className='general__name-city'></h2>
				<span className='general__day-info'>
					<p className='day__info-time'></p>

					<p className='day__info-date'></p>
				</span>

				<p className='general__temp-info'></p>
				<p className='general__temp-state'>
					{weatherState?.text}
					{weatherState && weatherState.icon}
				</p>
			</section>
		</>
	)
}

export default GeneralInfo
