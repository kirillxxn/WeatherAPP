import './NavList.css'
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom'
import Wind from './Wind/wind'
import BigForecast from './BigForecast/BigForecast'
import Wet from './Wet/Wet'
import UvIndex from './UvIndex/UvIndex'
import Pressure from './Pressure/Pressure'
function NavList() {
	return (
		<>
			<section className='section__nav-info'>
				<Router>
					<nav className='section__nav'>
						<ul className='section__nav-list'>
							<li className='nav__list-item'>
								<Link className='list__item-link' to='/'>
									Прогноз на 10 дней
								</Link>
							</li>
							<li className='nav__list-item'>
								<Link className='list__item-link' to='/wind'>
									Скорость ветра
								</Link>
							</li>
							<li className='nav__list-item'>
								<Link className='list__item-link' to='/wet'>
									Влажность
								</Link>
							</li>
							<li className='nav__list-item'>
								<Link className='list__item-link' to='/uvindex'>
									УФ-индекс
								</Link>
							</li>
							<li className='nav__list-item'>
								<Link className='list__item-link' to='/pressure'>
									Давление
								</Link>
							</li>
						</ul>
					</nav>
					<Routes>
						<Route path='/' element={<BigForecast />} />
						<Route path='/wind' element={<Wind />} />
						<Route path='/wet' element={<Wet />} />
						<Route path='/uvindex' element={<UvIndex />} />
						<Route path='/pressure' element={<Pressure />} />
					</Routes>
				</Router>
			</section>
		</>
	)
}
export default NavList
