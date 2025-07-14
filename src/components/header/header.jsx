import './Header.css'

function Header() {
	return (
		<>
			<header className='header'>
				<div className='header__container'>
					<span className='header__container-logo'>
						<span className='header__container-logo-white'>Weather</span>
						Forecast
					</span>
				</div>
			</header>
		</>
	)
}

export default Header
